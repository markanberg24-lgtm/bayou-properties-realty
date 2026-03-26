import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $350K", min: 0, max: 350000 },
  { label: "$350K - $500K", min: 350000, max: 500000 },
  { label: "$500K - $750K", min: 500000, max: 750000 },
  { label: "$750K+", min: 750000, max: Infinity },
];

const bedOptions = ["Any", "2+", "3+", "4+", "5+"];

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase());

      const range = priceRanges[selectedPrice];
      const matchesPrice = p.price >= range.min && p.price < range.max;

      const minBeds = selectedBeds === "Any" ? 0 : parseInt(selectedBeds);
      const matchesBeds = p.beds >= minBeds;

      return matchesSearch && matchesPrice && matchesBeds;
    });
  }, [searchQuery, selectedPrice, selectedBeds]);

  const hasFilters = searchQuery || selectedPrice !== 0 || selectedBeds !== "Any";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPrice(0);
    setSelectedBeds("Any");
  };

  return (
    <div className="min-h-screen bg-[#0B1D3A]">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-[#071526] border-b border-[#C9A84C]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-2">Our Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F1EB] mb-4">Properties</h1>
            <p className="text-[#F5F1EB]/60 text-lg max-w-2xl">
              Explore our handpicked selection of homes across Greater Houston. Each property is vetted by our team for quality and value.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F1EB]/40" />
              <input
                type="text"
                placeholder="Search by address, city, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F2847] border border-[#C9A84C]/15 rounded-lg pl-10 pr-4 py-3 text-sm text-[#F5F1EB] placeholder:text-[#F5F1EB]/30 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#0F2847] border border-[#C9A84C]/15 rounded-lg px-4 py-3 text-sm text-[#F5F1EB]/70 hover:border-[#C9A84C]/30 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasFilters && (
                <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              )}
            </button>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-[#C9A84C] text-sm font-medium hover:text-[#D4B65E] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 bg-[#0F2847] border border-[#C9A84C]/15 rounded-xl p-6 grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#C9A84C] text-xs uppercase tracking-widest font-semibold mb-3">
                  Price Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range, i) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPrice(i)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedPrice === i
                          ? "bg-[#C9A84C] text-[#0B1D3A]"
                          : "bg-[#0B1D3A] text-[#F5F1EB]/60 border border-[#C9A84C]/15 hover:border-[#C9A84C]/30"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#C9A84C] text-xs uppercase tracking-widest font-semibold mb-3">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {bedOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedBeds(opt)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedBeds === opt
                          ? "bg-[#C9A84C] text-[#0B1D3A]"
                          : "bg-[#0B1D3A] text-[#F5F1EB]/60 border border-[#C9A84C]/15 hover:border-[#C9A84C]/30"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-[#F5F1EB]/50 text-sm">
              {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
            </p>
          </div>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#F5F1EB]/40 text-lg mb-2">No properties match your criteria</p>
              <button onClick={clearFilters} className="text-[#C9A84C] text-sm font-medium hover:underline">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
