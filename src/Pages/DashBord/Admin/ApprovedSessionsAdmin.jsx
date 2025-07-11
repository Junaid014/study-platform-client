import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Loading from '../../Extra/Loading';

const ApprovedSessionsAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedSessions = [], refetch, isLoading } = useQuery({
    queryKey: ['approvedAdminSessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/study-sessions/approved');
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This session will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/study-sessions/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Session has been deleted.', 'success');
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to delete session.', 'error');
    }
  };

  if (isLoading) return <p className="text-center mt-10 font-semibold"><Loading/></p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h2 className="text-3xl font-bold mb-8 text-center roboto text-[#422ad5]">📚 Approved Study Sessions</h2>

      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl border border-gray-200">
        <table className="min-w-full table">
          <thead className="bg-gradient-to-r from-[#e2e8f0] to-[#cbd5e1] text-gray-800 text-sm uppercase tracking-wide rounded-t-md">
            <tr>
              <th>#</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Tutor</th>
              <th className="py-3 px-4 text-left">Fee</th>
              <th className="py-3 px-4 text-left">Start</th>
              <th className="py-3 px-4 text-left">End</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedSessions.map((session, idx) => (
              <tr key={session._id} className={`border-t hover:bg-gray-50 transition duration-150`}>
                <td>{idx+1}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{session.title}</td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-gray-700">{session.tutorName}</div>
                  <div className="text-xs text-gray-500">{session.tutorEmail}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {session.fee === '0' ? '0$' : `$${session.fee}`}
                  </span>
                </td>
                <td className="py-3 px-4">{session.classStart?.slice(0, 10)}</td>
                <td className="py-3 px-4">{session.registrationEnd?.slice(0, 10)}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleDelete(session._id)}
                    className="text-red-600 pt-2.5 cursor-pointer hover:text-red-800 tooltip"
                    title="Delete"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                  <button
                    onClick={() => console.log('Edit clicked:', session._id)}
                    className="text-blue-600 pt-2.5 cursor-pointer hover:text-blue-800 tooltip"
                    title="Update"
                  >
                    <FaEdit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {approvedSessions.length === 0 && (
          <div className="text-center py-10 text-gray-600 font-semibold">
            No approved sessions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedSessionsAdmin;
