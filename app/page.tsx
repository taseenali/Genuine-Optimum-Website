import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import HyperspeedBackground from "../components/HyperspeedBackground";
import FeatureGrid from "../components/FeatureGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">

      {/* Absolute Fullscreen Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HyperspeedBackground effectOptions={{
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x131318,
            brokenLines: 0x131318,
            leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
            rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
            sticks: 0x03b3c3,
          }
        }} />
      </div>

      {/* Layer Content Above Background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <FeatureGrid />
        </main>
        <Footer />
      </div>

    </div>
  );
}
