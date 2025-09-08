"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Cookie from "js-cookie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = Cookie.get("token");
    const userRole = Cookie.get("role");
    if (token && userRole) setRole(userRole);
  }, []);

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("role");
    setRole(null);
    window.location.href = "/login";
  };

  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com/yourprofile" },
    { icon: <FaFacebookF />, url: "https://facebook.com/yourprofile" },
    { icon: <FaInstagram />, url: "https://instagram.com/yourprofile" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/yourprofile" },
    { icon: <FaYoutube />, url: "https://youtube.com/yourchannel" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold tracking-wide">
            BlockChain<span className="text-yellow-400">App</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-yellow-300 transition">Home</Link>

            {!role && (
              <>
                <Link href="/register" className="hover:text-yellow-300 transition">Register</Link>
                <Link href="/login" className="hover:text-yellow-300 transition">Login</Link>
              </>
            )}

            {role === "admin" && (
              <Link href="/admin/dashboard" className="hover:text-yellow-300 transition">Admin Dashboard</Link>
            )}
            {role === "user" && (
              <Link href="/user/dashboard" className="hover:text-yellow-300 transition">User Dashboard</Link>
            )}

            {role && (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition"
              >
                Logout
              </button>
            )}

            <div className="flex items-center space-x-4 ml-6 text-lg">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <Link
              href="/help"
              className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Help
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800 space-y-1 pb-3">
          <Link href="/" className="block px-4 py-2 hover:bg-blue-700">Home</Link>

          {!role && (
            <>
              <Link href="/register" className="block px-4 py-2 hover:bg-blue-700">Register</Link>
              <Link href="/login" className="block px-4 py-2 hover:bg-blue-700">Login</Link>
            </>
          )}

          {role === "admin" && <Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-blue-700">Admin Dashboard</Link>}
          {role === "user" && <Link href="/user/dashboard" className="block px-4 py-2 hover:bg-blue-700">User Dashboard</Link>}

          {role && <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-600">Logout</button>}

          <div className="flex justify-center space-x-4 mt-3 text-lg text-yellow-300">
            {socialLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">{link.icon}</a>
            ))}
          </div>

          <div className="px-4 mt-3">
            <Link
              href="/help"
              className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Help
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
