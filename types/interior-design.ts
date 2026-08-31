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
  // =========================================================
  // Personal Details
  // =========================================================

  fullName: string;
  email: string;
  phone: string;
  city: string;

  // =========================================================
  // Property
  // =========================================================

  propertyType: string;
  totalArea: string;
  configuration: string;
  propertyStatus: string;
  possessionDate: string;

  // =========================================================
  // Design Style
  // =========================================================

  designStyles: string[];
  dreamSpace: string;
  colorsLove: string;
  colorsAvoid: string;

  // =========================================================
  // Dynamic Room Requirements
  //
  // This is the NEW structure.
  //
  // Example:
  //
  // {
  //   "living-room": "Large TV unit...",
  //   "kitchen": "Island counter...",
  //   "bedroom-2": "Study table..."
  // }
  //
  // The keys are generated according to the
  // selected property type/configuration.
  // =========================================================

  roomRequirements: Record<string, string>;

  // =========================================================
  // Legacy Room Fields
  //
  // Keep these so existing Firebase/PDF code does not break.
  // They can be populated from roomRequirements.
  // =========================================================

  livingRoom: string;
  masterBedroom: string;
  kitchen: string;
  diningArea: string;
  otherRooms: string;

  // =========================================================
  // Budget
  // =========================================================

  totalBudget: string;
  designFeeBudget: string;
  preferredStartDate: string;
  targetCompletionDate: string;

  // =========================================================
  // Lifestyle
  // =========================================================

  familyMembers: string;
  elderlyMembers: string;
  children: string;
  pets: string;
  workFromHome: string;
  additionalNotes: string;
}

// =============================================================
// INTERIOR CLIENT
// =============================================================

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

// =============================================================
// CLIENT DISCOVERY FORM
// =============================================================

export interface ClientDiscoveryFormData {
  // =========================================================
  // 01 — Client & Project
  // =========================================================

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

  // =========================================================
  // 02 — Vision & Goals
  // =========================================================

  projectVision: string;
  dreamSpace: string;
  problemsToSolve: string;
  mustHaveFeatures: string;
  inspirationReferences: string;

  // =========================================================
  // 03 — Lifestyle
  // =========================================================

  familyMembers: string;
  elderlyMembers: string;
  children: string;
  pets: string;
  workFromHome: string;
  entertaining: string;
  lifestyleDescription: string;

  // =========================================================
  // 04 — Design Preferences
  // =========================================================

  designStyles: string[];

  colorsLove: string;
  colorsAvoid: string;

  materialsPreference: string;
  lightingPreference: string;
  overallMood: string;

  // =========================================================
  // 05 — Room Requirements
  // =========================================================

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

  // =========================================================
  // 06 — Budget & Timeline
  // =========================================================

  totalBudget: string;
  preferredStartDate: string;
  targetCompletionDate: string;

  topPriorities: string[];

  maintenancePreference: string;
  decisionMakers: string;

  additionalNotes: string;
}

// =============================================================
// INITIAL CLIENT DISCOVERY FORM
// =============================================================

export const initialClientDiscoveryForm: ClientDiscoveryFormData = {
  // =========================================================
  // 01 — Client & Project
  // =========================================================

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

  // =========================================================
  // 02 — Vision & Goals
  // =========================================================

  projectVision: "",
  dreamSpace: "",
  problemsToSolve: "",
  mustHaveFeatures: "",
  inspirationReferences: "",

  // =========================================================
  // 03 — Lifestyle
  // =========================================================

  familyMembers: "",
  elderlyMembers: "",
  children: "",
  pets: "",
  workFromHome: "",
  entertaining: "",
  lifestyleDescription: "",

  // =========================================================
  // 04 — Design Preferences
  // =========================================================

  designStyles: [],

  colorsLove: "",
  colorsAvoid: "",

  materialsPreference: "",
  lightingPreference: "",
  overallMood: "",

  // =========================================================
  // 05 — Room Requirements
  // =========================================================

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

  // =========================================================
  // 06 — Budget & Timeline
  // =========================================================

  totalBudget: "",
  preferredStartDate: "",
  targetCompletionDate: "",

  topPriorities: [],

  maintenancePreference: "",
  decisionMakers: "",

  additionalNotes: "",
};

// =============================================================
// CLIENT CONTRACT FORM
// =============================================================

export interface ClientContractFormData {
  // =========================================================
  // Client
  // =========================================================

  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;

  // =========================================================
  // Project
  // =========================================================

  projectName: string;
  projectAddress: string;
  propertyType: string;

  // =========================================================
  // Scope
  // =========================================================

  scopeOfWork: string;
  includedSpaces: string;
  deliverables: string;
  serviceLevel: string;

  // =========================================================
  // Commercial
  // =========================================================

  totalProjectFee: string;
  designFee: string;
  paymentSchedule: string;

  // =========================================================
  // Timeline
  // =========================================================

  estimatedStartDate: string;
  estimatedCompletionDate: string;

  // =========================================================
  // Revisions
  // =========================================================

  includedRevisions: string;
  additionalRevisionFee: string;

  // =========================================================
  // Responsibilities
  // =========================================================

  clientResponsibilities: string;
  networkTenResponsibilities: string;

  // =========================================================
  // Terms
  // =========================================================

  exclusions: string;
  cancellationTerms: string;
  intellectualPropertyTerms: string;
  confidentialityTerms: string;
  disputeResolutionTerms: string;

  // =========================================================
  // Acceptance
  // =========================================================

  clientAccepted: boolean;
  clientSignature: string;
  acceptanceDate: string;

  // =========================================================
  // Optional Notes
  // =========================================================

  additionalNotes: string;
}

// =============================================================
// INITIAL CLIENT CONTRACT FORM
// =============================================================

export const initialClientContractForm: ClientContractFormData = {
  // Client

  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientAddress: "",

  // Project

  projectName: "",
  projectAddress: "",
  propertyType: "",

  // Scope

  scopeOfWork: "",
  includedSpaces: "",
  deliverables: "",
  serviceLevel: "",

  // Commercial

  totalProjectFee: "",
  designFee: "",
  paymentSchedule: "",

  // Timeline

  estimatedStartDate: "",
  estimatedCompletionDate: "",

  // Revisions

  includedRevisions: "",
  additionalRevisionFee: "",

  // Responsibilities

  clientResponsibilities: "",
  networkTenResponsibilities: "",

  // Terms

  exclusions: "",
  cancellationTerms: "",
  intellectualPropertyTerms: "",
  confidentialityTerms: "",
  disputeResolutionTerms: "",

  // Acceptance

  clientAccepted: false,
  clientSignature: "",
  acceptanceDate: "",

  // Optional Notes

  additionalNotes: "",
};

// =============================================================
// E-DESIGN CONTRACT FORM
// =============================================================

export interface EDesignContractFormData {
  // =========================================================
  // Client
  // =========================================================

  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;

  // =========================================================
  // Project
  // =========================================================

  projectName: string;
  projectAddress: string;
  propertyType: string;

  // =========================================================
  // Scope / Service
  // =========================================================

  projectDescription: string;
  roomsIncluded: string;
  serviceLevel: string;
  deliverables: string;

  designProcess: string;
  communicationMethod: string;

  // =========================================================
  // Timeline
  // =========================================================

  expectedStartDate: string;
  expectedCompletionDate: string;

  // =========================================================
  // Revisions
  // =========================================================

  revisionPolicy: string;

  // =========================================================
  // Commercial
  // =========================================================

  totalFee: string;
  paymentTerms: string;

  // =========================================================
  // Responsibilities
  // =========================================================

  clientResponsibilities: string;
  networkTenResponsibilities: string;

  clientProvidedMeasurements: string;

  // =========================================================
  // Terms
  // =========================================================

  exclusions: string;
  intellectualPropertyTerms: string;
  confidentialityTerms: string;
  cancellationTerms: string;

  // =========================================================
  // Additional Notes
  // =========================================================

  additionalNotes: string;

  // =========================================================
  // Acceptance
  // =========================================================

  clientAccepted: boolean;
  clientSignature: string;
  acceptanceDate: string;
}

// =============================================================
// INITIAL E-DESIGN CONTRACT FORM
// =============================================================

export const initialEDesignContractForm: EDesignContractFormData = {
  // Client

  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientAddress: "",

  // Project

  projectName: "",
  projectAddress: "",
  propertyType: "",

  // Scope / Service

  projectDescription: "",
  roomsIncluded: "",
  serviceLevel: "",
  deliverables: "",

  designProcess: "",
  communicationMethod: "",

  // Timeline

  expectedStartDate: "",
  expectedCompletionDate: "",

  // Revisions

  revisionPolicy: "",

  // Commercial

  totalFee: "",
  paymentTerms: "",

  // Responsibilities

  clientResponsibilities: "",
  networkTenResponsibilities: "",

  clientProvidedMeasurements: "",

  // Terms

  exclusions: "",
  intellectualPropertyTerms: "",
  confidentialityTerms: "",
  cancellationTerms: "",

  // Additional Notes

  additionalNotes: "",

  // Acceptance

  clientAccepted: false,
  clientSignature: "",
  acceptanceDate: "",
};