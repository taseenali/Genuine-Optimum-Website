import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import Breadcrumbs from "../../components/Breadcrumbs";

const TITLE = "Contact | Genuine Optimum";
const DESCRIPTION =
    "Book a free consultation with Genuine Optimum to discuss web development, SEO, custom software, or AI & data systems for your business.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://genuineoptimum.com/contact",
        siteName: "Genuine Optimum",
        type: "website",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
    alternates: { canonical: "/contact" },
};

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
