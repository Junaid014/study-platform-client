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
          .slice(0, 3);
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

    const delayDebounce = setTimeout(fetchUsers, 300); // debounce
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
    <div key={user._id} className="border border-gray-200 rounded-lg px-2 py-2 md:px-4 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition">
      <div className="flex items-start md:items-center gap-2 md:gap-4">
        <img src={user.image} alt={user.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
        <div className="flex flex-col">
          <p className="font-medium md:text-base text-sm">{user.name}</p>
          <p className="text-gray-600 text-xs md:text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs capitalize">Role: {user.role || 'student'}</p>
        </div>
      </div>
      <div className="mt-2 md:mt-0 flex gap-2">
        {user.role !== 'admin' ? (
          <button
            onClick={() => updateRole(user._id, 'admin')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-md flex items-center gap-1 text-xs md:text-sm"
          >
            <FaUserShield /> Make Admin
          </button>
        ) : (
          <button
            onClick={() => updateRole(user._id, 'student')}
            className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-md flex items-center gap-1 text-xs md:text-sm"
          >
            <FaUserMinus /> Remove Admin
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <h2 className="text-center text-[#f65d4e] font-semibold roboto text-xl md:text-3xl mt-6 mb-6">Manage Admins</h2>

      {/* Search Bar */}
      <div className="mb-6 relative w-full md:max-w-md mx-auto">
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
      {searchTerm ? (
        <div className="space-y-3 md:space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map(renderUser)
          ) : (
            <p className="text-center text-gray-700 text-sm md:text-base roboto">No users found</p>
          )}
        </div>
      ) : (
        <>
          {/* Recent Logins */}
          <h3 className="text-gray-700 font-medium roboto text-sm md:text-lg mb-3 md:mb-4 mt-6 md:mt-10">
            Recently Logged-In Users
          </h3>
          <div className="space-y-3 md:space-y-4">
            {recentUsers.map(renderUser)}
          </div>
        </>
      )}
    </div>
  );
};

export default MakeAdmin;
