"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import {
  User,
  Mail,
  Phone,
  Lock,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Globe,
  Fingerprint,
  Languages,
  Loader2,
} from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    Usercode: "",
    sponsorCode: "",
    sponsorName: "",
    fullName: "",
    gender: "",
    dob: "",
    nationality: "",
    mobile: "",
    email: "",
    preferredLanguage: "English",
    address: "",
    state: "",
    city: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Generate random Usercode
  const generateUserCode = () => {
    let code = "";
    const digits = "0123456789";
    for (let i = 0; i < 6; i++) {
      code += digits[Math.floor(Math.random() * digits.length)];
    }
    return code;
  };

  // Auto-generate code & check cookie for auto-login
  useEffect(() => {
    setForm((prev) => ({ ...prev, Usercode: generateUserCode() }));

    const token = Cookie.get("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      window.location.href =
        user.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (image) formData.append("image", image);

      const res = await axios.post("/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.error) {
        setMessage("❌ " + res.data.error);
      } else {
        setMessage(
          `✅ Registration successful! Your User Code: ${form.Usercode}`
        );

        // Save token & user info
        if (res.data.token && res.data.user) {
          Cookie.set("token", res.data.token, { expires: 7 });
          localStorage.setItem("user", JSON.stringify(res.data.user));

          // Redirect based on role
          window.location.href =
            res.data.user.role === "admin"
              ? "/admin/dashboard"
              : "/user/dashboard";
        }
      }
    } catch (err) {
      setMessage(
        "❌ " + (err.response?.data?.error || "Server error. Try again later.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        Register
      </h1>

      {message && (
        <p
          className={`text-center font-medium mb-4 ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Usercode */}
        <div className="relative">
          <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="Usercode"
            value={form.Usercode}
            readOnly
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sponsor Code */}
        <div className="relative">
          <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            name="sponsorCode"
            placeholder="Sponsor Code"
            value={form.sponsorCode}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sponsor Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="sponsorName"
            placeholder="Sponsor Name"
            value={form.sponsorName}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div className="relative">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* DOB */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nationality */}
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={form.nationality}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile */}
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile No"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Language */}
        <div className="relative">
          <select
            name="preferredLanguage"
            value={form.preferredLanguage}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
            <option value="Hindi">Hindi</option>
          </select>
          <Languages className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* Address */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="state"
            placeholder="State/Province"
            value={form.state}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="city"
            placeholder="City/Town"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* File Upload */}
        <div className="col-span-2 relative border-dashed border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500">
          <ImageIcon className="text-gray-400 mb-2" size={28} />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <p className="text-gray-500">Upload Profile Image</p>
          {image && (
            <p className="text-sm mt-1 text-green-600">{image.name}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
