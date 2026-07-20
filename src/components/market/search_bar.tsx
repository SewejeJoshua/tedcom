import {
  Search,
  X,
} from "lucide-react";

import type {
  SearchBarProps,
} from "./types";


export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {

  return (

    <div className="relative w-full">


      {/* Search Icon */}

      <Search

        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        w-5
        h-5
        text-slate-400
        "

      />





      {/* Input */}


      <input


        type="text"


        value={value}


        onChange={(e)=>
          onChange(e.target.value)
        }



        placeholder="
        Search products, services, sellers or location...
        "



        className="
        w-full
        h-14
        rounded-2xl
        border
        border-slate-200
        bg-white
        text-slate-900
        placeholder:text-slate-400
        pl-12
        pr-14
        shadow-sm
        outline-none
        transition-all
        focus:border-violet-500
        focus:ring-4
        focus:ring-violet-500/10
        "


      />








      {/* Clear Button */}


      {value && (


        <button


          type="button"


          onClick={() =>
            onChange("")
          }



          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          w-8
          h-8
          rounded-full
          flex
          items-center
          justify-center
          text-slate-500
          hover:bg-slate-100
          transition
          "


        >



          <X

            className="
            w-4
            h-4
            "

          />



        </button>


      )}



    </div>


  );

}