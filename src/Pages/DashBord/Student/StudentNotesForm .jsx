import React, { useState } from 'react';
import { FaStickyNote, FaHeading, FaEnvelope, FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const StudentNotesForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = {
      email: user.email,
      title,
      description,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/notes', note);
      if (res.data.insertedId) {
        Swal.fire('Success!', 'Note saved successfully.', 'success');
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Failed to save note.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-gradient-to-br from-[#eef2ff] to-[#dbeafe] rounded-xl shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#3d53eb] flex items-center justify-center gap-2">
        <FaStickyNote className="text-[#3d53eb]" /> Create Your Study Note
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <FaHeading className="text-green-500" /> Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full mt-1"
            placeholder="Enter note title"
          />
        </div>

        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <FaStickyNote className="text-purple-500" /> Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full mt-1"
            placeholder="Write your note description here..."
            rows="6"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full btn bg-[#3d53eb] hover:bg-[#2739c7] text-white mt-4 flex justify-center items-center gap-2"
        >
          <FaSave /> Save Note
        </button>
      </form>
    </div>
  );
};

export default StudentNotesForm;
