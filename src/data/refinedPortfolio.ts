export const navItems = [['Work', '#work'], ['Tools', '#tools'], ['Experience', '#experience'], ['Research', '#research'], ['Contact', '#contact']]

// ---------------------------------------------------------------------------
// Shared content types. New components (ProjectActions, ProjectMetrics) consume
// these so project data stays declarative and reusable.
// ---------------------------------------------------------------------------

export type ProjectActionKind = 'github' | 'demo' | 'architecture' | 'documentation' | 'case-study'

export type ProjectAction = {
  kind: ProjectActionKind
  /** Overrides the default per-kind label. */
  label?: string
  /** External URL. Omit while the action does not exist yet. */
  href?: string
  /** Set to false to intentionally hide an action (e.g. demo/case study pending). */
  available?: boolean
}

export type ProjectMetric = {
  /** Short display value, e.g. "08" or "MIT". Must reflect a real, verifiable number. */
  value: string
  label: string
}

export type Project = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  description: string
  detail?: string
  tech: string[]
  metrics?: ProjectMetric[]
  actions: ProjectAction[]
  layout: 'feature' | 'compact' | 'workshop'
  /** Visual diagram shown inside compact project cards. */
  visual?: 'vision'
}

// Metric values below are derived from the public DriveVitals repository
// (github.com/harisrana-dev/DriveVitals) and must stay consistent with it.
export const projects: Project[] = [
  {
    id: 'drivevitals',
    eyebrow: 'Project Lead & Software Engineer / July 2026 - Present',
    title: 'DriveVitals',
    subtitle: 'Vehicle Intelligence & Digital Twin Platform',
    description: 'DriveVitals is an AI-powered Fleet Intelligence and Digital Twin platform for simulating commercial fleet operations, vehicle telemetry, driver behaviour, and predictive fleet analytics.',
    detail: 'Architected the backend, digital twin execution pipeline, simulation runtime, fleet management systems, telemetry generation, analytics integration, Version 1 APIs, and PostgreSQL data model. Future architecture includes OBD-II integration and machine learning models.',
    tech: ['Python', 'FastAPI', 'React', 'REST APIs', 'WebSockets', 'PostgreSQL', 'SQLAlchemy', 'Pydantic', 'Digital Twins', 'Fleet Analytics', 'Physics Simulation', 'Machine Learning'],
    metrics: [
      { value: '03', label: 'Developers led' },
      { value: '08', label: 'Domain entities' },
      { value: '05', label: 'Physics modules' },
      { value: '11', label: 'Analytics modules' },
      { value: 'MIT', label: 'License' },
    ],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/DriveVitals' },
      { kind: 'architecture', href: 'https://github.com/harisrana-dev/DriveVitals/blob/main/README.md#6-architecture-diagram' },
      // TODO: add the live demo URL here once a deployment is available
      { kind: 'demo', available: false },
      // TODO: add the case study URL here once published
      { kind: 'case-study', available: false },
    ],
    layout: 'feature',
  },
  {
    id: 'smart-door',
    eyebrow: 'Computer vision access control',
    title: 'Smart Door Security System',
    subtitle: 'Facial recognition access control',
    description: 'A real-time facial recognition security system built with Python and OpenCV for automated identity verification and physical access control.',
    tech: ['Python', 'OpenCV', 'Computer Vision'],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/Smart-Door-Security-System' },
      // TODO: add the case study URL here once published
      { kind: 'case-study', available: false },
    ],
    layout: 'compact',
    visual: 'vision',
  },
  {
    id: 'workshop',
    eyebrow: 'Relational database system',
    title: 'Vehicle Service Workshop Database',
    subtitle: 'Relational database for service operations',
    description: 'Managing service operations, customer records, repair history, maintenance workflows, scheduling, reporting, and optimized queries.',
    tech: ['SQL', 'MySQL', 'Database Design'],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/vehicle-workshop-database' },
    ],
    layout: 'workshop',
  },
]

export const about = {
  eyebrow: 'About',
  title: 'Focused on the space where software meets machines.',
  copy: 'Engineering interests across artificial intelligence, automotive intelligence, digital twins, computer vision, and real-time systems.',
  facts: [
    { label: 'Degree', value: 'BSc Computer Science' },
    { label: 'University', value: 'The University of Lahore' },
    { label: 'Graduation', value: 'June 2027' },
  ],
} as const
export const domains = [
  { number: '01', label: 'Artificial Intelligence', value: 'Machine Learning / Computer Vision' },
  { number: '02', label: 'Automotive Intelligence', value: 'Vehicle Telemetry / Fleet Systems' },
  { number: '03', label: 'Digital Twin Systems', value: 'Simulation / Physical System Modeling' },
  { number: '04', label: 'Real-Time Engineering', value: 'Streaming / WebSockets / Event-Driven Systems' },
]
export const capabilities = [
  { title: 'Artificial Intelligence & Computer Vision', visual: 'vision', items: ['Machine Learning', 'Computer Vision', 'OpenCV', 'Facial Recognition', 'Liveness Detection', 'Predictive Modeling'] },
  { title: 'Automotive Intelligence & Digital Twins', visual: 'vehicle', items: ['Vehicle Telemetry', 'Digital Twin Systems', 'Fleet Analytics', 'Physics-Based Simulation', 'Vehicle Control', 'Predictive Maintenance Architecture'] },
  { title: 'Backend & Real-Time Systems', visual: 'pipeline', items: ['Python', 'FastAPI', 'REST APIs', 'WebSockets', 'SQLAlchemy', 'Pydantic', 'PostgreSQL'] },
  { title: 'Software Architecture & Engineering', visual: 'architecture', items: ['Object-Oriented Programming', 'SOLID Principles', 'Dependency Injection', 'Design Patterns', 'Git / GitHub', 'Agile Development', 'Docker'] },
] as const
export const journey = [
  { date: '2026 - Present', title: 'Project Lead & Software Engineer', organization: 'DriveVitals / Self-Initiated Engineering Project', copy: 'Architecting and leading an AI-powered Fleet Intelligence and Digital Twin platform for commercial fleet simulation, telemetry, driver behaviour, and predictive analytics. Leading a team of three through milestones, task assignment, Git workflows, reviews, feature branches, pull requests, and controlled merges.' },
  { date: '2023 - 2027', title: 'Bachelor of Science in Computer Science', organization: 'The University of Lahore / CGPA: 3.66 / 4.00', copy: 'Building a strong foundation in software engineering, artificial intelligence, databases, computer vision, and systems development while applying academic knowledge through self-initiated engineering projects.' },
  { date: 'July 2025', title: 'Elements of AI', organization: 'University of Helsinki', copy: 'Completed the Elements of AI course, strengthening foundational understanding of artificial intelligence concepts and applications.' },
]
export const research = [
  { number: '01', title: 'Predictive Vehicle Diagnostics', copy: 'Using machine learning on vehicle telemetry to identify abnormal behaviour and move toward predicting mechanical issues before failure.' },
  { number: '02', title: 'Digital Twin Systems', copy: 'Building virtual representations of physical vehicles and fleets to simulate behaviour, monitor system state, and test intelligent decisions.' },
  { number: '03', title: 'Real-Time Computer Vision', copy: 'Designing perception systems that operate under real-time constraints where latency, reliability, and computational efficiency matter.' },
  { number: '04', title: 'Edge & Embedded Intelligence', copy: 'Exploring how intelligent systems can operate closer to physical devices and constrained hardware.' },
  { number: '05', title: 'Fleet Intelligence', copy: 'Understanding how vehicle, driver, and operational data can be combined to create more intelligent fleet decision-making systems.' },
]
export const faq = [
  ['What is DriveVitals?', 'DriveVitals is my primary engineering project: an AI-powered Fleet Intelligence and Digital Twin platform designed to simulate commercial fleet operations, vehicle telemetry, driver behaviour, and predictive analytics.'],
  ['What are you currently studying?', 'I am pursuing a Bachelor of Science in Computer Science at The University of Lahore and expect to graduate in June 2027.'],
  ['What areas are you most interested in?', 'My main interests are artificial intelligence, automotive intelligence, digital twin systems, computer vision, vehicle telemetry, and real-time systems.'],
  ['Are you open to collaboration?', 'Yes. I am interested in meaningful opportunities involving AI, automotive systems, computer vision, real-time engineering, and intelligent physical systems.'],
]
