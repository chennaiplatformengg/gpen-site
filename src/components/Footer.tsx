"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig, navLinks } from "@/data/siteData";
import { Users } from "lucide-react";
import { LinkedinIcon, InstagramIcon, YouTubeIcon } from "./icons/BrandIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyan-500/10 bg-[#070a14]">
      {/* Pipeline accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-500/30">
                <Image
                  src="/logo.png"
                  alt="GPEN Logo"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className="text-lg font-bold gradient-text">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-cyan-400 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[
                { Icon: Users, url: siteConfig.meetupUrl, label: "Meetup" },
                { Icon: LinkedinIcon, url: siteConfig.linkedinUrl, label: "LinkedIn" },
                { Icon: InstagramIcon, url: siteConfig.instagramUrl, label: "Instagram" },
                { Icon: YouTubeIcon, url: siteConfig.youtubeUrl, label: "YouTube" },
              ].map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-surface-light border border-cyan-500/10 flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cyan-500/10 flex items-center justify-center">
          <p className="text-xs text-text-muted">
            © {currentYear} {siteConfig.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
