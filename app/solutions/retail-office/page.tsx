import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import IndustryDetailPageRetailOffice from "@/components/solutions/industry/IndustryDetailPageRetailOffice";
import { retailOffice } from "@/data/industries/retail-office";

export const metadata: Metadata = {
  title: "Retail & Office Solutions | NetworkTen",
  description:
    "Surveillance, networking, billing and power backup infrastructure built for retail stores and offices — from a single outlet to a multi-location chain.",
};

export default function RetailOfficePage() {
  return (
    <>
      <Navbar />
      <IndustryDetailPageRetailOffice data={retailOffice} />
      <Footer />
    </>
  );
}