import { Grid2x2 } from "lucide-react";

import type {
  CategoryFilterProps,
} from "./types";


export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {


  return (

    <div

      className="
      flex
      items-center
      gap-3
      overflow-x-auto
      pb-2
      scrollbar-hide
      "

    >



      {/* All Categories */}



      <button


        onClick={() =>
          onSelectCategory(null)
        }



        className={`

        flex
        shrink-0
        items-center
        gap-2
        rounded-full
        px-4
        py-2
        text-sm
        font-medium
        transition-all

        ${
          selectedCategory === null

          ? 
          "bg-violet-600 text-white shadow"

          :

          "bg-slate-100 text-slate-700 hover:bg-slate-200"

        }

        `}



      >


        <Grid2x2

          className="
          h-4
          w-4
          "

        />


        All


      </button>








      {/* Dynamic Categories */}





      {categories.map((category)=>{


        const active =
          selectedCategory === category.id;



        return (


          <button



            key={category.id}



            onClick={() =>
              onSelectCategory(category.id)
            }



            className={`

            shrink-0
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            transition-all

            ${
              active

              ?

              "bg-violet-600 text-white shadow"

              :

              "bg-slate-100 text-slate-700 hover:bg-slate-200"

            }

            `}



          >


            {category.name}



          </button>


        );


      })}





    </div>


  );

}