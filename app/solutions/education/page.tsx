import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import IndustryDetailPageEducation from "@/components/solutions/industry/IndustryDetailPageEducation";
import { education } from "@/data/industries/education";

export const metadata: Metadata = {
  title: "Education Solutions | NetworkTen",
  description:
    "Smart classrooms, surveillance, bus tracking and IT infrastructure built for schools and colleges — from a single campus to a multi-campus rollout.",
};

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <IndustryDetailPageEducation data={education} />
      <Footer />
    </>
  );
}