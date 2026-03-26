import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bed, Bath, Maximize, Calendar, MapPin, Ruler, Phone, Mail, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const property = useMemo(() => properties.find((p) => p.id === id), [id]);

  const related = useMemo(
    () => properties.filter((p) => p.id !== id).slice(0, 2),
    [id]
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0B1D3A]">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl text-[#F5F1EB] font-bold mb-4">Property Not Found</h1>
          <Link to="/properties" className="text-[#C9A84C] hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen bg-[#0B1D3A]">
      <Navbar />

      <div className="pt-20">
        {/* Image Gallery */}
        <div className="relative h-[50vh] min-h-[400px] bg-[#071526]">
          <img
            src={property.images[activeImage]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A]/80 via-transparent to-[#0B1D3A]/30" />

          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B1D3A]/70 backdrop-blur flex items-center justify-center text-[#F5F1EB] hover:bg-[#0B1D3A]/90 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B1D3A]/70 backdrop-blur flex items-center justify-center text-[#F5F1EB] hover:bg-[#0B1D3A]/90 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeImage ? "bg-[#C9A84C] w-6" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <Link
            to="/properties"
            className="absolute top-6 left-6 flex items-center gap-2 bg-[#0B1D3A]/70 backdrop-blur text-[#F5F1EB] px-4 py-2 rounded-lg text-sm hover:bg-[#0B1D3A]/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {property.status === "pending" && (
                    <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      Sale Pending
                    </span>
                  )}
                  <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F1EB]">{property.title}</h1>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[#F5F1EB]/50 mb-4">
                <MapPin className="w-4 h-4" />
                <span>
                  {property.address}, {property.city}, {property.state} {property.zip}
                </span>
              </div>

              <p className="text-[#C9A84C] text-4xl font-bold mb-8">{formatPrice(property.price)}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: Bed, label: "Bedrooms", value: property.beds },
                  { icon: Bath, label: "Bathrooms", value: property.baths },
                  { icon: Maximize, label: "Square Feet", value: property.sqft.toLocaleString() },
                  { icon: Calendar, label: "Year Built", value: property.yearBuilt },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#0F2847] border border-[#C9A84C]/10 rounded-xl p-4 text-center"
                  >
                    <stat.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                    <p className="text-[#F5F1EB] text-xl font-bold">{stat.value}</p>
                    <p className="text-[#F5F1EB]/40 text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-[#F5F1EB] mb-4">About This Property</h2>
                <p className="text-[#F5F1EB]/60 leading-relaxed">{property.description}</p>
              </div>

              {/* Details */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-[#F5F1EB] mb-4">Property Details</h2>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    { label: "Property Type", value: property.type },
                    { label: "Status", value: property.status },
                    { label: "Lot Size", value: property.lotSize },
                    { label: "Year Built", value: property.yearBuilt },
                    { label: "Listing Agent", value: property.agent },
                    { label: "Location", value: `${property.city}, ${property.state}` },
                  ].map((detail) => (
                    <div key={detail.label} className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-[#F5F1EB]/40 text-sm">{detail.label}</span>
                      <span className="text-[#F5F1EB] text-sm font-medium capitalize">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-[#F5F1EB] mb-4">Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#C9A84C]/15 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[#C9A84C]" />
                      </div>
                      <span className="text-[#F5F1EB]/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-[#0F2847] border border-[#C9A84C]/15 rounded-xl p-6">
                  <h3 className="text-[#F5F1EB] font-semibold text-lg mb-1">Contact Agent</h3>
                  <p className="text-[#C9A84C] font-medium mb-4">{property.agent}</p>
                  <p className="text-[#F5F1EB]/50 text-sm mb-6">
                    Interested in this property? Get in touch for a showing or more information.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:2812866500"
                      className="flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0B1D3A] px-6 py-3 rounded-lg font-semibold hover:bg-[#D4B65E] transition-colors w-full"
                    >
                      <Phone className="w-4 h-4" />
                      Call Agent
                    </a>
                    <a
                      href="mailto:info@bayouproperties.com"
                      className="flex items-center justify-center gap-2 border border-[#C9A84C]/30 text-[#C9A84C] px-6 py-3 rounded-lg font-semibold hover:bg-[#C9A84C]/10 transition-colors w-full"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </a>
                  </div>
                </div>

                <div className="bg-[#0F2847] border border-[#C9A84C]/15 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler className="w-4 h-4 text-[#C9A84C]" />
                    <h3 className="text-[#F5F1EB] font-semibold">Lot Information</h3>
                  </div>
                  <p className="text-[#F5F1EB]/60 text-sm">
                    Lot Size: <span className="text-[#F5F1EB] font-medium">{property.lotSize}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-white/5">
              <h2 className="text-2xl font-bold text-[#F5F1EB] mb-8">You May Also Like</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
