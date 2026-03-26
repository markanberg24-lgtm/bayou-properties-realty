import { Link } from "react-router-dom";
import { ArrowRight, Award, Target, Handshake, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const achievements = [
  "HAR Rising Star Award Recipient",
  "Five Star Professional — Multiple Years",
  "500+ Successful Transactions",
  "Greater Houston Association of Realtors Member",
  "Texas Association of Realtors Member",
  "National Association of Realtors Member",
];

const areas = [
  "Houston Heights",
  "Midtown Houston",
  "Memorial Park",
  "Pearland",
  "La Porte",
  "Baytown",
  "Pasadena",
  "Sugar Land",
  "Katy",
  "The Woodlands",
  "League City",
  "Galveston",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B1D3A]">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt="Houston skyline"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D3A]/80 to-[#0B1D3A]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F1EB] mb-6">About Bayou Properties</h1>
            <p className="text-[#F5F1EB]/60 text-lg max-w-2xl leading-relaxed">
              Built on integrity, driven by results. We're more than a real estate company — we're your partners in finding the perfect place to call home.
            </p>
          </div>
        </div>

        {/* John Braun Bio */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="John Braun"
                  className="rounded-2xl w-full object-cover h-[500px]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#C9A84C]/20" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B1D3A] to-transparent h-32 rounded-b-2xl" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[#F5F1EB] text-2xl font-bold">John Braun</p>
                  <p className="text-[#C9A84C] text-sm font-medium">Founder & Lead Broker</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">Meet Our Leader</p>
              <h2 className="text-3xl font-bold text-[#F5F1EB] mb-6">
                A Passion for Houston Real Estate
              </h2>
              <div className="space-y-4 text-[#F5F1EB]/60 leading-relaxed">
                <p>
                  John Braun founded Bayou Properties Realty with a simple mission: to provide Houston families
                  with honest, expert guidance through one of life's biggest decisions. With over 15 years of
                  experience in the Greater Houston market, John has built a reputation as one of the area's
                  most trusted real estate professionals.
                </p>
                <p>
                  A proud Houston native, John's deep knowledge of the city's diverse neighborhoods — from the
                  tree-lined streets of the Heights to the waterfront communities along Galveston Bay — gives
                  his clients an unmatched advantage in finding their perfect home.
                </p>
                <p>
                  Recognized as a HAR Rising Star and named a Five Star Professional multiple years running,
                  John's commitment to excellence has resulted in over $120 million in career sales volume
                  and a 98% client satisfaction rate.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-4">
                  Achievements & Memberships
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {achievements.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-[#F5F1EB]/70 text-sm">
                      <Award className="w-4 h-4 text-[#C9A84C] shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#071526] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">What Drives Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EB]">Our Core Values</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Results-Driven",
                  description:
                    "We set clear goals and work tirelessly to exceed them. Every client gets our full commitment from listing to closing.",
                },
                {
                  icon: Handshake,
                  title: "Integrity First",
                  description:
                    "Transparent communication, honest valuations, and ethical practices are the foundation of everything we do.",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description:
                    "From our marketing materials to our negotiation strategy, we pursue excellence in every detail of the transaction.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-[#0B1D3A] border border-[#C9A84C]/10 rounded-xl p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-[#F5F1EB] font-semibold text-xl mb-3">{value.title}</h3>
                  <p className="text-[#F5F1EB]/50 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Served */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">Coverage Area</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F1EB]">Areas We Serve</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {areas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 bg-[#0F2847] border border-[#C9A84C]/10 rounded-lg px-4 py-3"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span className="text-[#F5F1EB]/70 text-sm">{area}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#C9A84C] to-[#A68832] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#0B1D3A] mb-4">Let's Work Together</h2>
            <p className="text-[#0B1D3A]/70 text-lg mb-8">
              Ready to start your real estate journey with a team that puts you first?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#0B1D3A] text-[#F5F1EB] px-8 py-4 rounded-lg font-semibold hover:bg-[#0F2847] transition-colors"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
