import Navbar from "./components/Navebar";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  title: "Blockchain Referral App",
  description: "Sponsor-based blockchain referral system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
