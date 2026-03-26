export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  features: string[];
  images: string[];
  type: "residential" | "commercial" | "rental";
  status: "active" | "pending" | "sold";
  yearBuilt: number;
  lotSize: string;
  agent: string;
}
