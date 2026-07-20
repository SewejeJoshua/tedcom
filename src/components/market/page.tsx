import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  PackagePlus,
  Package,
} from "lucide-react"; 

import SearchBar from "./search_bar";
import CategoryFilter from "./category_filter";
import ListingCard from "./listing_card";
import ListingDetails from "./listing_details";
import CreateListing from "./create_listing";
import MyListings from "./my_listings"; 


import type {
  Listing,
  Category,
} from "./types";

import {
  getCategories,
  getListings,
  getListingsByCategory,
} from "../../services/marketplace";

export default function MarketplacePage() {

  
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);

  const [selectedListingId, setSelectedListingId] =
    useState<number | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);

  const [myListingsOpen, setMyListingsOpen] =
    useState(false);

  useEffect(() => {
    loadMarketplace();
  }, []);

  useEffect(() => {
    loadListings();
  }, [selectedCategory]);

  const loadMarketplace = async () => {
    try {
      setLoading(true);
      setError("");

      const [listingData, categoryData] =
        await Promise.all([
          getListings(),
          getCategories(),
        ]);

      setListings(listingData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load marketplace."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadListings = async () => {
    try {
      setLoading(true);

      if (selectedCategory === null) {
        const data = await getListings();
        setListings(data);
      } else {
        const data =
          await getListingsByCategory(
            selectedCategory
          );

        setListings(data);
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load listings."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    if (!keyword) {
      return listings;
    }

    return listings.filter((listing) => {
      return (
        listing.title
          .toLowerCase()
          .includes(keyword) ||
        listing.provider_name
          .toLowerCase()
          .includes(keyword) ||
        listing.location
          .toLowerCase()
          .includes(keyword) ||
        listing.category_name
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [listings, search]);

  const openDetails = (
    listing: Listing
  ) => {
    setSelectedListingId(listing.id);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setSelectedListingId(null);
    setDetailsOpen(false);
  };

  const refreshMarketplace =
    async () => {
      await loadListings();
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

       
              {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
            
          <h1 className="text-4xl font-bold">
            Marketplace
            
          </h1>
            
          <p className="mt-2 text-slate-500">
            Discover products and services shared by the TEDCOM community.
          </p>

          
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 transition"
          >
            <PackagePlus className="w-5 h-5" />
            Create Listing
          </button>

          <button
            onClick={() => setMyListingsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-3 font-semibold hover:bg-slate-100   transition"
          >
            <Package className="w-5 h-5" />
            My Listings
          </button>

        </div>

      </div>

      {/* Search */}

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {/* Categories */}

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Loading */}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">

          <Loader2 className="w-12 h-12 animate-spin text-violet-600" />

          <p className="mt-5 text-slate-500">
            Loading marketplace...
          </p>

        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20 p-8 text-center">

          <h2 className="text-xl font-bold text-red-600">
            {error}
          </h2>

          <button
            onClick={loadMarketplace}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition"
          >
            Try Again
          </button>

        </div>
      )}

      {/* Empty */}

      {!loading &&
        !error &&
        filteredListings.length === 0 && (
          <div className="py-24 flex flex-col items-center">

            <Package className="w-20 h-20 text-slate-300 dark:text-slate-700" />

            <h2 className="mt-6 text-2xl font-bold">
              No Listings Found
            </h2>

            <p className="mt-2 max-w-lg text-center text-slate-500">
              There are currently no listings that match your search or
              selected category.
            </p>

          </div>
        )}
              {/* Listings */}

      {!loading && !error && filteredListings.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onViewDetails={openDetails}
              onChatSeller={(listing) => {
                // TODO:
                // Replace this with your TEDCOM chat navigation.
                console.log("Chat seller:", listing);
              }}
            />
          ))}
        </div>
      )}

      {/* Listing Details */}

      <ListingDetails
        open={detailsOpen}
        listingId={selectedListingId}
        onClose={closeDetails}
        onChatSeller={(listing) => {
          // TODO:
          // Navigate to your messaging page.
          console.log("Chat seller:", listing);
        }}
      />

      {/* Create Listing */}

      <CreateListing
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={refreshMarketplace}
      />

      {/* My Listings */}

      <MyListings
        open={myListingsOpen}
        onClose={() => setMyListingsOpen(false)}
      />

 
    </div>
  );
  
}