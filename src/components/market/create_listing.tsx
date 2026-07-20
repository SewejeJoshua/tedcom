import { useEffect, useState } from "react";
import {
  X,
  Loader2,
  Plus,
} from "lucide-react";
import api from "../../services/api";

import type {
  Category,
  CreateListingProps,
  CreateListingData,
} from "./types";

import {
  getCategories,
} from "../../services/marketplace";


export default function CreateListing({
  open,
  onClose,
  onSuccess,
}: CreateListingProps) {


  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loadingCategories, setLoadingCategories] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");



  const [form, setForm] =
    useState<CreateListingData>({
      title: "",
      description: "",
      category: 0,
      service_type: "product",
      price: "",
      requires_payment: true,
      location: "",
    });



  useEffect(() => {

    if(open){
      loadCategories();
    }

  }, [open]);





  const loadCategories = async () => {

    try {

      setLoadingCategories(true);

      const data =
        await getCategories();

      setCategories(data);


    } catch(err){

      console.error(err);

    } finally {

      setLoadingCategories(false);

    }

  };





  const updateField = (
    key:keyof CreateListingData,
    value:any
  ) => {

    setForm((prev)=>({

      ...prev,

      [key]:value,

    }));

  };







  const handleSubmit = async(
    e:React.FormEvent
  ) => {


    e.preventDefault();


    try {


      setSubmitting(true);

      setError("");



      const token =
        localStorage.getItem("access") ||
        sessionStorage.getItem("access");




      await api.post(

        "https://tedcom-backend-system.onrender.com/api/services/listings/create/",

        form,

        {
          headers:{
            Authorization:
              `Bearer ${token}`,
          },
        }

      );



      onSuccess();

      onClose();



      setForm({

        title:"",

        description:"",

        category:0,

        service_type:"product",

        price:"",

        requires_payment:true,

        location:"",

      });



    } catch(err:any){


      console.error(err);


      setError(

        err?.response?.data?.detail ||

        "Unable to create listing."

      );


    } finally {


      setSubmitting(false);


    }


  };




  if(!open)
    return null;




  return (

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
        max-w-2xl
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



          <div>


            <h2

              className="
              text-2xl
              font-bold
              text-slate-900
              "

            >

              Create Listing

            </h2>



            <p

              className="
              text-sm
              text-slate-500
              "

            >

              Add your product or service to the marketplace.

            </p>



          </div>




          <button

            onClick={onClose}

            className="
            rounded-xl
            p-2
            text-slate-700
            hover:bg-slate-100
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






        {/* Form */}



        <form

          onSubmit={handleSubmit}

          className="
          p-6
          space-y-5
          "

        >



          {error && (

            <div

              className="
              rounded-xl
              bg-red-50
              border
              border-red-200
              text-red-600
              p-4
              text-sm
              "

            >

              {error}

            </div>

          )}






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

              value={form.title}

              onChange={(e)=>
                updateField(
                  "title",
                  e.target.value
                )
              }

              placeholder="Example: Bubu Gown"


              className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-900
              placeholder:text-slate-400
              p-3
              outline-none
              focus:ring-2
              focus:ring-violet-500
              "

              required

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

              value={form.description}


              onChange={(e)=>
                updateField(
                  "description",
                  e.target.value
                )
              }


              rows={4}


              placeholder="Describe your product or service..."


              className="
              mt-2
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              text-slate-900
              placeholder:text-slate-400
              p-3
              resize-none
              outline-none
              focus:ring-2
              focus:ring-violet-500
              "


              required


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

                Category

              </label>




              <select


                value={form.category}



                onChange={(e)=>

                  updateField(

                    "category",

                    Number(e.target.value)

                  )

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



                required



              >



                <option value={0}>

                  Select category

                </option>




                {loadingCategories ? (


                  <option>

                    Loading...

                  </option>


                ) : (


                  categories.map((cat)=>(

                    <option

                      key={cat.id}

                      value={cat.id}

                    >

                      {cat.name}

                    </option>


                  ))


                )}



              </select>



            </div>








            <div>



              <label

                className="
                text-sm
                font-medium
                text-slate-700
                "

              >

                Service Type

              </label>




              <select


                value={form.service_type}



                onChange={(e)=>

                  updateField(

                    "service_type",

                    e.target.value

                  )

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



              >


                <option value="product">

                  Product

                </option>



                <option value="service">

                  Service

                </option>



              </select>



            </div>



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


                value={form.price}



                onChange={(e)=>

                  updateField(

                    "price",

                    e.target.value

                  )

                }



                placeholder="10000"




                className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                text-slate-900
                placeholder:text-slate-400
                p-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "



                required



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



                value={form.location}



                onChange={(e)=>

                  updateField(

                    "location",

                    e.target.value

                  )

                }



                placeholder="Ikeja"




                className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                text-slate-900
                placeholder:text-slate-400
                p-3
                outline-none
                focus:ring-2
                focus:ring-violet-500
                "



                required



              />



            </div>




          </div>









          <button


            disabled={submitting}



            className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            text-white
            py-3
            font-semibold
            hover:bg-violet-700
            disabled:opacity-50
            "



          >



            {submitting ? (



              <>



                <Loader2

                  className="
                  w-5
                  h-5
                  animate-spin
                  "

                />



                Creating...



              </>



            ) : (



              <>



                <Plus

                  className="
                  w-5
                  h-5
                  "

                />



                Create Listing



              </>



            )}



          </button>





        </form>





      </div>





    </div>



  );

}