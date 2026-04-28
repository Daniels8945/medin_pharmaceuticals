import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPage, getBannerUrl } from "@/appwrite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import { useScrollReveal } from "../lib/useScrollReveal";
import {
  MdArrowBack, MdHealthAndSafety, MdScience, MdMedication,
  MdLocalHospital, MdBiotech, MdVerified, MdStar,
  MdArticle, MdEmojiEvents, MdInfo, MdBusiness,
} from "react-icons/md";
import { FaFlask, FaLeaf } from "react-icons/fa";

/* ── Icon registry ───────────────────────────────────────────────── */
const ICON_MAP = {
  health:     MdHealthAndSafety,
  science:    MdScience,
  medication: MdMedication,
  hospital:   MdLocalHospital,
  biotech:    MdBiotech,
  verified:   MdVerified,
  star:       MdStar,
  news:       MdArticle,
  award:      MdEmojiEvents,
  info:       MdInfo,
  business:   MdBusiness,
  flask:      FaFlask,
  leaf:       FaLeaf,
};

/* ── Card colour → hero gradient ─────────────────────────────────── */
const HERO_GRADIENT = {
  green:  "from-green-700 to-emerald-500",
  blue:   "from-blue-700 to-sky-500",
  purple: "from-purple-700 to-violet-500",
  orange: "from-orange-600 to-amber-400",
  red:    "from-red-700 to-rose-500",
};

/* ── YouTube helper ──────────────────────────────────────────────── */
function getYouTubeId(url = "") {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

/* ── Body renderer: double newline → paragraphs ──────────────────── */
function BodyText({ text }) {
  if (!text) return null;
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-zinc-700 text-[17px] leading-relaxed font-worksans whitespace-pre-line">
          {p}
        </p>
      ))}
    </div>
  );
}

/* ── Loading skeleton ────────────────────────────────────────────── */
function PageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-zinc-200 rounded-none" />
      <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-6">
        <div className="h-8 bg-zinc-200 rounded-xl w-3/4" />
        <div className="h-4 bg-zinc-200 rounded-xl w-1/2" />
        <div className="h-4 bg-zinc-200 rounded-xl w-full" />
        <div className="h-4 bg-zinc-200 rounded-xl w-5/6" />
        <div className="h-4 bg-zinc-200 rounded-xl w-full" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DYNAMIC PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function DynamicPage() {
  useScrollReveal();
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getPage(slug).then((data) => {
      if (!data || data.error) {
        setNotFound(true);
      } else {
        setPage(data);
      }
      setLoading(false);
    });
  }, [slug]);

  const PageIcon = page?.icon ? ICON_MAP[page.icon] : null;
  const gradient = HERO_GRADIENT[page?.card_color] ?? "from-green-700 to-emerald-500";
  const youtubeId = page?.video_url ? getYouTubeId(page.video_url) : null;
  const imageUrl  = page?.image_id  ? getBannerUrl(page.image_id) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Header />

      <main className="snap-container flex-1">
        {loading && (
          <div className="pt-8">
            <PageSkeleton />
          </div>
        )}

        {!loading && notFound && (
          <div className="flex flex-col items-center justify-center py-32 px-6 gap-6 text-center">
            <p className="text-6xl font-bold text-zinc-200 font-raleway">404</p>
            <h1 className="text-2xl font-bold text-zinc-800 font-raleway">Page not found</h1>
            <p className="text-zinc-500 font-worksans max-w-md">
              This page doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold font-raleway px-6 py-3 rounded-xl transition-colors"
            >
              <MdArrowBack /> Back to Home
            </Link>
          </div>
        )}

        {!loading && page && (
          <>
            {/* ── Hero ── */}
            <div className={`relative bg-gradient-to-br ${gradient} text-white`}>
              <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col gap-5">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold font-raleway transition-colors w-fit"
                >
                  <MdArrowBack className="text-base" /> Back
                </Link>

                {PageIcon && (
                  <div data-reveal="scale-up" className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <PageIcon className="text-3xl text-white" />
                  </div>
                )}

                <h1 data-reveal="fade-up" className="text-3xl md:text-4xl lg:text-5xl font-bold font-raleway leading-tight">
                  {page.title}
                </h1>

                {page.subtitle && (
                  <p data-reveal="fade-up" data-reveal-delay="100"
                    className="text-lg text-white/80 font-worksans max-w-2xl leading-relaxed">
                    {page.subtitle}
                  </p>
                )}
              </div>

              {/* decorative circle */}
              <div className="absolute -bottom-px left-0 right-0 h-12 bg-white"
                style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
            </div>

            {/* ── Content ── */}
            <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-10">

              {/* Hero image */}
              {imageUrl && (
                <div data-reveal="fade-up" className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={imageUrl} alt={page.title} className="w-full object-cover max-h-[480px]" />
                </div>
              )}

              {/* Body text */}
              {page.body && (
                <div data-reveal="fade-up">
                  <BodyText text={page.body} />
                </div>
              )}

              {/* YouTube embed */}
              {youtubeId && (
                <div data-reveal="fade-up" className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={page.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Direct video URL (non-YouTube) */}
              {page.video_url && !youtubeId && (
                <div data-reveal="fade-up" className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                  <video
                    className="w-full h-full object-cover"
                    src={page.video_url}
                    controls
                    title={page.title}
                  />
                </div>
              )}

              {/* Back link */}
              <div className="pt-4 border-t border-zinc-100">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold font-raleway text-sm transition-colors"
                >
                  <MdArrowBack /> Back to Home
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
