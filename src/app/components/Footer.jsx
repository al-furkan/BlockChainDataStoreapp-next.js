import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-6 text-center text-sm text-gray-600">
      <p>
        © {new Date().getFullYear()}{" "}
        <strong className="text-gray-800">Blockchain Referral App</strong>. All
        rights reserved.
      </p>
      <div className="flex justify-center space-x-4 mt-3 text-lg">
        <a href="#" className="hover:text-blue-600">
          <FaTwitter />
        </a>
        <a href="#" className="hover:text-blue-600">
          <FaFacebookF />
        </a>
        <a href="#" className="hover:text-pink-500">
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-blue-700">
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
}
