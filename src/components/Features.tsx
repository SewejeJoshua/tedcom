import FrameFive from "../assets/images/frame5.png";
import FrameFiveOne from "../assets/images/frame51.png";
import FrameFiveTwo from "../assets/images/frame52.png";



const Features = () => {
        return (
            <div className="">
                <div className="mt-16 px-4 sm:px-6 lg:px-10 lg:mx-3 max-w-6xl mx-auto">

                    <p 
                        className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl 
                                text-[#6D38FC] leading-snug 
                                max-w-xl lg:max-w-[700px]"
                        style={{ fontFamily: "Creato Display" }}
                    >
                        Simple Ways to Receive and Share Kind Moments
                    </p>

                    <p 
                        className="mt-4 text-sm sm:text-base md:text-lg 
                                max-w-md lg:max-w-[600px] text-gray-600"
                        style={{ fontFamily: "Creato Display" }}
                    >
                        Everything you need to celebrate, connect, and express kindness all in one place.
                    </p>

                </div>


                {/* Cards */}
                <div className="mt-20 mx-auto max-w-6xl px-4 grid gap-6 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 lg:mx-8 lg:grid lg:gap-10">

    {/* Card 1 */}
    <div className="bg-[#F4F1FD] rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-3">
            <img src={FrameFive} className="h-[30px]" alt="" />
            <p className="font-bold text-sm md:text-base">
                Personal Birthday Wishes
            </p>
        </div>
        <p className="text-xs md:text-sm leading-relaxed text-gray-600">
            Be part of communities where birthdays are automatically detected and celebrated.
            Members get notified and can send anonymous wishes together.
        </p>
    </div>

    {/* Card 2 */}
    <div className="bg-[#FDF7F0] rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-3">
            <img src={FrameFiveOne} className="h-[30px]" alt="" />
            <p className="font-bold text-sm md:text-base">
                Community Celebrations
            </p>
        </div>
        <p className="text-xs md:text-sm leading-relaxed text-gray-600">
            Create a community where no birthday goes unnoticed. When it’s someone’s
            special day, members get notified and can send kind, anonymous wishes together.
        </p>
    </div>

    {/* Card 3 */}
    <div className="bg-[#F9FDF2] rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-3">
            <img src={FrameFiveTwo} className="h-[30px]" alt="" />
            <p className="font-bold text-sm md:text-base">
                Anonymous Messages
            </p>
        </div>
        <p className="text-xs md:text-sm leading-relaxed text-gray-600">
            Get honest, kind messages anytime — not just on birthdays.
            Anyone can send a message anonymously using your personal link.
        </p>
    </div>

</div>

            </div>
        )
}


export default Features;