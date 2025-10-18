import { Section, SectionHeader } from "@/components/ui/section";
import pastorImage from "@/assets/pastor-couple.jpg";

export function Pastor() {
  return (
    <Section background="soft">
      <div className="text-center">
        <h2 className="font-['Outfit'] text-[62px] leading-[70px] font-extralight text-[#343C2B] inline-block relative mt-10">
          <span className="font-bold text-[#6D28D9]">Apostle </span>
          Bisrat
           <br /> 
          Bezuay<span className="relative inline-block">
            ene
            <span className="absolute bottom-[-19px] right-[0] w-[125px] h-[1px] bg-[#6D28D9]"></span>
          </span> 
          {/* <span className="font-bold text-[#6D28D9]">Apostle </span>
          Bisrat Bezuayene
          
            <br />
            <span>Meron </span>
            <span className="text-[#6D28D9]">Al</span><span className="text-[#6D28D9] relative inline-block">emu
            <span className="absolute bottom-[-6px] right-[0] w-[125px] h-[1px] bg-[#343C2B]"></span>
            </span> */}
          
        </h2>
      </div>

      
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* <div className="order-2 lg:order-1">
          <img
            src={pastorImage}
            alt="Apostle Bisrat (Japi) and Meron Alemu"
            className="w-full rounded-xl shadow-medium object-cover aspect-[4/3]"
          />
        </div> */}
        
        <div className="order-1 lg:order-2 space-y-6 mt-20">
          {/* <div>
            <h3 className="text-2xl font-bold text-[#242054] mb-12">
            Apostle Bisrat (Japi) and Meron Alemu
            </h3>
            <p className="text-primary font-medium">Senior Pastor & First Lady</p>
          </div> */}
          
          <div className="flex flex-col items-center text-center font-['Outfit'] text-[18px] text-[#242054] leading-relaxed space-y-6 mt-8">
            <p>
              Pastor John has been faithfully serving our community for over 15 years, bringing a heart 
              for pastoral care and biblical teaching that transforms lives. Alongside his beloved wife Mary, 
              they have dedicated their lives to creating a church home where every person feels valued and loved.
            </p>
            
            <p>
              "Our greatest joy is watching individuals and families discover their God-given purpose and 
              walking alongside them as they grow in faith. This church is more than a building – it's a 
              family where everyone belongs."
            </p>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground italic">
                "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to 
                harm you, to give you hope and a future." - Jeremiah 29:11
              </p>
              
              <button className="mt-14 border border-[#242054] text-[#242054] px-8 py-3 rounded-full hover:bg-[#242054] hover:text-white transition-all duration-300">
                Read More
              </button>

            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}