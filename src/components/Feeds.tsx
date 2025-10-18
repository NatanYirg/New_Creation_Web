import { Button } from "@/components/ui/button";
import latestfeed from"@/assets/Latestfeedbg.png";
import { ChevronLeft, ChevronRight } from "lucide-react";




export function Feeds() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${latestfeed})` }}
  ></div>

  {/* White Rectangle on Top of Image */}
    <div className="absolute top-16 left-20 right-20 h-[800px] bg-[#ffffff] shadow-lg z-10"></div>

  {/* Bottom Gray Bar */}
    {/* <div className="absolute bottom-[10px] w-[2000px] h-[73px] bg-[#4e4b4b] -ml-[420px] -z-10" /> */}

    
    
    <div className="relative z-10 flex flex-col items-center justify-center">

      <div className="absolute -top-16 -right-36 flex flex-row items-center gap-3">
          
          <div className="h-[0.5px] w-[70px] bg-[#5c5c5c]" />
        
          <h5 className="font-['Outfit'] font-semibold text-[18px] leading-[36px] text-[#0076C0]">
            Our Recent Feeds
          </h5>

      </div>
      
          <h1 className="relative z-10 font-['Outfit'] font-bold text-[180px] leading-[190px] text-right tracking-tight
            bg-gradient-to-r from-[#0076C0] via-[#6D28D9] via-[#00C4CC] via-[#FFB800] to-[#FF007A]
            bg-[length:400%_400%] text-transparent bg-clip-text animate-gradient">
                Latest <br /> 
            From Feed
          </h1>

          <p className="relative mt-3 -ml-[260px] font-['Outfit'] font-regular text-[16px] text-[#5a5959] leading-[23px] text-left tracking-tight">
            Our church utilizes different social media platforms. To keep in touch with very recent <br />
            feeds and uploads you can consider following our pages on all social medias.</p>


 {/* Left Button */}
<div className="absolute inset-y-0 right-0 flex items-center mt-[475px]">
  <button
    aria-label="Previous"
    title="Previous"
    className="text-black/70 hover:text-black transition"
  >
    <ChevronLeft size={70} strokeWidth={2.5} />
  </button>
</div>

{/* Right Button */}
<div className="absolute inset-y-0 left-[850px] flex items-center mt-[475px]">
  <button
    aria-label="Next"
    title="Next"
    className="text-black/70 hover:text-black transition"
  >
    <ChevronRight size={70} strokeWidth={2.5} />
  </button>
</div>


          
      
    </div>




  </div>


  );
}