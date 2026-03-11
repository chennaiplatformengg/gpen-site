// ============================================================
// GPEN Site Data — Edit this file to update all site content
// ============================================================

export const siteConfig = {
  name: "GPEN",
  fullName: "Global Platform Engineers Network",
  tagline: "Connect. Learn. Inspire. Grow.",
  description:
    "A thriving community connecting Platform Engineering experts, Release Engineers, DevSecOps professionals, Cloud & SRE practitioners, and tech entrepreneurs to share knowledge and drive innovation.",
  email: "chennaiplatformengg@gmail.com",
  meetupUrl: "https://www.meetup.com/global-platform-engineers-network-gpen",
  linkedinUrl: "https://www.linkedin.com/company/global-platform-engineers-network/",
  instagramUrl: "https://www.instagram.com/platformenggchennai",
  youtubeUrl: "https://www.youtube.com/@GPENCommunity",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export const groupPhoto = "/team/core_team.png";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  registrationUrl?: string;
  youtubeUrl?: string;
  isUpcoming: boolean;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Explore the Core of Cloud Native:\nMastering EaaS, Workload APIs & More",
    date: "Mar 14, 2026 (10:00 AM - 1:00 PM IST)",
    location: "Grid Dynamics, Chennai",
    description:
      "Event Description",
    image: "/events/q1_2026_event.jpg",
    tags: ["Cloud Native", "Workload APIs", "EaaS"],
    registrationUrl: "https://www.meetup.com/global-platform-engineers-network-gpen",
    isUpcoming: true,
  },
  {
    id: "2",
    title: "Exploring Kubernetes, AI, and Modern Cloud Infrastructure",
    date: "Dec 20, 2026 (10:00 AM - 1:00 PM IST)",
    location: "M2P Fintech, Guindy, Chennai",
    description:
      "Event Description",
    image: "/events/q4_2025_event.png",
    tags: ["Kubernetes", "Enterprise", "AI"],
    youtubeUrl: "https://www.youtube.com/live/zVisGlnB5sg?si=u9xmtcy5xAKtdbH6",
    isUpcoming: false,
  },
];

export const galleryImages = [
  { src: "/gallery/collaboration.png", alt: "Team Collaboration" },
  { src: "/gallery/q3_25_presenters.png", alt: "SMEs - Presenters" },
  { src: "/gallery/q1_25_session.jpg", alt: "AI Sessions" },
  { src: "/gallery/event_attendees1.png", alt: "Event Attendees" },
  { src: "/gallery/event_attendees2.png", alt: "Network" },
  { src: "/gallery/event_session_monorepo.png", alt: "Knowledge Sharing Sessions" },
  { src: "/gallery/event_session.png", alt: "Enterprise Standards" },
  { src: "/gallery/event_session2.png", alt: "Live Demos" },
];

export const stats = [
  { label: "Community Members", value: "1350+" },
  { label: "Events Hosted", value: "10+" },
  { label: "Speakers Featured", value: "20+" },
];

export const aboutHighlights = [
  {
    icon: "platform",
    title: "Platform & Pipeline Provisioning",
    description:
      "Streamlining infrastructure and CI/CD pipeline provisioning to accelerate delivery and reduce toil.",
  },
  {
    icon: "code",
    title: "Developer Self-Service & IDPs",
    description:
      "Building internal developer platforms with golden paths and self-service tooling for engineering teams.",
  },
  {
    icon: "cloud",
    title: "Cloud Cost Optimization",
    description:
      "Strategies and best practices for optimizing cloud spend while maintaining performance and reliability.",
  },
  {
    icon: "security",
    title: "DevSecOps & Compliance",
    description:
      "Embedding security into every stage of the software delivery lifecycle with automated guardrails.",
  },
  {
    icon: "observability",
    title: "Observability & SRE",
    description:
      "Modern observability stacks, OpenTelemetry, and site reliability engineering best practices.",
  },
  {
    icon: "community",
    title: "Knowledge Sharing & Networking",
    description:
      "Connecting platform engineers, release engineers, and cloud practitioners to share ideas and grow together.",
  },
];

export const vision =
  "To create a thriving global community where Platform Engineering professionals connect, collaborate, and drive innovation in modern software delivery.";

export const mission =
  "GPEN brings together Platform Engineering experts, Release Engineers, DevSecOps professionals, Cloud & SRE practitioners, and tech entrepreneurs to share knowledge, exchange ideas, and inspire each other to build the future of software engineering.";

export const focusAreas = [
  "Platform & pipeline provisioning",
  "Developer self-service & IDPs",
  "Cloud cost optimization",
  "CI/CD & GitOps workflows",
  "Infrastructure as Code",
  "Observability & monitoring",
  "DevSecOps & compliance automation",
  "Site reliability engineering",
];
