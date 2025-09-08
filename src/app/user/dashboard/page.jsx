"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaFingerprint } from "react-icons/fa";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookie.get("token");
        if (!token) return;

     const res = await axios.get("/api/users/profile", {
  headers: { Authorization: `Bearer ${token}` },
});

        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading profile...</p>;
  if (!user) return <p className="text-center mt-20 text-red-500">User not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-3xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">My Profile</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Card */}
        <div className="flex flex-col items-center w-full md:w-1/3 bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
            <img
              src={user.image || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-1">{user.fullName}</h2>
          <p className="text-gray-500 mb-2">{user.email}</p>
          <p className="text-gray-400 text-sm">User Code: {user.Usercode}</p>
          <p className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${user.visibility === "public" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
            {user.visibility.charAt(0).toUpperCase() + user.visibility.slice(1)}
          </p>
        </div>

        {/* Info Display */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <FaUser className="text-gray-400 mr-3" /> <span>{user.fullName}</span>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <FaEnvelope className="text-gray-400 mr-3" /> <span>{user.email}</span>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <FaPhone className="text-gray-400 mr-3" /> <span>{user.mobile}</span>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <FaMapMarkerAlt className="text-gray-400 mr-3" /> <span>{user.address}, {user.city}, {user.state}</span>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <FaCalendarAlt className="text-gray-400 mr-3" /> <span>{new Date(user.dob).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <FaGlobe className="text-gray-400 mr-3" /> <span>{user.nationality}</span>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <FaFingerprint className="text-gray-400 mr-3" /> <span>User Code: {user.Usercode}</span>
          </div>
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.visibility === "public" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
              {user.visibility.charAt(0).toUpperCase() + user.visibility.slice(1)}
            </span>
          </div>
        </div>
        
      </div>
       <button
        onClick={() => router.push("/user/update-profile")}
        className="mx-auto mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Update Profile
      </button>
    </div>
  );
}
