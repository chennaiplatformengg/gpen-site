"use client";

import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Users } from "lucide-react";
import { LinkedinIcon, InstagramIcon, YouTubeIcon } from "./icons/BrandIcons";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/data/siteData";

const socialCards = [
  {
    title: "Join on Meetup",
    description: "RSVP to upcoming events and join our meetup community.",
    icon: Users,
    url: siteConfig.meetupUrl,
    color: "from-red-500 to-pink-600",
    borderColor: "border-red-500/30",
    hoverBg: "hover:bg-red-500/10",
    iconColor: "text-red-400",
  },
  {
    title: "LinkedIn",
    description: "Follow us for professional updates, articles, and job posts.",
    icon: LinkedinIcon,
    url: siteConfig.linkedinUrl,
    color: "from-blue-500 to-blue-700",
    borderColor: "border-blue-500/30",
    hoverBg: "hover:bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    title: "Instagram",
    description: "Behind-the-scenes, event highlights, and community stories.",
    icon: InstagramIcon,
    url: siteConfig.instagramUrl,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
    hoverBg: "hover:bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    title: "YouTube",
    description: "Watch talks, demos, and event recordings from our community.",
    icon: YouTubeIcon,
    url: siteConfig.youtubeUrl,
    color: "from-red-600 to-red-800",
    borderColor: "border-red-500/30",
    hoverBg: "hover:bg-red-500/10",
    iconColor: "text-red-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get In Touch"
          title="Connect With Us"
          subtitle="Join our community, follow us on social media, or reach out directly."
        />

        {/* Social Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {socialCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`glass-card p-6 group cursor-pointer depth-card ${card.hoverBg} transition-colors duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} p-[1px] mb-5`}>
                  <div className="w-full h-full rounded-xl bg-[#0a0e1a] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                    <Icon className={`w-6 h-6 ${card.iconColor} group-hover:text-white transition-colors duration-300`} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  {card.title}
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {card.description}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 sm:p-12 max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Want to Collaborate?
            </h3>
            <p className="text-text-muted text-sm sm:text-base">
              We&apos;re always looking for speakers, sponsors, and community
              partners. Drop us a line!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <motion.a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <EnvelopeIcon className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-sm">{siteConfig.email}</span>
            </motion.a>

            <motion.div
              className="flex items-center gap-3 text-gray-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <MapPinIcon className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-sm">Chennai — Remote & In-Person</span>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a
              href={siteConfig.meetupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Join GPEN on Meetup
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
