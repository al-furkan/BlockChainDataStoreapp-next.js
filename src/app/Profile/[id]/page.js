"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/users/${id}`).then((res) => setUser(res.data.user));
    }
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">{user.fullName}'s Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
        <p><strong>Nationality:</strong> {user.nationality}</p>
        <p><strong>Address:</strong> {user.address}, {user.city}, {user.state}</p>
        <p><strong>User Code:</strong> {user.userCode}</p>
        <p><strong>Sponsor Code:</strong> {user.sponsorCode}</p>
        <p><strong>Balance:</strong> {user.balance} TK</p>
      </div>
    </div>
  );
}
