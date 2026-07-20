import { useEffect, useState } from "react";
import {
  Loader2,
  Package,
  RefreshCw,
  X,
  Trash2,
  Pencil,
  Save,
} from "lucide-react";
import api from "../../services/api";

import ListingCard from "./listing_card";
import ListingDetails from "./listing_details";

import type {
  Listing,
  MyListingsProps,
} from "./types";

import {
  getMyListings,
} from "../../services/marketplace";


export default function MyListings({
  open,
  onClose,
}: MyListingsProps) {


  const [listings, setListings] =
    useState<Listing[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const [selectedListingId, setSelectedListingId] =
    useState<number | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);



  const [editingListing, setEditingListing] =
    useState<Listing | null>(null);

  const [updating, setUpdating] =
    useState(false);



  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");



  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };



  useEffect(() => {

    if (open) {
      loadListings();
    }

  }, [open]);



  const loadListings = async () => {

    try {

      setLoading(true);
      setError("");

      const data =
        await getMyListings();

      setListings(data);


    } catch (err) {

      console.error(err);

      setError(
        "Unable to load your listings."
      );

    } finally {

      setLoading(false);

    }

  };




  const deleteListing = async (
    id:number
  ) => {


    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this listing?"
      );


    if (!confirmDelete) return;


    try {

      await api.delete(
        `https://tedcom-backend-system.onrender.com/api/services/listings/${id}/delete/`,
        auth
      );


      await loadListings();


    } catch(err){

      console.error(err);

      alert(
        "Unable to delete listing."
      );

    }

  };




  const updateListing = async () => {

    if (!editingListing)
      return;


    try {

      setUpdating(true);


      await api.put(

        `https://tedcom-backend-system.onrender.com/api/services/listings/${editingListing.id}/update/`,

        {
          title:
            editingListing.title,

          description:
            editingListing.description,

          category:
            editingListing.category,

          service_type:
            editingListing.service_type,

          price:
            editingListing.price,

          requires_payment:
            editingListing.requires_payment,

          location:
            editingListing.location,
        },

        auth

      );


      setEditingListing(null);

      await loadListings();


    } catch(err){

      console.error(err);

      alert(
        "Unable to update listing."
      );


    } finally {

      setUpdating(false);

    }

  };




  const openDetails = (
    listing: Listing
  ) => {

    setSelectedListingId(
      listing.id
    );

    setDetailsOpen(true);

  };



  const closeDetails = () => {

    setSelectedListingId(null);

    setDetailsOpen(false);

  };


  if (!open) return null;



  return (
    <>

      <div
        className="
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
        "
      >


        <div
          className="
          w-full
          max-w-6xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          bg-white
          shadow-2xl
          "
        >



          {/* Header */}

          <div
            className="
            sticky
            top-0
            z-20
            flex
            items-center
            justify-between
            px-6
            py-5
            border-b
            border-slate-200
            bg-white
            "
          >


            <div className="flex items-center gap-3">


              <div
                className="
                w-12
                h-12
                rounded-xl
                bg-violet-100
                flex
                items-center
                justify-center
                "
              >

                <Package
                  className="
                  w-6
                  h-6
                  text-violet-600
                  "
                />

              </div>



              <div>


                <h2
                  className="
                  text-2xl
                  font-bold
                  text-slate-900
                  "
                >
                  My Listings
                </h2>



                <p
                  className="
                  text-sm
                  text-slate-500
                  "
                >
                  Manage your marketplace products and services.
                </p>


              </div>


            </div>




            <div className="flex gap-2">



              <button
                onClick={loadListings}
                className="
                p-2
                rounded-xl
                border
                border-slate-300
                hover:bg-slate-100
                text-slate-700
                "
              >

                <RefreshCw
                  className="
                  w-5
                  h-5
                  "
                />

              </button>




              <button
                onClick={onClose}
                className="
                p-2
                rounded-xl
                hover:bg-slate-100
                text-slate-700
                "
              >

                <X
                  className="
                  w-5
                  h-5
                  "
                />

              </button>


            </div>


          </div>
                    <div className="p-6">


            {/* Loading */}

            {loading && (

              <div
                className="
                py-20
                flex
                flex-col
                items-center
                "
              >

                <Loader2
                  className="
                  w-10
                  h-10
                  animate-spin
                  text-violet-600
                  "
                />


                <p
                  className="
                  mt-4
                  text-slate-500
                  "
                >
                  Loading your listings...
                </p>


              </div>

            )}





            {/* Error */}

            {!loading && error && (

              <div
                className="
                rounded-xl
                bg-red-50
                border
                border-red-200
                p-5
                text-red-600
                "
              >

                {error}

              </div>

            )}







            {/* Listings */}

            {!loading &&
              !error &&
              listings.length > 0 && (

              <div
                className="
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-3
                "
              >

                {listings.map((listing)=>(

                  <div
                    key={listing.id}
                    className="relative"
                  >


                    <ListingCard

                      listing={listing}

                      onViewDetails={() =>
                        openDetails(listing)
                      }

                      onChatSeller={() =>
                        console.log(
                          "Chat seller:",
                          listing.provider_name
                        )
                      }

                    />




                    <div
                      className="
                      absolute
                      top-3
                      right-3
                      flex
                      gap-2
                      "
                    >



                      <button

                        onClick={() =>
                          setEditingListing(
                            listing
                          )
                        }

                        className="
                        w-9
                        h-9
                        rounded-full
                        bg-white
                        shadow
                        flex
                        items-center
                        justify-center
                        hover:bg-violet-100
                        "

                        title="Edit listing"

                      >

                        <Pencil
                          className="
                          w-4
                          h-4
                          text-violet-600
                          "
                        />

                      </button>






                      <button

                        onClick={() =>
                          deleteListing(
                            listing.id
                          )
                        }

                        className="
                        w-9
                        h-9
                        rounded-full
                        bg-white
                        shadow
                        flex
                        items-center
                        justify-center
                        hover:bg-red-100
                        "

                        title="Delete listing"

                      >

                        <Trash2
                          className="
                          w-4
                          h-4
                          text-red-600
                          "
                        />

                      </button>



                    </div>


                  </div>


                ))}


              </div>

            )}



          </div>


        </div>


      </div>





      {/* Edit Listing Modal */}


      {editingListing && (


        <div
          className="
          fixed
          inset-0
          z-[60]
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
          "
        >


          <div
            className="
            w-full
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            rounded-3xl
            bg-white
            shadow-2xl
            "
          >




            <div
              className="
              sticky
              top-0
              z-10
              flex
              items-center
              justify-between
              px-6
              py-5
              border-b
              border-slate-200
              bg-white
              "
            >


              <h3
                className="
                text-xl
                font-bold
                text-slate-900
                "
              >
                Update Listing
              </h3>



              <button

                onClick={() =>
                  setEditingListing(null)
                }

                className="
                p-2
                rounded-xl
                hover:bg-slate-100
                text-slate-700
                "

              >

                <X
                  className="
                  w-5
                  h-5
                  "
                />

              </button>


            </div>






            <div
              className="
              p-6
              space-y-5
              "
            >




              <div>

                <label
                  className="
                  text-sm
                  font-medium
                  text-slate-700
                  "
                >
                  Title
                </label>


                <input

                  value={
                    editingListing.title
                  }

                  onChange={(e)=>
                    setEditingListing({
                      ...editingListing,
                      title:e.target.value,
                    })
                  }


                  className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  text-slate-900
                  p-3
                  outline-none
                  focus:ring-2
                  focus:ring-violet-500
                  "

                />


              </div>






              <div>

                <label
                  className="
                  text-sm
                  font-medium
                  text-slate-700
                  "
                >
                  Description
                </label>


                <textarea

                  rows={4}

                  value={
                    editingListing.description
                  }


                  onChange={(e)=>
                    setEditingListing({
                      ...editingListing,
                      description:e.target.value,
                    })
                  }


                  className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  text-slate-900
                  p-3
                  resize-none
                  outline-none
                  focus:ring-2
                  focus:ring-violet-500
                  "

                />


              </div>







              <div
                className="
                grid
                md:grid-cols-2
                gap-4
                "
              >


                <div>

                  <label
                    className="
                    text-sm
                    font-medium
                    text-slate-700
                    "
                  >
                    Price
                  </label>


                  <input

                    value={
                      editingListing.price
                    }


                    onChange={(e)=>
                      setEditingListing({
                        ...editingListing,
                        price:e.target.value,
                      })
                    }


                    className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    text-slate-900
                    p-3
                    outline-none
                    focus:ring-2
                    focus:ring-violet-500
                    "

                  />

                </div>





                <div>

                  <label
                    className="
                    text-sm
                    font-medium
                    text-slate-700
                    "
                  >
                    Location
                  </label>


                  <input

                    value={
                      editingListing.location
                    }


                    onChange={(e)=>
                      setEditingListing({
                        ...editingListing,
                        location:e.target.value,
                      })
                    }


                    className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    text-slate-900
                    p-3
                    outline-none
                    focus:ring-2
                    focus:ring-violet-500
                    "

                  />

                </div>


              </div>






              <label
                className="
                flex
                items-center
                gap-3
                text-slate-700
                "
              >

                <input

                  type="checkbox"

                  checked={
                    editingListing.requires_payment
                  }


                  onChange={(e)=>
                    setEditingListing({
                      ...editingListing,
                      requires_payment:
                        e.target.checked,
                    })
                  }


                  className="
                  w-5
                  h-5
                  "
                />


                <span className="text-sm">
                  Requires payment
                </span>


              </label>








              <button

                onClick={updateListing}

                disabled={updating}


                className="
                w-full
                py-3
                rounded-xl
                bg-violet-600
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:bg-violet-700
                disabled:opacity-50
                "

              >


                {updating ? (

                  <>
                    <Loader2
                      className="
                      w-5
                      h-5
                      animate-spin
                      "
                    />

                    Updating...

                  </>


                ) : (


                  <>
                    <Save
                      className="
                      w-5
                      h-5
                      "
                    />

                    Save Changes

                  </>


                )}


              </button>



            </div>


          </div>


        </div>


      )}






      <ListingDetails

        open={detailsOpen}

        listingId={selectedListingId}

        onClose={closeDetails}


        onChatSeller={(listing)=>{

          console.log(
            "Chat seller:",
            listing.provider_name
          );

        }}

      />


    </>
  );

}