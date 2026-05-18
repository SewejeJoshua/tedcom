import Poly from "../assets/images/groupfour.png";

const Hero = () => {
  return (
    <div className="bg-[#6D38FC] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 lg:px-0 py-16 md:py-24 
                      grid grid-cols-1 lg:grid-cols-2 lg:mt-10
                      items-center gap-12">

        {/* Text Section */}
        <div className="text-white text-center lg:text-left">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] 
                         font-bold leading-snug 
                         max-w-xl mx-auto lg:-mx-10">
            Your Space for <br />
            Anonymous Kind <br />
            Messages & <br />
            Birthday Wishes
          </h1>

          <p className="text-sm sm:text-base md:text-lg 
                        mt-6 max-w-md mx-auto lg:-mx-10">
            Receive anonymous birthday wishes and kind messages
            through your personal link and communities, from people
            who care, shared in a safe space.
          </p>

          {/* Image inside text section (mobile only) */}
          <div className="flex justify-center my-8 lg:hidden">
            <img 
              src={Poly}
              className="w-72 sm:w-80 h-auto object-contain"
              alt="Polygon"
            />
          </div>

          <button className="bg-[#C2FF40] text-black 
                             w-full sm:w-auto 
                             px-6 py-3 
                             rounded-full 
                             font-medium
                             lg:mt-10 lg:-mx-10
                             hover:scale-105 transition">
            Get Your Message Link
          </button>
        </div>

        {/* Desktop Image */}
        <div className="hidden lg:flex justify-end">
          <img 
            src={Poly} 
            className="w-full max-w-md h-auto object-contain" 
            alt="Polygon" 
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;
