import { useState } from "react";
import { ProfessionalNotice } from "@/components/dentassiste/ProfessionalNotice";
import { Navbar } from "@/components/dentassiste/Navbar";
import { Hero } from "@/components/dentassiste/Hero";
import { ServicesSection } from "@/components/dentassiste/ServicesSection";
import { PricingSection } from "@/components/dentassiste/PricingSection";
import { BrandsSection } from "@/components/dentassiste/BrandsSection";
import { ContactBar } from "@/components/dentassiste/ContactBar";
import { Footer } from "@/components/dentassiste/Footer";
import { FormModal } from "@/components/dentassiste/form/FormModal";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
      >
        Saltar para o conteúdo
      </a>
      <ProfessionalNotice />
      <Navbar onForm={openForm} />
      <main id="conteudo">
        <Hero onForm={openForm} />
        <ServicesSection />
        <PricingSection onForm={openForm} />
        <BrandsSection />
        <ContactBar />
      </main>
      <Footer />
      {showForm && <FormModal onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Index;
