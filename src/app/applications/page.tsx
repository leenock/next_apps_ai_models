'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { SiOllama } from 'react-icons/si';

// Features Data
const features = [
  { 
    icon: <SiOllama className="text-cyan-400 text-5xl" />, 
    title: 'Llama Model', 
    desc: 'Implement a simple chatbot using Next.js, integrating with an Llama AI model hosted on LM Studio via an API request. Users can send messages, receive AI-generated responses, and view them in a styled chat interface.',
    link: '/models/Llama'
  },
];

const FeatureCard = ({ icon, title, desc, link, delay }: { icon: JSX.Element; title: string; desc: string; link: string; delay: number }) => {
  const router = useRouter();

  return (
    <motion.div
      className="feature-card border shadow-teal-300 rounded-lg p-6 transition-all duration-150 cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "black",
        boxShadow: "0px 8px 20px rgba(0, 255, 255, 0.4)",
        color: "white",
        transition: { duration: 0.2 },
      }}
      onClick={() => router.push(link)}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 transition-colors duration-150">{title}</h3>
      <p className="text-black transition-colors duration-150 group-hover:text-white">{desc}</p>
    </motion.div>
  );
};

export default function ApplicationPage() {
  return (
    <section className="bg-animated cyber-grid py-20 relative overflow-hidden">
       <div className="container mx-auto px-4">
        {/* Header Section */}
        <h2 className="text-4xl font-bold text-center mb-12 neon-text glitch-effect" data-text="Application Model Exploration">
          Application Model Exploration
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
