"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/solutions/Hero";
import Industries from "@/components/solutions/Industries";
import WhyChooseUs from "@/components/solutions/WhyChooseUs";
import Process from "@/components/solutions/Process";
import CTA from "@/components/solutions/CTA";
import Testimonials from "@/components/solutions/Testimonials";
import FAQ from "@/components/solutions/FAQ";

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Industries />
      <WhyChooseUs />
       <Process />
       <Testimonials />
        <FAQ />
       <CTA />
      <Footer />
    </>
  );
}