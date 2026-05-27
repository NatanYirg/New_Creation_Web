import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Calendar, Download, Share2, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { getTodayDevotional } from "@/api/devotionals";

interface DevotionalData {
  _id: string;
  title_en?: string;
  title_am: string;
  verse_reference_en?: string;
  verse_reference_am: string;
  verse_text_en?: string;
  verse_text_am: string;
  devotional_note_en?: string;
  devotional_note_am: string;
  confession_en?: string;
  confession_am: string;
  is_published: boolean;
  publish_date?: string;
}

export function Devotional() {
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [showShareModal, setShowShareModal] = useState(false);

  const { data, isLoading, isError } = useQuery<DevotionalData>({
    queryKey: ["devotional-today"],
    queryFn: async () => {
      const res = await getTodayDevotional();
      return res.data.devotional;
    },
    retry: false,
  });

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const title = language === 'en' ? (data?.title_en || data?.title_am || '') : (data?.title_am || '');
  const shareUrl = window.location.href;
  const shareText = `Check out today's devotional: ${title} - New Creation International Church Ethiopia`;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <Section id="devotional" className="bg-gradient-to-br from-[#E6E6FA] via-[#F0E6FF] to-[#E6E6FA] py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-4xl md:text-5xl text-[#242054] mb-4">
            Today's Devotional
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span className="font-medium text-lg">{today}</span>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <div className="p-12 flex flex-col items-center justify-center gap-4 text-gray-400">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              <p className="font-outfit text-lg">Loading today's devotional...</p>
            </div>
          </Card>
        )}

        {/* No devotional for today */}
        {isError && !isLoading && (
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <div className="p-12 text-center text-gray-500">
              <p className="font-outfit text-xl font-semibold mb-2">No devotional published for today.</p>
              <p className="font-outfit text-base">Check back tomorrow for a new devotional.</p>
            </div>
          </Card>
        )}

        {/* Devotional content */}
        {data && !isLoading && (
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            {/* Header bar with language toggle, title, share/download */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-6 flex items-center justify-between gap-4">
              {/* Language Toggle */}
              <div className="inline-flex rounded-lg border-2 border-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 font-outfit font-semibold text-sm transition-all duration-300 ${
                    language === 'en' ? 'bg-white text-purple-600' : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  ENG
                </button>
                <button
                  onClick={() => setLanguage('am')}
                  className={`px-4 py-1.5 font-outfit font-semibold text-sm transition-all duration-300 ${
                    language === 'am' ? 'bg-white text-purple-600' : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  አማ
                </button>
              </div>

              {/* Title */}
              <h3 className="font-outfit font-bold text-2xl md:text-3xl text-white text-center flex-1">
                {title}
              </h3>

              {/* Share & Download */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-sm"
                  aria-label="Share Devotional"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-sm"
                  aria-label="Download Devotional"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-8">
              {/* Scripture */}
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 border-l-4 border-purple-600 rounded-r-lg p-6 shadow-sm">
                <p className="text-sm font-semibold text-purple-800 uppercase tracking-wide mb-3">
                  {language === 'en' ? 'Scripture Reference' : 'የመጽሐፍ ቅዱስ ማጣቀሻ'}
                </p>
                <p className="font-outfit text-xl md:text-2xl font-semibold text-purple-900 mb-4">
                  {language === 'en'
                    ? (data.verse_reference_en || data.verse_reference_am)
                    : data.verse_reference_am}
                </p>
                <blockquote className="text-base md:text-lg text-gray-800 leading-relaxed italic border-l-2 border-purple-400 pl-4">
                  {language === 'en'
                    ? (data.verse_text_en || data.verse_text_am)
                    : data.verse_text_am}
                </blockquote>
              </div>

              {/* Devotional note */}
              <div className="prose prose-lg max-w-none">
                <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
                  {(language === 'en'
                    ? (data.devotional_note_en || data.devotional_note_am)
                    : data.devotional_note_am
                  ).split(/\r?\n/).filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Confession */}
              <div className="bg-purple-50 rounded-lg p-6 md:p-8 border border-purple-200">
                <h4 className="font-outfit font-bold text-2xl text-purple-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-8 bg-purple-600 rounded" />
                  {language === 'en' ? 'Confession' : 'አዋጅ'}
                </h4>
                <p className="text-gray-800 leading-relaxed text-base md:text-lg italic">
                  {language === 'en'
                    ? (data.confession_en || data.confession_am)
                    : data.confession_am}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-outfit font-bold text-2xl text-gray-900">Share Devotional</h3>
                <button onClick={() => setShowShareModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="font-outfit text-gray-600 mb-6">
                Share today's devotional with your friends and family
              </p>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center gap-3 p-4 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <FaFacebook className="w-6 h-6" />
                  <span className="font-outfit font-semibold">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center gap-3 p-4 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span className="font-outfit font-semibold">WhatsApp</span>
                </button>
                <button
                  onClick={() => handleShare('telegram')}
                  className="flex items-center justify-center gap-3 p-4 rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  <FaTelegram className="w-6 h-6" />
                  <span className="font-outfit font-semibold">Telegram</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
