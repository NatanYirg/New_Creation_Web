import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Music, Heart, BookOpen, Baby, Compass } from "lucide-react";
import { Play, Clock, Calendar } from "lucide-react";
import youthimg from "@/assets/champions.jpg"
import childrenimg from "@/assets/kids.jpg"
import marriageimg from "@/assets/Marraige team.jpg"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const departments = [
  {
    id: 1,
    name: "Youth Ministry",
    description: "Empowering the next generation to know God, grow in faith, and make a difference in their world through dynamic programs and mentorship.",
    icon: Users,
    color: "text-primary",
    image: youthimg
  },
  {
    id: 2,
    name: "Children Ministry",
    description: "Shaping young hearts and minds by equipping the future generation with the Word of God.",
    icon: Music,
    color: "text-gold-dark",
    image: childrenimg
  },
  {
    id: 3,
    name: "Marriage Council",
    description: "Building strong, God-first families anchored in biblical truth and lifelong love.",
    icon: Heart,
    color: "text-primary-light",
    image: marriageimg
  },
  {
    id: 4,
    name: "Youth Ministry",
    description: "Empowering the next generation to know God, grow in faith, and make a difference in their world through dynamic programs and mentorship.",
    icon: Users,
    color: "text-primary",
    image: youthimg
  },
  {
    id: 5,
    name: "Children Ministry",
    description: "Shaping young hearts and minds by equipping the future generation with the Word of God.",
    icon: Music,
    color: "text-gold-dark",
    image: childrenimg
  },/* 
  {
    id: 4,
    name: "Bible Study",
    description: "Growing deeper in God's Word through weekly studies, discussion groups, and classes designed for every level of biblical knowledge.",
    icon: BookOpen,
    color: "text-primary",
    image: imageholder
  },
  {
    id: 5,
    name: "Children's Ministry", 
    description: "Creating a fun, safe, and loving environment where children can learn about Jesus through age-appropriate activities and biblical teaching.",
    icon: Baby,
    color: "text-gold-dark",
    image: imageholder
  },
  {
    id: 6,
    name: "Missions",
    description: "Spreading the Gospel both locally and globally through mission trips, partnerships, and support for missionaries around the world.",
    icon: Compass,
    color: "text-primary-light",
    image: imageholder
  } */
];

export function Departments() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section>
      <div className="flex flex-row items-center gap-3 mt-8 px-4 md:px-0">
        <h3 className="font-['Outfit'] font-semibold text-base md:text-[20px] leading-[36px] text-[#0076C0]">
          Our Ministries
        </h3>
        <div className="h-[1px] w-[60px] md:w-[90px] bg-[#0076C0]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-0 mt-6 md:mt-0 md:ml-[1150px] md:-mt-28">
        {/* Text Layer */}
        <h1 className="relative z-10 font-['Outfit'] font-bold text-4xl sm:text-5xl md:text-7xl lg:text-[120px] text-black text-center md:text-left md:-ml-[420px] tracking-tight">
          <span className="relative inline-block">
            <span className="relative z-10 text-white">Minis</span>
            <span className="absolute inset-0 bg-[#6D28D9] -z-10 scale-x-110 scale-y-110" />
          </span>tries
        </h1>
      </div>

      <div ref={sectionRef} className="relative overflow-hidden mt-8 md:mt-12 mb-12 md:mb-16">
        {/* Scrolling container */}
        <div className="flex gap-4 md:gap-6 animate-scroll">
          {/* First set of cards */}
          {departments.map((department, index) => (
            <Card 
              key={`first-${department.id}`} 
              className={`flex-shrink-0 w-[280px] md:w-[400px] group hover:shadow-medium transition-all duration-300 border-gold/10 hover:border-gold/30 ${
                isVisible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-4 md:p-6">
                <div className="aspect-video rounded-lg mb-3 md:mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={department.image}
                    alt={department.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 md:space-y-3">
                  <div className="text-xs md:text-sm text-primary font-medium">{department.name}</div>
                  
                  <h3 className="text-sm md:text-md font-bold text-foreground group-hover:text-primary transition-colors">
                    {department.description}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {departments.map((department, index) => (
            <Card 
              key={`second-${department.id}`} 
              className={`flex-shrink-0 w-[280px] md:w-[400px] group hover:shadow-medium transition-all duration-300 border-gold/10 hover:border-gold/30 ${
                isVisible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + departments.length) * 0.15}s` }}
            >
              <CardContent className="p-4 md:p-6">
                <div className="aspect-video rounded-lg mb-3 md:mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={department.image}
                    alt={department.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 md:space-y-3">
                  <div className="text-xs md:text-sm text-primary font-medium">{department.name}</div>
                  
                  <h3 className="text-sm md:text-md font-bold text-foreground group-hover:text-primary transition-colors">
                    {department.description}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }
      `}</style>
      
    </Section>
  );
}