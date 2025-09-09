"use client";

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
      {/* Top: Avatar + Name + Email */}
      <div className="flex items-center space-x-4 mb-6">
        {user.image ? (
          <img
            src={user.image}
            alt={user.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-2xl">
            {user.fullName?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-blue-700">{user.fullName || "Unknown"}</h2>
          <p className="text-sm text-gray-600">{user.email || "No email"}</p>
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-2 text-gray-700 text-sm md:text-base">
        <p><strong>Sponsor Code:</strong> {user.sponsorCode || "-"}</p>
        <p><strong>Gender:</strong> {user.gender || "-"}</p>
        <p><strong>Date of Birth:</strong> {user.dob || "-"}</p>
        <p><strong>ID/Passport:</strong> {user.idNo || "-"}</p>
        <p><strong>Nationality:</strong> {user.nationality || "-"}</p>
        <p><strong>Mobile:</strong> {user.mobile || "-"}</p>
        <p><strong>Preferred Language:</strong> {user.preferredLanguage || "-"}</p>
        <p>
          <strong>Address:</strong> {user.address || "-"}, {user.city || "-"}, {user.state || "-"}, {user.postCode || "-"}
        </p>
        <p><strong>Balance:</strong> {user.balance != null ? `${user.balance} tk` : "0 tk"}</p>
        <p><strong>Status:</strong> {user.approved ? "Approved ✅" : "Pending ⏳"}</p>
      </div>
    </div>
  );
}
