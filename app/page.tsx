"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Generate random positions for particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const baseX = Math.random() * 100;
    const baseY = Math.random() * 100;
    
    // Generate random movement offsets for wandering motion
    const x1 = (Math.random() - 0.5) * 60; // -30 to 30
    const y1 = (Math.random() - 0.5) * 60;
    const x2 = (Math.random() - 0.5) * 60;
    const y2 = (Math.random() - 0.5) * 60;
    const x3 = (Math.random() - 0.5) * 60;
    const y3 = (Math.random() - 0.5) * 60;
    
    return {
      id: i,
      left: baseX,
      top: baseY,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 20 + 25, // Longer duration for smoother movement
      path: [
        { x: 0, y: 0 },
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: x3, y: y3 },
        { x: 0, y: 0 }, // Return to start
      ],
    };
  });
};

export default function Home() {
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(generateParticles(20));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-forest-dark">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-forest-dark via-shadow-green to-forest-dark opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        {mounted && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gold-dust opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              x: particle.path.map((p) => p.x),
              y: particle.path.map((p) => p.y),
              opacity: [0.15, 0.3, 0.25, 0.35, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        {/* Main heading */}
        <motion.h1
          className="mb-6 text-6xl font-light tracking-tight text-sage-soft md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          القرآن الكريم
        </motion.h1>
        <motion.h2
          className="mb-4 text-3xl font-light tracking-wide text-sage-soft/90 md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The Noble Quran
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="my-8 h-px w-24 bg-gold-dust/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* Coming soon text */}
        <motion.p
          className="mb-12 max-w-md text-lg leading-relaxed text-sage-soft/80 md:text-xl md:leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          A beautiful, modern experience for reading and reflecting on the Holy
          Quran. Coming soon.
        </motion.p>

        {/* Footer */}
        <motion.div
          className="absolute bottom-8 text-sm text-sage-soft/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p>Insha'Allah, we'll be with you soon</p>
        </motion.div>
      </main>
    </div>
  );
}
