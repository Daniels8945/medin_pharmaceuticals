import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPages, getBannerUrl } from "@/appwrite";
import {
  MdArrowForward, MdHealthAndSafety, MdScience, MdMedication,
  MdLocalHospital, MdBiotech, MdVerified, MdStar,
  MdArticle, MdEmojiEvents, MdInfo, MdBusiness,
} from "react-icons/md";
import { FaFlask, FaLeaf } from "react-icons/fa";

/* ── Icon registry (must match DynamicPage.jsx) ──────────────────── */
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

/* ── Card colour palette ─────────────────────────────────────────── */
const CARD_STYLES = {
  green:  { bg: "from-green-50 to-emerald-100",  icon: "text-green-600 bg-green-100",  btn: "text-green-700 hover:text-green-900",  bar: "bg-green-500"  },
  blue:   { bg: "from-blue-50 to-sky-100",        icon: "text-blue-600 bg-blue-100",    btn: "text-blue-700 hover:text-blue-900",    bar: "bg-blue-500"   },
  purple: { bg: "from-purple-50 to-violet-100",   icon: "text-purple-600 bg-purple-100",btn: "text-purple-700 hover:text-purple-900",bar: "bg-purple-500" },
  orange: { bg: "from-orange-50 to-amber-100",    icon: "text-orange-600 bg-orange-100",btn: "text-orange-700 hover:text-orange-900",bar: "bg-orange-400" },
  red:    { bg: "from-red-50 to-rose-100",        icon: "text-red-600 bg-red-100",      btn: "text-red-700 hover:text-red-900",      bar: "bg-red-500"    },
};
const DEFAULT_CARD_STYLE = CARD_STYLES.green;

/* ── Card skeleton ───────────────────────────────────────────────── */
function CardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-50 animate-pulse">
      <div className="h-40 bg-zinc-200" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-5 bg-zinc-200 rounded-lg w-2/3" />
        <div className="h-3 bg-zinc-200 rounded-lg w-full" />
        <div className="h-3 bg-zinc-200 rounded-lg w-4/5" />
      </div>
    </div>
  );
}

/* ── Single card ─────────────────────────────────────────────────── */
function PageCard({ page, index }) {
  const style   = CARD_STYLES[page.card_color] ?? DEFAULT_CARD_STYLE;
  const PageIcon = page.icon ? ICON_MAP[page.icon] : null;
  const imgUrl  = page.image_id ? getBannerUrl(page.image_id) : null;

  return (
    <Link
      to={`/page/${page.slug}`}
      data-reveal="fade-up"
      data-reveal-delay={String(Math.min(index * 100, 400))}
      className="group flex flex-col rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white"
    >
      {/* Image or gradient header */}
      {imgUrl ? (
        <div className="h-44 overflow-hidden">
          <img
            src={imgUrl}
            alt={page.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className={`h-44 bg-gradient-to-br ${style.bg} flex items-center justify-center`}>
          {PageIcon ? (
            <PageIcon className={`text-5xl ${style.icon.split(" ")[0]}`} />
          ) : (
            <div className={`w-12 h-12 rounded-2xl ${style.bar} opacity-30`} />
          )}
        </div>
      )}

      {/* Top colour bar */}
      <div className={`h-1 ${style.bar}`} />

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Icon chip */}
        {PageIcon && imgUrl && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${style.icon}`}>
            <PageIcon className="text-base" />
          </div>
        )}

        <h3 className="text-base font-bold text-zinc-900 font-raleway leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
          {page.title}
        </h3>

        {page.subtitle && (
          <p className="text-sm text-zinc-500 font-worksans leading-relaxed line-clamp-3">
            {page.subtitle}
          </p>
        )}

        <div className={`mt-auto pt-2 flex items-center gap-1 text-sm font-semibold font-raleway ${style.btn} transition-colors`}>
          Read more <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURED SECTION — shown on landing page
   Only renders if at least 1 published dynamic page exists.
   ═══════════════════════════════════════════════════════════════════ */
export default function FeaturedSection() {
  const [pages,   setPages]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPages().then((data) => {
      setPages(data);
      setLoading(false);
    });
  }, []);

  // Don't render the section at all when there's nothing to show
  if (!loading && pages.length === 0) return null;

  return (
    <section className="snap-section py-20 px-4 bg-white" id="featured">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-12 flex flex-col items-center text-center gap-3">
          <span
            data-reveal="fade-up"
            className="inline-block text-xs font-bold tracking-widest uppercase text-green-600 bg-green-50 px-4 py-1.5 rounded-full"
          >
            Explore
          </span>
          <h2
            data-reveal="fade-up"
            data-reveal-delay="100"
            className="text-3xl md:text-4xl font-bold text-zinc-900 font-raleway"
          >
            Our Initiatives
          </h2>
          <p
            data-reveal="fade-up"
            data-reveal-delay="200"
            className="text-zinc-500 font-worksans max-w-lg text-base"
          >
            Click any card to learn more about our work, research, and programs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
            : pages.map((page, i) => <PageCard key={page.id} page={page} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}
