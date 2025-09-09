"use client";

import { useEffect, useState } from "react";
import ProfileCard from "../../components/ProfileCard";

export default function PublicUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch public users from API
    fetch("/api/users/public")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Public Users
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-600">No public users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <ProfileCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
