"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ sponsorCode: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if user already logged in
    const token = Cookie.get("token");
    const role = Cookie.get("role");
    if (token && role) {
      role === "admin" ? router.push("/dashboard/admin") : router.push("/dashboard/user");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/api/auth/login", form);
      const { user } = res.data;

      // Save role to cookie (not HttpOnly)
      Cookie.set("role", user.role, { expires: 7 });

      // Redirect based on role
      if (user.role === "admin") router.push("/dashboard/admin");
      else router.push("/dashboard/user");

    } catch (err) {
      setMessage(err.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Login</h2>

      {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Sponsor Code</label>
          <input
            type="text"
            name="sponsorCode"
            value={form.sponsorCode}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
