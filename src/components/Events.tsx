"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ArrowRightIcon,
  TagIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import SectionHeading from "./SectionHeading";
import Pagination from "./Pagination";
import { events } from "@/data/siteData";

const EVENTS_PER_PAGE = 3;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Events() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("upcoming");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (filter === "upcoming") return events.filter((e) => e.isUpcoming);
    if (filter === "past") return events.filter((e) => !e.isUpcoming);
    return events;
  }, [filter]);

  const totalPages = Math.ceil(filtered.length / EVENTS_PER_PAGE);
  const paginatedEvents = filtered.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handleFilterChange = (tab: "all" | "upcoming" | "past") => {
    setFilter(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to events section top
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="events" className="relative py-24 sm:py-32 overflow-hidden grid-bg">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="What&rsquo;s Happening"
          title="Events"
          subtitle="Stay ahead with the platform engineering community"
        />

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-12"
        >
          {(["upcoming", "past", "all"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                filter === tab
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 border border-gray-700 hover:border-cyan-500/30 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filter}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {paginatedEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                layout
                className="glass-card overflow-hidden group depth-card flex flex-col w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-contain bg-[#0d1117] transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        event.isUpcoming
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {event.isUpcoming ? "Upcoming" : "Past"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="flex flex-col gap-2 mb-4 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {event.location}
                    </div>
                  </div>

                  <p className="text-sm text-text-muted mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      >
                        <TagIcon className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions — pushed to bottom */}
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    {/* Registration Link */}
                    {event.registrationUrl && event.isUpcoming && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                      >
                        Register Now
                        <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}

                    {/* YouTube Link */}
                    {event.youtubeUrl && (
                      <a
                        href={event.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors group/yt"
                      >
                        <PlayCircleIcon className="w-4 h-4" />
                        Watch on YouTube Live
                        <ArrowRightIcon className="w-4 h-4 group-hover/yt:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-text-muted mt-12"
          >
            No events found for this filter.
          </motion.p>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
