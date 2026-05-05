import { useEffect, useState } from "react";
import { Navbar } from "@/components/dentassiste/Navbar";
import { ProfessionalGate } from "@/components/dentassiste/ProfessionalGate";
import { Hero } from "@/components/dentassiste/Hero";
import { ServicesSection } from "@/components/dentassiste/ServicesSection";
import { PricingSection } from "@/components/dentassiste/PricingSection";
import { BrandsSection } from "@/components/dentassiste/BrandsSection";
import { ContactBar } from "@/components/dentassiste/ContactBar";
import { Footer } from "@/components/dentassiste/Footer";
import { FormModal } from "@/components/dentassiste/form/FormModal";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [gateShown, setGateShown] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("dentassiste_gate");
    if (!seen) setGateShown(true);
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem("dentassiste_gate", "1");
    setGateShown(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {gateShown && <ProfessionalGate onConfirm={handleConfirm} />}
      <Navbar onForm={() => setShowForm(true)} />
      <Hero onForm={() => setShowForm(true)} />
      <ServicesSection />
      <PricingSection onForm={() => setShowForm(true)} />
      <BrandsSection />
      <ContactBar />
      <Footer />
      {showForm && <FormModal onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Index;
