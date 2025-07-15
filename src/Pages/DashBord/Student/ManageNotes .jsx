import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Extra/Loading';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import EmptyState from '../../Extra/EmptyState ';

const ManageNotes = () => {
       const axiosSecure = useAxiosSecure();
       const { user } = useAuth();
       const queryClient = useQueryClient();
       const [editId, setEditId] = useState(null);
       const [editForm, setEditForm] = useState({ title: '', description: '' });

       const { data: notes = [], isLoading } = useQuery({
              queryKey: ['notes', user?.email],
              queryFn: async () => {
                     const res = await axiosSecure.get(`/notes?email=${user.email}`);
                     return res.data;
              },
       });

       const deleteNote = useMutation({
              mutationFn: async (id) => await axiosSecure.delete(`/notes/${id}`),
              onSuccess: () => {
                     queryClient.invalidateQueries(['notes', user?.email]);
                     Swal.fire('Deleted!', 'Your note has been removed.', 'success');
              },
       });

       const updateNote = useMutation({
              mutationFn: async () =>
                     await axiosSecure.patch(`/notes/${editId}`, editForm),
              onSuccess: () => {
                     queryClient.invalidateQueries(['notes', user?.email]);
                     Swal.fire('Updated!', 'Your note has been updated.', 'success');
                     setEditId(null);
              },
       });

       const handleEditClick = (note) => {
              setEditForm({ title: note.title, description: note.description });
              setEditId(note._id);
       };

       const handleUpdate = (e) => {
              e.preventDefault();
              updateNote.mutate();
       };

       if (isLoading) return <Loading />;

       return (
              <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] mt-6 lg:mt-0 to-[#f5f5f5] px-10 ml-16 py-10">
                     <div className="max-w-5xl mx-auto">
                            <h2 className="text-3xl pt-8 font-bold text-[#422ad5] text-center mb-10">📝 Manage Your Personal Notes</h2>

                            {notes.length === 0 && (
                                   <EmptyState
                                          icon="file"
                                          title="No Notes Uploaded Yet"
                                          message="You haven’t uploaded any notes yet."
                                   />
                            )}
                            <div className="grid md:grid-cols-2 gap-8">
                                   {notes.map((note) => (
                                          <div
                                                 key={note._id}
                                                 className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition hover:shadow-xl"
                                          >
                                                 {editId === note._id ? (
                                                        <form onSubmit={handleUpdate} className="space-y-3">
                                                               <label className="text-sm font-medium text-gray-600">Title:</label>
                                                               <input
                                                                      className="input input-bordered w-full"
                                                                      value={editForm.title}
                                                                      onChange={(e) =>
                                                                             setEditForm({ ...editForm, title: e.target.value })
                                                                      }
                                                               />
                                                               <label className="text-sm font-medium text-gray-600">Description:</label>
                                                               <textarea
                                                                      className="textarea textarea-bordered w-full"
                                                                      value={editForm.description}
                                                                      onChange={(e) =>
                                                                             setEditForm({ ...editForm, description: e.target.value })
                                                                      }
                                                               />
                                                               <button
                                                                      type="submit"
                                                                      className="btn btn-success w-full text-white"
                                                               >
                                                                      Save Changes
                                                               </button>
                                                        </form>
                                                 ) : (
                                                        <>
                                                               <div className='flex items-center  gap-1.5'>
                                                                      <h3 className=" mt-1 font-semibold text-gray-500">Title:</h3>
                                                                      <p className="text-lg font-bold text-gray-800">{note.title}</p>
                                                               </div>
                                                               <h4 className="text-sm font-semibold text-gray-600 mt-4 mb-1">Description:</h4>
                                                               <p className="text-gray-700">{note.description}</p>

                                                               <div className="flex items-center justify-between mt-6">
                                                                      <button
                                                                             onClick={() => handleEditClick(note)}
                                                                             className="flex items-center gap-1.5"
                                                                             title="Edit"
                                                                      >
                                                                             <span className='underline mt-0.5 text-blue-400'>Edit:</span> <span className='text-blue-500 cursor-pointer hover:text-red-blue text-lg'><FaEdit /></span>

                                                                      </button>
                                                                      <button
                                                                             onClick={() => {
                                                                                    Swal.fire({
                                                                                           title: 'Are you sure?',
                                                                                           text: "This note will be permanently deleted.",
                                                                                           icon: 'warning',
                                                                                           showCancelButton: true,
                                                                                           confirmButtonColor: '#d33',
                                                                                           cancelButtonColor: '#3085d6',
                                                                                           confirmButtonText: 'Yes, delete it!',
                                                                                    }).then((result) => {
                                                                                           if (result.isConfirmed) {
                                                                                                  deleteNote.mutate(note._id);
                                                                                           }
                                                                                    });
                                                                             }}
                                                                             className="text-red-400 flex items-center gap-1.5"
                                                                             title="Delete"
                                                                      >
                                                                             <span className='underline'>Delete:</span> <span className='text-red-500 cursor-pointer hover:text-red-700 text-lg'><FaTrash /></span>
                                                                      </button>
                                                               </div>
                                                        </>
                                                 )}
                                          </div>
                                   ))}
                            </div>
                     </div>
              </div>
       );
};

export default ManageNotes;
