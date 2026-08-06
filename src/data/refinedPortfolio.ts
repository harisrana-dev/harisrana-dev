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

export type PipelineStep = {
  label: string
  note?: string
  /** Marks a planned (not yet shipped) stage of the flow. */
  future?: boolean
}

export type CaseStudyBlock =
  | { kind: 'summary'; text: string }
  | { kind: 'problem'; statement: string; why: string; who: string }
  | { kind: 'pipeline'; title: string; steps: PipelineStep[] }
  | { kind: 'workflow'; title: string; steps: string[] }
  | { kind: 'pair'; title: string; rows: { title: string; text: string }[] }
  | { kind: 'stack'; title: string; items: string[] }
  | { kind: 'status'; title: string; shipped: string[]; roadmap: string[] }
  | { kind: 'links'; title: string; items: { label: string; href: string; note?: string }[] }

export type ProjectVisualKind = 'drivevitals' | 'knowledge' | 'security' | 'workshop'

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
  /** Project-specific engineering diagram rendered in the card. */
  visual?: ProjectVisualKind
  /** Expandable engineering case study rendered below the card content. */
  caseStudy?: CaseStudyBlock[]
}

// Metric values below are derived from the public DriveVitals repository
// (github.com/harisrana-dev/DriveVitals) and must stay consistent with it.
// The shipped/roadmap split reflects what exists in the repository code today.
export const projects: Project[] = [
  {
    id: 'drivevitals',
    eyebrow: 'Project Lead & Software Engineer / July 2026 - Present',
    title: 'DriveVitals',
    subtitle: 'Fleet Intelligence & Digital Twin Platform',
    description: 'DriveVitals is a full-stack fleet intelligence platform that turns continuous vehicle telemetry into driver, vehicle, and maintenance insight. I led the architecture and build across a physics-based digital twin simulator, a FastAPI backend, a real-time WebSocket layer, a modular analytics engine, SQL persistence, and a React fleet command center.',
    detail: 'The system is layered so the intelligence engine works identically whether telemetry comes from the simulator today or real OBD-II devices later. Shipped today: simulation, REST + WebSocket APIs, analytics, maintenance and alert engines, persistence, and a dashboard. Planned: the predictive ML layer and real device integration.',
    tech: ['Python', 'FastAPI', 'React', 'REST APIs', 'WebSockets', 'SQLAlchemy', 'Alembic', 'Pydantic', 'Digital Twins', 'Fleet Analytics', 'Physics Simulation', 'PostgreSQL'],
    metrics: [
      { value: '03', label: 'Developers led' },
      { value: '06', label: 'Domain entities' },
      { value: '10', label: 'REST routers' },
      { value: '11', label: 'Analytics modules' },
      { value: 'MIT', label: 'License' },
    ],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/DriveVitals' },
      { kind: 'architecture', href: 'https://github.com/harisrana-dev/DriveVitals/blob/develop/README.md#6-architecture-diagram' },
      // TODO: add the live demo URL here once a deployment is available
      { kind: 'demo', available: false },
      // TODO: add the case study URL here once published
      { kind: 'case-study', available: false },
    ],
    layout: 'feature',
    visual: 'drivevitals',
    caseStudy: [
      {
        kind: 'summary',
        text: 'DriveVitals is a production-shaped fleet intelligence platform. It simulates realistic vehicle telemetry from a stateful digital twin, runs it through a modular analytics engine that scores driver behaviour, vehicle health, and fuel efficiency, and streams the results live to a React fleet command center over WebSockets. The architecture is deliberately decoupled: the analytics layer is written against a fixed telemetry schema, so the simulator can be replaced with real OBD-II hardware without re-architecting the intelligence stack.',
      },
      {
        kind: 'problem',
        statement: 'Vehicles emit continuous signals through their ECUs and onboard sensors, but raw telemetry is rarely usable in its native form. Fleet operators are left correlating disconnected numbers instead of acting on insight.',
        why: 'Fleet managers typically lack real-time visibility into vehicle state, driver performance, early-warning health signals, and data-driven maintenance decisions. Fixed-interval servicing and manual log review miss developing problems until they fail.',
        who: 'Fleet operators and managers who need to know which vehicles are at risk, which drivers are unsafe or inefficient, and what needs maintenance before it fails.',
      },
      {
        kind: 'pipeline',
        title: 'System architecture',
        steps: [
          { label: 'Digital twin simulator', note: 'stateful physics-based telemetry' },
          { label: 'Telemetry pipeline', note: 'normalized sample schema' },
          { label: 'Runtime state', note: 'fleet / vehicle / driver managers' },
          { label: 'Analytics engine', note: 'behaviour, health, fuel, trip, fleet' },
          { label: 'Maintenance & alerts', note: 'component estimators + dedup' },
          { label: 'Persistence', note: 'SQLAlchemy models + Alembic' },
          { label: 'WebSocket streaming', note: 'dashboard & trip publishers' },
          { label: 'Fleet command center', note: 'React + Vite dashboard' },
        ],
      },
      {
        kind: 'workflow',
        title: 'System workflow',
        steps: [
          'The digital twin models driver intent to vehicle actuation to physics, evolving a persistent state (speed, RPM, gear, fuel, temperature, component wear) tick by tick.',
          'Virtual sensors expose the internal state as structured telemetry; the pipeline normalizes samples and routes them to state and analytics.',
          'The analytics engine scores driver behaviour, five vehicle-health subsystems, fuel efficiency, trips, and fleet trends through a configurable rule engine.',
          'Maintenance estimators project component wear; the alert engine raises and deduplicates health, maintenance, telemetry, and trip alerts.',
          'The backend persists results through repositories and streams live snapshots to connected dashboards over WebSockets.',
          'Operators act on the React fleet command center: fleet health, driver rankings, maintenance queue, and a live alert feed.',
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Stateful simulation over random telemetry', text: 'A real vehicle is not a different vehicle every second. Evolving state (previous state → decision → actuation → physics → new state) produces explainable, cause-and-effect telemetry instead of random numbers.' },
          { title: 'Layered, decoupled architecture', text: 'The analytics engine consumes a fixed telemetry schema, so swapping the simulator for OBD-II/CAN later does not touch the intelligence layer.' },
          { title: 'Modular analyzers over a monolith', text: 'Each analyzer (behaviour, health, fuel, trip, fleet) is an independent module that can evolve or be replaced without reworking ingestion or transport.' },
          { title: 'WebSockets over polling', text: 'Dashboards subscribe to snapshot and trip publishers instead of polling, keeping telemetry delivery real-time and the UI state fresh.' },
          { title: 'SQLAlchemy + Alembic from the start', text: 'Persistence is a first-class layer with models, migrations, and repositories, so schema evolution is reviewable rather than ad-hoc.' },
          { title: 'Rule-based analytics first, ML later', text: 'Deterministic rules are explainable and auditable; the ML layer is planned on top of the same signal data instead of replacing the engine.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Trade-offs',
        rows: [
          { title: 'Physics-inspired fidelity vs ECU accuracy', text: 'The physics model is intentionally simplified and explainable for simulation; it does not reproduce a specific manufacturer\'s ECU behavior.' },
          { title: 'Rule-engine interpretability vs learned models', text: 'Rules are debuggable and defensible; learned models would trade some explainability for broader pattern detection.' },
          { title: 'Simulated source vs real devices', text: 'Real ECU/CAN access is restricted by manufacturer protocols, so the simulator is the current source — schema-compatible with future OBD-II integration.' },
          { title: 'Single-machine demo vs distributed scale', text: 'The current deployment targets a single process; multi-fleet, multi-tenant cloud operation is future scope.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Challenges & how they were solved',
        rows: [
          { title: 'No access to real ECU/CAN data', text: 'Built a physics-inspired simulator that produces schema-compatible telemetry; the intelligence layer is written against the schema, not the simulator.' },
          { title: 'Real-time delivery without UI polling', text: 'Built a WebSocket manager with snapshot and trip publishers and a subscriber pattern that pushes state changes to connected clients.' },
          { title: 'Keeping analytics decoupled from the data source', text: 'A layered pipeline (ingestion → state → analytics) consumes a stable schema, isolating changes in each layer.' },
          { title: 'Granular vehicle health', text: 'Split health scoring into five subsystem analyzers (brake, cooling, engine, fuel system, transmission) with matching maintenance estimators instead of one opaque score.' },
          { title: 'Alert noise', text: 'A dedicated deduplication module stops the same condition flooding the feed with repeated alerts.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'Digital twin simulation: 6 domain entities, 7 managers, runtime and physics engine',
          'Telemetry generation and normalized pipeline',
          'FastAPI REST API: v1 routers for vehicles, drivers, trips, routes, telemetry, health, maintenance, alerts, statistics, system',
          'WebSocket streaming: dashboard snapshot and trip publishers',
          'Analytics engine: driver behaviour, vehicle health (5 subsystems), fuel efficiency, trip, fleet trends, rule engine',
          'Maintenance intelligence: component estimators and recommendations',
          'Alert engine with deduplication and typed generators',
          'Persistence: SQLAlchemy models, Alembic migrations, repositories',
          'React + Vite fleet command center with 10 views',
          'pytest API, integration, and unit suite',
          'Project Bible + design + engineering docs (OBD-II, PID decoding, telemetry)',
        ],
        roadmap: [
          'Predictive ML layer — only a dataset builder and research notes exist today',
          'Real OBD-II / ELM327 device integration (protocol research documented)',
          'Cloud, multi-tenant deployment',
          'External alerting / notification channels',
          'Screenshot gallery from the running dashboard',
        ],
      },
      {
        kind: 'stack',
        title: 'Technology stack',
        items: ['Python 3.12', 'FastAPI', 'SQLAlchemy', 'Alembic', 'Pydantic', 'WebSockets', 'React + Vite', 'pytest', 'Docker Compose', 'PostgreSQL (schema)', 'Git / GitHub', 'OBD-II / PID decoding research'],
      },
      {
        kind: 'links',
        title: 'Dashboard screenshots',
        items: [
          { label: 'Fleet overview', href: 'https://raw.githubusercontent.com/harisrana-dev/DriveVitals/develop/docs/images/Screenshot%202026-07-10%20164001.png', note: 'from the running frontend' },
          { label: 'Dashboard views (1)', href: 'https://raw.githubusercontent.com/harisrana-dev/DriveVitals/develop/docs/images/Screenshot%202026-07-13%20175941.png' },
          { label: 'Dashboard views (2)', href: 'https://raw.githubusercontent.com/harisrana-dev/DriveVitals/develop/docs/images/Screenshot%202026-07-13%20175955.png' },
          { label: 'Dashboard views (3)', href: 'https://raw.githubusercontent.com/harisrana-dev/DriveVitals/develop/docs/images/Screenshot%202026-07-13%20180009.png' },
        ],
      },
    ],
  },
  {
    id: 'knowledge-platform',
    eyebrow: 'Personal developer productivity platform',
    title: 'AI Knowledge Platform',
    subtitle: 'Retrieval assistant for a living knowledge base',
    description: 'One ecosystem that turns an Obsidian knowledge base into a queryable AI assistant and keeps its documentation in sync with code automatically. Markdown notes are indexed, chunked, and embedded; retrieval feeds the Groq API for grounded answers; and a GitHub commit watcher triggers automatic Obsidian documentation generation so the knowledge base continuously evolves with the codebase.',
    detail: 'Presented as a single pipeline rather than separate tools: source notes, retrieval, generation, and a change-driven documentation loop that closes back into the knowledge base.',
    tech: ['Obsidian', 'Markdown', 'RAG', 'Embeddings', 'Groq API', 'Vector Retrieval', 'Git / GitHub', 'Docs Automation'],
    actions: [
      // TODO: add the GitHub repository URL once the platform is published
      { kind: 'github', available: false },
      // TODO: add the case study URL here once published
      { kind: 'case-study', available: false },
    ],
    layout: 'feature',
    visual: 'knowledge',
    caseStudy: [
      {
        kind: 'summary',
        text: 'The AI Knowledge Platform is one developer-productivity ecosystem rather than a set of disconnected scripts. An Obsidian vault is the source of truth; an indexing, chunking, and embedding stage makes it searchable by meaning; retrieval feeds the Groq API to generate grounded answers; and a Git commit watcher triggers automatic Obsidian documentation generation. The loop is closed when generated documentation lands back in the vault, so the knowledge base evolves with the code.',
      },
      {
        kind: 'problem',
        statement: 'Personal and team knowledge lives in scattered markdown notes that are hard to search, hard to query, and go stale the moment code changes.',
        why: 'Retrieving the right note or regenerating accurate documentation manually is slow, and stale documentation compounds across every project it touches.',
        who: 'Developers who want answers grounded in their own notes and codebase without context-switching between a wiki, a chat window, and source files.',
      },
      {
        kind: 'pipeline',
        title: 'Architecture — a single evolving loop',
        steps: [
          { label: 'Obsidian vault', note: 'markdown source of truth' },
          { label: 'Indexing', note: 'parse + normalize notes' },
          { label: 'Chunking', note: 'boundary-aware splits' },
          { label: 'Embeddings', note: 'semantic index' },
          { label: 'Retrieval', note: 'query → top chunks' },
          { label: 'Groq API', note: 'grounded generation' },
          { label: 'AI assistant', note: 'answers with sources' },
          { label: 'Git commit watcher', note: 'detects change' },
          { label: 'Doc generation', note: 'auto Obsidian docs' },
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Markdown + Obsidian as the source of truth', text: 'Plain text is portable, diffable, and reviewable; no proprietary format locks the knowledge base.' },
          { title: 'Chunking at semantic boundaries', text: 'Splitting at headings and sections beats fixed-size cuts for retrieval precision.' },
          { title: 'Embeddings over keyword search', text: 'Semantic retrieval matches meaning, so a question can surface a note that never shares the question\'s keywords.' },
          { title: 'Groq for generation', text: 'Low-latency inference suits an interactive assistant grounded in retrieved context.' },
          { title: 'Git as the change signal', text: 'Watching commits gives a deterministic, reviewable trigger for re-indexing and documentation generation.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Trade-offs',
        rows: [
          { title: 'Local vs cloud embeddings', text: 'Local models run offline but are weaker than hosted models; the choice trades privacy against quality.' },
          { title: 'Chunk granularity', text: 'Smaller chunks are precise but lose context; larger chunks keep context but blur the match.' },
          { title: 'Full re-index vs incremental', text: 'Full rebuilds are simple but expensive; incremental updates trade complexity for speed.' },
          { title: 'Retrieval quality vs latency', text: 'More retrieved context improves grounding but increases generation latency and cost.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Challenges & how they were solved',
        rows: [
          { title: 'Keeping the index fresh', text: 'The commit watcher triggers targeted re-indexing for changed notes instead of rebuilding the vault.' },
          { title: 'Chunk boundaries splitting meaning', text: 'Chunking at headings and sections keeps related content together rather than splitting mid-idea.' },
          { title: 'Grounded answers instead of hallucinations', text: 'Answers are generated only from retrieved chunks, with source notes retained for verification.' },
          { title: 'Avoiding documentation churn', text: 'Generation only rewrites changed sections, so git history stays reviewable.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'Markdown knowledge base (Obsidian)',
          'Indexing and boundary-aware chunking pipeline',
          'Embeddings / semantic retrieval',
          'Groq-backed response generation',
          'Git commit watcher',
          'Automatic Obsidian documentation generation',
        ],
        roadmap: [
          'Evaluation harness for retrieval quality',
          'Multi-vault support',
          'Citation / source-linking in answers',
          'Vector store scaling',
        ],
      },
      {
        kind: 'stack',
        title: 'Technology stack',
        items: ['Obsidian', 'Markdown parsing', 'Embeddings', 'Vector index', 'Groq API', 'Git / GitHub', 'Python / TypeScript'],
      },
    ],
  },
  {
    id: 'smart-door',
    eyebrow: 'Computer vision access control',
    title: 'Smart Door Security System',
    subtitle: 'Facial recognition access control',
    description: 'An embedded access-control system that authenticates people by face recognition with liveness verification and a PIN fallback — running in real time on a Raspberry Pi and driving physical door hardware over GPIO.',
    tech: ['Python', 'OpenCV', 'dlib', 'face_recognition', 'Raspberry Pi GPIO', 'CustomTkinter'],
    metrics: [
      { value: '02', label: 'Auth paths' },
      { value: '04', label: 'GPIO peripherals' },
      { value: '68', label: 'Landmark points' },
    ],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/Smart-Door-Security-System' },
      // TODO: add the case study URL here once published
      { kind: 'case-study', available: false },
    ],
    layout: 'compact',
    visual: 'security',
    caseStudy: [
      {
        kind: 'summary',
        text: 'An end-to-end access-control prototype that combines face recognition, randomized head-pose liveness verification, and a PIN fallback on a Raspberry Pi. A PIR sensor wakes the camera, OpenCV detects and tracks the face, face_recognition matches the identity, and dlib verifies the person is live before the relay unlocks the door.',
      },
      {
        kind: 'problem',
        statement: 'Keys and static passwords are easy to lose, copy, or misuse, and they verify nothing about a real human presence.',
        why: 'A photo or a screen can defeat naive face recognition; the system must prove a live person is present before unlocking.',
        who: 'Anyone who needs stronger, presence-aware access control on low-power embedded hardware.',
      },
      {
        kind: 'pipeline',
        title: 'Recognition pipeline',
        steps: [
          { label: 'PIR motion', note: 'wakes the camera' },
          { label: 'Detection & tracking', note: 'OpenCV' },
          { label: 'Recognition', note: 'encoding match' },
          { label: 'Liveness', note: 'dlib head-pose' },
          { label: 'Decision', note: 'unlock / retry / PIN' },
          { label: 'PIN fallback', note: 'manual keypad' },
          { label: 'Log + GPIO', note: 'CSV log, relay' },
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Haar Cascade for detection', text: 'Deep detectors were too slow on the Pi; Haar Cascade meets real-time constraints at the cost of accuracy.' },
          { title: 'Rule-based liveness via head-pose prompts', text: 'A deterministic, randomized challenge verifies a live person without deep models — explainable and lightweight.' },
          { title: 'Direct GPIO control', text: 'The relay, PIR, buzzer, and LED are driven directly over GPIO, closing the loop from software to hardware.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'PIR-triggered camera pipeline',
          'Face detection, tracking, and recognition',
          'Randomized head-pose liveness verification',
          'PIN fallback GUI',
          'GPIO hardware control (relay, PIR, buzzer, LED)',
          'CSV access logging',
        ],
        roadmap: [
          'Refactor PIN module threading',
          'Learning-based liveness detection',
          'Deep-model detection to replace Haar Cascade',
        ],
      },
    ],
  },
  {
    id: 'workshop',
    eyebrow: 'Relational database system',
    title: 'Vehicle Service Workshop Database',
    subtitle: 'Relational database for service operations',
    description: 'A normalized relational database for vehicle service operations, tracking customers, vehicles, mechanics, services, service orders, and payments — with views and aggregate queries for reporting and indexes on the hot query paths.',
    tech: ['SQL', 'MySQL', 'Database Design'],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/vehicle-workshop-database' },
    ],
    layout: 'workshop',
    visual: 'workshop',
    caseStudy: [
      {
        kind: 'summary',
        text: 'A normalized relational model for a vehicle service workshop that keeps customers, vehicles, repair history, parts, and mechanics in one schema, with views and queries that answer the operational questions a workshop actually asks.',
      },
      {
        kind: 'problem',
        statement: 'Workshops manage customers, vehicles, repairs, and maintenance history with ad-hoc records and spreadsheets that fragment the picture of a vehicle\'s service life.',
        why: 'Without a joined record of history, workshops re-diagnose the same problems and cannot report reliably on revenue, workload, or vehicle condition.',
        who: 'Workshop operators who need one authoritative record of service operations.',
      },
      {
        kind: 'workflow',
        title: 'What the schema supports',
        steps: [
          'Customers and vehicles are linked so service history follows the vehicle, not the customer.',
          'Service orders reference the mechanics, services, and parts involved, so every repair leaves a complete record.',
          'Reporting queries aggregate revenue, workload, and common repairs from the views.',
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Normalized core, denormalized reports', text: 'Normalization keeps integrity at the core while reporting views simplify the frequent analytical queries.' },
          { title: 'Referential integrity everywhere', text: 'Foreign keys enforce that a repair record cannot reference a missing vehicle or part.' },
          { title: 'Indexes for the hot paths', text: 'Indexed lookups on plate/VIN and service dates keep the operational queries fast.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'Normalized schema for customers, vehicles, mechanics, services, service orders, and payments',
          'Views and aggregate queries for service order and billing reports',
          'Indexes on plate/VIN and service-date lookups',
        ],
        roadmap: ['Stored procedures for recurring business logic', 'Triggers for audit trails', 'Web UI for data entry'],
      },
    ],
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
