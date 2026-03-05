"use client";

import { motion } from "framer-motion";
import {
  CloudArrowUpIcon,
  CommandLineIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  EyeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { stats, aboutHighlights, vision, mission } from "@/data/siteData";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  cloud: CloudArrowUpIcon,
  pipeline: CommandLineIcon,
  code: WrenchScrewdriverIcon,
  platform: CubeTransparentIcon,
  security: ShieldCheckIcon,
  observability: EyeIcon,
  community: UserGroupIcon,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Who We Are"
          title="About GPEN"
          subtitle="A thriving global community connecting Platform Engineering professionals to share knowledge, exchange ideas, and drive innovation."
        />

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
            <div className="relative z-10">
              <div className="text-2xl mb-3">🔭</div>
              <h3 className="text-lg font-bold text-white mb-3">Our Vision</h3>
              <p className="text-text-muted text-sm leading-relaxed">{vision}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent" />
            <div className="relative z-10">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-white mb-3">Our Mission</h3>
              <p className="text-text-muted text-sm leading-relaxed">{mission}</p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-20"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card p-6 text-center depth-card"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Focus Areas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {aboutHighlights.map((item, i) => {
            const Icon = iconMap[item.icon] || CubeTransparentIcon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass-card p-6 sm:p-8 flex gap-5 group depth-card"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Community Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 glass-card p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-600/5 to-pink-500/5" />
          <div className="relative z-10">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-cyan-500/30 mx-auto mb-4">
              <Image
                src="/logo.png"
                alt="GPEN Logo"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Our Community Brings Together
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                "Platform Engineering Experts",
                "Release Engineers",
                "DevSecOps Professionals",
                "Cloud & SRE Practitioners",
                "Tech Entrepreneurs",
                "Developer Experience Advocates",
              ].map((pillar) => (
                <span
                  key={pillar}
                  className="px-4 py-2 rounded-full text-sm border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-colors"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
