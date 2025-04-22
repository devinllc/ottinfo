'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Content from "@/components/Content";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToHero = () => {
    document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* About Us Section */}
      <div id="about-section" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-center p-8 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6 font-mono">About OTTInfo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 mb-12">
            <div className="bg-black/30 p-6 rounded-lg border border-red-900/30">
              <h3 className="text-2xl text-red-400 mb-4 font-mono">Our Mission</h3>
              <p className="text-gray-300 text-left">
                At OTTInfo, we are dedicated to bringing the most terrifying and thrilling horror content to audiences
                around the world. Our curated selection features the best in horror cinema, including classics,
                contemporary masterpieces, and exclusive content you won't find anywhere else.
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg border border-red-900/30">
              <h3 className="text-2xl text-red-400 mb-4 font-mono">Our Story</h3>
              <p className="text-gray-300 text-left">
                Founded by horror enthusiasts in 2023, OTTInfo was born from a passion for the macabre and
                supernatural. We've grown from a small indie streaming service to the premier destination for
                horror fans, with millions of subscribers worldwide sharing our love for the genre.
              </p>
            </div>
          </div>
          <div className="bg-black/30 p-6 rounded-lg border border-red-900/30 mb-12">
            <h3 className="text-2xl text-red-400 mb-4 font-mono">The Team</h3>
            <p className="text-gray-300">
              Our team consists of dedicated horror experts, filmmakers, and tech innovators committed to
              creating the ultimate streaming experience for horror fans. From our state-of-the-art
              recommendation system to our exclusive director interviews, everything we do is focused on
              enhancing your nightmare experience.
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={scrollToHero}
              className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Return to Nightmare
            </button>
          </div>
        </div>
      </div>

      <Features />
      <Content />
      <Footer />
    </div>
  );
}
