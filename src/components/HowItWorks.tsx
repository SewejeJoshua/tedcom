import RectOne from '../assets/images/rectone.png';
import RectTwo from '../assets/images/recttwo.png';
import Profile from '../assets/images/profile.png';
import Message from '../assets/images/message.png';
import Link from '../assets/images/link.png';

const HowItWorks = () => {
  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-10" style={{ fontFamily: "Creato Display" }}>
      
      {/* Part 1 */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                      text-[#6D38FC] leading-snug">
          Getting Started is Easy
        </p>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600">
          It only takes a few simple steps to start receiving kind, anonymous 
          messages from people who care.
        </p>
      </div>

      {/* Part 2 */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 
                      items-center gap-12 max-w-6xl mx-auto">

        {/* Images */}
        <div className="flex justify-center relative">
          <img 
            src={RectOne}
            className="w-50 sm:w-72 md:w-80 lg:w-72 xl:w-80 
                       h-auto object-contain"
            alt=""
          />

          <img 
            src={RectTwo}
            className="w-50 sm:w-72 md:w-80 lg:w-72 xl:w-80 
                       h-auto object-contain 
                       -ml-10 sm:-ml-16 lg:-ml-20 
                       z-10"
            alt=""
          />
        </div>

        {/* Steps */}
        <div className="space-y-10 lg:ml-20">

          {/* Step 1 */}
          <div className="flex items-start gap-5">
            <img src={Profile} className="h-12 w-12 shrink-0" alt="" />
            <div className="lg:w-[350px]">
              <p className="font-bold text-lg md:text-xl">
                Create Your Profile
              </p>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                Tell us a little about yourself and set up your KindWhisper profile.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-5">
            <img src={Link} className="h-12 w-12 shrink-0" alt="" />
            <div className="lg:w-[350px]">
              <p className="font-bold text-lg md:text-xl">
                Get Your Message Link
              </p>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                We generate a personal link you can share anywhere including 
                socials, chats, or even your bio.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-5">
            <img src={Message} className="h-12 w-12 shrink-0" alt="" />
            <div className="lg:w-[350px]">
              <p className="font-bold text-lg md:text-xl">
                Receive Anonymous Messages
              </p>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                People send kind, fun, or thoughtful messages anonymously, and 
                they appear in one place for you to enjoy.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HowItWorks;
