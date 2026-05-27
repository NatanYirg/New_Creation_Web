import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-hero-congregation.jpg";
import { Navbar } from "./Navbar";
import { Clock, MapPin } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A4D]/90 via-[#24145A]/85 to-[#2F0F66]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-20">
        <h1 className="font-outfit font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[95px] leading-[1.1] tracking-tight text-white text-center mb-6 md:mb-8 animate-fade-up drop-shadow-2xl">
          New Creation International Church Ethiopia
        </h1>
        
        {/* Animated Verse */}
        <div className="mx-auto mb-8 md:mb-12 max-w-3xl opacity-0 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed font-light tracking-wide italic px-2">
            Therefore if any man be in <span className="font-semibold">Christ</span>, he is a <span className="font-semibold">New Creature</span>: old things are passed away; behold, <span className="font-semibold">all things are become new</span>.
          </p>
          <p className="text-xs sm:text-sm text-white/70 mt-3 md:mt-4 font-light tracking-widest uppercase">
            2 Corinthians 5:17
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center mt-8 md:mt-12 opacity-0 animate-fade-up px-4" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <Button 
            size="lg" 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto border-2 border-white/90 bg-white text-primary font-outfit font-semibold px-8 md:px-12 py-5 md:py-7 text-base md:text-lg rounded-md transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-2xl tracking-wide cursor-pointer"
          >
            Plan Your Visit
          </Button>
          <Button 
            size="lg"
            onClick={() => document.getElementById('teachings')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto border-2 border-white/90 bg-transparent text-white font-outfit font-semibold px-8 md:px-12 py-5 md:py-7 text-base md:text-lg rounded-md transition-all duration-300 hover:bg-white/10 hover:scale-105 tracking-wide cursor-pointer"
          >
            Watch Teaching
          </Button>
        </div>
      </div>
      
    </div>
  );
}