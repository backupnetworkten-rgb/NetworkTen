export interface Address {
  id: string;
  tag: "Home" | "Office" | "Other";
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pin: string;
}

export interface UserData {
  uid?: string;
  name?: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  loginType?: "email" | "phone" | "google";
  addresses?: Address[];
}