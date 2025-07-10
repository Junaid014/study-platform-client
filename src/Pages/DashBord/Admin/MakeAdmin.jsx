import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaSearch, FaUserShield, FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  // Fetch recently logged-in users
  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await axiosSecure.get('/users');
        const sorted = res.data
          .filter(user => user.last_log_in)
          .sort((a, b) => new Date(b.last_log_in) - new Date(a.last_log_in))
          .slice(0, 4);
        setRecentUsers(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecentUsers();
  }, [axiosSecure]);

  // Live search on input
  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axiosSecure.get(`/users/search?email=${searchTerm}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, axiosSecure]);

  // Make or Remove Admin
  const updateRole = async (userId, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${userId}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        toast.success(`User is now ${newRole}`);
        setSearchResults(prev =>
          prev.map(user => (user._id === userId ? { ...user, role: newRole } : user))
        );
        setRecentUsers(prev =>
          prev.map(user => (user._id === userId ? { ...user, role: newRole } : user))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update role');
    }
  };

  const renderUser = (user) => (
    <div key={user._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full mr-8" />
        <div className='navbar-start flex flex-col'>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm roboto text-gray-600 ">{user.email}</p>
          <p className="text-xs text-gray-500 capitalize">Role: {user.role || 'student'}</p>
        </div>
      </div>
      <div>
        {user.role !== 'admin' ? (
          <button
            onClick={() => updateRole(user._id, 'admin')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm"
          >
            <FaUserShield /> Make Admin
          </button>
        ) : (
          <button
            onClick={() => updateRole(user._id, 'student')}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm"
          >
            <FaUserMinus /> Remove Admin
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold roboto text-center mb-6">Manage Admins</h2>

      {/* Search Bar */}
      <div className="mb-6 relative w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search user by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map(renderUser)
          ) : (
            <p className="text-center roboto text-2xl  text-gray-700">No users found</p>
          )}
        </div>
      )}

      {/* Recent Logins */}
      {!searchTerm && (
        <>
          <h3 className="text-lg font-medium roboto mb-4 mt-10">Recently Logged-In Users</h3>
          <div className="space-y-4">
            {recentUsers.map(renderUser)}
          </div>
        </>
      )}
    </div>
  );
};

export default MakeAdmin;
