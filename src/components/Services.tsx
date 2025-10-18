import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users } from "lucide-react";
import bgimg from "@/assets/home-hero-congregation.jpg"
import servicebg from "@/assets/servicebg.jpg"



/* const services = [
  {
    id: 1,
    name: "Sunday Morning Worship",
    time: "10:00 AM",
    day: "Sunday",
    description: "Join us for inspiring worship, biblical teaching, and fellowship as we celebrate God's goodness together.",
    duration: "90 minutes",
    audience: "All Ages"
  },
  {
    id: 2,
    name: "Sunday Evening Service",
    time: "6:00 PM", 
    day: "Sunday",
    description: "A more intimate gathering focused on prayer, testimonies, and deeper biblical study in a relaxed atmosphere.",
    duration: "60 minutes",
    audience: "All Ages"
  },
  {
    id: 3,
    name: "Wednesday Bible Study",
    time: "7:00 PM",
    day: "Wednesday",
    description: "Dive deeper into God's Word with verse-by-verse study, discussion, and practical application for daily living.",
    duration: "75 minutes", 
    audience: "Adults & Teens"
  },
  {
    id: 4,
    name: "Friday Prayer Night",
    time: "7:30 PM",
    day: "Friday",
    description: "Come together for powerful corporate prayer, intercession, and seeking God's will for our church and community.",
    duration: "60 minutes",
    audience: "All Ages"
  },
  {
    id: 5,
    name: "Saturday Youth Service",
    time: "6:00 PM",
    day: "Saturday", 
    description: "High-energy worship, relevant messages, and fun activities designed specifically for teens and young adults.",
    duration: "90 minutes",
    audience: "Ages 13-25"
  }
]; */

export function Services() {
  return (
     <div className="relative min-h-screen w-full overflow-hidden">
    <Section background="gradient" /* className="!overflow-x-hidden" */ className=" flex flex-col lg:flex-row items-start justify-between w-full px-20 py-16 gap-10">
      {/* <SectionHeader 
        title="Worship With Us"
        subtitle="We gather regularly to worship, learn, and grow together. Every service is designed to help you encounter God and connect with our church family."
      /> */}

     

   {/*  <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${servicebg})` }}
      >
      </div> */}

    <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 h-[245px] flex flex-col items-center justify-center overflow-hidden]">
      {/* Background Image */}
      <img
        src={bgimg}
        alt="Services Background"
        className="absolute inset-0 w-full h-full object-cover"
      /> 

      {/* Semi-transparent Rectangle Overlay */}
      <div className="absolute inset-0 bg-[#2B1F66]/[0.92]" />

        <div className="relative z-10 flex flex-col items-center justify-center">
      {/* Text Layer */}
          <h1 className="relative z-10 font-['Outfit'] font-bold text-[120px] text-white -ml-[420px] tracking-tight relative">
            NCIC SERVICES
          </h1>

      <div className="absolute bottom-[10px] w-[900px] h-[73px] bg-[#6D28D9] -ml-[420px] -z-10" />
      
       </div>

    </div>

    <div className="container mx-auto flex flex-col lg:flex-row items-start justify-between w-full mt-28 -ml-14">
      
      {/* Left side */}

      <div className="flex flex-col justify-center items-start space-y-6 lg:pr-12">
      
        {/* Small Title */}
        <div className="flex items-center gap-3">
          <h3 className="font-['Outfit'] font-semibold text-[20px] leading-[36px] text-[#0076C0]">
            Our Main Services
          </h3>
          <div className="h-[1px] w-[90px] bg-[#0076C0]" />
        </div>

        {/* Main Heading */}
        <h1 className="font-['Outfit'] font-bold text-[90px] leading-[100px] text-[#000000]/[0.83]">
          Become A <br />
          Part Of <br />
          Something <br />
          Great
        </h1>

        {/* Circles (Slider Indicators) */}
        <div className="flex gap-3 pt-4">
          <div className="w-[21px] h-[21px] bg-black rounded-full"></div>
          <div className="w-[21px] h-[21px] border border-black rounded-full"></div>
        </div>
      </div>
  


      {/* RIGHT SIDE CARDS */}

      

      <div className="flex justify-center lg:justify-end gap-10 mt-16 lg:mt-20 ml-10">
      {/* <div className="flex overflow-x-auto gap-10 pl-10 scrollbar-hide snap-x snap-mandatory"> */}
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className="relative w-[310px] h-[420px] bg-white shadow-lg flex flex-col items-center pt-[100px] pb-6 px-6 transition-transform duration-300 hover:-translate-y-2"
          >
            {/* CIRCLES */}
            <div className="absolute -top-[80px] left-1/2 -translate-x-1/2 flex items-center justify-center">
              {/* Outer White Circle */}
              <div className="relative shadow-lg flex items-center justify-center w-[158px] h-[158px] bg-white rounded-full">
                {/* Middle Blue Transparent Circle */}
                <div className="absolute w-[112px] h-[112px] bg-[#0076C0]/[0.40] rounded-full shadow-[0px_23px_18.1px_12px_rgba(79,161,211,0.13)]"></div>

                {/* Inner Gradient Circle */}
                <div className="absolute w-[103px] h-[103px] rounded-full bg-gradient-to-b from-[#0076C0]/[0.69] to-[#AED9F4]/[0.69] shadow-[0px_23px_18.1px_12px_rgba(79,161,211,0.31)] flex items-center justify-center">
                  <span className="font-['Outfit'] font-bold text-white text-[36px]">
                    {num.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD CONTENT */}
            <div className="mt-6 text-left">
              <h2 className="font-['Outfit'] font-bold text-[49px] leading-[46px] text-[#000000] mb-3">
                {num === 1
                  ? "Every Sunday"
                  : num === 2
                  ? "Every Tuesday"
                  :num == 3
                  ? "Every Wednesday"
                  :"Every Sunday"}
              </h2>

              {/* Time Info */}
              <div className="flex items-center justify-start gap-2 -mb-4">
                <Clock className="w-5 h-5 text-[#0076C0]" />
                <p className="font-['Outfit'] text-[16px] leading-[46px] text-[#000000]">
                  {num === 1
                    ? "Morning: 10:00AM - 1:00PM"
                    : "Evening: 05:30PM - 08:00PM"}
                </p>
              </div>

              {/* Location Info */}
              <div className="flex items-center justify-start gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#0076C0]" />
                <p className="font-['Outfit'] text-[16px] leading-[46px] text-[#000000]">
                  Riche Compound
                </p>
              </div>

              {/* Contact Button */}
              <div className="flex justify-center">
                <button className="font-['Outfit'] text-[16px] text-[#0076C0] border border-[#0076C0] rounded-md px-6 py-2 hover:bg-[#0076C0] hover:text-white transition-all">
                  Contact us
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>



    
      
      
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <Card key={service.id} className="group hover:shadow-medium transition-all duration-300 border-gold/10 hover:border-gold/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-primary font-bold text-lg">{service.day}</div>
                <div className="text-2xl font-bold text-foreground">{service.time}</div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              
              <p className="text-text-soft leading-relaxed mb-4">
                {service.description}
              </p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {service.audience}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Main Sanctuary
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
      
      <div className="text-center mt-12">
        <Button 
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          View Complete Schedule
        </Button>
      </div>
      
    </Section>
    </div>
  );
}