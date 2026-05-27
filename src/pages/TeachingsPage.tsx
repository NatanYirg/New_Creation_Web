import { useState } from "react";
import { PageNavbar } from "@/components/PageNavbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPublishedTeachings, getPublishedSeries } from "@/api/teachings";
import img1 from "@/assets/Apostle.jpg";

interface Teaching {
  _id: string; title: string; speaker: string; date: string;
  youtube_url: string; category: string; thumbnail_url?: string;
  is_published: boolean; is_featured: boolean;
}

interface Series {
  _id: string; title: string; description?: string;
  playlist_url: string; video_count?: number; is_published: boolean;
}

function getYoutubeId(urlOrId: string): string {
  const match = urlOrId.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : urlOrId;
}

function getPlaylistId(urlOrId: string): string {
  const match = urlOrId.match(/[?&]list=([\w-]+)/);
  return match ? match[1] : urlOrId;
}

const SERMONS_PER_PAGE = 6;

export default function TeachingsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<{ youtubeId: string; title: string; speaker: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: teachingsData, isLoading: loadingTeachings } = useQuery<{ data: Teaching[]; total: number }>({
    queryKey: ["teachings-public-page"],
    queryFn: async () => (await getPublishedTeachings({ limit: 100 })).data,
  });

  const { data: seriesData, isLoading: loadingSeries } = useQuery<{ series: Series[] }>({
    queryKey: ["teachings-series-public"],
    queryFn: async () => (await getPublishedSeries()).data,
  });

  const allTeachings: Teaching[] = teachingsData?.data ?? [];
  const allSeries: Series[] = seriesData?.series ?? [];

  const categories = ["All", ...Array.from(new Set(allTeachings.map((t) => t.category))).sort()];
  const filteredTeachings = selectedCategory === "All" ? allTeachings : allTeachings.filter((t) => t.category === selectedCategory);
  const totalPages = Math.ceil(filteredTeachings.length / SERMONS_PER_PAGE);
  const currentSermons = filteredTeachings.slice((currentPage - 1) * SERMONS_PER_PAGE, currentPage * SERMONS_PER_PAGE);
  // Use explicitly featured teachings, not just the first 3
  const featuredSermons = allTeachings.filter((t) => t.is_featured);
  const currentFeatured = featuredSermons[currentFeaturedIndex];

  const handleCategoryChange = (cat: string) => { setSelectedCategory(cat); setCurrentPage(1); };
  const handlePageChange = (page: number) => { setCurrentPage(page); window.scrollTo({ top: 800, behavior: "smooth" }); };

  const isLoading = loadingTeachings || loadingSeries;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNavbar />

      <div className="relative pt-32 pb-4 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-['Outfit'] font-bold text-6xl text-gray-900 mb-4">Teachings</h1>
          <p className="font-['Outfit'] text-xl italic text-[#6D28D9] max-w-3xl mx-auto mb-4">
            "Faith comes by hearing, and hearing by the word of God."
            <span className="block text-base mt-2 text-gray-700">— Romans 10:17</span>
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-24">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Featured Sermon */}
          {featuredSermons.length > 0 && currentFeatured && (
            <div className="max-w-5xl mx-auto px-8 py-4">
              <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8">Featured Sermon</h2>
              <div className="relative">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-video w-full">
                    <iframe key={getYoutubeId(currentFeatured.youtube_url)} width="100%" height="100%"
                      src={`https://www.youtube.com/embed/${getYoutubeId(currentFeatured.youtube_url)}`}
                      title={currentFeatured.title} allowFullScreen className="w-full h-full" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-3">{currentFeatured.title}</h3>
                    <p className="font-['Outfit'] text-base text-[#6D28D9] font-semibold mb-2">{currentFeatured.speaker}</p>
                    <p className="font-['Outfit'] text-sm text-gray-600">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      {new Date(currentFeatured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                {featuredSermons.length > 1 && (
                  <>
                    <button onClick={() => setCurrentFeaturedIndex((p) => (p === 0 ? featuredSermons.length - 1 : p - 1))}
                      className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110" aria-label="Previous">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={() => setCurrentFeaturedIndex((p) => (p === featuredSermons.length - 1 ? 0 : p + 1))}
                      className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110" aria-label="Next">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              {featuredSermons.length > 1 && (
                <div className="flex justify-center items-center gap-3 mt-6">
                  {featuredSermons.map((_, i) => (
                    <button key={i} onClick={() => setCurrentFeaturedIndex(i)}
                      className={`transition-all duration-300 ${currentFeaturedIndex === i ? "bg-[#6D28D9] w-10 h-3 rounded-full" : "bg-gray-300 hover:bg-gray-400 w-3 h-3 rounded-full"}`} />
                  ))}
                  <span className="ml-2 font-['Outfit'] text-sm text-gray-600">{currentFeaturedIndex + 1} / {featuredSermons.length}</span>
                </div>
              )}
            </div>
          )}

          {/* Category Filter */}
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button key={cat} onClick={() => handleCategoryChange(cat)}
                  className={`font-['Outfit'] px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === cat ? "bg-[#6D28D9] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sermon Library */}
          <div className="max-w-7xl mx-auto px-8 py-12">
            <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8">Sermon Library</h2>
            {currentSermons.length === 0 ? (
              <p className="text-center text-gray-500 font-['Outfit'] py-16">No teachings found for this category.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSermons.map((sermon) => {
                  const videoId = getYoutubeId(sermon.youtube_url);
                  return (
                    <div key={sermon._id} onClick={() => setSelectedVideo({ youtubeId: videoId, title: sermon.title, speaker: sermon.speaker })} className="cursor-pointer">
                      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#6D28D9]">
                        <CardContent className="p-0">
                          <div className="aspect-video rounded-t-lg overflow-hidden relative">
                            <img src={sermon.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                              alt={sermon.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => { e.currentTarget.src = img1; }} />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-16 h-16 text-white" />
                            </div>
                          </div>
                          <div className="p-6 space-y-3">
                            <span className="inline-block px-3 py-1 bg-[#6D28D9]/10 text-[#6D28D9] text-xs font-semibold rounded-full">{sermon.category}</span>
                            <h3 className="font-['Outfit'] text-xl font-bold text-gray-900 group-hover:text-[#6D28D9] transition-colors">{sermon.title}</h3>
                            <p className="font-['Outfit'] text-sm text-gray-600">{sermon.speaker}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(sermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-['Outfit'] font-semibold transition-all ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-['Outfit'] font-semibold transition-all ${currentPage === page ? "bg-[#6D28D9] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                    {page}
                  </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-['Outfit'] font-semibold transition-all ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Teaching Series — from backend */}
          <div className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-8">
              <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8">Teaching Series</h2>
              {allSeries.length === 0 ? (
                <p className="text-center text-gray-400 font-['Outfit'] py-8">No teaching series available yet.</p>
              ) : (
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-6" style={{ width: "max-content" }}>
                    {allSeries.map((series) => {
                      const playlistId = getPlaylistId(series.playlist_url);
                      return (
                        <Card key={series._id} className="w-[350px] flex-shrink-0 hover:shadow-xl transition-shadow">
                          <CardContent className="p-0">
                            <div className="aspect-video rounded-t-lg overflow-hidden relative">
                              <iframe width="100%" height="100%"
                                src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
                                title={series.title} allowFullScreen className="w-full h-full" />
                            </div>
                            <div className="p-6 space-y-4">
                              {series.video_count ? (
                                <span className="inline-block px-3 py-1 bg-black/70 text-white text-xs font-semibold rounded-full">
                                  {series.video_count} videos
                                </span>
                              ) : null}
                              <h3 className="font-['Outfit'] text-xl font-bold text-gray-900">{series.title}</h3>
                              {series.description && <p className="font-['Outfit'] text-gray-600 text-sm">{series.description}</p>}
                              <a href={series.playlist_url} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full bg-[#6D28D9] hover:bg-[#5a21b6] text-white font-['Outfit'] font-semibold">
                                  Watch on YouTube
                                </Button>
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex justify-center mt-8">
                <a href="https://www.youtube.com/@NewCreationChurchEthiopia/playlists" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#6D28D9] hover:bg-[#5a21b6] text-white font-['Outfit'] font-semibold px-8 py-3">
                    See More Playlists on YouTube
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Subscribe */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
            <div className="max-w-4xl mx-auto px-8 text-center">
              <h2 className="font-['Outfit'] font-bold text-4xl text-white mb-4">Never Miss a Teaching</h2>
              <p className="font-['Outfit'] text-lg text-white/90 mb-8">Subscribe to stay connected with the latest sermons and spiritual teachings.</p>
              <a href="https://www.youtube.com/@NewCreationChurchEthiopia/featured" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#6D28D9] hover:bg-gray-100 font-['Outfit'] font-semibold px-8 py-4 text-lg">
                  Subscribe to YouTube
                </Button>
              </a>
              <p className="font-['Outfit'] text-sm text-white/70 mt-4">Join thousands of believers growing in faith through God's Word</p>
            </div>
          </div>
        </>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <div className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe width="100%" height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title} allowFullScreen className="w-full h-full" />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-2">{selectedVideo.title}</h3>
              <p className="font-['Outfit'] text-lg text-[#6D28D9] font-semibold">{selectedVideo.speaker}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
