import React, { useState } from "react";
import axios from "axios";

const ProfileCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    number: user.number || "Add Number",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${user.email}`, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl flex gap-6 items-center">
      {/* Left Side: Image */}
      <div className="w-40 h-40">
        <img
          src={user.image}
          alt={user.name}
          className="w-full h-full object-cover rounded-xl border"
        />
      </div>

      {/* Right Side: Info */}
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Role:</strong> {formData.role}</p>
            <p><strong>Number:</strong> {formData.number}</p>
            <p><strong>Last Login:</strong> {new Date(user.last_log_in).toLocaleString()}</p>
            <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
