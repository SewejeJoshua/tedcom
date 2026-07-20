import {
  Calendar,
  MapPin,
  MessageCircle,
  Users,
  TrendingUp,
  Heart,
  ShoppingBag,
} from "lucide-react";


import {
  Link,
} from "react-router-dom";
 

import {
  useEffect,
  useMemo,
  useState,
} from "react";


import api from "../../services/api";


import {
  getCategories,
} from "../../services/marketplace";








export default function Home() {

const cardImages = {
  counsel:
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=900&auto=format&fit=crop",
 
  market:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop",

  community:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop",
};


  const first_name = useMemo(() => {


    try {


      const raw =
        localStorage.getItem("user") ||
        sessionStorage.getItem("user");



      if (!raw)
        return "User";



      const user =
        JSON.parse(raw);



      return user.first_name || "User";



    } catch {


      return "User";


    }


  }, []);













  // Marketplace Categories


  const [
    categories,
    setCategories
  ] = useState<any[]>([]);




  const [
    loadingCategories,
    setLoadingCategories
  ] = useState(false);









  // Trending Topics


  const [
    trending,
    setTrending
  ] = useState<any[]>([]);




  const [
    loadingTrending,
    setLoadingTrending
  ] = useState(false);













  useEffect(() => {


    loadCategories();


    loadTrending();



  }, []);















  const loadCategories = async () => {


    try {


      setLoadingCategories(true);



      const data =
        await getCategories();



      setCategories(data);



    } catch (err) {


      console.error(
        "Category loading failed:",
        err
      );



    } finally {


      setLoadingCategories(false);



    }


  };















  // FREE TRENDING TOPICS API
  // Reddit public JSON API - No API key


  const loadTrending = async () => {


    try {


      setLoadingTrending(true);




      const response =
        await api.get(
          "https://www.reddit.com/r/Nigeria/hot.json?limit=5"
        );






      const topics =

        response
          .data
          .data
          .children
          .map(
            (item:any)=>({

              title:
                item.data.title

            })
          );






      setTrending(
        topics
      );





    } catch (err) {


      console.error(
        "Trending loading failed:",
        err
      );




      // fallback data


      setTrending([


        {
          title:
          "Popular community discussions"
        },


        {
          title:
          "Latest Nigerian business trends"
        },


        {
          title:
          "Technology and education conversations"
        },


      ]);




    } finally {


      setLoadingTrending(false);



    }


  };







  return (

    <div

      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      via-white
      to-slate-100
      px-6
      py-8
      "

    >


      <div

        className="
        max-w-7xl
        mx-auto
        space-y-10
        "

      >




        {/* GREETING */}



        <div

          className="
          flex
          items-end
          justify-between
          flex-wrap
          gap-4
          "

        >



          <div>


            <h1

              className="
              text-3xl
              md:text-4xl
              font-extrabold
              text-gray-900
              "

            >

              Hello, {first_name}.

            </h1>


          </div>




          <div

            className="
            flex
            items-center
            gap-2
            "

          >



            <span

              className="
              px-3
              py-1
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-xs
              font-bold
              "

            >

              Mood: Calm

            </span>




            <span

              className="
              px-3
              py-1
              rounded-full
              bg-gray-200
              text-xs
              font-bold
              "

            >

              7-day streak

            </span>



          </div>




        </div>
        































































{/* TOP CARDS */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">


{/* COUNSEL */}

<div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">

  <div
    className="
    aspect-[4/3]
    bg-cover
    bg-center
    relative
    grid
    place-items-center
    "
    style={{
      backgroundImage:`url(${cardImages.counsel})`
    }}
  >

    <div className="
    absolute
    inset-0
    bg-black/35
    "/>


    <Calendar 
      className="
      relative
      z-10
      w-12
      h-12
      text-white
      "
    />

  </div>


  <div className="p-5 flex flex-col flex-1">


    <h4 className="font-bold text-sm text-gray-900">
      Counsel
    </h4>


    <p className="text-xs text-gray-500 mb-3">
      Counseling Session
    </p>



    <p className="text-sm text-gray-600 flex-1">

      Connect with experienced counselors, receive
      personalized guidance, and take meaningful steps
      toward better mental and emotional well-being.

    </p>



    <Link
      to="/counsel"
      className="
      block
      text-center
      w-full
      py-2
      bg-gray-100
      rounded-lg
      text-xs
      font-bold
      hover:bg-gray-200
      mt-5
      "
    >
      Enter room
    </Link>


  </div>

</div>






{/* MARKET */}

<div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">


<div
className="
aspect-[4/3]
bg-cover
bg-center
relative
grid
place-items-center
"
style={{
backgroundImage:`url(${cardImages.market})`
}}
>

<div className="
absolute
inset-0
bg-black/35
"/>


<ShoppingBag
className="
relative
z-10
w-12
h-12
text-white
"
/>


</div>




<div className="p-5 flex flex-col flex-1">


<h4 className="font-bold text-sm text-gray-900">
Market
</h4>



<p className="text-xs text-gray-500 mb-3">
Buy and sell products, create and offer services.
</p>



<p className="text-sm text-gray-600 flex-1">

Discover quality products and services from trusted
community members, shop with confidence, and support
local businesses.

</p>



<Link
to="/market"
className="
block
text-center
w-full
py-2
bg-gray-100
rounded-lg
text-xs
font-bold
hover:bg-gray-200
mt-5
"
>
View listing
</Link>


</div>


</div>







{/* COMMUNITY */}

<div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">


<div
className="
aspect-[4/3]
bg-cover
bg-center
relative
grid
place-items-center
"
style={{
backgroundImage:`url(${cardImages.community})`
}}
>


<div className="
absolute
inset-0
bg-black/35
"/>



<Users
className="
relative
z-10
w-12
h-12
text-white
"
/>


</div>





<div className="p-5 flex flex-col flex-1">


<h4 className="font-bold text-sm text-gray-900">
Community
</h4>



<p className="text-xs text-gray-500 mb-3">
Active learning groups
</p>



<p className="text-sm text-gray-600 flex-1">

Join learning groups, collaborate with other members,
ask questions, share ideas and grow together.

</p>




<Link
to="/learn"
className="
block
text-center
w-full
py-2
bg-gray-100
rounded-lg
text-xs
font-bold
hover:bg-gray-200
mt-5
"
>

Browse Groups

</Link>


</div>


</div>


</div>


























































        {/* SECOND ROW */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">



          {/* ACTIVITY */}


          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">


            <div className="flex items-center justify-between mb-5">


              <h2 className="font-bold text-lg text-gray-900">

                Recent activity

              </h2>


              <button className="text-xs font-bold text-emerald-600">

                See all

              </button>


            </div>





            <ul className="divide-y divide-gray-100">


              {[

                {
                  icon: MessageCircle,
                  title:"Dr. John replied",
                  sub:"2 new messages in your wellness chat",
                  time:"5m",
                  color:"purple",
                },


                {
                  icon: ShoppingBag,
                  title:"Order shipped",
                  sub:"Your Bolga basket from Northern Weavers",
                  time:"1h",
                  color:"emerald",
                },


                {
                  icon: Calendar,
                  title:"Class reminder",
                  sub:"Intro to UX live tomorrow at 4 PM",
                  time:"3h",
                  color:"amber",
                },


                {
                  icon:Users,
                  title:"Joined Lagos Founders circle",
                  sub:"12 new posts since last visit",
                  time:"1d",
                  color:"purple",
                },


              ].map((a,i)=>{


                const Icon =
                  a.icon;



                return (

                  <li

                    key={i}

                    className="
                    flex
                    items-center
                    gap-4
                    py-3.5
                    "

                  >



                    <div

                      className={`
                      w-10
                      h-10
                      rounded-xl
                      grid
                      place-items-center

                      ${
                        a.color==="purple"
                        ?"bg-purple-100 text-purple-700"
                        :
                        a.color==="emerald"
                        ?"bg-emerald-100 text-emerald-700"
                        :
                        "bg-amber-100 text-amber-700"
                      }

                      `}

                    >

                      <Icon className="w-4 h-4"/>

                    </div>





                    <div className="flex-1 min-w-0">


                      <p className="font-semibold text-sm text-gray-900 truncate">

                        {a.title}

                      </p>



                      <p className="text-xs text-gray-500 truncate">

                        {a.sub}

                      </p>


                    </div>




                    <span className="text-xs text-gray-400 font-mono">

                      {a.time}

                    </span>



                  </li>

                );


              })}



            </ul>


          </div>






          {/* COUNSELORS */}


          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">


            <div className="flex items-center justify-between mb-5">


              <h2 className="font-bold text-lg text-gray-900">

                Suggested counselors

              </h2>


              <Heart className="w-4 h-4 text-purple-600"/>


            </div>





            <ul className="space-y-4">


              {[

                {
                  name:"Dr. Sarah Okafor",
                  spec:"Anxiety & burnout",
                  online:true,
                },

                {
                  name:"Tunde Bakare",
                  spec:"Career coaching",
                  online:true,
                },

                {
                  name:"Adama Traore",
                  spec:"Family · Relationships",
                  online:false,
                },

              ].map((c)=>(


                <li

                  key={c.name}

                  className="
                  flex
                  items-center
                  gap-3
                  "

                >



                  <div className="
                    relative
                    w-11
                    h-11
                    rounded-full
                    bg-gradient-to-br
                    from-purple-500
                    to-blue-600
                    grid
                    place-items-center
                    text-white
                    font-bold
                    text-sm
                  ">

                    {c.name
                    .split(" ")
                    .map(n=>n[0])
                    .slice(0,2)
                    .join("")}



                    {c.online && (

                      <span className="
                      absolute
                      bottom-0
                      right-0
                      w-3
                      h-3
                      bg-emerald-400
                      rounded-full
                      ring-2
                      ring-white
                      "/>

                    )}


                  </div>





                  <div className="flex-1">


                    <p className="text-sm font-semibold text-gray-900">

                      {c.name}

                    </p>


                    <p className="text-xs text-gray-500">

                      {c.spec}

                    </p>


                  </div>



                  <button className="
                  text-xs
                  font-bold
                  px-3
                  py-1.5
                  rounded-lg
                  bg-gray-100
                  hover:bg-gray-200
                  ">

                    Chat

                  </button>



                </li>


              ))}



            </ul>


          </div>


        </div>
        
        {/* FOOT SECTION */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">



          {/* SERVICES */}


          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-5 shadow-sm h-fit">


            <div className="flex items-center gap-2 mb-5">


              <MapPin className="w-4 h-4 text-emerald-600"/>


              <h2 className="font-bold text-lg text-gray-900">

                Nearby services

              </h2>


            </div>






            {loadingCategories ? (


              <div className="
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-4
              ">


                {[1,2,3,4].map((i)=>(

                  <div

                    key={i}

                    className="
                    aspect-square
                    rounded-2xl
                    bg-gray-100
                    animate-pulse
                    "

                  />

                ))}


              </div>



            ) : (



              <div className="
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-4
              ">



               {categories.slice(0,8).map((category)=>(

  <Link

    key={category.id}

    to="/market"

    className="
    h-20
    rounded-xl
    border
    border-gray-200
    bg-gray-50
    flex
    items-center
    justify-center
    px-3
    text-center
    text-sm
    font-semibold
    text-gray-700
    hover:bg-emerald-50
    hover:border-emerald-300
    transition
    "

  >

    {category.name}

  </Link>

))}



              </div>


            )}




          </div>








          {/* TRENDING */}


         <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm h-fit">


            <div className="flex items-center gap-2 mb-5">


              <TrendingUp className="w-4 h-4 text-amber-500"/>


              <h2 className="font-bold text-lg text-gray-900">

                Trending

              </h2>


            </div>







            <ul className="space-y-3">


              {loadingTrending ? (


                <>

                  {[1,2,3].map((i)=>(

                    <li

                      key={i}

                      className="
                      h-5
                      rounded
                      bg-gray-100
                      animate-pulse
                      "

                    />

                  ))}


                </>



              ) : (



                trending.map((topic,index)=>(


                  <li


                    key={index}


                    className="
                    text-sm
                    text-gray-700
                    hover:text-emerald-600
                    cursor-pointer
                    transition
                    "


                  >


                    <span className="
                    text-gray-400
                    font-mono
                    mr-2
                    ">

                      #

                    </span>



                    {topic.title || topic.name}




                  </li>



                ))



              )}



            </ul>



          </div>



        </div>


 
      </div>




    </div>


  );


}