export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  description: string;
  images: string[];
  type: 'residential' | 'commercial' | 'land';
  status: 'active' | 'pending' | 'sold';
  agent: string;
  featured: boolean;
  yearBuilt: number | null;
  lotSqft: number | null;
  neighborhood: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
