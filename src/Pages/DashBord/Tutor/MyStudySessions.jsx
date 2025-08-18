import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import Loading from '../../Extra/Loading';
import CustomButton from '../../Extra/CustomButton';
import { FiUploadCloud } from 'react-icons/fi';
import EmptyState from '../../Extra/EmptyState ';

const MyStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState(null);
  const [material, setMaterial] = useState({ image: '', link: '' });
  const [uploading, setUploading] = useState(false);

  const { data: mySessions = [], isLoading } = useQuery({
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
        queryClient.setQueryData(['myStudySessions'], oldData =>
          oldData.map(session =>
            session._id === sessionId ? { ...session, status: 'pending' } : session
          )
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to resubmit session.', 'error');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!material.image || !material.link) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', material.image);

      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_uplod_key}`, {
        method: 'POST',
        body: formData,
      });
      const imgData = await imgbbRes.json();
      const imageUrl = imgData.data.url;

      const payload = {
        title: selectedSession.title,
        sessionId: selectedSession._id,
        tutorEmail: user.email,
        image: imageUrl,
        link: material.link,
      };

      const res = await axiosSecure.post('/materials', payload);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Material uploaded successfully', 'success');
        setSelectedSession(null);
        setMaterial({ image: '', link: '' });
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to upload materials', 'error');
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h2 className="text-xl md:text-3xl mt-10 font-bold mb-8 text-center roboto text-gray-700">📘 My Study Sessions</h2>

      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl border border-gray-200">
        <table className="min-w-full table">
          <thead className="bg-gradient-to-r from-[#e2e8f0] to-[#cbd5e1] text-gray-800 text-sm uppercase tracking-wide rounded-t-md">
            <tr>
              <th>#</th>
              <th className="py-3 px-7 text-left">Title</th>
              <th className="py-3 px-7 hidden md:table-cell text-left">Duration</th>
              <th className="py-3 px-7 text-left hidden sm:table-cell">Fee</th>
              <th className="py-3 px-7 text-left hidden sm:table-cell">Status</th>
              <th className="py-3 px-7 text-center hidden sm:table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {mySessions.map((session, idx) => (
              <tr key={session._id} className="border-t hover:bg-gray-50 transition duration-150">
                <td>{idx + 1}</td>

                {/* Title + Fee (on small screen fee নিচে চলে আসবে) */}
                <td className="py-3 md:px-7 md:text-base text-xs md:font-medium text-gray-800">
                  <div>{session.title}</div>
                  <div className="sm:hidden mt-1 text-sm text-gray-600">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {session.fee === '0' ? 'Free' : `$${session.fee}`}
                    </span>
                  </div>
                </td>

                {/* Duration (hidden on small) */}
                <td className="py-3 px-7 hidden md:table-cell">{session.duration}</td>

                {/* Fee (hidden on small, visible on sm+) */}
                <td className="py-3 px-7 hidden sm:table-cell">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {session.fee === '0' ? 'Free' : `$${session.fee}`}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 md:px-7">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <button
                      className={`md:px-4 px-1 py-1 text-xs rounded-full md:text-sm md:font-semibold shadow-md transition-all duration-200 relative group ${session.status === 'approved'
                          ? 'bg-green-100 text-xs text-green-700 cursor-default'
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

                    {session.status === 'rejected' && (session.rejectionReason || session.feedback) && (
                      <button
                        className="sm:ml-2 rounded-2xl bg-blue-500 px-3 py-1 cursor-pointer underline text-white text-xs"
                        onClick={() => {
                          Swal.fire({
                            title: 'Rejection Details',
                            html: `
                              <div style="text-align: left">
                                <strong>Reason:</strong> ${session.rejectionReason || 'Not provided'}<br/><br/>
                                <strong>Feedback:</strong><br/>${session.feedback || 'Not provided'}
                              </div>
                            `,
                            icon: 'info',
                            confirmButtonText: 'Close'
                          });
                        }}
                      >
                        View Reason
                      </button>
                    )}
                  </div>
                </td>

                {/* Action */}
                <td className="py-3 md:px-7 text-center">
                  {session.status === 'approved' && (
                    <button
                      onClick={() => {
                        setSelectedSession(session);
                        setMaterial({ image: '', link: '' });
                        document.getElementById('upload_modal')?.showModal();
                      }}
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-1 md:px-3 py-1 rounded md:text-sm text-xs flex items-center justify-center gap-1 md:gap-2 w-full sm:w-auto"
                    >
                      <FiUploadCloud className="md:text-lg text-xs" />
                      Upload
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mySessions.length === 0 && (
          <EmptyState
            icon="book"
            title="No Study Sessions Found"
            message="You haven’t created any study sessions yet. Once you do, they’ll appear here."
          />
        )}
      </div>

      {/* Modal */}
      {selectedSession && (
        <dialog id="upload_modal" className="modal">
          <div className="modal-box">
            <h2 className="text-xl font-semibold text-center roboto text-[#422ad5] mb-4">Upload Materials</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                value={selectedSession?._id || ''}
                readOnly
                className="w-full bg-gray-100 text-sm p-2 rounded border"
              />
              <input
                type="text"
                value={user?.email}
                readOnly
                className="w-full bg-gray-100 text-sm p-2 rounded border"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMaterial({ ...material, image: e.target.files[0] })}
                className="w-full border rounded p-2 text-sm"
                required
              />
              <input
                type="text"
                placeholder="Google Drive Link"
                value={material.link}
                onChange={(e) => setMaterial({ ...material, link: e.target.value })}
                className="w-full border rounded p-2 text-sm"
                required
              />
              <CustomButton
                type="submit"
                disabled={uploading}
                className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
              >
                {uploading ? 'Uploading...' : 'Submit'}
              </CustomButton>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
        </dialog>
      )}

    </div>
  );
};

export default MyStudySessions;
