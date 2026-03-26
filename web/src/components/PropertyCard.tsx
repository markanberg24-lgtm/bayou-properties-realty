import { Link } from "react-router-dom";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  return (
    <Link
      to={`/property/${property.id}`}
      className={`group block bg-[#0F2847] rounded-xl overflow-hidden border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A84C]/5 ${
        featured ? "md:flex" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "md:w-1/2" : ""}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            featured ? "h-64 md:h-full" : "h-56"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.status === "pending" && (
            <span className="bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Pending
            </span>
          )}
          <span className="bg-[#0B1D3A]/80 backdrop-blur text-[#C9A84C] text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <p className="text-white text-2xl font-bold drop-shadow-lg">{formatPrice(property.price)}</p>
        </div>
      </div>

      <div className={`p-5 ${featured ? "md:w-1/2 md:p-8 md:flex md:flex-col md:justify-center" : ""}`}>
        <h3 className="text-[#F5F1EB] font-semibold text-lg mb-1 group-hover:text-[#C9A84C] transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-[#F5F1EB]/50 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span>
            {property.address}, {property.city}, {property.state}
          </span>
        </div>

        <div className="flex items-center gap-5 text-[#F5F1EB]/70 text-sm">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#C9A84C]/70" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#C9A84C]/70" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-[#C9A84C]/70" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {featured && (
          <p className="hidden md:block mt-4 text-[#F5F1EB]/50 text-sm leading-relaxed line-clamp-3">
            {property.description}
          </p>
        )}
      </div>
    </Link>
  );
}
