import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Properties", path: "/properties" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1D3A]/95 backdrop-blur-md border-b border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A68832] flex items-center justify-center">
              <span className="text-[#0B1D3A] font-bold text-sm tracking-tight">BP</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#F5F1EB] font-semibold text-lg leading-tight tracking-wide group-hover:text-[#C9A84C] transition-colors">
                Bayou Properties
              </span>
              <span className="text-[#C9A84C] text-[10px] uppercase tracking-[0.25em] font-medium">
                Realty
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? "text-[#C9A84C] bg-[#C9A84C]/10"
                    : "text-[#F5F1EB]/80 hover:text-[#C9A84C] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:2812866500"
              className="ml-4 flex items-center gap-2 bg-[#C9A84C] text-[#0B1D3A] px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#D4B65E] transition-colors"
            >
              <Phone className="w-4 h-4" />
              (281) 286-6500
            </a>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#F5F1EB] p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0B1D3A] border-t border-[#C9A84C]/20">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? "text-[#C9A84C] bg-[#C9A84C]/10"
                    : "text-[#F5F1EB]/80 hover:text-[#C9A84C] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:2812866500"
              className="flex items-center gap-2 bg-[#C9A84C] text-[#0B1D3A] px-4 py-3 rounded-lg text-sm font-semibold mt-3"
            >
              <Phone className="w-4 h-4" />
              (281) 286-6500
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
