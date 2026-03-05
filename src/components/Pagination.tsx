"use client";

import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build page numbers with ellipsis for large totals
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 1; // pages around current

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-gray-700 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:text-gray-400 transition-all duration-300"
      >
        <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 py-2 text-sm text-gray-500"
            >
              ⋯
            </span>
          ) : (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-9 h-9 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === page
                  ? "text-white"
                  : "text-gray-400 hover:text-white border border-transparent hover:border-cyan-500/20"
              }`}
            >
              {currentPage === page && (
                <motion.div
                  layoutId="activePage"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg shadow-lg shadow-cyan-500/20"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{page}</span>
            </motion.button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium border border-gray-700 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:text-gray-400 transition-all duration-300"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Page Info */}
      <span className="hidden sm:block ml-3 text-xs text-text-muted font-mono">
        {currentPage}/{totalPages}
      </span>
    </motion.div>
  );
}
