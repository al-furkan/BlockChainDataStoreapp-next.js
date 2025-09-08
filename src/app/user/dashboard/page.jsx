"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) router.push("/login");
    else if (JSON.parse(storedUser).role !== "user") router.push("/admin/dashboard");
    else setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome, {user.name}</p>
      {/* User data management components */}
    </div>
  );
}
