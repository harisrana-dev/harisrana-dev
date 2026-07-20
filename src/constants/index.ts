import type {
  TNavLink,
  TExperience,
  TProject,
  TCapabilityDomain,
  TResearchInterest,
} from "../types";

export const navLinks: TNavLink[] = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "capabilities", title: "Capabilities" },
  { id: "experience", title: "Experience" },
  { id: "research", title: "Research" },
  { id: "contact", title: "Contact" },
];

// ---------------------------------------------------------------------------
// Projects — DriveVitals is the flagship and carries the strongest visual
// weight in the Work section. Smart Door Security is secondary. The
// "upcoming" entry keeps the grid extensible without inventing projects.
// ---------------------------------------------------------------------------
export const projects: TProject[] = [
  {
    name: "DriveVitals",
    description:
      "A vehicle intelligence and fleet analytics platform that turns raw vehicle telemetry into meaningful, real-time intelligence. Built around OBD-II concepts, physics-inspired vehicle simulation, and a digital twin architecture that models vehicle state as it changes. Covers driver behavior analytics, vehicle health monitoring, and fuel efficiency tracking, with predictive analytics as an active research direction.",
    tags: [
      { name: "digital-twin", color: "signal" },
      { name: "telemetry", color: "signal" },
      { name: "real-time", color: "signal" },
      { name: "fleet-analytics", color: "signal" },
    ],
    status: "flagship",
    sourceCodeLink: undefined, // TODO: add repo link when public
  },
  {
    name: "Smart Door Security System",
    description:
      "An intelligent security and automation system combining sensing and access control logic to manage entry events. A smaller, earlier project in embedded and applied systems thinking — access logic, sensor integration, and automated response.",
    tags: [
      { name: "embedded", color: "muted" },
      { name: "automation", color: "muted" },
      { name: "security", color: "muted" },
    ],
    status: "secondary",
    sourceCodeLink: undefined, // TODO: add repo link when available
  },
  {
    name: "More in progress",
    description:
      "Additional systems and research prototypes are in development and will be added here as they reach a shareable state.",
    tags: [{ name: "coming-soon", color: "muted" }],
    status: "upcoming",
  },
];

// ---------------------------------------------------------------------------
// Capabilities — grouped by system layer rather than a flat logo wall.
// `icon` refers to a lucide-react icon name, resolved in Capabilities.tsx.
// ---------------------------------------------------------------------------
export const capabilityDomains: TCapabilityDomain[] = [
  {
    domain: "Artificial Intelligence",
    description: "Making systems reason about what they sense.",
    items: ["Machine Learning", "Computer Vision", "Intelligent Systems"],
    icon: "BrainCircuit",
  },
  {
    domain: "Automotive Intelligence",
    description: "Turning vehicle data into vehicle understanding.",
    items: [
      "Vehicle Telemetry",
      "OBD-II Concepts",
      "Digital Twin Systems",
      "Fleet Analytics",
    ],
    icon: "Gauge",
  },
  {
    domain: "Software Engineering",
    description: "The full-stack infrastructure that carries it all.",
    items: ["Python", "FastAPI", "React", "WebSockets", "Databases", "Real-Time Systems"],
    icon: "Code2",
  },
  {
    domain: "Interactive Experiences",
    description: "Making systems visible and explorable.",
    items: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "Motion & Interaction Design",
    ],
    icon: "Sparkles",
  },
];

// ---------------------------------------------------------------------------
// Experience — single honest entry: DriveVitals as an independent project.
// ---------------------------------------------------------------------------
export const experiences: TExperience[] = [
  {
    title: "Founder & Lead Engineer",
    companyName: "DriveVitals",
    role: "Independent Project",
    date: "In progress",
    summary:
      "Designing and building a vehicle intelligence and fleet analytics platform end-to-end, from telemetry ingestion to digital twin modeling and analytics.",
    points: [
      "Architecting the system end-to-end: telemetry ingestion, real-time data streaming, and vehicle state management.",
      "Building a digital twin layer that models vehicle state from physics-inspired simulation and live sensor input.",
      "Developing driver behavior analytics and vehicle health / fuel efficiency monitoring on top of the telemetry pipeline.",
      "Full-stack implementation across backend services and the analytics-facing interface.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Research interests — exploration areas, explicitly not publications.
// ---------------------------------------------------------------------------
export const researchInterests: TResearchInterest[] = [
  {
    title: "AI for Automotive Systems",
    description:
      "Applying ML to the specific constraints of vehicles — noisy sensors, latency limits, safety margins.",
  },
  {
    title: "Digital Twin Architectures",
    description:
      "How to keep a live model of a physical system honest, current, and useful under real-world drift.",
  },
  {
    title: "Vehicle Intelligence",
    description:
      "Systems-level reasoning about a vehicle's state, health, and behavior over time.",
  },
  {
    title: "Vehicle Telemetry Analytics",
    description:
      "Turning high-frequency sensor streams into signal that's actually actionable.",
  },
  {
    title: "Computer Vision",
    description:
      "Perception systems for understanding physical environments and driver behavior.",
  },
  {
    title: "Intelligent Transportation Systems",
    description:
      "Where individual vehicle intelligence connects into fleet- and infrastructure-level systems.",
  },
];
