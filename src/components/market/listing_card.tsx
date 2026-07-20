import {
  MapPin,
  MessageCircle,
  Eye,
  Package,
  CreditCard,
} from "lucide-react";

import type {
  ListingCardProps,
} from "./types";


export default function ListingCard({
  listing,
  onViewDetails,
  onChatSeller,
}: ListingCardProps) {

  return (

    <article

      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      "

    >



      {/* Image / Preview Area */}


      <div

        className="
        h-48
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-violet-100
        via-slate-100
        to-blue-100
        "

      >


        <div
          className="
          flex
          flex-col
          items-center
          gap-2
          "
        >


          <Package

            className="
            w-12
            h-12
            text-violet-500
            "

          />



          <span

            className="
            text-xs
            uppercase
            tracking-wider
            font-semibold
            text-slate-500
            "

          >

            {listing.category_name}

          </span>



        </div>



      </div>







      {/* Content */}



      <div

        className="
        p-5
        space-y-4
        "

      >




        {/* Title */}


        <div>


          <h3

            className="
            text-lg
            font-bold
            text-slate-900
            line-clamp-1
            "

          >

            {listing.title}

          </h3>




          <p

            className="
            text-sm
            text-slate-500
            mt-1
            line-clamp-2
            "

          >

            {listing.description}

          </p>



        </div>







        {/* Seller */}



        <div

          className="
          text-sm
          text-slate-600
          "

        >


          <span
            className="
            font-medium
            text-slate-700
            "
          >

            Seller:

          </span>{" "}


          {listing.provider_name}



        </div>









        {/* Information */}



        <div

          className="
          flex
          flex-wrap
          gap-2
          "

        >




          <span

            className="
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-violet-100
            text-violet-700
            px-3
            py-1
            text-xs
            font-semibold
            "

          >


            <CreditCard
              className="
              w-3.5
              h-3.5
              "
            />


            {listing.price}


          </span>








          <span

            className="
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-slate-100
            text-slate-600
            px-3
            py-1
            text-xs
            "

          >


            <MapPin

              className="
              w-3.5
              h-3.5
              "

            />



            {listing.location}



          </span>





        </div>









        {/* Payment */}



        {listing.requires_payment && (


          <div

            className="
            text-xs
            font-medium
            text-emerald-600
            "

          >

            Payment required


          </div>


        )}









        {/* Buttons */}



        <div

          className="
          flex
          gap-3
          pt-2
          "

        >





          <button


            onClick={() =>
              onViewDetails(listing)
            }



            className="
            flex-1
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            text-white
            py-2.5
            text-sm
            font-semibold
            hover:bg-violet-700
            transition
            "

          >


            <Eye
              className="
              w-4
              h-4
              "
            />


            Details



          </button>








          <button



            onClick={() =>
              onChatSeller(listing)
            }



            className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-slate-300
            text-slate-700
            px-4
            hover:bg-slate-100
            transition
            "



            title="Chat seller"



          >


            <MessageCircle

              className="
              w-5
              h-5
              "

            />


          </button>





        </div>





      </div>





    </article>

  );

}