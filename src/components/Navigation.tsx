import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">

      {/* Desktop Navigation */}
      <div
        className={`hidden md:flex items-center
                    max-w-7xl mx-auto px-6 py-4
                    transition-all duration-300
                    ${
                      isScrolled
                        ? "bg-/80 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                    }`}
      >
        {/* Logo */}
        <div
          className={`text-xl font-bold transition-colors duration-300
                     ${isScrolled ? "text-black" : "text-white"}`}
          style={{ fontFamily: "Creato Display" }}
        >
          KindWishper
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-8">
          
          {/* Nav Links */}
          <div
            className={`flex gap-8 transition-colors duration-300
                       ${isScrolled ? "text-black" : "text-white"}`}
          >
            <p className="cursor-pointer hover:opacity-70 transition">
              Features
            </p>
            <p className="cursor-pointer hover:opacity-70 transition">
              How it Works
            </p>
            <p className="cursor-pointer hover:opacity-70 transition">
              Communities
            </p>
            <p className="cursor-pointer hover:opacity-70 transition">
              FAQs
            </p>
          </div>

          {/* CTA Button */}
          <button className="bg-[#C2FF40] text-black px-4 py-2 rounded-full hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden flex items-center justify-between px-6 py-4
                   transition-all duration-300
                   ${
                     isScrolled
                       ? "bg-white shadow-sm"
                       : "bg-transparent"
                   }`}
      >
        <div
          className={`text-xl font-bold transition-colors duration-300
                     ${isScrolled ? "text-black" : "text-white"}`}
          style={{ fontFamily: "Creato Display" }}
        >
          KindWishper
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={isScrolled ? "text-black" : "text-white"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-xl px-6 py-6 flex flex-col gap-6">
          <p className="cursor-pointer">Features</p>
          <p className="cursor-pointer">How it Works</p>
          <p className="cursor-pointer">Communities</p>
          <p className="cursor-pointer">FAQs</p>

          <button
            className="bg-[#C2FF40] text-black py-2 px-6 rounded-full font-bold mt-2"
            style={{ fontFamily: "Creato Display" }}
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
