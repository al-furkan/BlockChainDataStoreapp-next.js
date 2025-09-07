"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate random 6-digit numeric code
  const generateRandomCode = (length = 6) => {
    let code = "";
    const characters = "0123456789";
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  // Generate unique user code on page load
  useEffect(() => {
    const userCode = generateRandomCode();
    setForm((prev) => ({ ...prev, Usercode: userCode }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) formData.append("image", image);

      // Optional: Face API check
      if (image) {
        try {
          const faceRes = await axios.post("/api/face-detect", formData);
          if (!faceRes.data.success) {
            setMessage("❌ No valid face detected. Please upload a clear photo.");
            setLoading(false);
            return;
          }
        } catch (faceErr) {
          console.warn("Face API failed:", faceErr.message);
        }
      }

      const res = await axios.post("/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.error) setMessage("❌ " + res.data.error);
      else
        setMessage(
          `✅ Registration successful! Your User Code: ${form.Usercode}`
        );
    } catch (err) {
      setMessage(
        "❌ " + (err.response?.data?.error || "Server error. Try again later.")
      );
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        {...props}
        onChange={handleChange}
        className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Auto-generated User Code */}
        <InputField
          name="Usercode"
          placeholder="Your Unique Code"
          icon={Fingerprint}
          value={form.Usercode || ""}
        />

        <InputField name="sponsorCode" placeholder="Sponsor Code" icon={Fingerprint} required />
        <InputField name="sponsorName" placeholder="Sponsor Name" icon={User} required />
        <InputField name="fullName" placeholder="Full Name" icon={User} required />

        {/* Gender */}
        <div className="relative">
          <select
            name="gender"
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

        <InputField type="date" name="dob" icon={Calendar} required />
        <InputField name="nationality" placeholder="Nationality" icon={Globe} required />
        <InputField name="mobile" placeholder="Mobile No" icon={Phone} required />
        <InputField type="email" name="email" placeholder="Email" icon={Mail} required />

        {/* Preferred Language */}
        <div className="relative">
          <select
            name="preferredLanguage"
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option>English</option>
            <option>Bangla</option>
            <option>Hindi</option>
          </select>
          <Languages className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <InputField name="address" placeholder="Address" icon={MapPin} required />
        <InputField name="state" placeholder="State/Province" icon={MapPin} required />
        <InputField name="city" placeholder="City/Town" icon={MapPin} required />
        <InputField type="password" name="password" placeholder="Password" icon={Lock} required />

        {/* Image Upload */}
        <div className="col-span-2 relative border-dashed border-2 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-blue-500">
          <ImageIcon className="text-gray-400 mb-2" size={28} />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFile}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <p className="text-gray-500">Upload Profile Image</p>
          {image && <p className="text-sm mt-1 text-green-600">{image.name}</p>}
        </div>

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
