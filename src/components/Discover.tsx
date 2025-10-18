import heroImage from "@/assets/home-hero-congregation.jpg";
import { FaArrowRight } from "react-icons/fa";


export function Discover() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A4D]/90 via-[#24145A]/90 to-[#2F0F66]/90"/>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mb-auto mt-16">
        <h1 className="font-['Outfit'] font-extrabold text-[96px] leading-[105%] text-white text-center mb-10 animate-fade-up">
          <span className="inline-block bg-white rounded-full px-8 py-1 font-bold text-[82px] text-[#6D28D9]">Let's </span> Get Through
          {/* <FaArrowRight className="mr-4 text-[#ffffff] w-[180%] h-4 mt-4" /> */}
          <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 10"
    className="ml-[70%] w-48 h-16 text-[#ffffff]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
  >
    <line x1="0" y1="5" x2="95" y2="5" />
    <polyline points="90,0 95,5 90,10" />
  </svg>
        </h1>
        <section className="flex flex-col lg:flex-row justify-between items-start gap-28 px-8 py-0 max-w-7xl mx-auto">
  {/* LEFT SIDE */}
  <div className="flex flex-col gap-10 w-full lg:w-1/2 text-left -ml-64 -mb-8">
    <div>
      <h2 className="text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
       Ministries
      </h2>
      <p className="w-[600px] text-[#bdbdbd] text-md leading-relaxed">
        We are committed to spreading the Gospel and transforming lives through faith, service, and community 
        engagement. faith, service, and  community engagement. We are committed to spreading the Gospel and transforming lives through faith, service, and community 
        engagement. faith, service, and  community engagement.
      </p>
    </div>

    <div>
      <h2 className="text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
        Our Vision
      </h2>
      <p className="w-[600px] text-[#d2d2d2] text-md leading-relaxed">
        To build a Christ-centered community where every believer grows in grace,
        truth, and spiritual maturity. To build a Christ-centered community where every believer grows in grace,
        truth, and spiritual maturity. To build a Christ-centered community where every believer grows in grace,
      </p>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col gap-10 w-full lg:w-1/2 text-left -mr-16">
    <div>
      <h2 className="text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
        Our Values
      </h2>
      <p className="w-[600px] text-[#d2d2d2] text-md leading-relaxed">
        Love, integrity, and faith guide everything we do in ministry and life. Love, integrity, and faith guide everything we do in ministry and life.
        Love, integrity, and faith guide everything we do in ministry and life. Love, integrity, and faith guide everything we do in ministry and life.
      </p>
    </div>

    <div>
      <h2 className="text-[45px] font-['Outfit'] font-bold text-[#ffffff] mb-2">
        Our Purpose
      </h2>
      <p className="w-[600px] text-[#d2d2d2] text-md leading-relaxed">
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