import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import Particles from "../../components/Particles";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30 w-full overflow-hidden">
      
      {/* Absolute Fullscreen Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={400}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={2}
        />
      </div>

      {/* Layer Content Above Background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
          <ContactForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}
