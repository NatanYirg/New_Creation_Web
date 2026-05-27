import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import bgimg from "@/assets/teachingpg2.jpg";
import img1 from "@/assets/Apostle.jpg";
import { FaYoutube } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getPublishedTeachings } from "@/api/teachings";

interface Teaching {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  youtube_url: string;
  category: string;
  thumbnail_url?: string;
  is_published: boolean;
}

function getYoutubeId(urlOrId: string): string {
  const match = urlOrId.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : urlOrId;
}

export function Teachings() {
  const { data, isLoading } = useQuery<{ data: Teaching[] }>({
    queryKey: ["teachings-public-carousel"],
    queryFn: async () => {
      const res = await getPublishedTeachings({ limit: 6 });
      return res.data;
    },
  });

  const teachings = data?.data ?? [];
  const showCarousel = teachings.length > 0;

  return (
    <div id="teachings" className="relative w-full overflow-hidden">
      <Section background="gradient">
        {/* Banner */}
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 h-[120px] sm:h-[150px] md:h-[200px] flex flex-col items-center justify-center overflow-hidden mb-12 sm:mb-16 md:mb-24">
          <img src={bgimg} alt="Teachings Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#2B1F66]/[0.92]" />
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            <h1 className="relative z-10 font-['Outfit'] font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[110px] text-white text-center tracking-tight">
              TEACHINGS
            </h1>
            <div className="absolute bottom-[10px] w-[200px] sm:w-[400px] md:w-[600px] lg:w-[800px] h-[30px] sm:h-[50px] md:h-[73px] bg-[#6D28D9] -z-10" />
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Carousel */}
        {!isLoading && showCarousel && (
          <div className="relative overflow-hidden mt-20 mb-8">
            <div className="flex gap-6 animate-scroll">
              {[...teachings, ...teachings].map((teaching, idx) => {
                const videoId = getYoutubeId(teaching.youtube_url);
                const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
                const formattedDate = new Date(teaching.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                });

                return (
                  <Card
                    key={`${teaching._id}-${idx}`}
                    className="flex-shrink-0 w-[400px] group hover:shadow-medium transition-all duration-300 border-gold/10 hover:border-gold/30"
                  >
                    <CardContent className="p-6">
                      <div className="aspect-video rounded-lg mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={teaching.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={teaching.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = img1; }}
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm text-primary font-medium">{teaching.speaker}</div>
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {teaching.title}
                        </h3>
                        <div className="relative flex items-center gap-4 text-sm text-muted-foreground pt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formattedDate}
                          </div>
                          <div className="absolute bottom-0 right-0">
                            <a
                              href={youtubeLink}
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
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !showCarousel && (
          <div className="text-center py-16 text-muted-foreground font-outfit">
            No teachings available yet.
          </div>
        )}

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="relative text-center mt-8">
          <Link to="/teachings">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              See all teachings
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
