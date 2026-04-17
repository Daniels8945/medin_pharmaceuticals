import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import {
  useSiteContent,
  DEFAULT_HERO, DEFAULT_HEADER, DEFAULT_SECTIONS, DEFAULT_ABOUT, DEFAULT_FOOTER,
  DEFAULT_NAV_PRODUCTS, DEFAULT_MISSION, DEFAULT_COMPANY, DEFAULT_DIRECTORS,
  DEFAULT_WORKPLACE, DEFAULT_CAREERS,
} from "@/context/SiteContentContext";
import { setSiteContent, uploadImage, getBannerUrl } from "@/appwrite";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  MdImage, MdTextFields, MdViewModule, MdSave, MdCloudUpload, MdDeleteForever,
  MdCheckCircle, MdLocationOn, MdAdd, MdBusiness, MdPeopleAlt,
  MdApartment, MdWork, MdFlag, MdMenu, MdClose,
} from "react-icons/md";
import { FaUsers, FaPills } from "react-icons/fa";

/* ── Sidebar nav structure ───────────────────────────────────────── */
const NAV_GROUPS = [
  {
    group: "Landing Page",
    items: [
      { id: "hero",    label: "Hero",             icon: MdImage },
      { id: "about",   label: "About Section",    icon: FaUsers },
      { id: "footer",  label: "Contact & Footer", icon: MdLocationOn },
    ],
  },
  {
    group: "Navigation",
    items: [
      { id: "header",   label: "Header CTA",       icon: MdTextFields },
      { id: "products", label: "Products Dropdown", icon: FaPills },
    ],
  },
  {
    group: "Pages",
    items: [
      { id: "mission",   label: "Mission & Vision",     icon: MdFlag },
      { id: "company",   label: "Our Company",          icon: MdBusiness },
      { id: "directors", label: "Board of Directors",   icon: MdPeopleAlt },
      { id: "workplace", label: "Workplace & Partners", icon: MdApartment },
      { id: "careers",   label: "Careers",              icon: MdWork },
    ],
  },
  {
    group: "Settings",
    items: [
      { id: "sections", label: "Section Visibility", icon: MdViewModule },
    ],
  },
];

const ALL_NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items);

/* ── Shared styles ───────────────────────────────────────────────── */
const inputClass =
  "w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 font-raleway placeholder-zinc-400 focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all";
const textareaClass =
  "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 font-raleway placeholder-zinc-400 focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all resize-none";
const labelClass = "text-sm font-semibold text-zinc-700 font-raleway";

/* ── Shared components ───────────────────────────────────────────── */
function Field({ label, hint, children, className = "" }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className={labelClass}>{label}</label>
      {hint && <p className="text-xs text-zinc-400 font-raleway -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}

function SaveButton({ saving, done, label = "Save" }) {
  return (
    <button
      type="submit"
      disabled={saving || done}
      className="w-full h-12 rounded-xl font-bold text-[15px] font-raleway transition-all duration-200 flex items-center justify-center gap-2 shadow-sm bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {done ? (
        <><MdCheckCircle className="text-lg" /> Saved!</>
      ) : saving ? (
        <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Saving…</>
      ) : (
        <><MdSave className="text-lg" /> {label}</>
      )}
    </button>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
        checked ? "bg-green-500" : "bg-zinc-300"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
        checked ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  );
}

// No setup warning needed — PHP/MySQL backend is always available
function SetupWarning() { return null; }

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col gap-5">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{title}</h3>
      {children}
    </div>
  );
}

/* ── Image upload helper ─────────────────────────────────────────── */
function ImageUploadButton({ fileId, onUpload, uploading, label = "Upload Photo", size = "md" }) {
  const ref = useRef(null);
  const sizeClass = size === "sm"
    ? "w-14 h-14 rounded-full"
    : "w-20 h-20 rounded-xl";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={cn(sizeClass, "overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center")}>
        {fileId ? (
          <img src={getBannerUrl(fileId)} alt="upload" className="w-full h-full object-cover" />
        ) : (
          <MdCloudUpload className="text-zinc-400 text-xl" />
        )}
      </div>
      <label className={cn("text-xs font-semibold font-raleway cursor-pointer transition-colors", uploading ? "text-zinc-400" : "text-green-600 hover:text-green-700")}>
        {uploading ? "Uploading…" : label}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={e => e.target.files[0] && onUpload(e.target.files[0])}
        />
      </label>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: HERO
   ════════════════════════════════════════════════════════════════════ */
function HeroTab({ heroContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_HERO, ...heroContent });
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => { setForm({ ...DEFAULT_HERO, ...heroContent }); }, [heroContent]);

  const currentBannerSrc = bannerPreview
    ? bannerPreview
    : heroContent?.bannerImageId ? getBannerUrl(heroContent.bannerImageId) : null;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let data = { ...form };
      if (bannerFile) {
        const imageId = await uploadImage(bannerFile);
        data.bannerImageId = imageId;
      }
      await setSiteContent("hero", data);
      await refreshContent();
      setBannerFile(null);
      setBannerPreview(null);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Hero section saved!");
    } catch {
      toast.error("Failed to save. Check that the PHP backend is running.");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-5">
        <SectionCard title="Text Content">
          <Field label="Small text (above headline)">
            <input className={inputClass} value={form.smallText} onChange={e => setForm(p => ({ ...p, smallText: e.target.value }))} placeholder={DEFAULT_HERO.smallText} />
          </Field>
          <Field label="Main headline">
            <input className={inputClass} value={form.headline} onChange={e => setForm(p => ({ ...p, headline: e.target.value }))} placeholder={DEFAULT_HERO.headline} />
          </Field>
          <Field label="Subtext paragraph">
            <textarea rows={3} className={textareaClass} value={form.subtext} onChange={e => setForm(p => ({ ...p, subtext: e.target.value }))} placeholder={DEFAULT_HERO.subtext} />
          </Field>
          <Field label="Badge text">
            <input className={inputClass} value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} placeholder={DEFAULT_HERO.badge} />
          </Field>
          <div className="flex flex-col sm:flex-row gap-4">
            <Field label="Stats number" className="flex-1">
              <input className={inputClass} value={form.statsNumber} onChange={e => setForm(p => ({ ...p, statsNumber: e.target.value }))} placeholder="100K+" />
            </Field>
            <Field label="Stats label" className="flex-1">
              <input className={inputClass} value={form.statsText} onChange={e => setForm(p => ({ ...p, statsText: e.target.value }))} placeholder="Satisfied Customers" />
            </Field>
          </div>
          <SaveButton saving={saving} done={done} label="Save Hero Section" />
        </SectionCard>
      </div>

      <div className="lg:w-[300px] xl:w-[340px] flex flex-col gap-4">
        <SectionCard title="Banner Image">
          {currentBannerSrc ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 group">
              <img src={currentBannerSrc} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" onClick={() => { setBannerFile(null); setBannerPreview(null); }}
                  className="flex items-center gap-1.5 bg-white text-red-500 font-bold text-sm px-4 py-2 rounded-lg hover:bg-red-50">
                  <MdDeleteForever /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current?.click()}
              className={cn(
                "w-full aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all",
                dragOver ? "border-green-400 bg-green-50" : "border-zinc-300 bg-zinc-50 hover:border-green-400 hover:bg-green-50/50"
              )}
            >
              <MdCloudUpload className={cn("text-3xl", dragOver ? "text-green-500" : "text-zinc-400")} />
              <p className="text-sm font-semibold text-zinc-600 font-raleway">{dragOver ? "Drop it here" : "Click or drag to upload"}</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} className="hidden" />
          <p className="text-xs text-zinc-400 font-raleway text-center">
            {heroContent?.bannerImageId ? "Using a custom uploaded banner." : "Using the default banner. Upload to replace it."}
          </p>
        </SectionCard>
      </div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: HEADER
   ════════════════════════════════════════════════════════════════════ */
function HeaderTab({ headerContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_HEADER, ...headerContent });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setForm({ ...DEFAULT_HEADER, ...headerContent }); }, [headerContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("header", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Header saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-5">
      <SectionCard title="Navigation Header">
        <Field label="CTA button text" hint="The green call-to-action button in the top-right of the header.">
          <input className={inputClass} value={form.ctaText} onChange={e => setForm(p => ({ ...p, ctaText: e.target.value }))} placeholder={DEFAULT_HEADER.ctaText} />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-raleway">Preview:</span>
            <span className="bg-green-500 text-white text-xs font-semibold font-raleway px-3 py-1 rounded-full">
              {form.ctaText || DEFAULT_HEADER.ctaText}
            </span>
          </div>
        </Field>
        <SaveButton saving={saving} done={done} label="Save Header" />
      </SectionCard>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: NAV PRODUCTS
   ════════════════════════════════════════════════════════════════════ */
function NavProductsTab({ navProductsContent, refreshContent }) {
  const [items, setItems] = useState(
    Array.isArray(navProductsContent) && navProductsContent.length > 0
      ? navProductsContent
      : [...DEFAULT_NAV_PRODUCTS]
  );
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (Array.isArray(navProductsContent) && navProductsContent.length > 0) setItems(navProductsContent);
  }, [navProductsContent]);

  const update = (i, field, val) => setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("navProducts", items);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Products dropdown saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <SectionCard title="Products Dropdown">
        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-zinc-400 font-raleway">These appear in the header navigation Products menu.</p>
          <button type="button" onClick={() => setItems(p => [...p, { name: "", description: "" }])}
            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-sm font-raleway px-4 py-2 rounded-xl transition-colors border border-green-200">
            <MdAdd /> Add
          </button>
        </div>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-3 items-end p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <Field label="Product Name" className="flex-1">
              <input className={inputClass} value={item.name} onChange={e => update(i, "name", e.target.value)} placeholder="e.g. IV Fluids" />
            </Field>
            <Field label="Short Description" className="flex-1">
              <input className={inputClass} value={item.description} onChange={e => update(i, "description", e.target.value)} placeholder="e.g. 500ml sterile solution" />
            </Field>
            <button type="button" onClick={() => setItems(p => p.filter((_, idx) => idx !== i))}
              className="flex items-center gap-1 text-red-400 hover:text-red-600 text-sm font-raleway px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors shrink-0">
              <MdDeleteForever className="text-base" /> Remove
            </button>
          </div>
        ))}
      </SectionCard>
      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save Products" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: ABOUT US
   ════════════════════════════════════════════════════════════════════ */
function AboutTab({ aboutContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_ABOUT, ...aboutContent });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setForm({ ...DEFAULT_ABOUT, ...aboutContent }); }, [aboutContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("about", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("About Us section saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <SectionCard title="Section Headings">
          <Field label='"Why Us" label'><input className={inputClass} value={form.whyUsLabel} onChange={e => setForm(p => ({ ...p, whyUsLabel: e.target.value }))} /></Field>
          <Field label="Commitment heading"><input className={inputClass} value={form.commitmentHeading} onChange={e => setForm(p => ({ ...p, commitmentHeading: e.target.value }))} /></Field>
          <Field label='"About Us" label'><input className={inputClass} value={form.aboutUsLabel} onChange={e => setForm(p => ({ ...p, aboutUsLabel: e.target.value }))} /></Field>
          <Field label="Contribution heading"><input className={inputClass} value={form.contributionHeading} onChange={e => setForm(p => ({ ...p, contributionHeading: e.target.value }))} /></Field>
          <Field label="YouTube video URL" hint="The video shown in the About Us section.">
            <input className={inputClass} value={form.videoUrl} onChange={e => setForm(p => ({ ...p, videoUrl: e.target.value }))} placeholder="https://youtu.be/..." />
          </Field>
        </SectionCard>
        <SectionCard title="Body Text">
          <Field label="Company intro paragraph"><textarea rows={4} className={textareaClass} value={form.companyIntro} onChange={e => setForm(p => ({ ...p, companyIntro: e.target.value }))} /></Field>
          <Field label="Company name (large heading)"><input className={inputClass} value={form.companyName} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} /></Field>
          <Field label="Company history paragraph"><textarea rows={7} className={textareaClass} value={form.companyHistory} onChange={e => setForm(p => ({ ...p, companyHistory: e.target.value }))} /></Field>
        </SectionCard>
      </div>
      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save About Us" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: FOOTER
   ════════════════════════════════════════════════════════════════════ */
function FooterTab({ footerContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_FOOTER, ...footerContent });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setForm({ ...DEFAULT_FOOTER, ...footerContent }); }, [footerContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("footer", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Footer saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <SectionCard title="Corporate Office">
          <Field label="Email"><input type="email" className={inputClass} value={form.corporateEmail} onChange={e => setForm(p => ({ ...p, corporateEmail: e.target.value }))} /></Field>
          <Field label="Phone"><input className={inputClass} value={form.corporatePhone} onChange={e => setForm(p => ({ ...p, corporatePhone: e.target.value }))} /></Field>
          <Field label="Address"><textarea rows={3} className={textareaClass} value={form.corporateAddress} onChange={e => setForm(p => ({ ...p, corporateAddress: e.target.value }))} /></Field>
        </SectionCard>
        <SectionCard title="Factory">
          <Field label="Email"><input type="email" className={inputClass} value={form.factoryEmail} onChange={e => setForm(p => ({ ...p, factoryEmail: e.target.value }))} /></Field>
          <Field label="Phone"><input className={inputClass} value={form.factoryPhone} onChange={e => setForm(p => ({ ...p, factoryPhone: e.target.value }))} /></Field>
          <Field label="Address"><textarea rows={3} className={textareaClass} value={form.factoryAddress} onChange={e => setForm(p => ({ ...p, factoryAddress: e.target.value }))} /></Field>
        </SectionCard>
      </div>
      <SectionCard title="Social Media Links">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[["linkedinUrl","LinkedIn URL"],["twitterUrl","Twitter / X URL"],["instagramUrl","Instagram URL"],["facebookUrl","Facebook URL"],["youtubeUrl","YouTube URL"]].map(([key, label]) => (
            <Field key={key} label={label}>
              <input className={inputClass} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder="https://..." />
            </Field>
          ))}
        </div>
        <Field label="Copyright text">
          <input className={inputClass} value={form.copyright} onChange={e => setForm(p => ({ ...p, copyright: e.target.value }))} />
        </Field>
      </SectionCard>
      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save Footer" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: MISSION & VISION
   ════════════════════════════════════════════════════════════════════ */
function MissionTab({ missionContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_MISSION, ...missionContent });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setForm({ ...DEFAULT_MISSION, ...missionContent }); }, [missionContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("mission", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Mission & Vision saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <SectionCard title="Mission & Vision Page">
        <Field label="Page hero title" hint='Shown in the green banner at the top of the page.'>
          <input className={inputClass} value={form.heroTitle} onChange={e => setForm(p => ({ ...p, heroTitle: e.target.value }))} placeholder={DEFAULT_MISSION.heroTitle} />
        </Field>
        <Field label="Objectives" hint="Each line is shown as a paragraph.">
          <textarea rows={8} className={textareaClass} value={form.objectivesText} onChange={e => setForm(p => ({ ...p, objectivesText: e.target.value }))} placeholder={DEFAULT_MISSION.objectivesText} />
        </Field>
        <Field label="Vision">
          <textarea rows={4} className={textareaClass} value={form.visionText} onChange={e => setForm(p => ({ ...p, visionText: e.target.value }))} />
        </Field>
        <Field label="Mission">
          <textarea rows={4} className={textareaClass} value={form.missionText} onChange={e => setForm(p => ({ ...p, missionText: e.target.value }))} />
        </Field>
      </SectionCard>
      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save Mission & Vision" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: OUR COMPANY
   ════════════════════════════════════════════════════════════════════ */
function CompanyTab({ companyContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_COMPANY, ...companyContent });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setForm({ ...DEFAULT_COMPANY, ...companyContent }); }, [companyContent]);

  const updateObjective = (i, val) =>
    setForm(p => ({ ...p, objectives: p.objectives.map((o, idx) => idx === i ? val : o) }));
  const addObjective    = () => setForm(p => ({ ...p, objectives: [...p.objectives, ""] }));
  const removeObjective = (i) => setForm(p => ({ ...p, objectives: p.objectives.filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("company", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Our Company page saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <SectionCard title="Hero Banner">
          <Field label="Page title">
            <input className={inputClass} value={form.heroTitle} onChange={e => setForm(p => ({ ...p, heroTitle: e.target.value }))} />
          </Field>
          <Field label="Hero subtitle">
            <textarea rows={3} className={textareaClass} value={form.heroSubtitle} onChange={e => setForm(p => ({ ...p, heroSubtitle: e.target.value }))} />
          </Field>
        </SectionCard>
        <SectionCard title="Mission & Vision">
          <Field label="Mission statement">
            <textarea rows={5} className={textareaClass} value={form.missionText} onChange={e => setForm(p => ({ ...p, missionText: e.target.value }))} />
          </Field>
          <Field label="Vision statement">
            <textarea rows={3} className={textareaClass} value={form.visionText} onChange={e => setForm(p => ({ ...p, visionText: e.target.value }))} />
          </Field>
        </SectionCard>
      </div>

      <SectionCard title="Company Overview">
        <Field label="Overview paragraph 1">
          <textarea rows={4} className={textareaClass} value={form.overview1} onChange={e => setForm(p => ({ ...p, overview1: e.target.value }))} />
        </Field>
        <Field label="Overview paragraph 2">
          <textarea rows={4} className={textareaClass} value={form.overview2} onChange={e => setForm(p => ({ ...p, overview2: e.target.value }))} />
        </Field>
      </SectionCard>

      <SectionCard title="Objectives List">
        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-zinc-400 font-raleway">Shown in the Objectives tab on the page.</p>
          <button type="button" onClick={addObjective}
            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-sm font-raleway px-4 py-2 rounded-xl transition-colors border border-green-200">
            <MdAdd /> Add
          </button>
        </div>
        {form.objectives.map((obj, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="mt-3 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
            <input className={cn(inputClass, "flex-1")} value={obj} onChange={e => updateObjective(i, e.target.value)} placeholder="Objective…" />
            <button type="button" onClick={() => removeObjective(i)}
              className="mt-1.5 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <MdDeleteForever className="text-base" />
            </button>
          </div>
        ))}
      </SectionCard>

      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save Our Company" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: BOARD OF DIRECTORS
   ════════════════════════════════════════════════════════════════════ */
function DirectorsTab({ directorsContent, refreshContent }) {
  const [items, setItems] = useState(
    Array.isArray(directorsContent) && directorsContent.length > 0
      ? directorsContent
      : [...DEFAULT_DIRECTORS]
  );
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  useEffect(() => {
    if (Array.isArray(directorsContent) && directorsContent.length > 0) setItems(directorsContent);
  }, [directorsContent]);

  const update = (i, field, val) =>
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));

  const handlePhotoUpload = async (i, file) => {
    if (!file) return;
    setUploadingIdx(i);
    try {
      const id = await uploadImage(file);
      update(i, "photoId", id);
      toast.success("Photo uploaded. Click Save to apply.");
    } catch { toast.error("Photo upload failed."); }
    setUploadingIdx(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("directors", items);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Board of Directors saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      <SectionCard title="Directors">
        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-zinc-400 font-raleway">Each director appears as a card on the Board of Directors page.</p>
          <button type="button" onClick={() => setItems(p => [...p, { name: "", title: "", bio: "", photoId: null }])}
            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-sm font-raleway px-4 py-2 rounded-xl transition-colors border border-green-200">
            <MdAdd /> Add Director
          </button>
        </div>

        {items.map((director, i) => (
          <div key={i} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <ImageUploadButton
                fileId={director.photoId}
                uploading={uploadingIdx === i}
                onUpload={file => handlePhotoUpload(i, file)}
                label="Photo"
                size="sm"
              />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Full Name">
                  <input className={inputClass} value={director.name} onChange={e => update(i, "name", e.target.value)} placeholder="Dr. Jane Doe" />
                </Field>
                <Field label="Title / Position">
                  <input className={inputClass} value={director.title} onChange={e => update(i, "title", e.target.value)} placeholder="Chairperson" />
                </Field>
                <Field label="Bio" className="sm:col-span-2">
                  <textarea rows={2} className={textareaClass} value={director.bio} onChange={e => update(i, "bio", e.target.value)} placeholder="Short biography…" />
                </Field>
              </div>
              <button type="button" onClick={() => setItems(p => p.filter((_, idx) => idx !== i))}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                <MdDeleteForever className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </SectionCard>
      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save Directors" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: WORKPLACE & PARTNERS
   ════════════════════════════════════════════════════════════════════ */
function WorkplaceTab({ workplaceContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_WORKPLACE, ...workplaceContent });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [uploadingFacility, setUploadingFacility] = useState(null);
  const [uploadingPartner, setUploadingPartner] = useState(null);

  useEffect(() => { setForm({ ...DEFAULT_WORKPLACE, ...workplaceContent }); }, [workplaceContent]);

  const updateFacility = (i, field, val) =>
    setForm(p => ({ ...p, facilities: p.facilities.map((f, idx) => idx === i ? { ...f, [field]: val } : f) }));
  const updatePartner = (i, field, val) =>
    setForm(p => ({ ...p, partners: p.partners.map((pt, idx) => idx === i ? { ...pt, [field]: val } : pt) }));

  const handleFacilityUpload = async (i, file) => {
    setUploadingFacility(i);
    try {
      const id = await uploadImage(file);
      updateFacility(i, "imageId", id);
      toast.success("Image uploaded. Click Save to apply.");
    } catch { toast.error("Upload failed."); }
    setUploadingFacility(null);
  };

  const handlePartnerUpload = async (i, file) => {
    setUploadingPartner(i);
    try {
      const id = await uploadImage(file);
      updatePartner(i, "logoId", id);
      toast.success("Logo uploaded. Click Save to apply.");
    } catch { toast.error("Upload failed."); }
    setUploadingPartner(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("workplace", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Workplace & Partners saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      <SectionCard title="Hero Banner">
        <Field label="Page title">
          <input className={inputClass} value={form.heroTitle} onChange={e => setForm(p => ({ ...p, heroTitle: e.target.value }))} />
        </Field>
        <Field label="Hero subtitle">
          <textarea rows={2} className={textareaClass} value={form.heroSubtitle} onChange={e => setForm(p => ({ ...p, heroSubtitle: e.target.value }))} />
        </Field>
      </SectionCard>

      <SectionCard title="Facilities">
        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-zinc-400 font-raleway">Each facility appears as an image card on the page.</p>
          <button type="button" onClick={() => setForm(p => ({ ...p, facilities: [...p.facilities, { caption: "", imageId: null }] }))}
            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-sm font-raleway px-4 py-2 rounded-xl transition-colors border border-green-200">
            <MdAdd /> Add
          </button>
        </div>
        {form.facilities.map((facility, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <ImageUploadButton
              fileId={facility.imageId}
              uploading={uploadingFacility === i}
              onUpload={file => handleFacilityUpload(i, file)}
              label="Image"
              size="md"
            />
            <Field label="Caption" className="flex-1">
              <input className={inputClass} value={facility.caption} onChange={e => updateFacility(i, "caption", e.target.value)} placeholder="e.g. Main Office" />
            </Field>
            <button type="button" onClick={() => setForm(p => ({ ...p, facilities: p.facilities.filter((_, idx) => idx !== i) }))}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 mt-5">
              <MdDeleteForever className="text-lg" />
            </button>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Partners">
        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-zinc-400 font-raleway">Each partner appears as a logo on the page.</p>
          <button type="button" onClick={() => setForm(p => ({ ...p, partners: [...p.partners, { name: "", logoId: null }] }))}
            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-sm font-raleway px-4 py-2 rounded-xl transition-colors border border-green-200">
            <MdAdd /> Add
          </button>
        </div>
        {form.partners.map((partner, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
            <ImageUploadButton
              fileId={partner.logoId}
              uploading={uploadingPartner === i}
              onUpload={file => handlePartnerUpload(i, file)}
              label="Logo"
              size="sm"
            />
            <Field label="Partner Name" className="flex-1">
              <input className={inputClass} value={partner.name} onChange={e => updatePartner(i, "name", e.target.value)} placeholder="e.g. GreenTech Ltd" />
            </Field>
            <button type="button" onClick={() => setForm(p => ({ ...p, partners: p.partners.filter((_, idx) => idx !== i) }))}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 mt-5">
              <MdDeleteForever className="text-lg" />
            </button>
          </div>
        ))}
      </SectionCard>

      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save Workplace & Partners" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: CAREERS
   ════════════════════════════════════════════════════════════════════ */
function CareersTab({ careersContent, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_CAREERS, ...careersContent });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [expandedJob, setExpandedJob] = useState(null);

  useEffect(() => { setForm({ ...DEFAULT_CAREERS, ...careersContent }); }, [careersContent]);

  const updateJob = (i, field, val) =>
    setForm(p => ({ ...p, jobs: p.jobs.map((j, idx) => idx === i ? { ...j, [field]: val } : j) }));

  const addJob = () => {
    const newIdx = form.jobs.length;
    setForm(p => ({ ...p, jobs: [...p.jobs, { title: "", qualification: "", experience: "", summary: "", responsibilities: [], email: "", deadline: "" }] }));
    setExpandedJob(newIdx);
  };

  const removeJob = (i) => {
    setForm(p => ({ ...p, jobs: p.jobs.filter((_, idx) => idx !== i) }));
    setExpandedJob(null);
  };

  const updateResponsibility = (jobIdx, respIdx, val) =>
    setForm(p => ({ ...p, jobs: p.jobs.map((j, ji) => ji !== jobIdx ? j : {
      ...j, responsibilities: j.responsibilities.map((r, ri) => ri === respIdx ? val : r)
    })}));

  const addResponsibility = (jobIdx) =>
    setForm(p => ({ ...p, jobs: p.jobs.map((j, ji) => ji !== jobIdx ? j : {
      ...j, responsibilities: [...j.responsibilities, ""]
    })}));

  const removeResponsibility = (jobIdx, respIdx) =>
    setForm(p => ({ ...p, jobs: p.jobs.map((j, ji) => ji !== jobIdx ? j : {
      ...j, responsibilities: j.responsibilities.filter((_, ri) => ri !== respIdx)
    })}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("careers", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Careers page saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      <SectionCard title="Hero Banner">
        <Field label="Page title">
          <input className={inputClass} value={form.heroTitle} onChange={e => setForm(p => ({ ...p, heroTitle: e.target.value }))} />
        </Field>
        <Field label="Hero subtitle">
          <textarea rows={3} className={textareaClass} value={form.heroSubtitle} onChange={e => setForm(p => ({ ...p, heroSubtitle: e.target.value }))} />
        </Field>
        <Field label="CTA email" hint={"Shown in the \"Don't see a fit?\" section at the bottom."}>
          <input type="email" className={inputClass} value={form.ctaEmail} onChange={e => setForm(p => ({ ...p, ctaEmail: e.target.value }))} />
        </Field>
      </SectionCard>

      <SectionCard title="Job Listings">
        <div className="flex items-center justify-between -mt-2">
          <p className="text-xs text-zinc-400 font-raleway">Each job appears as an expandable card on the Careers page.</p>
          <button type="button" onClick={addJob}
            className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-600 font-semibold text-sm font-raleway px-4 py-2 rounded-xl transition-colors border border-green-200">
            <MdAdd /> Add Job
          </button>
        </div>

        {form.jobs.map((job, i) => (
          <div key={i} className="rounded-xl border border-zinc-200 overflow-hidden">
            {/* Job header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 cursor-pointer" onClick={() => setExpandedJob(expandedJob === i ? null : i)}>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <p className="text-sm font-semibold font-raleway text-zinc-800">{job.title || "Untitled Job"}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={e => { e.stopPropagation(); removeJob(i); }}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <MdDeleteForever />
                </button>
                <span className="text-zinc-400 text-sm">{expandedJob === i ? "▲" : "▼"}</span>
              </div>
            </div>

            {expandedJob === i && (
              <div className="p-4 flex flex-col gap-4 border-t border-zinc-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Job Title">
                    <input className={inputClass} value={job.title} onChange={e => updateJob(i, "title", e.target.value)} />
                  </Field>
                  <Field label="Application Email">
                    <input type="email" className={inputClass} value={job.email} onChange={e => updateJob(i, "email", e.target.value)} />
                  </Field>
                  <Field label="Qualification">
                    <input className={inputClass} value={job.qualification} onChange={e => updateJob(i, "qualification", e.target.value)} />
                  </Field>
                  <Field label="Experience Required">
                    <input className={inputClass} value={job.experience} onChange={e => updateJob(i, "experience", e.target.value)} />
                  </Field>
                  <Field label="Deadline" className="sm:col-span-2">
                    <input className={inputClass} value={job.deadline} onChange={e => updateJob(i, "deadline", e.target.value)} placeholder="e.g. 15th February, 2026" />
                  </Field>
                </div>
                <Field label="Job Summary">
                  <textarea rows={3} className={textareaClass} value={job.summary} onChange={e => updateJob(i, "summary", e.target.value)} />
                </Field>

                {/* Responsibilities */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className={labelClass}>Key Responsibilities</label>
                    <button type="button" onClick={() => addResponsibility(i)}
                      className="flex items-center gap-1 text-green-600 text-xs font-semibold font-raleway hover:text-green-700">
                      <MdAdd /> Add
                    </button>
                  </div>
                  {(job.responsibilities || []).map((resp, ri) => (
                    <div key={ri} className="flex items-center gap-2">
                      <input className={cn(inputClass, "flex-1")} value={resp} onChange={e => updateResponsibility(i, ri, e.target.value)} placeholder="Responsibility…" />
                      <button type="button" onClick={() => removeResponsibility(i, ri)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                        <MdDeleteForever />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </SectionCard>

      <div className="max-w-xs"><SaveButton saving={saving} done={done} label="Save Careers Page" /></div>
    </form>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TAB: SECTIONS
   ════════════════════════════════════════════════════════════════════ */
function SectionsTab({ sectionsConfig, refreshContent }) {
  const [form, setForm] = useState({ ...DEFAULT_SECTIONS, ...sectionsConfig });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setForm({ ...DEFAULT_SECTIONS, ...sectionsConfig }); }, [sectionsConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setSiteContent("sections", form);
      await refreshContent();
      setDone(true);
      setTimeout(() => setDone(false), 2000);
      toast.success("Sections visibility saved!");
    } catch { toast.error("Failed to save."); }
    setSaving(false);
  };

  const rows = [
    { key: "showProducts", label: "Products Section",  description: "The product carousel on the landing page." },
    { key: "showAbout",    label: "About Us Section",  description: "The About Us section of the landing page." },
    { key: "showContact",  label: "Contact & Footer",  description: "The contact form and footer at the bottom." },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-5">
      <SectionCard title="Landing Page Sections">
        <p className="text-sm text-zinc-500 font-raleway -mt-2">Toggle which sections appear on the public landing page. The Hero section is always shown.</p>
        {rows.map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between gap-4 py-3 border-b border-zinc-100 last:border-0">
            <div>
              <p className="text-sm font-semibold text-zinc-800 font-raleway">{label}</p>
              <p className="text-xs text-zinc-400 font-raleway mt-0.5">{description}</p>
            </div>
            <Toggle checked={form[key]} onChange={val => setForm(p => ({ ...p, [key]: val }))} />
          </div>
        ))}
      </SectionCard>
      <SaveButton saving={saving} done={done} label="Save Sections" />
    </form>
  );
}

/* ── Sidebar (defined outside SiteEditor to keep linter happy and avoid re-mount on every render) */
function Sidebar({ active, setActive, onSelect }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV_GROUPS.map(({ group, items }) => (
        <div key={group} className="mb-3">
          <p className="px-3 mb-1 text-[10px] font-bold tracking-widest uppercase text-zinc-400">{group}</p>
          {items.map((item) => {
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => { setActive(item.id); onSelect?.(); }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold font-raleway transition-all duration-150 text-left",
                  active === item.id
                    ? "bg-green-500 text-white shadow-sm shadow-green-200"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                )}
              >
                <ItemIcon className="text-base shrink-0" />
                {item.label}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════════ */
export default function SiteEditor() {
  const {
    heroContent, headerContent, sectionsConfig, aboutContent, footerContent,
    navProductsContent, missionContent, companyContent, directorsContent,
    workplaceContent, careersContent, refreshContent,
  } = useSiteContent();

  const [active, setActive] = useState("hero");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const activeLabel = ALL_NAV_ITEMS.find(i => i.id === active)?.label ?? "Editor";

  return (
    <AdminLayout title="Site Editor">
      <div className="flex" style={{ minHeight: "calc(100vh - 60px)" }}>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[210px] xl:w-[230px] shrink-0 border-r border-zinc-200 bg-white overflow-y-auto" style={{ position: "sticky", top: 0, alignSelf: "flex-start", maxHeight: "calc(100vh - 60px)" }}>
          <Sidebar active={active} setActive={setActive} />
        </aside>

        {/* Mobile: top bar with section name + menu button */}
        <div className="lg:hidden fixed top-[60px] left-0 right-0 z-30 bg-white border-b border-zinc-200 flex items-center justify-between px-4 py-3 shadow-sm">
          <div>
            <p className="text-xs text-zinc-400 font-raleway">Editing</p>
            <p className="text-sm font-bold font-raleway text-zinc-800">{activeLabel}</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold font-raleway text-sm px-3 py-2 rounded-xl transition-colors"
          >
            <MdMenu /> Sections
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileSidebarOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
            <div className="fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-2xl overflow-y-auto lg:hidden">
              <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-100">
                <p className="text-sm font-bold font-raleway text-zinc-800">Site Sections</p>
                <button type="button" onClick={() => setMobileSidebarOpen(false)} className="text-zinc-400 hover:text-zinc-700">
                  <MdClose className="text-xl" />
                </button>
              </div>
              <Sidebar active={active} setActive={setActive} onSelect={() => setMobileSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Main editor content */}
        <div className="flex-1 p-5 xl:p-8 pt-[calc(1.25rem+60px)] lg:pt-5 min-w-0">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-900 font-raleway">{activeLabel}</h2>
            <p className="text-sm text-zinc-400 font-raleway mt-0.5">Edit the content for this section of your website.</p>
          </div>

          <SetupWarning />

          {active === "hero"      && <HeroTab         heroContent={heroContent}               refreshContent={refreshContent} />}
          {active === "about"     && <AboutTab         aboutContent={aboutContent}             refreshContent={refreshContent} />}
          {active === "footer"    && <FooterTab        footerContent={footerContent}           refreshContent={refreshContent} />}
          {active === "header"    && <HeaderTab        headerContent={headerContent}           refreshContent={refreshContent} />}
          {active === "products"  && <NavProductsTab   navProductsContent={navProductsContent} refreshContent={refreshContent} />}
          {active === "mission"   && <MissionTab       missionContent={missionContent}         refreshContent={refreshContent} />}
          {active === "company"   && <CompanyTab       companyContent={companyContent}         refreshContent={refreshContent} />}
          {active === "directors" && <DirectorsTab     directorsContent={directorsContent}     refreshContent={refreshContent} />}
          {active === "workplace" && <WorkplaceTab     workplaceContent={workplaceContent}     refreshContent={refreshContent} />}
          {active === "careers"   && <CareersTab       careersContent={careersContent}         refreshContent={refreshContent} />}
          {active === "sections"  && <SectionsTab      sectionsConfig={sectionsConfig}         refreshContent={refreshContent} />}
        </div>
      </div>
    </AdminLayout>
  );
}
