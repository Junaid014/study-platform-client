
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import CustomButton from '../../Extra/CustomButton';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EmptyState from '../../Extra/EmptyState ';

const MyMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [newLink, setNewLink] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [updating, setUpdating] = useState(false);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      let imageUrl = editingMaterial.image;

      // If a new image is selected, upload it
      if (newImage) {
        const formData = new FormData();
        formData.append('image', newImage);
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_uplod_key}`, {
          method: 'POST',
          body: formData,
        });
        const imgData = await imgbbRes.json();
        imageUrl = imgData.data.url;
      }

      const res = await axiosSecure.patch(`/materials/${editingMaterial._id}`, {
        link: newLink,
        image: imageUrl,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('Success', 'Material updated successfully', 'success');
        refetch();
        setEditingMaterial(null);
        setNewLink('');
        setNewImage(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update material', 'error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto lg:pl-10 pr-4 pl-4 py-8">
      <h2 className="text-3xl mt-10 font-bold text-center text-[#422ad5] mb-6">📂 My Uploaded Materials</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((mat) => (
          <div key={mat._id} className="border p-4 rounded-lg shadow hover:shadow-xl transition-all">
            <img src={mat.image} alt="Material" className="h-40 w-full object-cover rounded mb-3" />
            <p className="text-sm text-gray-700 roboto mb-1"><strong>Title :</strong> {mat.title}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Session ID:</strong> {mat.sessionId}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Link:</strong> <a href={mat.link} target="_blank" className="text-blue-500 underline">Open</a></p>
            <div className="flex justify-between items-center">
              <div className='flex items-center gap-1'>
                <p className='underline roboto  text-sm text-red-500'>Delete:</p>
                <button onClick={() => handleDelete(mat._id)} className="text-red-600 cursor-pointer hover:text-red-800">
                  <FaTrash />
                </button>
              </div>
              <div className='flex items-center gap-1'>
                <p className='underline roboto  text-sm text-blue-500'>Edit:</p>
                <button
                  onClick={() => {
                    setEditingMaterial(mat);
                    setNewLink(mat.link);
                    setNewImage(null);
                    document.getElementById('edit_modal')?.showModal();
                  }}
                  className="text-blue-600  cursor-pointer hover:text-blue-800"
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {materials.length === 0 && (
        <EmptyState
    icon="file"
    title="No Materials Uploaded"
    message="You haven’t uploaded any materials yet."
  />
)}
      

      {/* Edit Modal */}
      {editingMaterial && (
        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-semibold roboto text-center text-[#422ad5] mb-4">Edit Material</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <img src={editingMaterial.image} alt="Current" className="w-full h-32 object-cover rounded" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="w-full border rounded p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Google Drive Link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                required
              />
              <CustomButton
                type="submit"
                disabled={updating}
                className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
              >
                {updating ? 'Updating...' : 'Update'}
              </CustomButton>
            </form>
          </div>

          {/* Close on backdrop click */}
          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyMaterials;
