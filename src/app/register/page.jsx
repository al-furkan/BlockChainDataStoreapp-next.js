"use client";

import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaIdCard, FaGlobe, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    sponsorCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    refSponsorCode: "",
    refSponsorName: "",
    fullName: "",
    gender: "",
    dob: "",
    idNo: "",
    nationality: "",
    mobile: "",
    email: "",
    preferredLanguage: "",
    address: "",
    state: "",
    city: "",
    postCode: "",
    image: null,
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      const res = await axios.post("/api/auth/register", formData);
      setMessage(res.data.message || "Registration successful!");
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

  return (
    <div className="max-w-xl mx-auto bg-white shadow-2xl p-8 rounded-3xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">User Registration</h2>

      {message && <p className="text-center mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Auto-generated Sponsor Code */}
        <div className="relative">
          <label>Sponsor Code</label>
          <input type="text" name="sponsorCode" value={form.sponsorCode} readOnly className="w-full border rounded-md p-2 bg-gray-100"/>
        </div>

        {/* Reference Sponsor Code */}
        <div className="relative">
          <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" name="refSponsorCode" value={form.refSponsorCode} onChange={handleChange} placeholder="Reference Sponsor Code" className={inputClass}/>
        </div>

        {/* Reference Sponsor Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" name="refSponsorName" value={form.refSponsorName} onChange={handleChange} placeholder="Reference Sponsor Name" className={inputClass}/>
        </div>

        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className={inputClass} required/>
        </div>

        {/* Gender & DOB */}
        <div className="flex gap-4">
          <select name="gender" value={form.gender} onChange={handleChange} className={`${inputClass} w-1/2`} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <div className="relative w-1/2">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} required/>
          </div>
        </div>

        {/* ID Number */}
        <div className="relative">
          <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" name="idNo" value={form.idNo} onChange={handleChange} placeholder="ID/Passport No" className={inputClass} required/>
        </div>

        {/* Nationality & Preferred Language */}
        <div className="flex gap-4">
          <div className="relative w-1/2">
            <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <select name="nationality" value={form.nationality} onChange={handleChange} className={inputClass}>
              <option value="">Select Nationality</option>
              <option>Bangladeshi</option>
              <option>Indian</option>
              <option>Other</option>
            </select>
          </div>
          <select name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} className={`${inputClass} w-1/2`}>
            <option value="">Preferred Language</option>
            <option>English</option>
            <option>Bangla</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Contact Info */}
        <div className="flex gap-4">
          <div className="relative w-1/2">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} required/>
          </div>
          <div className="relative w-1/2">
            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input type="text" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile No" className={inputClass} required/>
          </div>
        </div>

        {/* Address */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" className={inputClass}/>
        </div>

        {/* State & City */}
        <div className="flex gap-4">
          <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State/Province" className={`${inputClass} w-1/2`}/>
          <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City/Town" className={`${inputClass} w-1/2`}/>
        </div>

        {/* Post Code & Image */}
        <div className="flex gap-4">
          <input type="text" name="postCode" value={form.postCode} onChange={handleChange} placeholder="Post Code" className={`${inputClass} w-1/2`}/>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className={`${inputClass} w-1/2`}/>
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className={inputClass} required/>
        </div>

        {/* Submit */}
        <button className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-600 transition">
          Register
        </button>
      </form>
    </div>
  );
}
