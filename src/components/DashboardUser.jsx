"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";

export default function DashboardUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ইউজার প্রোফাইল ফেচ
  const fetchUser = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return;

      const res = await axios.get(`/api/users/${storedUser._id}`);
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ফাইল আপলোড
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("file", file);
    formData.append("visibility", "private"); // ডিফল্ট প্রাইভেট

    try {
      const res = await axios.post("/api/upload", formData);
      setMessage(res.data.message);
      fetchUser(); // ফাইল লিস্ট আপডেট
    } catch (error) {
      setMessage("File upload failed");
    }
  };

  // ফাইল visibility toggle
  const toggleVisibility = async (fileIndex) => {
    try {
      const updatedFiles = [...user.files];
      const file = updatedFiles[fileIndex];
      file.visibility = file.visibility === "private" ? "public" : "private";

      await axios.put(`/api/users/${user._id}`, { files: updatedFiles });
      setUser({ ...user, files: updatedFiles });
    } catch (error) {
      setMessage("Failed to update visibility");
    }
  };

  // ফাইল ডিলিট
  const deleteFile = async (fileIndex) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const updatedFiles = [...user.files];
      updatedFiles.splice(fileIndex, 1);

      await axios.put(`/api/users/${user._id}`, { files: updatedFiles });
      setUser({ ...user, files: updatedFiles });
    } catch (error) {
      setMessage("Failed to delete file");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return <p className="p-6">User not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        User Dashboard
      </h1>

      {message && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded">
          {message}
        </div>
      )}

      {/* প্রোফাইল কার্ড */}
      <ProfileCard user={user} />

      {/* ফাইল আপলোড */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
        <input
          type="file"
          onChange={handleFileUpload}
          className="border rounded-md p-2"
        />
      </div>

      {/* ফাইল লিস্ট */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Files</h2>
        {user.files && user.files.length > 0 ? (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Visibility</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.files.map((file, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{file.name}</td>
                  <td className="px-4 py-2 text-center">{file.visibility}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => toggleVisibility(index)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      {file.visibility === "private" ? "Make Public" : "Make Private"}
                    </button>
                    <button
                      onClick={() => deleteFile(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No files uploaded yet</p>
        )}
      </div>
    </div>
  );
}
