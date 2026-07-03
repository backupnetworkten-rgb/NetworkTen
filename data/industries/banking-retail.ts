export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryChallenge {
  icon: "vault" | "people" | "compliance" | "downtime" | "visibility";
  title: string;
  description: string;
}

export interface IndustryProduct {
  icon:
    | "camera"
    | "wifi"
    | "biometric"
    | "fire"
    | "booster"
    | "gps"
    | "pos"
    | "solar"
    | "lock"
    | "audio"
    | "epabx";
  title: string;
  description: string;
}

export interface IndustryProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface IndustryData {
  slug: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  stats: IndustryStat[];
  challenges: IndustryChallenge[];
  products: IndustryProduct[];
  process: IndustryProcessStep[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  faqs: IndustryFAQ[];
}

export const bankingRetail: IndustryData = {
  slug: "banking-retail",
  eyebrow: "Industry Solution",
  title: "Banking & Retail",
  tagline: "Every branch and till, watched, connected and backed up.",
  description:
    "Banks and retail floors run on trust — customers need to feel safe, cash needs to stay accounted for, and the counter can never go dark during business hours. We design and install the surveillance, access, networking and power systems that keep every branch and store running the same way, whether it's one outlet or two hundred.",
  heroImage:
    "https://plus.unsplash.com/premium_photo-1769842895659-724d64bbafd7?w=1600&auto=format&fit=crop&q=80",
  stats: [
    { value: "500+", label: "Branches & Stores Secured" },
    { value: "24/7", label: "Monitoring Coverage" },
    { value: "48 hrs", label: "Average Install Time" },
    { value: "99.9%", label: "Uptime SLA" },
  ],
  challenges: [
    {
      icon: "vault",
      title: "Cash and vault exposure",
      description:
        "Tellers, ATMs and vaults are the first place risk shows up. Coverage needs to be continuous, not just at the counter.",
    },
    {
      icon: "people",
      title: "Staff and customer safety",
      description:
        "Queues, peak hours and cash handling all raise the stakes for the people on the floor, not just the assets.",
    },
    {
      icon: "compliance",
      title: "Audit and compliance records",
      description:
        "Regulators expect retrievable footage and access logs on demand, not best-effort backups.",
    },
    {
      icon: "downtime",
      title: "Downtime at the counter",
      description:
        "A dropped connection during a transaction is a lost sale or an angry customer. Networking has to hold under load.",
    },
    {
      icon: "visibility",
      title: "Multi-branch blind spots",
      description:
        "Head office needs one view across every location, not a different login for every branch manager.",
    },
  ],
  products: [
    {
      icon: "camera",
      title: "High-End CCTV Camera",
      description:
        "4K and low-light cameras covering counters, vaults, entrances and ATMs, with remote playback for head office.",
    },
    {
      icon: "wifi",
      title: "Wifi Zone",
      description:
        "Segmented staff and guest networks so customer wifi never competes with your point-of-sale traffic.",
    },
    {
      icon: "biometric",
      title: "Access Control & Biometric",
      description:
        "Fingerprint and card entry on vaults, server rooms and staff-only areas, with a full access log.",
    },
    {
      icon: "fire",
      title: "Fire Alarm Solutions",
      description:
        "Early smoke and heat detection wired into a central panel, sized for cash offices and back rooms alike.",
    },
    {
      icon: "booster",
      title: "Mobile Boosters",
      description:
        "In-branch signal boosting so card machines and staff devices hold a connection during busy hours.",
    },
    {
      icon: "gps",
      title: "Mobile NVR, Camera & GPS",
      description:
        "Live tracking and onboard recording for cash-in-transit vehicles, from depot to branch.",
    },
    {
      icon: "pos",
      title: "Billing Desktops & Thermal Printers",
      description:
        "Point-of-sale hardware built for fast, reliable checkout — no queue backups from a slow terminal.",
    },
    {
      icon: "solar",
      title: "Solar Panel",
      description:
        "Backup and supplementary power so cameras, locks and alarms stay live through an outage.",
    },
    {
      icon: "lock",
      title: "Digital Lock",
      description:
        "Keyless, audit-logged locking for cabinets, lockers and storage — no more re-cutting keys after staff turnover.",
    },
    {
      icon: "audio",
      title: "Public Address Audio System",
      description:
        "Branch-wide announcements and emergency alerts that reach the whole floor, not just the front desk.",
    },
    {
      icon: "epabx",
      title: "Telephone Exchange EPABX",
      description:
        "Internal extension lines connecting every desk and department without routing calls through mobiles.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Site assessment",
      description:
        "We walk the branch or store, map coverage gaps, and check what's already in place before recommending anything.",
    },
    {
      step: "02",
      title: "Design & compliance check",
      description:
        "A layout sized to the floor plan and cross-checked against retention and audit requirements.",
    },
    {
      step: "03",
      title: "Installation",
      description:
        "Scheduled around business hours so the branch keeps operating while the work happens.",
    },
    {
      step: "04",
      title: "Monitoring & support",
      description:
        "Ongoing maintenance and a support line, so a faulty camera or lock gets fixed before it becomes a gap.",
    },
  ],
  testimonial: {
    quote:
      "We rolled out across twelve branches without closing a single one for more than an afternoon. Head office can now see every location from one screen.",
    name: "Ritu Kapoor",
    role: "Operations Manager, regional retail bank",
  },
  faqs: [
    {
      question: "Can this integrate with cameras or alarms we already have?",
      answer:
        "In most cases, yes. We assess your existing hardware during the site visit and reuse whatever's still fit for purpose, rather than ripping everything out.",
    },
    {
      question: "Do you handle rollouts across multiple branches?",
      answer:
        "Yes — multi-branch rollout is where we spend most of our time. We stagger installs so no branch is closed longer than a few hours, and give head office a single dashboard across every location.",
    },
    {
      question: "How is footage stored and for how long?",
      answer:
        "Retention periods are set to match your compliance requirements, typically 30 to 90 days, with local and cloud backup options depending on the branch.",
    },
    {
      question: "What happens if a camera or lock fails after installation?",
      answer:
        "Every install includes a support line and scheduled maintenance visits, so faults get flagged and fixed before they turn into a coverage gap.",
    },
  ],
};