import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MyMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: materials = [], refetch } = useQuery({
    queryKey: ['myMaterials', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this material.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (!confirm.isConfirmed) return;
    const res = await axiosSecure.delete(`/materials/${id}`);
    if (res.data.deletedCount > 0) {
      Swal.fire('Deleted!', 'Material has been deleted.', 'success');
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto lg:pl-10 pr-4 pl-4 py-8">
      <h2 className="text-2xl font-bold text-center text-[#422ad5] mb-6">📂 My Uploaded Materials</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((mat) => (
          <div key={mat._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-all">
            <img src={mat.image} alt="Material" className="h-40 w-full object-cover rounded mb-3" />
            <p className="text-sm text-gray-600 mb-1"><strong>Session ID:</strong> {mat.sessionId}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Link:</strong> <a href={mat.link} target="_blank" className="text-blue-500 underline">Open</a></p>
            <div className="flex justify-between items-center">
              <button onClick={() => handleDelete(mat._id)} className="text-red-600 hover:text-red-800">
                <FaTrash />
              </button>
              <button
                onClick={() => console.log('TODO: Edit logic or modal')}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      {materials.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No materials uploaded yet.</p>
      )}
    </div>
  );
};

export default MyMaterials;
