"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApproval = async (id, isApproved) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, isApproved }),
    });
    fetchUsers();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-gray-50 p-6 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center hover:bg-gray-100">
              <td className="p-2 border">{u.fullName}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border text-green-600 font-semibold">৳{u.balance}</td>
              <td className="p-2 border">
                {u.isApproved ? (
                  <span className="text-green-600 font-bold">Approved</span>
                ) : (
                  <span className="text-red-500 font-bold">Pending</span>
                )}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleApproval(u._id, true)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(u._id, false)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
