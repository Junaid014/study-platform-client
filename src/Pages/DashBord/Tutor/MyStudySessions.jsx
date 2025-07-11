import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient(); 

  const { data: mySessions = [],  } = useQuery({
    queryKey: ['myStudySessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/study-sessions');
      return res.data.filter(session => session.tutorEmail === user?.email);
    },
  });

  const handleResubmit = async (sessionId) => {
    const confirm = await Swal.fire({
      title: 'Resubmit this session?',
      text: 'This will send the session back to admin for approval.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, resubmit',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/study-sessions/${sessionId}`, {
        status: 'pending',
      });

      if (res.data.modifiedCount > 0 || res.data.success) {
        Swal.fire('Resubmitted!', 'Session is now pending approval.', 'success');

        
        queryClient.setQueryData(['myStudySessions'], (oldData) =>
          oldData.map(session =>
            session._id === sessionId
              ? { ...session, status: 'pending' }
              : session
          )
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to resubmit session.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h2 className="text-3xl font-bold mb-8 text-center roboto text-[#422ad5]">📘 My Study Sessions</h2>

      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl border border-gray-200">
        <table className="min-w-full table">
          <thead className="bg-gradient-to-r from-[#e2e8f0] to-[#cbd5e1] text-gray-800 text-sm uppercase tracking-wide rounded-t-md">
            <tr>
              <th>#</th>
              <th className="py-3 px-7 text-left">Title</th>
              <th className="py-3 px-7 text-left">Duration</th>
              <th className="py-3 px-7 text-left">Fee</th>
              <th className="py-3 px-7 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {mySessions.map((session, idx) => (
              <tr key={session._id} className="border-t hover:bg-gray-50 transition duration-150">
                <td>{idx + 1}</td>
                <td className="py-3 px-7 font-medium text-gray-800">{session.title}</td>
                <td className="py-3 px-7">{session.duration}</td>
                <td className="py-3 px-7">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {session.fee === '0' ? '0$' : `$${session.fee}`}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    className={`px-4 py-1 cursor-pointer rounded-full text-sm font-semibold shadow-md transition-all duration-200 relative group ${
                      session.status === 'approved'
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : session.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 cursor-default'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    onClick={() => session.status === 'rejected' && handleResubmit(session._id)}
                    disabled={session.status !== 'rejected'}
                  >
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    {session.status === 'rejected' && (
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        Click to resubmit for approval
                      </span>
                    )}
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>

        {mySessions.length === 0 && (
          <div className="text-center py-10 text-gray-600 font-semibold">
            You haven't created any sessions yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStudySessions;






