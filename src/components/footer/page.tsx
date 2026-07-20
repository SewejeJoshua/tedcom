import {
  Heart,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";


export default function Footer() {


  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };



  return (

    <footer
      className="
      w-full
      bg-slate-900
      text-slate-300
      "
    >


      {/* Main Footer */}

      <div
        className="
        w-full
        max-w-7xl
        mx-auto
        px-6
        py-12
        grid
        grid-cols-1
        md:grid-cols-4
        gap-10
        "
      >


        {/* Brand */}

        <div>

          <h2
            className="
            text-2xl
            font-extrabold
            text-white
            "
          >
            Tedcom
          </h2>


          <p
            className="
            mt-4
            text-sm
            leading-6
            text-slate-400
            "
          >
            A community-driven platform connecting people,
            services, learning, and opportunities.
          </p>



          <div
            className="
            flex
            items-center
            gap-2
            mt-5
            text-sm
            "
          >

            <Heart
              className="
              w-4
              h-4
              text-emerald-400
              "
            />

            Built for communities

          </div>


        </div>







        {/* Explore */}

        <div>


          <h3
            className="
            text-white
            font-bold
            mb-4
            "
          >
            Explore
          </h3>



          <ul
            className="
            space-y-3
            text-sm
            "
          >

            <li>

              <Link
                to="/"
                className="
                hover:text-white
                transition
                "
              >
                Home
              </Link>

            </li>



            <li>

              <Link
                to="/market"
                className="
                hover:text-white
                transition
                "
              >
                Marketplace
              </Link>

            </li>




            <li>

              <Link
                to="/learn"
                className="
                hover:text-white
                transition
                "
              >
                Community
              </Link>

            </li>




            <li>

              <Link
                to="/counsel"
                className="
                hover:text-white
                transition
                "
              >
                Counseling
              </Link>

            </li>


          </ul>


        </div>








        {/* Contact */}

        <div>


          <h3
            className="
            text-white
            font-bold
            mb-4
            "
          >
            Contact
          </h3>




          <ul
            className="
            space-y-4
            text-sm
            "
          >


            <li
              className="
              flex
              items-center
              gap-3
              "
            >

              <Mail
                className="
                w-4
                h-4
                text-emerald-400
                "
              />

              support@tedcomm.com

            </li>




            <li
              className="
              flex
              items-center
              gap-3
              "
            >

              <Phone
                className="
                w-4
                h-4
                text-emerald-400
                "
              />

              +234 000 000 0000

            </li>




            <li
              className="
              flex
              items-center
              gap-3
              "
            >

              <MapPin
                className="
                w-4
                h-4
                text-emerald-400
                "
              />

              Nigeria

            </li>


          </ul>


        </div>








        {/* Join */}

        <div>


          <h3
            className="
            text-white
            font-bold
            mb-4
            "
          >
            Join Tedcom
          </h3>



          <p
            className="
            text-sm
            text-slate-400
            leading-6
            "
          >
            Discover opportunities,
            connect with people,
            and grow together.
          </p>




          <Link

            to="/market"

            className="
            inline-flex
            mt-5
            px-5
            py-2.5
            rounded-xl
            bg-emerald-500
            text-white
            font-semibold
            text-sm
            hover:bg-emerald-600
            transition
            "

          >

            Get Started

          </Link>


        </div>


      </div>








      {/* Bottom */}

      <div
        className="
        w-full
        border-t
        border-slate-800
        "
      >


        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          py-5
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
          text-sm
          text-slate-500
          "
        >


          <p>

            © {new Date().getFullYear()}
            {" "}
            Tedcomm.
            All rights reserved.

          </p>




          <button

            onClick={scrollToTop}

            className="
            flex
            items-center
            gap-2
            hover:text-white
            transition
            "

          >

            Back to top

            <ArrowUp
              className="
              w-4
              h-4
              "
            />

          </button>


        </div>


      </div>


    </footer>

  );

}