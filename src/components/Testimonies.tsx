import { useQuery } from "@tanstack/react-query";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import testimonybg from "@/assets/testimonybg.jpg";
import { FaYoutube } from "react-icons/fa";
import { getPublishedVideoTestimonies } from "@/api/testimonies";

interface VideoTestimony {
  _id: string;
  title: string;
  name: string;
  youtube_url: string;
  is_featured: boolean;
  is_published: boolean;
}

function getYoutubeId(urlOrId: string): string {
  const match = urlOrId.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : urlOrId;
}

export function Testimonies() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-video-testimonies"],
    queryFn: async () => {
      const r = await getPublishedVideoTestimonies();
      return r.data.testimonies as VideoTestimony[];
    },
  });

  // Show up to 4 testimonies
  const testimonies = (data ?? []).slice(0, 4);

  return (
    <div className="relative w-full overflow-hidden">
      <Section background="soft">
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 h-[120px] sm:h-[150px] md:h-[200px] flex flex-col items-center justify-center overflow-hidden mb-12 sm:mb-16 md:mb-24">
          <img
            src={testimonybg}
            alt="Testimony Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#2B1F66]/[0.92]" />

          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            <h1 className="relative z-10 font-['Outfit'] font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[110px] text-white text-center tracking-tight">
              TESTIMONY
            </h1>

            <div className="absolute bottom-0 left-0 right-0 w-full h-[30px] sm:h-[50px] md:h-[73px] bg-[#6D28D9] -z-10" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          </div>
        ) : testimonies.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No testimonies available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
            {testimonies.map((testimony) => {
              const videoId = getYoutubeId(testimony.youtube_url);
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

              return (
                <div
                  key={testimony._id}
                  className="relative bg-[#2B1F66] w-full rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Rectangle thumbnail */}
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={thumbnailUrl}
                      alt={testimony.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col items-center gap-3 pb-4">
                    <p className="italic text-sm text-white/90 leading-relaxed line-clamp-3 text-center">
                      "{testimony.title}"
                    </p>
                    <h4 className="font-bold text-sm text-white text-center">{testimony.name}</h4>
                    <a
                      href={testimony.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-red-500 transition-all duration-300 mt-1"
                    >
                      <FaYoutube size={30} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Link to="/testimonies">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Read More Testimonies
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
