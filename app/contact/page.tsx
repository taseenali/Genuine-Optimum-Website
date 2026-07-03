import { Suspense } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30 w-full overflow-hidden">

      {/* Layer Content Above Background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6">
          <div className="w-full max-w-2xl">
            <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          </div>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}
