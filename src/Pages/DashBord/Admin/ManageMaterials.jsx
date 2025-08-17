import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import Loading from '../../Extra/Loading';

const ManageMaterials = () => {
  const axiosSecure = useAxiosSecure();

  const { data: materials = [], isLoading, refetch } = useQuery({
    queryKey: ['allMaterials'],
    queryFn: async () => {
      const res = await axiosSecure.get('/materials'); 
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This material will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/materials/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Material has been deleted.', 'success');
        refetch();
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-10">
      <h2 className="text-xl md:text-3xl font-bold text-center mt-10 text-[#f65d4e] mb-6">📁 All Uploaded Materials</h2>
      {materials.length === 0 ? (
        <p className="text-center text-gray-500">No materials found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow min-w-[350px]">
          <table className="table w-full text-xs md:text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
              <tr>
                <th className="py-2 px-2  sm:px-4">Image</th>
                <th className="py-2 px-2  sm:px-4">Title / Tutor</th>
                <th className="py-2 px-2  sm:px-4 hidden lg:table-cell">Session ID</th>
                <th className="py-2 px-2  sm:px-4">Drive Link</th>
                <th className="py-2 px-2  sm:px-4 hidden md:table-cell">Tutor Email</th>
                <th className="py-2 px-2  sm:px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat) => (
                <tr key={mat._id} className="hover:bg-gray-50 transition">
                  <td className="py-2 md:px-2 px-1 sm:px-4">
                    <img 
                      src={mat.image} 
                      alt="material" 
                      className="md:h-10 md:w-14 h-10 w-10 object-cover rounded" 
                    />
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    <div className="md:font-medium md:text-base text-xs">{mat.title || 'Untitled'}</div>
                    <div className="text-xs text-gray-500 md:hidden">{mat.tutorEmail}</div>
                  </td>
                  <td className="py-2 px-2 sm:px-4 hidden lg:table-cell">{mat.sessionId}</td>
                  <td className="py-2 px-2 sm:px-4 text-blue-600 underline">
                    <a href={mat.link} target="_blank" rel="noreferrer">
                      Open <FaExternalLinkAlt className="inline ml-1" />
                    </a>
                  </td>
                  <td className="py-2 px-2 sm:px-4 hidden md:table-cell">{mat.tutorEmail}</td>
                  <td className="py-2 px-2 sm:px-4 flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="text-red-600 md:text-xl text-base cursor-pointer hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMaterials;
