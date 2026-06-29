import Navbar from "@/components/navbar/Navbar";
import HeroSlider from "@/components/hero/HeroSlider";
import Solutions from "@/components/solutions/Solutions";
import AboutSection from "@/components/about/AboutSection";
import GoogleReviews from "@/components/reviews/GoogleReviews";
import WhyChoose from "@/components/whychoose/WhyChoose";
import FloatingButtons from "@/components/common/FloatingButtons";
import CertificationSection from "@/components/certification/CertificationSection";
import CustomersSection from "@/components/customers/CustomersSection";
import VideosSection from "@/components/video/VideosSection";
import Footer from "@/components/footer/Footer";
import FAQSection from "@/components/faq/FAQSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <AboutSection />
      <Solutions />
      <WhyChoose />
      <CertificationSection />
      <CustomersSection />
      <GoogleReviews />
      <VideosSection />
      <FloatingButtons />
      <FAQSection/>
      <Footer />
    </>
  );
}