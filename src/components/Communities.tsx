const Communities = () => {
  return (
    <div className="bg-[#6D38FC] 
                    w-full 
                    max-w-[1250px] 
                    mx-auto 
                    mt-30 
                    rounded-xl 
                    px-6 sm:px-10 lg:px-16 
                    py-10 lg:py-16">

      <p className="text-white 
                    text-2xl sm:text-4xl lg:text-6xl 
                    font-bold 
                    leading-snug 
                    max-w-[650px]">
        Turn Every Birthday into a Shared Moment
      </p>

      <p className="text-white/80 
                    text-sm sm:text-base lg:text-lg 
                    leading-relaxed 
                    mt-4 
                    max-w-[550px]">
        Create community where no birthday goes unnoticed. 
        When it's someone's special day, members get notified 
        and can send kind, anonymous wishes together.
      </p>

      <button className="bg-[#C2FF40] 
                         text-black 
                         mt-6 
                         w-full sm:w-auto 
                         px-6 py-3 
                         rounded-full 
                         font-medium
                         hover:scale-105 
                         transition">
        Create Your Community
      </button>

    </div>
  );
};

export default Communities;
