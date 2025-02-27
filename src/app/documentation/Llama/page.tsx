"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import llama from "@/assets/images/Meta-Llama-31.webp";

// Animation Helper
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: delay ? 10 : -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay },
});

const BlogPage = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = useCallback(() => {
    setShowMore((prev) => !prev);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto bg-gray-100 text-gray-900 py-16 px-4 sm:px-6">
      <div className="w-full bg-white shadow-lg border border-gray-400 p-6 sm:p-10 rounded-lg overflow-hidden">
        
        {/* Newspaper Title */}
        <motion.h1
          className="text-4xl sm:text-6xl font-bold font-serif text-center mb-4 tracking-wide"
          {...fadeIn()}
        >
          MindHive Daily Chronicle
        </motion.h1>
        <p className="text-center text-gray-600 italic mb-6">
          Est. 1895 - Delivering Truth & Stories That Matter
        </p>

        {/* Article Title */}
        <motion.h2
          className="text-2xl sm:text-4xl font-semibold font-serif text-center mb-6 leading-tight"
          {...fadeIn(0.3)}
        >
          The Rise of AI: How Llama is Changing the Game
        </motion.h2>

        {/* Article Info */}
        <div className="text-gray-700 text-sm mb-8 flex flex-col sm:flex-row justify-between border-b pb-2 px-2">
          <span>By MindHive</span>
          <span>Published: Feb 25, 2025</span>
        </div>

        {/* Article Image */}
        <motion.div className="mb-6" {...fadeIn(0.5)}>
          <Image
            src={llama}
            width={1400}
            height={500}
            alt="AI in newspaper style"
            className="w-full h-auto grayscale rounded-lg border border-gray-400 shadow-md"
          />
          <p className="text-center text-gray-500 text-sm mt-2">
            A vintage depiction of artificial intelligence in modern journalism.
          </p>
        </motion.div>

        {/* Article Body */}
        <motion.article
          className="text-lg sm:text-xl leading-relaxed text-justify font-serif text-gray-800"
          {...fadeIn(0.7)}
        >
          <span className="text-5xl sm:text-6xl font-bold float-left mr-3 text-gray-900">
            T
          </span>
          he emergence of artificial intelligence has disrupted industries
          across the world, but few breakthroughs compare to Llama's remarkable
          capabilities. Unlike traditional machine learning models, Llama is
          designed to not only analyze and predict but also to learn and evolve
          in real time.
          <br />
          <br />
          Experts suggest that by 2030, AI models like Llama could outperform
          human intelligence in specific problem-solving tasks, reshaping fields
          like journalism, education, and business operations.
          <br />
          <br />
          “We are witnessing a renaissance in artificial intelligence,” says Dr.
          Eleanor Finch, an AI researcher at Harvard. “Llama is an embodiment of
          what the future holds—more precise, more intuitive, and incredibly
          efficient.”
          <br />
          <br />
          {showMore && (
            <>
              While the technology continues to grow, concerns remain about
              ethics, privacy, and AI's long-term impact on employment. However,
              many remain hopeful that the balance between human creativity and
              machine efficiency will lead to an era of innovation unlike
              anything seen before.
              <br />
              <br />
              Some experts believe that AI-driven content generation could
              redefine journalism by automating research, detecting
              misinformation, and personalizing news delivery in ways previously
              unimaginable.
              <br />
              <br />
              “We must ensure AI serves humanity and doesn’t replace it,” warns
              Professor Linda Cheng, an ethics specialist at MIT. “Llama’s
              success depends on how responsibly we deploy its power.”
            </>
          )}
        </motion.article>

        {/* Read More Button */}
        <motion.div className="text-center mt-8" whileHover={{ scale: 1.05 }}>
          <button
            onClick={toggleShowMore}
            className="inline-block bg-gray-800 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-lg sm:text-xl font-semibold shadow-md border border-gray-900 hover:bg-gray-700 transition"
          >
            {showMore ? "Read Less" : "Read More"}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPage;
