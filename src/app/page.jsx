import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full min-h-[calc(100vh-82px)] flex items-center justify-center px-4 md:px-8"
      >
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover z-0"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-2xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Blockchain Referral App
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            A secure sponsor-based blockchain referral system
          </p>

          <Link
            href="/register"
            className="mt-6 inline-block bg-blue-600 text-white uppercase tracking-wider font-semibold text-sm px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Registration By Sponsor
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-800">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2 text-blue-600">Secure</h4>
              <p className="text-gray-600">
                All transactions are secure using blockchain technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2 text-blue-600">Sponsor System</h4>
              <p className="text-gray-600">
                Earn referral bonuses by sponsoring new users.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2 text-blue-600">Responsive</h4>
              <p className="text-gray-600">
                Access your account from any device anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-800">About Us</h3>
          <p className="text-gray-600 text-lg md:text-xl">
            Blockchain Referral App allows users to register via sponsors and
            securely manage all data. Our system ensures transparency, security,
            and easy tracking of referral bonuses.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Join Now & Earn Rewards</h3>
          <p className="mb-6 text-lg md:text-xl">
            Register through your sponsor and start earning referral bonuses today.
          </p>
          <Link
            href="/register"
            className="inline-block bg-yellow-400 text-gray-900 uppercase tracking-wider font-semibold text-sm px-10 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
