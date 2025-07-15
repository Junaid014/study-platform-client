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
      const res = await axiosSecure.get('/materials'); // ✅ No email query
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-[#422ad5] mb-6">📁 All Uploaded Materials</h2>
      {materials.length === 0 ? (
        <p className="text-center text-gray-500">No materials found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow ">
          <table className="table w-full text-sm text-left ">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 ">Image</th>
                <th className="py-3 px-4 ">Title</th>
                <th className="py-3 px-4 ">Session ID</th>
                <th className="py-3 px-4 ">Drive Link</th>
                <th className="py-3 px-4 ">Tutor Email</th>
                <th className="py-3 px-4 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat) => (
                <tr key={mat._id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 ">
                    <img src={mat.image} alt="material" className="h-14 w-20 object-cover rounded" />
                  </td>
                  <td className="py-3 px-4">{mat.title || 'Untitled'}</td>
                  <td className="py-3 px-4">{mat.sessionId}</td>
                  <td className="py-3 px-4 text-blue-600 underline">
                    <a href={mat.link} target="_blank" rel="noreferrer">
                      Open <FaExternalLinkAlt className="inline ml-1" />
                    </a>
                  </td>
                  <td className="py-3 px-4 ">{mat.tutorEmail}</td>
                  <td className="py-3 px-4 ">
                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="text-red-600 text-xl mt-1 cursor-pointer hover:text-red-800"
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
