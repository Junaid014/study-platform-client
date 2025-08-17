import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProfileCard = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // edit state
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const numberInputRef = useRef(null);

  // Fetch: সব ইউজার এনে লগইন ইউজারকে match করা (তোমার instruction অনুযায়ী)
  useEffect(() => {
    const load = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get("/users");
        const matched = Array.isArray(res.data)
          ? res.data.find((u) => u.email === user.email)
          : null;
        setProfile(matched || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, axios]);

  const startEdit = (focusNumber = false) => {
    setDraft({
      name: profile?.name || "",
      email: profile?.email || "",
      role: profile?.role || "student",
      number: profile?.number || "",
      image: profile?.image || "",
      created_at: profile?.created_at || "",
      last_log_in: profile?.last_log_in || "",
    });
    setIsEditing(true);
    // number ফোকাস দরকার হলে
    setTimeout(() => {
      if (focusNumber && numberInputRef.current) numberInputRef.current.focus();
    }, 0);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
  };

  const handleSave = async () => {
  if (!draft?.email) return;
  setSaving(true);
  try {
    // ✅ Change from PUT to PATCH
    await axios.patch(`/users/${draft.email}`, {
      name: draft.name,
      number: draft.number,
      image: draft.image,
    });

    // লোকাল স্টেট আপডেট
    setProfile((p) => ({
      ...p,
      name: draft.name,
      number: draft.number,
      image: draft.image,
    }));
    setIsEditing(false);
    setDraft(null);
  } catch (err) {
    console.error("Update failed:", err);
  } finally {
    setSaving(false);
  }
};


  const fmt = (d) => {
    if (!d) return "—";
    try {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return "—";
      return dt.toLocaleString();
    } catch {
      return "—";
    }
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!profile) return <p className="text-center text-red-500 py-8">User not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 sm:p-6">
      <div className="bg-[#f6f6f6] rounded-2xl shadow-md hover:shadow-xl hover:border hover:border-[#f65d4e] transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left: Image */}
          <div className="md:w-1/3 w-full flex items-center justify-center bg-white p-6">
            <div className="relative">
              <img
                src={isEditing ? (draft?.image || profile.image) : (profile.image || "")}
                alt={profile?.name || "Profile"}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-[#f65d4e]/30 shadow"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:w-2/3 w-full p-6">
            {/* Header */}
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? (draft?.name || "Unnamed") : (profile?.name || "Unnamed")}
              </h2>
              <p className="text-gray-500">{profile?.email}</p>
            </div>

            {/* Fields */}
            {!isEditing ? (
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-start sm:items-center gap-2">
                  <span className="w-32 sm:w-36 text-gray-500 font-medium">Name:</span>
                  <span className="text-gray-800">{profile?.name || "—"}</span>
                </div>

                <div className="flex items-start sm:items-center gap-2">
                  <span className="w-32 sm:w-36 text-gray-500 font-medium">Gmail:</span>
                  <span className="text-gray-800">{profile?.email || "—"}</span>
                </div>

                <div className="flex items-start sm:items-center gap-2">
                  <span className="w-32 sm:w-36 text-gray-500 font-medium">Role:</span>
                  <span className="text-gray-800 capitalize">{profile?.role || "student"}</span>
                </div>

                <div className="flex items-start sm:items-center gap-2">
                  <span className="w-32 sm:w-36 text-gray-500 font-medium">Number:</span>
                  {profile?.number ? (
                    <span className="text-gray-800">{profile.number}</span>
                  ) : (
                    <button
                      onClick={() => startEdit(true)}
                      className="text-[#f65d4e] underline underline-offset-2 hover:opacity-80"
                    >
                      Add Number
                    </button>
                  )}
                </div>

               

                <div className="flex items-start sm:items-center gap-2">
                  <span className="w-32 sm:w-36 text-gray-500 font-medium">Created At:</span>
                  <span className="text-gray-800">{fmt(profile?.created_at)}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={draft?.name || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f65d4e]"
                  />
                </div>

                {/* Number */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Number</label>
                  <input
                    ref={numberInputRef}
                    type="text"
                    name="number"
                    value={draft?.number || ""}
                    onChange={handleChange}
                    placeholder="Add Number"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f65d4e]"
                  />
                </div>

                {/* Optional: Image URL edit */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Profile Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={draft?.image || ""}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f65d4e]"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              {!isEditing ? (
                <button
                  onClick={() => startEdit(false)}
                  className="px-5 py-2 rounded-lg bg-[#f65d4e] text-white shadow hover:opacity-90"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2 rounded-lg bg-[#f65d4e] text-white shadow hover:opacity-90 disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    disabled={saving}
                    className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-200 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* নিচে চাইলে পরে অন্য কার্ড/স্ট্যাট যোগ করবে */}
    </div>
  );
};

export default ProfileCard;
