import heroImage from "@/assets/home-hero-congregation.jpg";
import { FaArrowRight } from "react-icons/fa";


export function Discover() {
    return (
        <div className="relative w-full flex items-center justify-center overflow-hidden py-12 md:py-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A4D]/90 via-[#24145A]/90 to-[#2F0F66]/90"/>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl w-full mb-auto mt-8 md:mt-16">
        <h1 className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[96px] leading-[105%] text-white text-center mb-6 md:mb-10 animate-fade-up">
          <span className="inline-block bg-white rounded-full px-3 sm:px-4 md:px-8 py-1 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[82px] text-[#6D28D9]">About </span> Us
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 10"
            className="ml-auto mr-0 md:ml-[55%] w-20 sm:w-24 md:w-32 lg:w-48 h-8 sm:h-10 md:h-12 lg:h-16 text-[#ffffff]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <line x1="0" y1="5" x2="95" y2="5" />
            <polyline points="90,0 95,5 90,10" />
          </svg>
        </h1>
        
        <section className="flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-16 lg:gap-28 px-4 md:px-8 py-0 max-w-7xl mx-auto">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6 md:gap-10 w-full lg:w-1/2 text-left">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
                Ministries
              </h2>
              <p className="w-full text-[#bdbdbd] text-sm md:text-base leading-relaxed">
                We are committed to spreading the Gospel and transforming lives through faith, service, and community 
                engagement. faith, service, and  community engagement. We are committed to spreading the Gospel and transforming lives through faith, service, and community 
                engagement. faith, service, and  community engagement.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
                Our Vision
              </h2>
              <p className="w-full text-[#d2d2d2] text-sm md:text-base leading-relaxed">
                To build a Christ-centered community where every believer grows in grace,
                truth, and spiritual maturity. To build a Christ-centered community where every believer grows in grace,
                truth, and spiritual maturity. To build a Christ-centered community where every believer grows in grace,
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6 md:gap-10 w-full lg:w-1/2 text-left">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
                Our Values
              </h2>
              <p className="w-full text-[#d2d2d2] text-sm md:text-base leading-relaxed">
                Love, integrity, and faith guide everything we do in ministry and life. Love, integrity, and faith guide everything we do in ministry and life.
                Love, integrity, and faith guide everything we do in ministry and life. Love, integrity, and faith guide everything we do in ministry and life.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
                Our Purpose
              </h2>
              <p className="w-full text-[#d2d2d2] text-sm md:text-base leading-relaxed">
                To glorify God through service, teaching, and empowering believers to live out
                their divine calling. To glorify God through service, teaching, and empowering believers to live out
                their divine calling. their divine calling. To glorify God through service, teaching, and empowering believers to
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
    );
}