/**
 * Shared type definitions for all "industry" data files
 * (e.g. data/industries/healthcare.ts, data/industries/education.ts, etc.)
 *
 * Every industry data file should IMPORT these types rather than
 * redefining its own copies, so all industry detail page components
 * (IndustryDetailPageHealthcare.tsx, IndustryDetailPageEducation.tsx, etc.)
 * work against one consistent shape.
 */

/** Every icon key used across ALL industries' "products" sections.
 *  Individual industry pages only use a subset of this union
 *  (e.g. Healthcare uses camera/access/ups/solar/conference/pos/lock/audio/telephone,
 *  Education uses smartclass/camera/fire/gps/server/network/pos/itequipment/videowall/furniture).
 *  Add new values here whenever a new industry introduces a new icon. */
export type IndustryProductIcon =
  // shared / general
  | "camera"
  | "fire"
  | "server"
  | "network"
  | "pos"
  // healthcare-specific
  | "access"
  | "ups"
  | "solar"
  | "conference"
  | "lock"
  | "audio"
  | "telephone"
  // education-specific
  | "smartclass"
  | "gps"
  | "itequipment"
  | "videowall"
  | "furniture";

export interface IndustryProduct {
  icon: IndustryProductIcon;
  title: string;
  description: string;
}

/** Icon keys used in the "challenges" section. */
export type IndustryChallengeIcon =
  | "vault"
  | "people"
  | "compliance"
  | "downtime"
  | "visibility";

export interface IndustryChallenge {
  icon: IndustryChallengeIcon;
  title: string;
  description: string;
}

export interface IndustryStat {
  value: string;
  label: string;
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

export interface IndustryTestimonial {
  quote: string;
  name: string;
  role: string;
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
  testimonial: IndustryTestimonial;
  faqs: IndustryFAQ[];
}