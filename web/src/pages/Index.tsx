import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Key, TrendingUp, Star, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties, services } from "@/data/properties";

const iconMap = {
  Home,
  Building2,
  Key,
  TrendingUp,
} as const;

const stats = [
  { value: "$120M+", label: "In Sales Volume" },
  { value: "500+", label: "Homes Sold" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function IndexPage() {
  const featured = properties.filter((p) => p.status === "active").slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0B1D3A]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt="Luxury home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D3A]/95 via-[#0B1D3A]/70 to-[#0B1D3A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/15 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-sm font-medium">Houston's Trusted Real Estate Partner</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F5F1EB] leading-[1.1] mb-6">
              Find Your
              <br />
              <span className="text-[#C9A84C]">Dream Home</span>
              <br />
              in Houston
            </h1>

            <p className="text-[#F5F1EB]/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Bayou Properties Realty delivers exceptional service, local expertise, and proven results for buyers and sellers across Greater Houston.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0B1D3A] px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#D4B65E] transition-all shadow-lg shadow-[#C9A84C]/20"
              >
                Browse Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#F5F1EB]/30 text-[#F5F1EB] px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/5 hover:border-[#C9A84C]/50 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-20 z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0F2847] border border-[#C9A84C]/15 rounded-xl p-6 text-center backdrop-blur"
            >
              <p className="text-[#C9A84C] text-3xl sm:text-4xl font-bold mb-1">{stat.value}</p>
              <p className="text-[#F5F1EB]/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">Featured</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EB]">Exclusive Listings</h2>
          </div>
          <Link
            to="/properties"
            className="hidden sm:flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:text-[#D4B65E] transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          <PropertyCard property={featured[0]} featured />
          <div className="grid md:grid-cols-2 gap-6">
            {featured.slice(1).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#071526] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">What We Do</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EB]">Our Services</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="bg-[#0B1D3A] border border-[#C9A84C]/10 rounded-xl p-6 hover:border-[#C9A84C]/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#F5F1EB] font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-[#F5F1EB]/50 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">Why Bayou Properties</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EB] mb-6">
              A Trusted Name in Houston Real Estate
            </h2>
            <p className="text-[#F5F1EB]/60 leading-relaxed mb-8">
              With over 15 years of experience in the Greater Houston market, Bayou Properties Realty has built a
              reputation on integrity, expertise, and exceptional client service. Led by John Braun, our team is
              dedicated to helping you navigate every step of your real estate journey.
            </p>

            <div className="space-y-5">
              {[
                { icon: Star, title: "Award-Winning Service", desc: "HAR Rising Star & Five Star Professional" },
                { icon: Shield, title: "Trusted Expertise", desc: "Deep knowledge of every Houston neighborhood" },
                { icon: Users, title: "Client-First Approach", desc: "98% client satisfaction rate over 500+ transactions" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <h4 className="text-[#F5F1EB] font-semibold mb-0.5">{item.title}</h4>
                    <p className="text-[#F5F1EB]/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold mt-8 hover:text-[#D4B65E] transition-colors"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80"
              alt="Luxury property"
              className="rounded-2xl w-full object-cover h-[500px]"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#C9A84C]/20" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#C9A84C] to-[#A68832] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1D3A] mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-[#0B1D3A]/70 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're buying, selling, or investing, our team is here to make your real estate goals a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 bg-[#0B1D3A] text-[#F5F1EB] px-8 py-4 rounded-lg font-semibold hover:bg-[#0F2847] transition-colors"
            >
              Browse Properties
            </Link>
            <a
              href="tel:2812866500"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0B1D3A]/30 text-[#0B1D3A] px-8 py-4 rounded-lg font-semibold hover:bg-[#0B1D3A]/10 transition-colors"
            >
              Call (281) 286-6500
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
