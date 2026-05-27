import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import bgimg from "@/assets/home-hero-congregation.jpg"
import servicebg from "@/assets/servicebg.jpg"
import { Link } from "react-router-dom";

export function Services() {
  return (
    <div id="services" className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <Section background="default" className="flex flex-col items-start justify-between w-full px-4 md:px-8 lg:px-20 py-12 md:py-16 gap-10">

        {/* Header Section */}
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 h-[120px] sm:h-[150px] md:h-[200px] flex flex-col items-center justify-center overflow-hidden">
          {/* Background Image */}
          <img
            src={bgimg}
            alt="Services Background"
            className="absolute inset-0 w-full h-full object-cover"
          /> 

          {/* Semi-transparent Rectangle Overlay */}
          <div className="absolute inset-0 bg-[#2B1F66]/[0.92]" />

          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Text Layer */}
            <h1 className="relative z-10 font-outfit font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl text-white tracking-tight text-center">
              NCIC SERVICES
            </h1>

            <div className="absolute bottom-[10px] w-[200px] sm:w-[280px] md:w-[700px] lg:w-[900px] h-[30px] sm:h-[40px] md:h-[60px] bg-[#6D28D9] -z-10" />
          </div>
        </div>

        <div className="container mx-auto flex flex-col lg:flex-row items-start justify-between w-full mt-12 md:mt-20 gap-8 md:gap-12">
          
          {/* Left side */}
          <div className="flex flex-col justify-center items-start space-y-4 md:space-y-6 lg:pr-12 w-full lg:w-1/3">
            {/* Small Title */}
            <div className="flex items-center gap-3">
              <h3 className="font-outfit font-semibold text-sm md:text-base lg:text-lg text-[#0076C0]">
                Our Main Services
              </h3>
              <div className="h-[1px] w-[50px] md:w-[70px] bg-[#0076C0]" />
            </div>

            {/* Main Heading */}
            <h2 className="font-outfit font-bold text-3xl md:text-4xl lg:text-5xl xl:text-7xl leading-tight text-[#000000]/[0.83]">
              Become A <br />
              Part Of <br />
              Something <br />
              Great
            </h2>

            {/* Circles (Slider Indicators) */}
            <div className="flex gap-3 pt-4">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-black rounded-full"></div>
            </div>
          </div>
    
          {/* RIGHT SIDE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full lg:w-2/3">
            {[
              { num: 1, day: "Sunday", title: "Sunday Service", time: "Morning: 10:00AM - 1:00PM" },
              { num: 2, day: "Tuesday", title: "Teaching Service", time: "Evening: 04:00PM - 08:00PM" },
              { num: 3, day: "Wednesday", title: "Healing & Deliverance", time: "Evening: 04:00PM - 08:00PM" },
              { num: 4, day: "Saturday", title: "Youth Service", time: "Afternoon: 02:00PM - 04:00PM" }
            ].map((service) => (
              <div
                key={service.num}
                className="relative w-full max-w-[280px] mx-auto h-[380px] bg-white shadow-xl rounded-lg flex flex-col items-center pt-[90px] pb-6 px-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* CIRCLES */}
                <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 flex items-center justify-center">
                  {/* Outer White Circle */}
                  <div className="relative shadow-lg flex items-center justify-center w-[140px] h-[140px] bg-white rounded-full">
                    {/* Middle Blue Transparent Circle */}
                    <div className="absolute w-[100px] h-[100px] bg-[#0076C0]/[0.40] rounded-full shadow-[0px_20px_15px_10px_rgba(79,161,211,0.13)]"></div>

                    {/* Inner Gradient Circle */}
                    <div className="absolute w-[92px] h-[92px] rounded-full bg-gradient-to-b from-[#0076C0]/[0.69] to-[#AED9F4]/[0.69] shadow-[0px_20px_15px_10px_rgba(79,161,211,0.31)] flex items-center justify-center">
                      <span className="font-outfit font-bold text-white text-3xl">
                        {service.num.toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="mt-4 text-left w-full">
                  <h3 className="font-outfit font-bold text-xl md:text-2xl lg:text-3xl leading-tight text-[#000000] mb-1">
                    {service.title}
                  </h3>
                  
                  <p className="font-outfit font-semibold text-sm md:text-base text-[#0076C0] mb-3">
                    Every {service.day}
                  </p>

                  {/* Time Info */}
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#0076C0] flex-shrink-0" />
                    <p className="font-outfit text-xs md:text-sm text-[#000000]">
                      {service.time}
                    </p>
                  </div>

                  {/* Location Info */}
                  <div className="flex items-center justify-start gap-2 mb-6">
                    <MapPin className="w-4 h-4 text-[#0076C0] flex-shrink-0" />
                    <p className="font-outfit text-xs md:text-sm text-[#000000]">
                      Riche Compound
                    </p>
                  </div>

                  {/* Contact Button */}
                  <div className="flex justify-center">
                    <button className="font-outfit text-xs md:text-sm text-[#0076C0] border-2 border-[#0076C0] rounded-md px-4 md:px-6 py-2 hover:bg-[#0076C0] hover:text-white transition-all duration-300 w-full">
                      Contact us
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12 md:mt-16 w-full">
          <Link to="/services">
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-[#0076C0] text-[#0076C0] hover:bg-[#0076C0] hover:text-white transition-all duration-300 px-6 md:px-8 py-5 md:py-6 text-sm md:text-base font-outfit font-semibold rounded-lg"
            >
              View Complete Schedule
            </Button>
          </Link>
        </div>
        
      </Section>
    </div>
  );
}
