"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { groupPhoto } from "@/data/siteData";

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32 overflow-hidden grid-bg">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The People"
          title="Our Team"
          subtitle="The passionate engineers and community builders behind GPEN."
        />

        {/* Group Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden glass-card"
        >
          <div className="relative h-64 sm:h-80 md:h-[400px]">
            <Image
              src={groupPhoto}
              alt="GPEN Team Group Photo"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              The GPEN Family
            </h3>
            <p className="text-text-muted text-sm sm:text-base max-w-xl">
              A diverse group of platform engineers, DevOps practitioners, and
              cloud enthusiasts united by a passion for building better developer
              experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
