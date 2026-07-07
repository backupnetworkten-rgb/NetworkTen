import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import IndustryDetailPageHomeVillaFarmhouse from "@/components/solutions/industry/IndustryDetailPageHomeVillaFarmhouse";
import { homeVillaFarmhouse } from "@/data/industries/home-villa-farmhouse";

export const metadata: Metadata = {
  title: "Home, Villa & Farmhouse Solutions | NetworkTen",
  description:
    "Surveillance, boundary security, automation and entertainment systems built for homes, villas and farmhouses — full-time residences and weekend properties alike.",
};

export default function HomeVillaFarmhousePage() {
  return (
    <>
      <Navbar />
      <IndustryDetailPageHomeVillaFarmhouse data={homeVillaFarmhouse} />
      <Footer />
    </>
  );
}