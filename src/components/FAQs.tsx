import Download from "../assets/images/download.png";

const FAQs = () => {
  return (
    <div className="mt-20 px-6 lg:px-12" style={{ fontFamily: "Creato Display" }}>
      
      {/* Heading Section */}
      <div className="text-center max-w-4xl mx-auto">
        <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#6D38FC]">
          Frequently Asked Questions
        </p>
        <p className="py-5 text-sm sm:text-base lg:text-xl text-gray-600">
          Got questions? We've got simple answers to help you get started.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="mt-10 space-y-5 max-w-[1250px] mx-auto">
        
        {/* Item */}
        <div className="bg-[#F7F7F7] rounded-xl flex justify-between items-center px-5 py-5">
          <p className="font-semibold text-sm sm:text-base lg:text-lg">
            Do people know who sent a message?
          </p>
          <img src={Download} className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" />
        </div>

        <div className="bg-[#F7F7F7] rounded-xl flex justify-between items-center px-5 py-5">
          <p className="font-semibold text-sm sm:text-base lg:text-lg">
            Can anyone send me a message?
          </p>
          <img src={Download} className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" />
        </div>

        <div className="bg-[#F7F7F7] rounded-xl flex justify-between items-center px-5 py-5">
          <p className="font-semibold text-sm sm:text-base lg:text-lg">
            How do community birthday wishes work?
          </p>
          <img src={Download} className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" />
        </div>

        <div className="bg-[#F7F7F7] rounded-xl flex justify-between items-center px-5 py-5">
          <p className="font-semibold text-sm sm:text-base lg:text-lg">
            Can I manage or remove messages I don't like?
          </p>
          <img src={Download} className="h-[24px] w-[24px] sm:h-[30px] sm:w-[30px]" />
        </div>

      </div>
    </div>
  );
};

export default FAQs;
