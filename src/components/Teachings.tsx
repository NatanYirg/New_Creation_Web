import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Calendar } from "lucide-react";
import bgimg from "@/assets/teachingpg2.jpg";
import img1 from "@/assets/Apostle.jpg";
import img2 from "@/assets/Eli.jpg";
import img3 from "@/assets/Tsi.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaYoutube } from "react-icons/fa" ;
import { FiArrowRight } from 'react-icons/fi'; 


const teachings = [
  {
    id: 1,
    name: "Apostle Japi",
    title: "The Power of Prayer",
    excerpt: "Discover how prayer transforms not just our circumstances, but our hearts. Learn practical ways to deepen your prayer life and experience God's presence daily.",
    date: "December 15, 2024",
    duration: "42 minutes",
    series: "Foundations of Faith",
    image: img1,
    youtubeLink: " ",
    item: "Word Of God"
  },
  {
    id: 2,
    name: "Brother Elias",
    title: "Love in Action",
    excerpt: "Jesus called us to love our neighbors as ourselves. Explore what it means to live out this commandment in our daily relationships and community. Watch sermon.",
    date: "December 8, 2024", 
    duration: "38 minutes",
    series: "Living Like Jesus",
    image: img2,
    youtubeLink: " ",
    item: "Who Is Man"
  },
  {
    id: 3,
    name: "Sister Tsion",
    title: "Finding Peace in Difficult Times",
    excerpt: "When life feels overwhelming, God offers us His perfect peace. Learn biblical strategies for maintaining hope and trust during challenging seasons. Watch sermon.",
    date: "December 1, 2024",
    duration: "45 minutes", 
    series: "Hope for Today",
    image: img3,
    youtubeLink: " ",
    item: "Righteousness"
  }
];

export function Teachings() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
    <Section background="gradient">
      {/* <SectionHeader 
        title="Recent Teachings"
        subtitle="Grow in your faith through biblical messages that speak to real life. Each teaching is designed to encourage, challenge, and equip you for your spiritual journey."
      /> */}



      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 h-[200px] flex flex-col items-center justify-center overflow-hidden]">
      
      <img
        src={bgimg}
        alt="Services Background"
        className="absolute inset-0 w-full h-full object-cover"
      /> 

     
      <div className="absolute inset-0 bg-[#2B1F66]/[0.92]" />

        <div className="relative z-10 flex flex-col items-center justify-center">
      
          <h1 className="relative z-10 font-['Outfit'] font-bold text-[110px] text-white -ml-[420px] tracking-tight">
            TEACHINGS
          </h1>

      <div className="absolute bottom-[10px] w-[800px] h-[73px] bg-[#6D28D9] -ml-[420px] -z-10" />
      
       </div>

    </div>
      


        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-20 mb-16">
        {teachings.map((department) => (
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
                  alt={department.title}
                  className="w-full h-full object-cover"
                />
              </div>

              
              <div className="space-y-3">
                <div className="text-sm text-primary font-medium">{department.name}</div>
                
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {department.excerpt}
                </h3>
                
                <div className="relative flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {department.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {department.duration}
                  </div>
                  
                  <div className="absolute bottom-0 right-0">
                          <a
                            href={department.youtubeLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transform transition-transform duration-300 hover:scale-125"
                          >
                            <FaYoutube className="text-red-600 hover:text-red-500 w-9 h-9" />
                          </a>
                    </div>
                </div>
                
                
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Right Button */}
          <div className="absolute right-[30px] flex items-center mt-48">
            <button
              aria-label="Next"
              title="Next"
              className="text-black/70 hover:text-black transition"
            >
              <ChevronRight size={70} strokeWidth={2.5} />
            </button>
          </div>

      </div>
      <div className="relative bottom-10 -right-[1200px]">


        {/* <div className="relative flex gap-3 justify-center bottom-8">
          <div className="w-[21px] h-[21px] bg-[#3C3B78] rounded-full"></div>
          <div className="w-[21px] h-[21px] border border-black rounded-full"></div>
          <div className="w-[21px] h-[21px] border border-black rounded-full"></div>
        </div> */}

        {/* <a
                            href="http://www.youtube.com/@NewCreationChurchEthiopia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transform transition-transform duration-300 hover:scale-125"
                          >
                            <h3 className="font-['Outfit'] text-[14px] leading-[36px] text-[#0076C0]">
                              Go to YouTube
                            </h3>
                            
                          </a> */}
                          <a 
        href="http://www.youtube.com/@NewCreationChurchEthiopia"
        className="flex items-center gap-2 font-['Outfit'] font-medium text-[12px]  text-[#0076C0] hover:gap-3 transition-all duration-300 group"
      >
        Go to YouTube
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>

        
      </div>

      



<div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full max-w-9xl mx-auto mt-6">
  
    <div className="flex flex-col space-y-4">
      {/* Header */}
      <h3 className="font-['Outfit'] font-bold text-[38px] leading-[52px] text-black">
        Word Of God
      </h3>
      
      {/* Paragraph */}
      <p className="font-['Outfit'] font-normal text-[14px] leading-[24px] text-[#505050]/80">
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. 
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. To keep in 
        touch with very recent feeds and uploads you can consider  following our pages on all social medias. 
      </p>
      
      {/* Learn More Link with Arrow Icon */}
      <a 
        href="#" 
        className="flex items-center gap-2 font-['Outfit'] font-medium text-[20px] leading-[36px] text-[#0076C0] hover:gap-3 transition-all duration-300 group"
      >
        Learn More
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </div>


    <div className="flex flex-col space-y-4">
      {/* Header */}
      <h3 className="font-['Outfit'] font-bold text-[38px] leading-[52px] text-black">
        Who is Man
      </h3>
      
      {/* Paragraph */}
      <p className="font-['Outfit'] font-normal text-[14px] leading-[24px] text-[#505050]/80">
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. 
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. To keep in 
        touch with very recent feeds and uploads you can consider  following our pages on all social medias. 
      </p>
      
      {/* Learn More Link with Arrow Icon */}
      <a 
        href="#" 
        className="flex items-center gap-2 font-['Outfit'] font-medium text-[20px] leading-[36px] text-[#0076C0] hover:gap-3 transition-all duration-300 group"
      >
        Learn More
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </div>


    <div className="flex flex-col space-y-4">
      {/* Header */}
      <h3 className="font-['Outfit'] font-bold text-[38px] leading-[52px] text-black">
        Righteousness
      </h3>
      
      {/* Paragraph */}
      <p className="font-['Outfit'] font-normal text-[14px] leading-[24px] text-[#505050]/80">
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. 
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. To keep in 
        touch with very recent feeds and uploads you can consider  following our pages on all social medias. 
      </p>
      
      {/* Learn More Link with Arrow Icon */}
      <a 
        href="#" 
        className="flex items-center gap-2 font-['Outfit'] font-medium text-[20px] leading-[36px] text-[#0076C0] hover:gap-3 transition-all duration-300 group"
      >
        Learn More
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </div>



    <div className="flex flex-col space-y-4 -mt-4">
      {/* Header */}
      <h3 className="font-['Outfit'] font-bold text-[38px] leading-[52px] text-black">
        Faith
      </h3>
      
      {/* Paragraph */}
      <p className="font-['Outfit'] font-normal text-[14px] leading-[24px] text-[#505050]/80">
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. 
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. To keep in 
        touch with very recent feeds and uploads you can consider  following our pages on all social medias. 
      </p>
      
      {/* Learn More Link with Arrow Icon */}
      <a 
        href="#" 
        className="flex items-center gap-2 font-['Outfit'] font-medium text-[20px] leading-[36px] text-[#0076C0] hover:gap-3 transition-all duration-300 group"
      >
        Learn More
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </div>



    <div className="flex flex-col space-y-4 -mt-4">
      {/* Header */}
      <h3 className="font-['Outfit'] font-bold text-[38px] leading-[52px] text-black">
        Prosperity
      </h3>
      
      {/* Paragraph */}
      <p className="font-['Outfit'] font-normal text-[14px] leading-[24px] text-[#505050]/80">
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. 
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. To keep in 
        touch with very recent feeds and uploads you can consider  following our pages on all social medias. 
      </p>
      
      {/* Learn More Link with Arrow Icon */}
      <a 
        href="#" 
        className="flex items-center gap-2 font-['Outfit'] font-medium text-[20px] leading-[36px] text-[#0076C0] hover:gap-3 transition-all duration-300 group"
      >
        Learn More
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </div>





    <div className="flex flex-col space-y-4 -mt-4">
      {/* Header */}
      <h3 className="font-['Outfit'] font-bold text-[38px] leading-[52px] text-black">
        Grace
      </h3>
      
      {/* Paragraph */}
      <p className="font-['Outfit'] font-normal text-[14px] leading-[24px] text-[#505050]/80">
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. 
        To keep in touch with very recent feeds and uploads you can consider following our pages on all social medias. To keep in 
        touch with very recent feeds and uploads you can consider  following our pages on all social medias. 
      </p>
      
      {/* Learn More Link with Arrow Icon */}
      <a 
        href="#" 
        className="flex items-center gap-2 font-['Outfit'] font-medium text-[20px] leading-[36px] text-[#0076C0] hover:gap-3 transition-all duration-300 group"
      >
        Learn More
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </div>

</div>

  



      {/* <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 mt-14">
        {teachings.map((teaching) => (
          <Card key={teaching.id} className="group hover:shadow-medium transition-all duration-300 border-gold/10 hover:border-gold/30">
            <CardContent className="p-6">
              <div className="aspect-video bg-gradient-hero rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-primary font-medium">{teaching.series}</div>
                
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {teaching.title}
                </h3>
                
                <p className="text-text-soft leading-relaxed">
                  {teaching.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {teaching.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {teaching.duration}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
      
      <div className="relative text-center -bottom-10">
        <Button 
          variant="outline" 
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          See all teachings
        </Button>
      </div>
    </Section>
    </div>
  );
}