import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Music, Heart, BookOpen, Baby, Compass } from "lucide-react";
import { Play, Clock, Calendar } from "lucide-react";
import youthimg from "@/assets/champions.jpg"
import childrenimg from "@/assets/kids.jpg"
import marriageimg from "@/assets/Marraige team.jpg"
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    description: "Leading our congregation in heartfelt worship through music that glorifies God and touches hearts across all ages and musical preferences.",
    icon: Music,
    color: "text-gold-dark",
    image: childrenimg
  },
  {
    id: 3,
    name: "Marriage Council",
    description: "Serving our local community with Christ's love through food pantries, community events, and mission work that makes a tangible difference.",
    icon: Heart,
    color: "text-primary-light",
    image: marriageimg
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
  return (
    <Section>
      {/* <SectionHeader 
        title="Our Ministries"
        subtitle="Every person has a unique calling and gifting. Explore our ministries and discover where God is calling you to serve and grow."
      /> */}

      {/* <div className="absolute inset-0 bg-[#2B1F66]/[0.92]" /> */}

      <div className="flex flex-row items-center gap-3 mt-8">
          <h3 className="font-['Outfit'] font-semibold text-[20px] leading-[36px] text-[#0076C0]">
            Our Ministries
          </h3>
          <div className="h-[1px] w-[90px] bg-[#0076C0]" />
      </div>

        <div className="relative z-10 flex flex-col items-center justify-center ml-[1150px] -mt-28">
      {/* Text Layer */}
          <h1 className="relative z-10 font-['Outfit'] font-bold text-[120px] text-black -ml-[420px] tracking-tight relative">
            <span className="text-white">Minis</span>tries
          </h1>

      <div className="absolute bottom-[10px] w-[300px] h-[100px] bg-[#6D28D9] -ml-[680px] -z-10 mb-[36px]" />
      
       </div>


        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12 mb-16">
        {departments.map((department) => (
          <Card key={department.id} className="group hover:shadow-medium transition-all duration-300 border-gold/10 hover:border-gold/30">
            <CardContent className="p-6">
              {/* <div className="aspect-video bg-gradient-hero rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center backdrop-blur-sm"> */}
                  {/* <Play className="w-8 h-8 text-white ml-1" /> */}
               {/*  </div>
              </div> */}

              <div className="aspect-video rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src={department.image} // Replace with your image path
                  alt={department.name}
                  className="w-full h-full object-cover"
                />
              </div>

              
              <div className="space-y-3">
                <div className="text-sm text-primary font-medium">{department.name}</div>
                
                <h3 className="text-md font-bold text-foreground group-hover:text-primary transition-colors">
                  {department.description}
                </h3>
                
                {/* <p className="text-text-soft leading-relaxed">
                  {teaching.excerpt}
                </p> */}
                
                
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Right Button */}
          <div className="absolute right-[45px] flex items-center mt-24">
            <button
              aria-label="Next"
              title="Next"
              className="text-black/70 hover:text-black transition"
            >
              <ChevronRight size={70} strokeWidth={2.5} />
            </button>
          </div>

      </div>



      
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {departments.map((dept) => {
          const IconComponent = dept.icon;
          return (
            <Card key={dept.id} className="group hover:shadow-medium transition-all duration-300 border-gold/10 hover:border-gold/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-soft rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className={`w-8 h-8 ${dept.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {dept.name}
                </h3>
                
                <p className="text-text-soft leading-relaxed">
                  {dept.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div> */}
      
      <div className="text-center">
        <Button 
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Explore All Departments
        </Button>
      </div>
    </Section>
  );
}