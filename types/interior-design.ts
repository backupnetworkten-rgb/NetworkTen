export type KitId =
  | "welcome-kit"
  | "client-discovery-kit"
  | "client-contract-kit"
  | "e-design-contract-kit";

export interface InteriorKit {
  id: KitId;
  number: string;
  title: string;
  description: string;
  available: boolean;
}

export interface WelcomeKitFormData {
  // Personal Details
  fullName: string;
  email: string;
  phone: string;
  city: string;

  // Property
  propertyType: string;
  totalArea: string;
  configuration: string;
  propertyStatus: string;
  possessionDate: string;

  // Design Style
  designStyles: string[];
  dreamSpace: string;
  colorsLove: string;
  colorsAvoid: string;

  // Rooms
  livingRoom: string;
  masterBedroom: string;
  kitchen: string;
  diningArea: string;
  otherRooms: string;

  // Budget
  totalBudget: string;
  designFeeBudget: string;
  preferredStartDate: string;
  targetCompletionDate: string;

  // Lifestyle
  familyMembers: string;
  elderlyMembers: string;
  children: string;
  pets: string;
  workFromHome: string;
  additionalNotes: string;
}

export interface InteriorClient {
  uid: string;
  name: string;
  email: string;
  interiorDesignAccess: boolean;

  kits: {
    welcomeKit: boolean;
    clientDiscoveryKit: boolean;
    clientContractKit: boolean;
    eDesignContractKit: boolean;
  };
}


export interface ClientDiscoveryFormData {
  // 01 — Client & Project
  fullName: string;
  email: string;
  phone: string;
  city: string;

  projectName: string;
  propertyType: string;
  totalArea: string;
  configuration: string;
  propertyStatus: string;
  possessionDate: string;

  // 02 — Vision & Goals
  projectVision: string;
  dreamSpace: string;
  problemsToSolve: string;
  mustHaveFeatures: string;
  inspirationReferences: string;

  // 03 — Lifestyle
  familyMembers: string;
  elderlyMembers: string;
  children: string;
  pets: string;
  workFromHome: string;
  entertaining: string;
  lifestyleDescription: string;

  // 04 — Design Preferences
  designStyles: string[];
  colorsLove: string;
  colorsAvoid: string;
  materialsPreference: string;
  lightingPreference: string;
  overallMood: string;

  // 05 — Room Requirements
  livingRoom: string;
  masterBedroom: string;
  bedroom2: string;
  bedroom3: string;
  kitchen: string;
  diningArea: string;
  bathroom: string;
  balcony: string;
  studyRoom: string;
  poojaRoom: string;
  otherRooms: string;

  // 06 — Budget & Timeline
  totalBudget: string;
  preferredStartDate: string;
  targetCompletionDate: string;

  topPriorities: string[];
  maintenancePreference: string;
  decisionMakers: string;
  additionalNotes: string;
}

export const initialClientDiscoveryForm: ClientDiscoveryFormData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",

  projectName: "",
  propertyType: "",
  totalArea: "",
  configuration: "",
  propertyStatus: "",
  possessionDate: "",

  projectVision: "",
  dreamSpace: "",
  problemsToSolve: "",
  mustHaveFeatures: "",
  inspirationReferences: "",

  familyMembers: "",
  elderlyMembers: "",
  children: "",
  pets: "",
  workFromHome: "",
  entertaining: "",
  lifestyleDescription: "",

  designStyles: [],
  colorsLove: "",
  colorsAvoid: "",
  materialsPreference: "",
  lightingPreference: "",
  overallMood: "",

  livingRoom: "",
  masterBedroom: "",
  bedroom2: "",
  bedroom3: "",
  kitchen: "",
  diningArea: "",
  bathroom: "",
  balcony: "",
  studyRoom: "",
  poojaRoom: "",
  otherRooms: "",

  totalBudget: "",
  preferredStartDate: "",
  targetCompletionDate: "",

  topPriorities: [],
  maintenancePreference: "",
  decisionMakers: "",
  additionalNotes: "",
};