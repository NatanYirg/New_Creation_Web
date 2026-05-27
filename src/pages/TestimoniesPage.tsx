import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PageNavbar } from "@/components/PageNavbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import {
  getPublishedVideoTestimonies,
  getPublishedWrittenTestimonies,
  submitWrittenTestimony,
} from "@/api/testimonies";

interface VideoTestimony {
  _id: string;
  title: string;
  name: string;
  youtube_url: string;
  is_featured: boolean;
  is_published: boolean;
}

interface WrittenTestimony {
  _id: string;
  name: string;
  role?: string;
  title?: string;
  story: string;
}

function getYoutubeId(urlOrId: string): string {
  const match = urlOrId.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : urlOrId;
}

export default function TestimoniesPage() {
  const [currentTestimonyIndex, setCurrentTestimonyIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<{
    youtubeId: string;
    title: string;
    name: string;
  } | null>(null);
  const [showTestimonyForm, setShowTestimonyForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "+251",
    email: "",
    title: "",
    message: "",
  });

  // ── API Queries ────────────────────────────────────────────────────────────
  const { data: videoData, isLoading: loadingVideos } = useQuery({
    queryKey: ["public-video-testimonies"],
    queryFn: async () => {
      const r = await getPublishedVideoTestimonies();
      return r.data.testimonies as VideoTestimony[];
    },
  });

  const { data: writtenData, isLoading: loadingWritten } = useQuery({
    queryKey: ["public-written-testimonies"],
    queryFn: async () => {
      const r = await getPublishedWrittenTestimonies();
      return r.data.testimonies as WrittenTestimony[];
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: any) => submitWrittenTestimony(data),
    onSuccess: () => {
      setSubmitSuccess(true);
      setFormData({ name: "", phone: "+251", email: "", title: "", message: "" });
    },
  });

  // Derive featured and grid videos
  const allVideos = videoData ?? [];
  const featuredVideo = allVideos.find((v) => v.is_featured) ?? null;
  const gridVideos = allVideos.filter((v) => !v.is_featured);

  const writtenTestimonies = writtenData ?? [];

  // Auto-scroll written testimonies every 5 seconds
  useEffect(() => {
    if (writtenTestimonies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonyIndex((prev) =>
        prev === writtenTestimonies.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [writtenTestimonies.length]);

  // Reset index when testimonies load
  useEffect(() => {
    setCurrentTestimonyIndex(0);
  }, [writtenTestimonies.length]);

  const openVideoModal = (youtubeId: string, title: string, name: string) => {
    setSelectedVideo({ youtubeId, title, name });
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!value.startsWith("+251")) {
        setFormData({ ...formData, [name]: "+251" });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      title: formData.title,
      story: formData.message,
    });
  };

  const handleCloseForm = () => {
    setShowTestimonyForm(false);
    setSubmitSuccess(false);
    setFormData({ name: "", phone: "+251", email: "", title: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNavbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-4 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-['Outfit'] font-bold text-6xl text-gray-900 mb-4">
            Testimonies
          </h1>
          <p className="font-['Outfit'] text-xl italic text-[#6D28D9] max-w-3xl mx-auto mb-4">
            "They triumphed over him by the blood of the Lamb and by the word of their testimony."
            <span className="block text-base mt-2 text-gray-700">— Revelation 12:11</span>
          </p>
        </div>
      </div>

      {/* Featured Video Testimony */}
      {loadingVideos ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : featuredVideo ? (
        <div className="max-w-7xl mx-auto px-8 py-4">
          <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8">
            Featured Testimony
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Video on Left */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeId(featuredVideo.youtube_url)}`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
            {/* Details on Right */}
            <div className="space-y-6">
              <h3 className="font-['Outfit'] font-bold text-3xl text-gray-900">
                {featuredVideo.title}
              </h3>
              <p className="font-['Outfit'] text-xl text-[#6D28D9] font-semibold">
                {featuredVideo.name}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Video Testimony Grid */}
      {!loadingVideos && gridVideos.length > 0 && (
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8">
            Video Testimonies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridVideos.map((testimony) => {
              const videoId = getYoutubeId(testimony.youtube_url);
              return (
                <div
                  key={testimony._id}
                  onClick={() => openVideoModal(videoId, testimony.title, testimony.name)}
                  className="cursor-pointer"
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#6D28D9]">
                    <CardContent className="p-0">
                      <div className="aspect-video rounded-t-lg overflow-hidden relative">
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={testimony.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="font-['Outfit'] text-xl font-bold text-gray-900 group-hover:text-[#6D28D9] transition-colors">
                          {testimony.title}
                        </h3>
                        <p className="font-['Outfit'] text-sm text-gray-600">{testimony.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Watch More on YouTube Button */}
          <div className="flex justify-center mt-8">
            <a
              href="https://www.youtube.com/watch?v=4mUzvHikco0&list=PL4YPIT1aFwRKJDN6yp-NNe3JSYwUr-U9Y"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#6D28D9] hover:bg-[#5a21b6] text-white font-['Outfit'] font-semibold px-8 py-3">
                Watch More on YouTube
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Written Testimonies Carousel */}
      {loadingWritten ? (
        <div className="bg-gray-100 py-16 flex justify-center">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : writtenTestimonies.length > 0 ? (
        <div className="bg-gray-100 py-16">
          <div className="max-w-5xl mx-auto px-8">
            <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-8 text-center">
              Written Testimonies
            </h2>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonyIndex * 100}%)` }}
              >
                {writtenTestimonies.map((testimony) => (
                  <div key={testimony._id} className="w-full flex-shrink-0 px-8">
                    <Card className="bg-white shadow-xl">
                      <CardContent className="p-16">
                        <div className="text-center space-y-8">
                          <p className="font-['Outfit'] text-lg text-gray-700 leading-relaxed italic">
                            "{testimony.story}"
                          </p>
                          <div>
                            <p className="font-['Outfit'] font-bold text-xl text-[#6D28D9]">
                              — {testimony.name}
                            </p>
                            {testimony.role && (
                              <p className="font-['Outfit'] text-sm text-gray-500 mt-1">
                                {testimony.role}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {writtenTestimonies.map((testimony, index) => (
                <button
                  key={testimony._id}
                  onClick={() => setCurrentTestimonyIndex(index)}
                  className={`transition-all duration-300 ${
                    currentTestimonyIndex === index
                      ? "bg-[#6D28D9] w-10 h-3 rounded-full"
                      : "bg-gray-300 hover:bg-gray-400 w-3 h-3 rounded-full"
                  }`}
                  aria-label={`Go to testimony ${index + 1}`}
                />
              ))}
              <span className="ml-2 font-['Outfit'] text-sm text-gray-600">
                {currentTestimonyIndex + 1} / {writtenTestimonies.length}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Share Your Testimony CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-['Outfit'] font-bold text-4xl text-white mb-4">
            Share What God Has Done
          </h2>
          <p className="font-['Outfit'] text-lg text-white/90 mb-8">
            Your testimony can inspire and encourage others. Share how God has worked in your life.
          </p>
          <Button
            onClick={() => setShowTestimonyForm(true)}
            className="bg-white text-[#6D28D9] hover:bg-gray-100 font-['Outfit'] font-semibold px-8 py-4 text-lg"
          >
            Share Your Testimony
          </Button>
          <p className="font-['Outfit'] text-sm text-white/70 mt-4">
            Let your story bring hope to others
          </p>
        </div>
      </div>

      {/* Testimony Submission Form Modal */}
      {showTestimonyForm && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={handleCloseForm}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-lg my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 z-10 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              {submitSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="font-['Outfit'] font-bold text-2xl text-gray-900">
                    Thank You!
                  </h2>
                  <p className="font-['Outfit'] text-gray-600">
                    Your testimony has been submitted successfully. Our team will review it and
                    publish it soon.
                  </p>
                  <Button
                    onClick={handleCloseForm}
                    className="bg-[#6D28D9] hover:bg-[#5a21b6] text-white font-['Outfit'] font-semibold px-8 py-3"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-['Outfit'] font-bold text-3xl text-gray-900 mb-2">
                    Share Your Testimony
                  </h2>
                  <p className="font-['Outfit'] text-gray-600 mb-6">
                    Tell us how God has worked in your life
                  </p>

                  <form onSubmit={handleSubmitTestimony} className="space-y-6">
                    <div>
                      <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6D28D9] font-['Outfit']"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6D28D9] font-['Outfit']"
                        placeholder="+251912345678"
                      />
                    </div>

                    <div>
                      <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6D28D9] font-['Outfit']"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                        Testimony Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6D28D9] font-['Outfit']"
                        placeholder="e.g. God Healed Me, Financial Breakthrough"
                      />
                    </div>

                    <div>
                      <label className="font-['Outfit'] font-semibold text-gray-700 block mb-2">
                        Your Testimony *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6D28D9] font-['Outfit'] resize-none"
                        placeholder="Share your testimony here..."
                      />
                    </div>

                    {submitMutation.isError && (
                      <p className="text-sm text-red-600">
                        Failed to submit testimony. Please try again.
                      </p>
                    )}

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="flex-1 bg-[#6D28D9] hover:bg-[#5a21b6] disabled:opacity-50 text-white font-['Outfit'] font-semibold py-3"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Submit Testimony"}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCloseForm}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-['Outfit'] font-semibold py-3"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="p-6 bg-white">
              <h3 className="font-['Outfit'] font-bold text-2xl text-gray-900 mb-2">
                {selectedVideo.title}
              </h3>
              <p className="font-['Outfit'] text-lg text-[#6D28D9] font-semibold">
                {selectedVideo.name}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
