"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // সমস্ত ইউজার লোড করা
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ইউজার এপ্রুভ করা
  const approveUser = async (id) => {
    try {
      const res = await axios.post("/api/admin/approve", { userId: id });
      setMessage(res.data.message);
      fetchUsers();
    } catch (error) {
      setMessage("Approval failed");
    }
  };

  // ইউজার ডিলিট করা
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await axios.delete(`/api/users/${id}`);
      setMessage(res.data.message);
      fetchUsers();
    } catch (error) {
      setMessage("Delete failed");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

      {message && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded">
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Balance</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 text-center">{user.balance || 0} tk</td>
                  <td className="px-4 py-2 text-center">
                    {user.approved ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    {!user.approved && (
                      <button
                        onClick={() => approveUser(user._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
