import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-hero-congregation.jpg";
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Navbar } from "./Navbar";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A4D]/85 via-[#24145A]/85 to-[#2F0F66]/85" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-20">
        <h1 className="font-['Roboto_Serif'] font-bold text-[90px] leading-[105%] text-white text-center mb-4 animate-fade-up">
          New Creation International Church Ethiopia
        </h1>
        {/* <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 font-medium">
          A Place to Grow, Worship, and Belong
        </p> */}
        <p className="mx-auto mb-12 max-w-xl text-md sm:text-md text-white/80 leading-relaxed 
             font-['Outfit'] overflow-hidden border-r-2 border-white whitespace-nowrap 
             animate-typing">
          Therefore If any man be in christ, he is a new creature: old things are passed away; behold, all things are become new.  
        </p>

          <div className="flex justify-center gap-6 mt-4 text-white">
            {[
      { href: "http://www.youtube.com/@NewCreationChurchEthiopia", icon: FaYoutube, color: "hover:text-red-500" },
      { href: "http://www.facebook.com/newcreationchurchethiopia", icon: FaFacebook, color: "hover:text-blue-500" },
      { href: "https://instagram.com", icon: FaInstagram, color: "hover:text-pink-500" },
      { href: "https://www.tiktok.com/@newcreationintchurch", icon: FaTiktok, color: "hover:text-gray-300" },
    ].map((item, index) => {
      const IconComponent = item.icon;
      return (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition ${item.color} animate-fade-up`}
          style={{ animationDelay: `${0.5 + index * 0.1}s` }}
        >
          <IconComponent size={45} />
        </a>
      );
    })}
          </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button 
            size="lg" 
            className="border-2 border-white bg-transparent text-white font-['Outfit'] font-normal px-9 py-6 text-lg rounded-full transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105"
          >
            Explore
          </Button>
          {/* <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg transition-all duration-300"
          >
            Learn More About Us
          </Button> */}
        </div>
      </div>
      
    </div>
  );
}