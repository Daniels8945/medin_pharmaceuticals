import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getSiteContent } from "@/appwrite";

export const DEFAULT_HERO = {
  smallText: "Experiment with years of research and development",
  headline: "Simplified Formulation",
  subtext: "We create healthy innovations to make healthcare affordable and accessible to the Nigerian health sector.",
  badge: "Medin Pharmaceuticals",
  statsNumber: "100K+",
  statsText: "Satisfied Customers",
  bannerImageId: null,
};

export const DEFAULT_HEADER = {
  ctaText: "Become A Distributor",
};

export const DEFAULT_SECTIONS = {
  showProducts: true,
  showAbout: true,
  showContact: true,
};

export const DEFAULT_ABOUT = {
  whyUsLabel: "Why Us",
  commitmentHeading: "Our Commitment to Quality",
  aboutUsLabel: "About Us",
  contributionHeading: "Our contribution to health care needs",
  companyIntro: "MED-IN Hospital & Pharmaceuticals Services Limited has its corporate office located at 5C Adekunle Lawal Road of second Avenue, Ikoyi, Lagos State, Nigeria was incorporated in 1987 as a wholesale pharmaceutical company.",
  companyName: "Medin Pharmaceuticals",
  companyHistory: "MED-IN Pharmaceutical Intravenous (I.V) fluid production plant began operations with its existing plant in the year 2018, after the registration of it's premises by the Pharmaceutical Council of Nigeria (PCN). The current operating and product plant had it's product approved by the National Agency for Food and Drug Administration (NAFDAC) in the same year. The Intravenous (I.V.) factory is situated on Lagos-Ibadan Expressway, near Shagamu Interchange, Ogun State, with an installed capacity of 3.6million bottles per annum with allowance for 500% expansion of the installed capacity. However, currently there is an on-going project to install equipment – Rommelag 360 – with a capacity of 21 million bottles per annum and Rommelag 360M in 2021",
  videoUrl: "https://youtu.be/lmVzPh3M4ec?si=_bxEI3kCByTFZ5de",
};

export const DEFAULT_NAV_PRODUCTS = [
  { name: "New Product", description: "iV fluid" },
  { name: "New Product", description: "iV fluid" },
  { name: "New Product", description: "iV fluid" },
];

export const DEFAULT_FOOTER = {
  corporateEmail: "info@medinpharma.com",
  corporatePhone: "+234 708 058 2578",
  corporateAddress: "5C, Adekunle Lawal Street, Off 2nd Avenue, Ikoyi Lagos",
  factoryEmail: "info@medinpharma.com",
  factoryPhone: "+234 9060734377",
  factoryAddress: "Lagos-Ibadan Express way Shagamu Interchange",
  copyright: "© Medin Pharmaceuticals 2025 - All rights reserved | Designed by Hydro Bytes",
  linkedinUrl: "",
  twitterUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
};

export const DEFAULT_MISSION = {
  heroTitle: "United by Purpose",
  objectivesText: "To contribute to the Healthcare needs of the Country.\nProduction of large and small volume parental intravenous fluids in the nation.\nTo ensure a robust customer/supplier relationship via quality products and on-time delivery.\nTo ensure that Med-In parental fluids are readily available in major healthcare centers in the Country.\nTo also engage appropriate partnerships with Health Institutions applying Med-In framework.",
  visionText: "Meeting the health sector needs through the production of quality parenteral pharmaceutical products at affordable cost.",
  missionText: "Sustainable delivery of high-quality pharmaceutical products of world health organization (WHO) and national agency for food and drug administration (NAFDAC) prescribed standards, at an affordable cost to the Nigerian health sector and the sub-region.",
};

export const DEFAULT_COMPANY = {
  heroTitle: "Our Company",
  heroSubtitle: "Our contribution to healthcare needs — incorporated in 1987 and committed to making quality pharmaceuticals accessible and affordable.",
  overview1: "MED-IN Hospital & Pharmaceuticals Services Limited has its corporate office located at 5C Adekunle Lawal Street, Off 2nd Avenue, Ikoyi, Lagos State, Nigeria. Incorporated in 1987 as a wholesale pharmaceutical company, MED-IN has grown into a key player in the Nigerian health sector.",
  overview2: "MED-IN's Intravenous (I.V.) fluid production plant began operations in 2018, after registration of its premises by the Pharmaceutical Council of Nigeria (PCN). Products were approved by NAFDAC in the same year. The I.V. factory is situated on the Lagos-Ibadan Expressway, near Shagamu Interchange, Ogun State, with an installed capacity of 3.6 million bottles per annum and allowance for 500% expansion. An ongoing project is installing Rommelag 360 equipment with a capacity of 21 million bottles per annum.",
  objectives: [
    "Contribute to the healthcare needs of the country.",
    "Production of large and small volume parenteral intravenous fluids in the nation.",
    "Ensure a robust customer/supplier relationship via quality products and on-time delivery.",
    "Ensure that Med-In parenteral fluids are readily available in major healthcare centres across the country.",
    "Engage appropriate partnerships with health institutions applying the Med-In framework.",
  ],
  missionText: "Sustainable delivery of high-quality pharmaceutical products of World Health Organization (WHO) and National Agency for Food and Drug Administration (NAFDAC) prescribed standards, at an affordable cost to the Nigerian health sector and the sub-region.",
  visionText: "Meeting the health sector needs through the production of quality parenteral pharmaceutical products at affordable cost.",
};

export const DEFAULT_DIRECTORS = [
  { name: "Dr. Jane Doe",    title: "Chairperson",         bio: "Dr. Jane brings 20 years of leadership in the energy sector and sits on multiple international boards.", photoId: null },
  { name: "Mr. John Smith",  title: "Managing Director",   bio: "A strategic thinker with expertise in business development and operations management.",                  photoId: null },
  { name: "Mrs. Linda White",title: "Director of Finance", bio: "Linda has over 15 years of experience in corporate finance and capital planning.",                       photoId: null },
];

export const DEFAULT_WORKPLACE = {
  heroTitle: "Our Workplace & Partners",
  heroSubtitle: "Explore our facilities, production plant, and the partners who help us deliver on our mission.",
  facilities: [
    { caption: "Team Collaboration Space", imageId: null },
    { caption: "Product Testing Lab",      imageId: null },
    { caption: "Main Office",              imageId: null },
    { caption: "Annual Innovation Meetup", imageId: null },
  ],
  partners: [
    { name: "GreenTech Ltd",       logoId: null },
    { name: "TechBridge Africa",   logoId: null },
    { name: "SolarEdge Partners",  logoId: null },
    { name: "DataSync Systems",    logoId: null },
  ],
};

export const DEFAULT_CAREERS = {
  heroTitle: "Join a Team Committed to Excellence",
  heroSubtitle: "At MedinPharma, we believe our people are our greatest strength. We are passionate about innovation, growth, and delivering meaningful solutions that make an impact. If you're driven, curious, and ready to grow your career, we'd love to work with you.",
  ctaEmail: "info@medinpharma.com",
  jobs: [
    {
      title: "Chief Finance Officer (CFO)",
      qualification: "BSc or HND in Accounting",
      experience: "Minimum of 15 years cognate experience in the manufacturing industry",
      summary: "The CFO will be responsible for overseeing the company's overall financial operations and ensuring long-term financial sustainability. The role involves setting financial strategies, managing financial risks, and maintaining the fiscal health of the organization.",
      responsibilities: [
        "Oversee all financial operations of the company",
        "Develop and implement financial strategies aligned with business goals",
        "Manage budgeting, forecasting, and cash flow",
        "Monitor and mitigate financial risks",
        "Ensure long-term financial growth and stability",
        "Handle investor relations and financial reporting",
      ],
      email: "alexanderejere@medinpharm.com",
      deadline: "15th February, 2026",
    },
    {
      title: "Production Pharmacist",
      qualification: "Minimum of BSc in Pharmacy",
      experience: "Minimum of 2 years cognate experience in a manufacturing company",
      summary: "The Production Pharmacist will support pharmaceutical manufacturing operations with a focus on infusion and drug development, coordinating production staff, ensuring regulatory compliance, and promoting efficiency within the production process.",
      responsibilities: [
        "Participate in infusion and drug development processes",
        "Coordinate and supervise production staff",
        "Ensure compliance with regulatory and quality standards",
        "Support regulatory affairs and documentation requirements",
        "Promote productivity and continuous process improvement",
      ],
      email: "alexanderejere@medinpharm.com",
      deadline: "15th February, 2026",
    },
    {
      title: "Cost Accountant",
      qualification: "Minimum of BSc or HND in Accounting",
      experience: "Minimum of 5 years relevant experience in a manufacturing company",
      summary: "The Cost Accountant will analyze production costs, manage inventory valuation, and provide financial insights to support cost control and informed decision-making across manufacturing operations.",
      responsibilities: [
        "Analyze production costs including materials, labour, and overhead",
        "Manage inventory valuation and develop standard costing systems",
        "Monitor cost variances against budgets and report findings",
        "Identify opportunities for cost reduction and efficiency improvement",
        "Work closely with operations and management for accurate financial reporting",
        "Support management with cost analysis for strategic decision-making",
      ],
      email: "alexanderejere@medinpharm.com",
      deadline: "15th February, 2026",
    },
  ],
};

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [heroContent,      setHeroContent]      = useState(DEFAULT_HERO);
  const [headerContent,    setHeaderContent]    = useState(DEFAULT_HEADER);
  const [sectionsConfig,   setSectionsConfig]   = useState(DEFAULT_SECTIONS);
  const [aboutContent,     setAboutContent]     = useState(DEFAULT_ABOUT);
  const [footerContent,    setFooterContent]    = useState(DEFAULT_FOOTER);
  const [navProductsContent, setNavProductsContent] = useState(DEFAULT_NAV_PRODUCTS);
  const [missionContent,   setMissionContent]   = useState(DEFAULT_MISSION);
  const [companyContent,   setCompanyContent]   = useState(DEFAULT_COMPANY);
  const [directorsContent, setDirectorsContent] = useState(DEFAULT_DIRECTORS);
  const [workplaceContent, setWorkplaceContent] = useState(DEFAULT_WORKPLACE);
  const [careersContent,   setCareersContent]   = useState(DEFAULT_CAREERS);
  const [contentLoading,   setContentLoading]   = useState(true);

  const refreshContent = useCallback(async () => {
    setContentLoading(true);
    try {
      const [hero, header, sections, about, footer, navProducts, mission, company, directors, workplace, careers] =
        await Promise.all([
          getSiteContent("hero"),
          getSiteContent("header"),
          getSiteContent("sections"),
          getSiteContent("about"),
          getSiteContent("footer"),
          getSiteContent("navProducts"),
          getSiteContent("mission"),
          getSiteContent("company"),
          getSiteContent("directors"),
          getSiteContent("workplace"),
          getSiteContent("careers"),
        ]);
      if (hero)        setHeroContent     (prev => ({ ...prev, ...hero }));
      if (header)      setHeaderContent   (prev => ({ ...prev, ...header }));
      if (sections)    setSectionsConfig  (prev => ({ ...prev, ...sections }));
      if (about)       setAboutContent    (prev => ({ ...prev, ...about }));
      if (footer)      setFooterContent   (prev => ({ ...prev, ...footer }));
      if (navProducts) setNavProductsContent(navProducts);
      if (mission)     setMissionContent  (prev => ({ ...prev, ...mission }));
      if (company)     setCompanyContent  (prev => ({ ...prev, ...company }));
      if (directors && Array.isArray(directors)) setDirectorsContent(directors);
      if (workplace)   setWorkplaceContent(prev => ({ ...prev, ...workplace }));
      if (careers)     setCareersContent  (prev => ({ ...prev, ...careers }));
    } catch {
      // silently fall back to defaults
    }
    setContentLoading(false);
  }, []);

  useEffect(() => { refreshContent(); }, [refreshContent]);

  return (
    <SiteContentContext.Provider
      value={{
        heroContent, headerContent, sectionsConfig, aboutContent, footerContent,
        navProductsContent, missionContent, companyContent, directorsContent,
        workplaceContent, careersContent,
        refreshContent, contentLoading,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export const useSiteContent = () => useContext(SiteContentContext);
