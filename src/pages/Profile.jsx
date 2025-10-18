import React, { useEffect, useState } from "react";
import axios from "axios";
const ModernButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
  >
    {children}
  </button>
);
const aps = process.env.REACT_APP_API_URL;
// Edit Profile Modal
function EditProfileModal({ profile, onClose, onSave }) {
  const [username, setUsername] = useState(profile?.username || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(profile?.photo || "");

  // Password change
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStep, setPasswordStep] = useState("askOld"); // askOld | askOTP | askNew

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("username", username);
    if (photoFile) formData.append("photo", photoFile);

    if (changePassword) {
      if (passwordStep === "askNew") {
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
      } else if (passwordStep === "askOTP") {
        formData.append("otp", otp);
      }
    }

    try {
      const res = await axios.put(`${aps}/api/users/profile/${profile.email}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSave(res.data);
      onClose();
    } catch (err) {
      console.error("Profile update failed:", err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

        {/* Username */}
        <label className="block text-gray-600 text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Photo Upload */}
        <label className="block text-gray-600 text-sm font-medium mb-1">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-2"
        />
        {photoPreview && (
          <div className="flex justify-center mb-4">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow"
            />
          </div>
        )}

        {/* Password change toggle */}
        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={changePassword}
              onChange={() => {
                setChangePassword(!changePassword);
                setPasswordStep("askOld");
                setOldPassword("");
                setOtp("");
                setNewPassword("");
              }}
            />
            Change Password
          </label>
        </div>

        {changePassword && (
          <div className="space-y-3">
            {passwordStep === "askOld" && (
              <>
                <label className="block text-gray-600 text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
                  onClick={() => {
                    if (!oldPassword) return alert("Enter current password");
                    // TODO: verify old password via API. If invalid, switch to OTP step
                    setPasswordStep("askNew");
                  }}
                >
                  Next
                </button>
              </>
            )}

            {passwordStep === "askOTP" && (
              <>
                <label className="block text-gray-600 text-sm font-medium">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter OTP sent to email"
                />
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
                  onClick={() => setPasswordStep("askNew")}
                >
                  Verify OTP
                </button>
              </>
            )}

            {passwordStep === "askNew" && (
              <>
                <label className="block text-gray-600 text-sm font-medium">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter new password"
                />
              </>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Profile Component
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${aps}/api/users/profile/${user.email}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user?.email]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user)
    return (
      <p className="text-center mt-10 text-gray-600">
        Please <a href="/login" className="text-blue-500 hover:underline">log in</a> to view your profile.
      </p>
    );

  return (
    <div className="flex justify-center px-4 py-12 bg-gray-100 h-auto">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
            alt="Cover"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center">
            {profile?.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center text-gray-500 text-6xl font-bold shadow-lg">
                {profile?.username ? profile.username[0] : "?"}
              </div>
            )}
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">
              {profile?.username || "Username not found"}
            </h2>
            <p className="mt-1 text-md text-gray-500">{profile?.email}</p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Account Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-600">Username</p>
                  <p className="text-gray-800 font-medium">{profile?.username}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Email Address</p>
                  <p className="text-gray-800 font-medium">{profile?.email}</p>
                </div>
              </div>
            </div>

            <ModernButton onClick={() => setShowEdit(true)}>Edit Profile</ModernButton>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => setProfile(updated)}
        />
      )}
    </div>
  );
}
