'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { FaBrain, FaShieldAlt, FaVrCardboard, FaNetworkWired, FaBolt } from 'react-icons/fa';

const features = [
  { 
    icon: <FaBrain className="text-cyan-400 text-5xl" />, 
    title: 'Llama Language Model', 
    desc: 'Llama includes multilingual text-only models (1B, 3B), including quantized versions, text-image models (11B, 90B), and Llama 3.3 70B model offering similar performance to the Llama 3.1 405B model.',
    link: '/documentation/Llama'
  },
  { 
    icon: <FaBolt className="text-pink-500 text-5xl" />, 
    title: 'DeepSeek', 
    desc: 'DeepSeek-V3 achieves a significant breakthrough in inference speed over previous models. It tops the leaderboard among open-source models and rivals the most advanced closed-source models globally.',
    link: '/models/deepseek'
  },
  { 
    icon: <FaVrCardboard className="text-purple-500 text-5xl" />, 
    title: 'ChatGPT', 
    desc: 'ChatGPT is a sibling model to InstructGPT⁠, which is trained to follow an instruction in a prompt and provide a detailed response.',
    link: '/models/chatgpt'
  },
  { 
    icon: <FaNetworkWired className="text-green-400 text-5xl" />, 
    title: 'Convolutional Neural Network (CNN)', 
    desc: 'Deep learning architecture that uses a grid-like topology to process images. CNNs are especially good at recognizing patterns in images, which can help identify objects and classes.',
    link: '/models/cnn'
  },
  { 
    icon: <FaBolt className="text-yellow-400 text-5xl" />, 
    title: 'Genetic Algorithm', 
    desc: 'Solving both constrained and unconstrained optimization problems based on natural selection, the process that drives biological evolution.',
    link: '/models/genetic-algorithm'
  },
  { 
    icon: <FaShieldAlt className="text-red-500 text-5xl" />, 
    title: 'Business Intelligence (BI)', 
    desc: 'Combines business analytics, data mining, data visualization, data tools, and best practices to help organizations make more data-driven decisions.',
    link: '/models/business-intelligence'
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
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.6)",
        color: "white",
        transition: { duration: 0.10 },
      }}
      onClick={() => router.push(link)}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 transition-colors duration-150">{title}</h3>
      <p className="text-black transition-colors duration-150 group-hover:text-white">{desc}</p>
    </motion.div>
  );
};

export default function ModelExplorer() {
  return (
    <section className="bg-animated cyber-grid py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 neon-text glitch-effect" data-text="Next-Gen Model Exploration">
          Next-Gen Model Exploration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
