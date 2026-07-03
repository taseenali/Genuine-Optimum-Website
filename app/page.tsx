import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FeatureGrid from "../components/FeatureGrid";
import ParticlesBackground from "../components/ParticlesBackground";
import Roadmap from "../components/Roadmap";
import MissionSection from "../components/MissionSection";
import Industries from "../components/Industries";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-white font-sans selection:bg-indigo-500/30 w-full overflow-hidden">

      <ParticlesBackground particleCount={400} />

      {/* Layer Content Above Background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <FeatureGrid />
          <MissionSection />
          <Industries />
          <Roadmap />

        </main>
        <Footer />
      </div>

    </div>
  );
}
