import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "buying",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#0B1D3A]">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-[#071526] border-b border-[#C9A84C]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">Get In Touch</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F1EB] mb-4">Contact Us</h1>
            <p className="text-[#F5F1EB]/60 text-lg max-w-2xl">
              We'd love to hear from you. Whether you have a question about a listing, want to schedule a
              showing, or need expert advice — our team is ready to help.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#F5F1EB] mb-6">Let's Connect</h2>
                <div className="space-y-5">
                  <a
                    href="tel:2812866500"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                      <Phone className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#F5F1EB] font-semibold group-hover:text-[#C9A84C] transition-colors">
                        (281) 286-6500
                      </p>
                      <p className="text-[#F5F1EB]/40 text-sm">Call or text anytime</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@bayoupropertiesrealty.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                      <Mail className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#F5F1EB] font-semibold group-hover:text-[#C9A84C] transition-colors">
                        info@bayouproperties.com
                      </p>
                      <p className="text-[#F5F1EB]/40 text-sm">We reply within 24 hours</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#F5F1EB] font-semibold">Houston, TX 77002</p>
                      <p className="text-[#F5F1EB]/40 text-sm">Greater Houston Area</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#F5F1EB] font-semibold">Mon — Sat, 8am — 7pm</p>
                      <p className="text-[#F5F1EB]/40 text-sm">Sundays by appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F2847] border border-[#C9A84C]/15 rounded-xl p-6">
                <p className="text-[#C9A84C] font-semibold mb-2">Quick Tip</p>
                <p className="text-[#F5F1EB]/50 text-sm leading-relaxed">
                  For the fastest response, call us directly at (281) 286-6500. For detailed inquiries about
                  specific properties, use the form and include the property address.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-[#0F2847] border border-[#C9A84C]/15 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F1EB] mb-3">Message Sent!</h3>
                  <p className="text-[#F5F1EB]/50 max-w-md mx-auto mb-6">
                    Thank you for reaching out. A member of our team will be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", phone: "", message: "", interest: "buying" });
                    }}
                    className="text-[#C9A84C] font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#0F2847] border border-[#C9A84C]/15 rounded-xl p-8"
                >
                  <h3 className="text-xl font-bold text-[#F5F1EB] mb-6">Send Us a Message</h3>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[#F5F1EB]/60 text-sm mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-[#0B1D3A] border border-[#C9A84C]/15 rounded-lg px-4 py-3 text-sm text-[#F5F1EB] placeholder:text-[#F5F1EB]/25 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F1EB]/60 text-sm mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-[#0B1D3A] border border-[#C9A84C]/15 rounded-lg px-4 py-3 text-sm text-[#F5F1EB] placeholder:text-[#F5F1EB]/25 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[#F5F1EB]/60 text-sm mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-[#0B1D3A] border border-[#C9A84C]/15 rounded-lg px-4 py-3 text-sm text-[#F5F1EB] placeholder:text-[#F5F1EB]/25 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
                        placeholder="(000) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-[#F5F1EB]/60 text-sm mb-1.5">I'm Interested In</label>
                      <select
                        name="interest"
                        value={formState.interest}
                        onChange={handleChange}
                        className="w-full bg-[#0B1D3A] border border-[#C9A84C]/15 rounded-lg px-4 py-3 text-sm text-[#F5F1EB] focus:outline-none focus:border-[#C9A84C]/40 transition-colors appearance-none"
                      >
                        <option value="buying">Buying a Home</option>
                        <option value="selling">Selling a Home</option>
                        <option value="renting">Renting</option>
                        <option value="investing">Investment Properties</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-[#F5F1EB]/60 text-sm mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-[#0B1D3A] border border-[#C9A84C]/15 rounded-lg px-4 py-3 text-sm text-[#F5F1EB] placeholder:text-[#F5F1EB]/25 focus:outline-none focus:border-[#C9A84C]/40 transition-colors resize-none"
                      placeholder="Tell us about your real estate needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0B1D3A] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#D4B65E] transition-colors w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
