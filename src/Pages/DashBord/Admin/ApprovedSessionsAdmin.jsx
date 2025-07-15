import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Loading from '../../Extra/Loading';
import EmptyState from '../../Extra/EmptyState ';
import { useEffect, useRef } from 'react';


const ApprovedSessionsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [editingSession, setEditingSession] = useState(null);
const [newFee, setNewFee] = useState('');
const modalRef = useRef();

useEffect(() => {
  if (editingSession) {
    setTimeout(() => {
      document.getElementById('fee_input')?.focus();
    }, 100); // slight delay ensures it's mounted
  }
}, [editingSession]);
  const { data: approvedSessions = [], refetch, isLoading } = useQuery({
    queryKey: ['approvedAdminSessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/study-sessions/approved');
      return res.data;
    },
  });

  const handleEdit = (session) => {
  setEditingSession(session);
  setNewFee(session.fee || '');
  document.getElementById('edit_modal')?.showModal();
};

const submitEdit = async (e) => {
  e.preventDefault();
  if (!newFee || isNaN(newFee) || newFee < 0) {
    return Swal.fire('Invalid Fee', 'Please enter a valid fee amount', 'warning');
  }

  try {
    const res = await axiosSecure.patch(`/study-sessions/${editingSession._id}`, {
      fee: newFee,
    });

    if (res.data.success) {
      Swal.fire('Updated!', 'Fee updated successfully.', 'success');
      refetch();
      setEditingSession(null);
      setNewFee('');
    } else {
      Swal.fire('Error', res.data.message || 'Update failed', 'error');
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Something went wrong', 'error');
  }
};


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
      <h2 className="text-3xl font-bold mb-8 mt-10 text-center roboto text-[#422ad5]">📚 Approved Study Sessions</h2>

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
  onClick={() => handleEdit(session)}
  className="text-blue-600 pt-2.5 cursor-pointer hover:text-blue-800 tooltip"
  title="Update Fee"
>
  <FaEdit size={18} />
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {approvedSessions.length === 0 && (
          <EmptyState
    icon="book"
    title="No Approved Sessions"
    message="Approved sessions will show up here."
  />
        )}
      </div>

      {editingSession && (
  <dialog id="edit_modal" className="modal" ref={modalRef}>
  <div className="modal-box">
    <h2 className="text-xl font-semibold mb-4 text-center text-[#422ad5]">Edit Fee</h2>

    <form onSubmit={submitEdit} className="space-y-4">
      <input
        id="fee_input"
        type="number"
        className="w-full border rounded p-2"
        value={newFee}
        onChange={(e) => setNewFee(e.target.value)}
        required
      />

      <button
        type="submit"
        className="px-4 py-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm"
      >
        Update Fee
      </button>
    </form>
  </div>

  <form method="dialog" className="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>

)}

    </div>
  );
};

export default ApprovedSessionsAdmin;
