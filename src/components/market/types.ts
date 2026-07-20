// =====================================
// Marketplace Listing
// =====================================

export interface Listing {
  id: number;
  provider_name: string;
  owner: number;
  owner_email: string;

  title: string;
  description: string;

  category: number;
  category_name: string;

  service_type: "product" | "service";

  price: string;
  requires_payment: boolean;

  location: string;

  is_active: boolean;

  created_at: string;
}

// =====================================
// Category
// =====================================

export interface Category {
  id: number;
  name: string;
  created_at: string;
}

// =====================================
// Create Listing
// =====================================

export interface CreateListingData {
  title: string;
  description: string;
  category: number;
  service_type: "product" | "service";
  price: string;
  requires_payment: boolean;
  location: string;
}

// =====================================
// Search Bar
// =====================================

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// =====================================
// Category Filter
// =====================================

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

// =====================================
// Listing Card
// =====================================

export interface ListingCardProps {
  listing: Listing;
  onViewDetails: (listing: Listing) => void;
  onChatSeller: (listing: Listing) => void;
}

// =====================================
// Listing Details
// =====================================

export interface ListingDetailsProps {
  open: boolean;
  listingId: number | null;
  onClose: () => void;
  onChatSeller?: (listing: Listing) => void;
}

// =====================================
// Create Listing Modal
// =====================================

export interface CreateListingProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// =====================================
// My Listings
// =====================================

export interface MyListingsProps {
  open: boolean;
  onClose: () => void;
}