"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Loader2, Check, X, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookie.get("token");

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUsers();
  }, [token]);

  // approve/unapprove user
  const toggleApproval = async (id, currentStatus) => {
    try {
      await axios.patch(
        "/api/admin/users",
        { userId: id, isApproved: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isApproved: !currentStatus } : u
        )
      );
    } catch (err) {
      console.error("Error updating approval:", err);
    }
  };

  // delete user
  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId: id },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-soft">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Admin Dashboard
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Balance</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{user.fullName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.balance} Tk</td>
                <td className="px-4 py-2">
                  {user.isApproved ? (
                    <span className="text-green-600 font-medium">Approved</span>
                  ) : (
                    <span className="text-red-600 font-medium">Pending</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() =>
                      toggleApproval(user._id, user.isApproved)
                    }
                    className={`p-2 rounded-lg text-white ${
                      user.isApproved ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {user.isApproved ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="p-2 rounded-lg bg-gray-700 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
