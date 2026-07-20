import { useEffect, useState } from "react";

import {
  X,
  Loader2,
  MapPin,
  User,
  Tag,
  BadgeDollarSign,
  ShoppingBag,
  Briefcase,
  Calendar,
  Mail,
  CheckCircle2,
  XCircle,
  MessageCircle,
} from "lucide-react";


import type {
  Listing,
  ListingDetailsProps,
} from "./types";


import {
  getListing,
} from "../../services/marketplace";



export default function ListingDetails({

  open,

  listingId,

  onClose,

  onChatSeller,

}: ListingDetailsProps) {



  const [listing, setListing] =
    useState<Listing | null>(null);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");





  useEffect(() => {

    if (!open || !listingId)
      return;


    loadListing();


  }, [open, listingId]);





  const loadListing = async () => {


    if (!listingId)
      return;



    try {


      setLoading(true);

      setError("");



      const data =
        await getListing(listingId);



      setListing(data);



    } catch(err){


      console.error(err);


      setError(
        "Unable to load listing."
      );



    } finally {


      setLoading(false);


    }


  };





  if(!open)
    return null;






  const formatPrice = () => {


    if(!listing)
      return "";



    if(!listing.requires_payment)
      return "Free";



    const amount =
      Number(listing.price);



    if(Number.isNaN(amount))
      return listing.price;



    return `₦${amount.toLocaleString()}`;


  };





  const formatDate = () => {


    if(!listing)
      return "";



    return new Date(
      listing.created_at
    ).toLocaleDateString(undefined, {


      year:"numeric",

      month:"long",

      day:"numeric",


    });


  };







  return (

    <div

      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      p-4
      "

    >



      <div

        className="
        relative
        w-full
        max-w-3xl
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
          z-10
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-6
          py-5
          "

        >



          <div>



            <h2

              className="
              text-2xl
              font-bold
              text-slate-900
              "

            >

              Listing Details

            </h2>




            <p

              className="
              text-sm
              text-slate-500
              mt-1
              "

            >

              Marketplace Listing

            </p>




          </div>






          <button


            onClick={onClose}



            className="
            rounded-full
            p-2
            text-slate-700
            hover:bg-slate-100
            transition
            "



          >


            <X

              className="
              w-6
              h-6
              "

            />


          </button>




        </div>








        {/* Loading */}




        {loading && (


          <div

            className="
            flex
            flex-col
            items-center
            justify-center
            py-24
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

              Loading listing...

            </p>



          </div>



        )}







        {/* Error */}





        {!loading && error && (


          <div

            className="
            p-8
            text-center
            "

          >


            <h3

              className="
              text-lg
              font-semibold
              text-red-600
              "

            >

              {error}

            </h3>




            <button


              onClick={loadListing}


              className="
              mt-5
              rounded-xl
              bg-violet-600
              px-5
              py-2
              text-white
              hover:bg-violet-700
              "

            >

              Retry


            </button>



          </div>



        )}







        {/* Content */}





        {!loading && !error && listing && (


          <div

            className="
            p-6
            space-y-6
            "

          >





            {/* Title Section */}





            <div

              className="
              flex
              flex-wrap
              items-start
              justify-between
              gap-4
              "

            >



              <div>



                <h1

                  className="
                  text-3xl
                  font-bold
                  text-slate-900
                  "

                >

                  {listing.title}


                </h1>




                <div

                  className="
                  mt-2
                  flex
                  flex-wrap
                  gap-2
                  "

                >



                  <span

                    className={`
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      listing.service_type === "product"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                    }
                    `}

                  >


                    {listing.service_type === "product" ? (

                      <>

                        <ShoppingBag className="w-3 h-3"/>

                        Product

                      </>


                    ) : (


                      <>

                        <Briefcase className="w-3 h-3"/>

                        Service

                      </>


                    )}


                  </span>
                  
                  <span

                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      listing.requires_payment
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-200 text-slate-700"
                    }
                    `}

                  >

                    {listing.requires_payment
                      ? "Paid"
                      : "Free"
                    }

                  </span>





                  <span

                    className={`
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      listing.is_active
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                    }
                    `}

                  >

                    {listing.is_active ? (

                      <>

                        <CheckCircle2
                          className="
                          w-3
                          h-3
                          "
                        />

                        Active

                      </>


                    ) : (

                      <>

                        <XCircle
                          className="
                          w-3
                          h-3
                          "
                        />

                        Inactive

                      </>


                    )}


                  </span>




                </div>



              </div>






              <div

                className="
                rounded-2xl
                bg-violet-50
                px-6
                py-4
                "

              >


                <p

                  className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-slate-500
                  "

                >

                  Price

                </p>



                <h2

                  className="
                  mt-1
                  text-3xl
                  font-bold
                  text-violet-700
                  "

                >

                  {formatPrice()}

                </h2>



              </div>



            </div>









            {/* Information Grid */}





            <div

              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
              "

            >




              {[
                {
                  icon: User,
                  title: "Provider",
                  value: listing.provider_name,
                },

                {
                  icon: Mail,
                  title: "Email",
                  value: listing.owner_email,
                },

                {
                  icon: Tag,
                  title: "Category",
                  value: listing.category_name,
                },

                {
                  icon: MapPin,
                  title: "Location",
                  value: listing.location,
                },

                {
                  icon: BadgeDollarSign,
                  title: "Price",
                  value: formatPrice(),
                },

                {
                  icon: Calendar,
                  title: "Created",
                  value: formatDate(),
                },

              ].map((item, index)=>{


                const Icon =
                  item.icon;



                return (

                  <div

                    key={index}

                    className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                    "

                  >



                    <div

                      className="
                      flex
                      items-center
                      gap-2
                      mb-2
                      "

                    >


                      <Icon

                        className="
                        w-5
                        h-5
                        text-violet-600
                        "

                      />


                      <h3

                        className="
                        font-semibold
                        text-slate-900
                        "

                      >

                        {item.title}

                      </h3>



                    </div>




                    <p

                      className="
                      text-slate-700
                      break-all
                      "

                    >

                      {item.value}

                    </p>



                  </div>


                );


              })}



            </div>









            {/* Description */}




            <div

              className="
              rounded-2xl
              border
              border-slate-200
              p-6
              "

            >



              <h3

                className="
                text-xl
                font-semibold
                text-slate-900
                mb-4
                "

              >

                Description

              </h3>




              <p

                className="
                leading-7
                whitespace-pre-wrap
                text-slate-700
                "

              >

                {listing.description}

              </p>




            </div>









            {/* Footer */}





            <div

              className="
              flex
              flex-col
              sm:flex-row
              gap-3
              pt-2
              "

            >



              <button


                onClick={() => {

                  if(listing && onChatSeller){

                    onChatSeller(listing);

                  }

                }}



                className="
                flex-1
                h-12
                rounded-xl
                bg-violet-600
                hover:bg-violet-700
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition
                "

              >


                <MessageCircle

                  className="
                  w-5
                  h-5
                  "

                />


                Chat Seller



              </button>







              <button


                onClick={onClose}



                className="
                flex-1
                h-12
                rounded-xl
                border
                border-slate-300
                text-slate-700
                hover:bg-slate-100
                font-semibold
                transition
                "

              >


                Close



              </button>





            </div>





          </div>



        )}





      </div>



    </div>


  );


}