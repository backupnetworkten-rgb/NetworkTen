import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import IndustryDetailPage from "@/components/solutions/industry/IndustryDetailPage";
import { bankingRetail } from "@/data/industries/banking-retail";

export const metadata: Metadata = {
  title: "Banking & Retail Solutions | NetworkTen",
  description:
    "Surveillance, access control, networking and power solutions built for banks and retail outlets — from a single branch to a nationwide rollout.",
};

export default function BankingRetailPage() {
  return (
    <>
      <Navbar />
      <IndustryDetailPage data={bankingRetail} />
      <Footer />
    </>
  );
}