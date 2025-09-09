import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com/yourprofile" },
    { icon: <FaFacebookF />, url: "https://facebook.com/yourprofile" },
    { icon: <FaInstagram />, url: "https://instagram.com/yourprofile" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/yourprofile" },
    { icon: <FaYoutube />, url: "https://youtube.com/yourchannel" },
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-center mb-4">
          <span className="text-2xl font-bold tracking-wide">
            BlockChain<span className="text-yellow-400">App</span>
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-4 text-xl">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex justify-center space-x-6 mb-4 text-sm">
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
          <a href="/help" className="hover:text-yellow-300 transition">Help</a>
          <a href="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-yellow-300 transition">Terms of Service</a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-yellow-100">
          © {new Date().getFullYear()} <strong>Blockchain Referral App</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
