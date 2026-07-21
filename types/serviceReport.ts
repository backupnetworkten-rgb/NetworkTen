export type NatureOfCall = "Warranty" | "AMC" | "Paid Call" | "Installation";
export type EquipmentStatus = "Working" | "Dead";
export type StatusAfterService =
  | "Complete"
  | "Incomplete"
  | "Pending for spares"
  | "Under Observation"
  | "Working solution provided";
export type CustomerRating = "Extremely Satisfied" | "Satisfied" | "Dissatisfied" | "Annoyed";
export type ReportStatus = "pending" | "completed";

export interface ServiceReport {
  id?: string;

  // ---- workflow control ----
  status: ReportStatus;
  shareToken: string;

  // ================= PART A — filled by logged-in staff =================
  csrNo: string;
  date: string; // yyyy-mm-dd

  customerName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  natureOfCall: NatureOfCall;
  instructionFrom: string;

  natureOfProblem: string;
  detailProblemReported: string;

  equipmentType: string;
  make: string;
  model: string;
  serialNo: string;

  engineerNames: string;
  engineerMobile: string;
  engineerEmail: string;

  locationOfInstallation: string;

  eventDateTime: string;

  // ================= PART B — filled via public link =================
  equipmentStatus: EquipmentStatus;
  equipmentsDetails: string;

  engineerRemarks: string;
  statusAfterService: StatusAfterService;
  defectsFoundOnInspection: string;

  startOfService: string;
  endOfService: string;

  customerRating: CustomerRating;
  customerFeedbackRemarks: string;

  customerRepName: string;
  customerRepDesignation: string;
  customerRepPhone: string;
  customerRepEmail: string;

  signatureDate: string;
  signaturePlace: string;

  /** Base64 PNG data URL of the customer's drawn signature */
  customerSignature: string;

  createdAt?: any;
  updatedAt?: any;
}

export const NATURE_OF_CALL_OPTIONS: NatureOfCall[] = [
  "Warranty",
  "AMC",
  "Paid Call",
  "Installation",
];

export const EQUIPMENT_STATUS_OPTIONS: EquipmentStatus[] = ["Working", "Dead"];

export const STATUS_AFTER_SERVICE_OPTIONS: StatusAfterService[] = [
  "Complete",
  "Incomplete",
  "Pending for spares",
  "Under Observation",
  "Working solution provided",
];

export const CUSTOMER_RATING_OPTIONS: CustomerRating[] = [
  "Extremely Satisfied",
  "Satisfied",
  "Dissatisfied",
  "Annoyed",
];

export const emptyServiceReport: ServiceReport = {
  status: "pending",
  shareToken: "",

  csrNo: "",
  date: new Date().toISOString().slice(0, 10),
  customerName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  natureOfCall: "AMC",
  instructionFrom: "",
  natureOfProblem: "",
  detailProblemReported: "",
  equipmentType: "",
  make: "",
  model: "",
  serialNo: "",
  engineerNames: "",
  engineerMobile: "",
  engineerEmail: "",
  locationOfInstallation: "",
  eventDateTime: new Date().toISOString().slice(0, 10),

  equipmentStatus: "Working",
  equipmentsDetails: "",
  engineerRemarks: "",
  statusAfterService: "Complete",
  defectsFoundOnInspection: "",
  startOfService: "",
  endOfService: "",
  customerRating: "Satisfied",
  customerFeedbackRemarks: "",
  customerRepName: "",
  customerRepDesignation: "",
  customerRepPhone: "",
  customerRepEmail: "",
  signatureDate: "",
  signaturePlace: "",
  customerSignature: "",
};