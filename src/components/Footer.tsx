const Footer = () => {
  return (
    <div className="mt-24 px-6 lg:px-12">
      
      {/* Divider */}
      <div className="bg-[#CCCCCC] h-[2px] w-full"></div>

      {/* Footer Content */}
      <div className="flex flex-col sm:flex-row 
                      justify-between 
                      items-center 
                      gap-6 
                      py-8 
                      max-w-[1250px] 
                      mx-auto">

        {/* Left */}
        <p className="text-sm text-gray-600">
          © 2026
        </p>

        {/* Right Links */}
        <div className="flex flex-wrap 
                        justify-center sm:justify-end 
                        gap-6 
                        text-sm text-gray-600">
          <p className="cursor-pointer hover:text-black">Privacy Policy</p>
          <p className="cursor-pointer hover:text-black">Terms of Service</p>
          <p className="cursor-pointer hover:text-black">About</p>
          <p className="cursor-pointer hover:text-black">Contact Support</p>
        </div>

      </div>
    </div>
  );
};

export default Footer;
