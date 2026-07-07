import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import IndustryDetailPageHealthcare from "@/components/solutions/industry/IndustryDetailPageHealthcare";
import { healthcare } from "@/data/industries/healthcare";

export const metadata: Metadata = {
  title: "Healthcare & Pharma Solutions | NetworkTen",
  description:
    "Surveillance, access control, backup power and IT infrastructure built for hospitals, clinics and pharma facilities — from a single clinic to a multi-facility rollout.",
};

export default function HealthcarePharmaPage() {
  return (
    <>
      <Navbar />
      <IndustryDetailPageHealthcare data={healthcare} />
      <Footer />
    </>
  );
}