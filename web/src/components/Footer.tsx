import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#071526] border-t border-[#C9A84C]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A68832] flex items-center justify-center">
                <span className="text-[#0B1D3A] font-bold text-sm">BP</span>
              </div>
              <div>
                <p className="text-[#F5F1EB] font-semibold text-lg leading-tight">Bayou Properties</p>
                <p className="text-[#C9A84C] text-[10px] uppercase tracking-[0.25em]">Realty</p>
              </div>
            </div>
            <p className="text-[#F5F1EB]/60 text-sm leading-relaxed max-w-xs">
              Houston's trusted real estate partner. Delivering exceptional service and results since 2010.
            </p>
          </div>

          <div>
            <h4 className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-5">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { label: "Properties", path: "/properties" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-[#F5F1EB]/60 hover:text-[#C9A84C] text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-5">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <a href="tel:2812866500" className="flex items-center gap-3 text-[#F5F1EB]/60 hover:text-[#C9A84C] text-sm transition-colors">
                <Phone className="w-4 h-4 text-[#C9A84C]" />
                (281) 286-6500
              </a>
              <a href="mailto:info@bayoupropertiesrealty.com" className="flex items-center gap-3 text-[#F5F1EB]/60 hover:text-[#C9A84C] text-sm transition-colors">
                <Mail className="w-4 h-4 text-[#C9A84C]" />
                info@bayoupropertiesrealty.com
              </a>
              <div className="flex items-start gap-3 text-[#F5F1EB]/60 text-sm">
                <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <span>Houston, TX 77002</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#F5F1EB]/40 text-xs">
            &copy; {new Date().getFullYear()} Bayou Properties Realty. All rights reserved.
          </p>
          <p className="text-[#F5F1EB]/40 text-xs">
            Licensed Texas Real Estate Broker
          </p>
        </div>
      </div>
    </footer>
  );
}
