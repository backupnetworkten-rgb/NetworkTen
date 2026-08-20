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