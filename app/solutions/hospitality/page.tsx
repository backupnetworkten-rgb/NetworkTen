import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import IndustryDetailPageHospitality from "@/components/solutions/industry/IndustryDetailPageHospitality";
import { hospitality } from "@/data/industries/hospitality";

export const metadata: Metadata = {
  title: "Hospitality Solutions | NetworkTen",
  description:
    "Surveillance, networking, wifi and safety infrastructure built for hotels and hospitality properties — from a single boutique property to a multi-property chain.",
};

export default function HospitalityPage() {
  return (
    <>
      <Navbar />
      <IndustryDetailPageHospitality data={hospitality} />
      <Footer />
    </>
  );
}