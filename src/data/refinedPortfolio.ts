export const navItems = [['Work', '#work'], ['Tools', '#tools'], ['Experience', '#experience'], ['Research', '#research'], ['Contact', '#contact']]

// ---------------------------------------------------------------------------
// Shared content types. Components (ProjectActions, ProjectMetrics, CaseStudy)
// consume these so project data stays declarative and reusable.
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
  /** Short display value. Counts below are verified against the repository. */
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

// Project content below is written against the public repositories and kept
// consistent with what they actually contain.
export const projects: Project[] = [
  {
    id: 'drivevitals',
    eyebrow: 'Project Lead & Software Engineer / 2026 - Present',
    title: 'DriveVitals',
    subtitle: 'Fleet Intelligence & Digital Twin Platform',
    description: 'A full-stack fleet intelligence platform that turns continuous vehicle telemetry into driver, vehicle, and maintenance insight. A physics-inspired digital twin evolves persistent vehicle state tick by tick, a FastAPI backend ingests normalized telemetry samples and streams them live, a modular analytics engine scores driver behaviour, vehicle health, and fuel efficiency through a configurable rule engine, maintenance estimators project component wear, and a React command center presents the results.',
    detail: 'The intelligence layer is written against a fixed telemetry schema, so the physics simulator can later be replaced by real OBD-II/CAN devices without re-architecting the stack. Shipped today: simulation, REST + WebSocket APIs, analytics, maintenance and alert engines, persistence, and a 10-view dashboard. Planned: the predictive ML layer and real device integration.',
    tech: ['Python 3.12+', 'FastAPI', 'SQLAlchemy', 'Alembic', 'asyncpg', 'PostgreSQL 16', 'Pydantic', 'WebSockets', 'React 18 + Vite', 'react-router', 'recharts', 'pytest', 'Docker Compose'],
    metrics: [
      { value: '10', label: 'REST routers' },
      { value: '21', label: 'API endpoints' },
      { value: '11', label: 'SQLAlchemy models' },
      { value: '05', label: 'Health subsystems' },
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
        text: 'DriveVitals is a production-shaped fleet intelligence platform with a deliberately layered architecture. A physics-inspired digital twin evolves persistent vehicle state tick by tick — speed, RPM, load, temperature, and component wear follow from driver intent to actuation to physics. A FastAPI backend ingests those samples through a normalized pipeline into fleet runtime state; a modular analytics engine scores driver behaviour, vehicle health, fuel efficiency, trips, and fleet trends through a configurable rule engine; maintenance estimators project component wear; and an alert engine raises and deduplicates typed alerts. SQLAlchemy + Alembic persist everything to PostgreSQL 16, and WebSocket publishers stream live snapshots to a React fleet command center. The analytics layer is written against a fixed telemetry schema, so the simulator can be replaced by real OBD-II/CAN hardware without touching the intelligence stack.',
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
          { label: 'Fleet runtime state', note: 'vehicle / driver / trip runners' },
          { label: 'Analytics engine', note: 'behaviour, health, fuel, trip, fleet + rule engine' },
          { label: 'Maintenance & alerts', note: 'component estimators + dedup engine' },
          { label: 'Persistence', note: 'SQLAlchemy + Alembic to PostgreSQL 16' },
          { label: 'WebSocket streaming', note: 'dashboard snapshot + trip publishers' },
          { label: 'Fleet command center', note: 'React + Vite, 10 views' },
        ],
      },
      {
        kind: 'workflow',
        title: 'System workflow',
        steps: [
          'The digital twin evolves a persistent vehicle state tick by tick — driver intent to actuation to physics — so speed, RPM, gear, fuel, temperature, and component wear follow cause-and-effect instead of random numbers.',
          'The OBD telemetry generator exposes the internal state as structured samples; the pipeline normalizes them and routes them to fleet runtime state and the analytics engine.',
          'The analytics engine scores driver behaviour against configurable thresholds (harsh braking, aggressive throttle above 80%, high RPM above 4,000), five vehicle-health subsystems, fuel efficiency, trips, and fleet trends through a rule engine.',
          'Maintenance estimators project component wear; the alert engine raises and deduplicates health, maintenance, telemetry, and trip alerts.',
          'The backend persists results through SQLAlchemy repositories and Alembic migrations to PostgreSQL 16 (Docker Compose).',
          'WebSocket snapshot and trip publishers stream live state to connected dashboards instead of the UI polling.',
          'Operators act on the React command center: fleet health, driver rankings, maintenance queue, and a live alert feed.',
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Stateful simulation over random telemetry', text: 'A real vehicle is not a different vehicle every second. Evolving state (previous state, decision, actuation, physics, new state) produces explainable, cause-and-effect telemetry instead of random numbers.' },
          { title: 'Schema-locked, layered architecture', text: 'The analytics engine consumes a fixed telemetry schema, so swapping the simulator for OBD-II/CAN later does not touch the intelligence layer.' },
          { title: 'Modular analyzers over a monolith', text: 'Driver behaviour, vehicle health (five subsystem analyzers), fuel efficiency, trip, and fleet are independent modules that can evolve or be replaced without reworking ingestion or transport.' },
          { title: 'Configurable rule engine before ML', text: 'Deterministic, auditable thresholds (harsh braking, aggressive throttle, high RPM) power scoring today; the ML layer is planned on top of the same signal data instead of replacing the engine.' },
          { title: 'WebSockets over polling', text: 'Dashboard snapshot and trip publishers push state to subscribed clients, keeping telemetry delivery real-time and the UI fresh.' },
          { title: 'SQLAlchemy + Alembic + PostgreSQL from the start', text: 'Persistence is a first-class layer with 11 models, reviewable migrations, and repositories, so schema evolution is controlled rather than ad-hoc.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Trade-offs',
        rows: [
          { title: 'Physics-inspired fidelity vs ECU accuracy', text: 'The physics model is intentionally simplified and explainable for simulation; it does not reproduce a specific manufacturer\'s ECU behavior.' },
          { title: 'Rule-engine interpretability vs learned models', text: 'Rules are debuggable and defensible; learned models would trade some explainability for broader pattern detection.' },
          { title: 'Simulated source vs real devices', text: 'Real ECU/CAN access is restricted by manufacturer protocols, so the simulator is the current source — schema-compatible with the documented OBD-II integration path.' },
          { title: 'Single-machine demo vs distributed scale', text: 'The current deployment targets a single process with Docker Compose; multi-fleet, multi-tenant cloud operation is future scope.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Challenges & how they were solved',
        rows: [
          { title: 'No access to real ECU/CAN data', text: 'Built a physics-inspired simulator that produces schema-compatible telemetry and documented the OBD-II/PID research (ELM327, Mode 01, bitmap flags) so real-device integration is protocol-ready.' },
          { title: 'Real-time delivery without UI polling', text: 'Built a WebSocket manager with snapshot and trip publishers and a subscriber pattern that pushes state changes to connected clients.' },
          { title: 'Keeping analytics decoupled from the data source', text: 'A layered pipeline (ingestion, runtime state, analytics) consumes a stable schema, isolating changes in each layer.' },
          { title: 'Granular vehicle health', text: 'Split health scoring into five subsystem analyzers (brake, cooling, engine, fuel system, transmission) with matching maintenance estimators instead of one opaque score.' },
          { title: 'Alert noise', text: 'A dedicated deduplication module stops the same condition flooding the feed with repeated alerts.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'Digital twin: fleet/vehicle runners, tick-based runtime, OBD telemetry generator, 5 fleet domain models',
          'Normalized telemetry pipeline and sample schema',
          'FastAPI REST API: 10 routers, 21 endpoints (vehicles, drivers, trips, routes, telemetry, vehicle health, driver statistics, maintenance, alerts, system)',
          'WebSocket streaming: dashboard snapshot and trip publishers',
          'Analytics engine: driver behaviour, vehicle health (5 subsystems), fuel efficiency, trip, fleet, driver statistics, rule engine',
          'Maintenance intelligence: 5 component estimators and recommendations',
          'Alert engine with typed generators and deduplication',
          'Persistence: 11 SQLAlchemy models, Alembic migrations, repositories, PostgreSQL 16 via Docker Compose',
          'React + Vite fleet command center with 10 views',
          'pytest suite: 18 API, integration, and unit test files',
          '46 engineering and design docs, including OBD-II/PID research',
        ],
        roadmap: [
          'Predictive ML layer — only a dataset builder exists today',
          'Real OBD-II / ELM327 device integration',
          'Cloud, multi-tenant deployment',
          'External alerting / notification channels',
          'Screenshot gallery from the running dashboard',
        ],
      },
      {
        kind: 'stack',
        title: 'Technology stack',
        items: ['Python 3.12+', 'FastAPI', 'SQLAlchemy', 'Alembic', 'asyncpg', 'PostgreSQL 16', 'Pydantic', 'WebSockets', 'React 18 + Vite', 'react-router', 'recharts', 'pytest', 'Docker Compose', 'OBD-II / PID research'],
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
    id: 'nexus',
    eyebrow: 'AI / Information Retrieval · 2025 – Present',
    title: 'Nexus',
    subtitle: 'Local-first hybrid IR system with empirical evaluation',
    description: 'A local-first developer knowledge system combining hybrid information retrieval, grounded RAG, Obsidian knowledge ingestion, Git-aware knowledge capture, and reproducible empirical evaluation. Ingests Markdown documentation, indexes it with local ONNX embeddings, and provides semantic, lexical, and hybrid retrieval — evaluated rigorously with ablation studies, statistical testing, and an honest accounting of negative findings.',
    detail: 'Nexus is both a practical developer tool and a reproducible IR research artifact. Hybrid retrieval fuses semantic vector search with punctuation-tolerant lexical matching via Reciprocal Rank Fusion, significantly outperforming either strategy alone on a 109-document, 218-query evaluation corpus. Privacy-first: embeddings run 100% locally via ONNX MiniLM, notes never leave the machine unless a cloud LLM backend is chosen, and every module is a small, inspectable Python file.',
    tech: ['Python 3.10+', 'FastAPI', 'Textual', 'Streamlit', 'ChromaDB', 'ONNX MiniLM', 'Reciprocal Rank Fusion', 'pytest', 'Ruff', 'Obsidian', 'Git hooks'],
    metrics: [
      { value: '109', label: 'Eval documents' },
      { value: '218', label: 'Eval queries' },
      { value: '430+', label: 'Automated tests' },
      { value: '0.498', label: 'NDCG@5 hybrid' },
    ],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/nexus' },
      { kind: 'documentation', href: 'https://github.com/harisrana-dev/nexus/blob/main/docs/paper/phase3-ir-evaluation.md', label: 'Research paper' },
      // TODO: add the case study URL here once published
      { kind: 'case-study', available: false },
    ],
    layout: 'feature',
    visual: 'knowledge',
    caseStudy: [
      {
        kind: 'summary',
        text: 'Nexus is a local-first developer knowledge system combining hybrid information retrieval, grounded RAG, Obsidian knowledge ingestion, Git-aware knowledge capture, and reproducible empirical evaluation. It ingests Markdown documentation, indexes it with local ONNX MiniLM embeddings into ChromaDB, and provides semantic, lexical, and hybrid retrieval via Reciprocal Rank Fusion — all evaluated rigorously with ablation studies, statistical testing, and an honest accounting of negative findings. The system is both a practical developer tool and a reproducible IR research artifact.',
      },
      {
        kind: 'problem',
        statement: 'Engineering knowledge lives in scattered markdown notes, commit messages, and documentation that are hard to search, hard to query, and go stale the moment code changes.',
        why: 'Retrieving the right note or regenerating accurate documentation manually is slow, and stale knowledge compounds across every project it touches. Existing RAG chatbots lack empirical evaluation — you cannot trust retrieval quality you have not measured.',
        who: 'Developers and engineering teams who want answers grounded in their own notes and codebase, with evidence that the retrieval actually works.',
      },
      {
        kind: 'pipeline',
        title: 'System architecture',
        steps: [
          { label: 'Obsidian vault', note: 'markdown source of truth' },
          { label: 'Chunker', note: '1200-char chunks, 150 overlap, headings + wikilinks' },
          { label: 'Embeddings', note: 'local ONNX MiniLM, ChromaDB' },
          { label: 'Live watcher', note: 'debounced re-index on file changes' },
          { label: 'Semantic retrieval', note: 'vector search over embeddings' },
          { label: 'Lexical retrieval', note: 'punctuation-tolerant keyword search' },
          { label: 'Hybrid RRF', note: 'Reciprocal Rank Fusion, K=60' },
          { label: 'Context builder', note: 'source-aware, deduplicated' },
          { label: 'LLM backend', note: 'Ollama local / Groq / OpenRouter' },
          { label: 'Git capture', note: 'post-commit hook → diff → LLM summary → vault note → index' },
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Hybrid retrieval over single strategy', text: 'Semantic search captures meaning; lexical search catches exact jargon, filenames, and commit messages that small embedding models miss. RRF fusion combines both without either dominating.' },
          { title: 'Local-first embeddings', text: 'ONNX MiniLM runs 100% locally — no API key, no note uploads. Privacy is a design constraint, not an afterthought.' },
          { title: 'Markdown-aware chunking', text: 'Boundary-aware chunking preserves nearest headings and [[wikilinks]] as metadata, so each chunk carries structural context for citation.' },
          { title: 'Reproducible evaluation', text: 'All experiments are runnable from committed artifacts with deterministic evaluation, bootstrap confidence intervals, and paired statistical comparisons.' },
          { title: 'Git as the change signal', text: 'A post-commit hook captures each commit\'s message and diff, generates a technical summary via LLM, writes it into the vault, and the watcher indexes it — closing the loop between code and knowledge.' },
          { title: '430+ offline tests', text: 'Every test injects a deterministic hash-based embedding function and isolated temp stores — no LLM API calls, no model downloads, fully deterministic.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Research evaluation highlights',
        rows: [
          { title: 'Corpus & queries', text: '109 documents from CPython, FastAPI, and SQLite documentation (~1,857 chunks at default 1200/150 config), 218 queries across 6 categories, with deterministic term-overlap ground truth.' },
          { title: 'Hybrid RRF outperforms baselines', text: 'NDCG@5 of 0.498 vs 0.418 (semantic) and 0.415 (lexical). Improvement is statistically significant (Wilcoxon p<0.001). Semantic vs lexical: not significant (p=0.82).' },
          { title: 'RRF K is stable', text: 'Performance consistent across K ∈ [5, 200]; production default K=60 is near-optimal. Chunk-size ablation shows no single size dominates — small chunks favor precision, large chunks favor ranking.' },
          { title: 'Graph-RAG negative result', text: 'Wikilink expansion degraded NDCG@5 from 0.498 to 0.467 (p<0.001). Sparse connectivity and navigational (not semantic) wikilinks introduce lower-quality chunks. This honest negative result is intentionally retained.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Trade-offs',
        rows: [
          { title: 'Local vs cloud embeddings', text: 'The local ONNX model runs offline and free but is weaker than hosted models; the choice trades privacy against quality.' },
          { title: 'Chunk granularity', text: '1,200-char chunks balance precision and context; smaller chunks improve first-result precision, larger chunks improve overall ranking.' },
          { title: 'Hybrid latency vs quality', text: 'Hybrid retrieval takes ~641 ms/query vs 111 ms for lexical-only — the RRF fusion adds latency but significantly improves ranking quality.' },
          { title: 'Graph expansion vs noise', text: 'Wikilink expansion adds recall but degrades precision on sparse graphs — the NDCG tradeoff is documented and measured.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'Markdown-aware chunking: 1,200 chars, 150 overlap, headings + wikilinks',
          'Local ONNX MiniLM embeddings + persistent ChromaDB vector store',
          'Semantic, lexical, and hybrid (RRF) retrieval strategies',
          'Git post-commit capture: commit → diff → LLM summary → vault note → index',
          'Textual TUI (slash commands, history, chat) and Streamlit web UI',
          'Multi-provider LLM: Ollama local, Groq, OpenRouter cloud',
          '430+ automated tests, fully offline and deterministic',
          'Reproducible evaluation: 109 docs, 218 queries, 6 categories, ablation studies',
          'Research paper: docs/paper/phase3-ir-evaluation.md',
        ],
        roadmap: [
          'Human evaluation: annotation-ready framework (94 candidate queries, graded relevance)',
          'Graph-RAG: revisit with richer link structure or embedding-based link scoring',
          'Multi-model embedding comparison',
          'Cloud sync / hosted indexing',
        ],
      },
      {
        kind: 'stack',
        title: 'Technology stack',
        items: ['Python 3.10+', 'FastAPI', 'Textual', 'Streamlit', 'ChromaDB', 'ONNX MiniLM', 'Reciprocal Rank Fusion', 'pytest', 'Ruff', 'Obsidian', 'Git hooks'],
      },
    ],
  },
  {
    id: 'smart-door',
    eyebrow: 'Computer vision access control',
    title: 'Smart Door Security System',
    subtitle: 'Facial recognition access control on a Raspberry Pi',
    description: 'A real-time embedded access-control system that authenticates people with face recognition and passive liveness verification on a Raspberry Pi, with a PIN fallback and physical door control over GPIO. A PIR sensor wakes a threaded camera pipeline; faces are detected and tracked with a single-shot DNN (OpenCV ResNet-10 SSD); recognition matches the live encoding against precomputed face embeddings; and passive liveness is verified with randomized head-pose prompts using dlib\'s 68-point landmark model. The relay, buzzer, and LED are driven directly over GPIO, with CSV access and intruder logs.',
    tech: ['Python 3.9+', 'OpenCV', 'dlib', 'face_recognition', 'Raspberry Pi GPIO', 'CustomTkinter', 'Multithreading'],
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
        kind: 'problem',
        statement: 'Keys and static passwords are easy to lose, copy, or misuse, and they verify nothing about a real human presence.',
        why: 'A photo or a screen can defeat naive face recognition; the system must prove a live person is present before unlocking.',
        who: 'Anyone who needs stronger, presence-aware access control on low-power embedded hardware.',
      },
      {
        kind: 'pipeline',
        title: 'Implementation',
        steps: [
          { label: 'PIR motion', note: 'wakes the camera' },
          { label: 'Detection & tracking', note: 'OpenCV DNN ResNet-10 SSD' },
          { label: 'Recognition', note: 'encoding match, thresholded' },
          { label: 'Liveness', note: 'dlib 68-point head-pose prompts' },
          { label: 'Decision', note: 'unlock / retry / PIN' },
          { label: 'PIN fallback', note: 'CustomTkinter keypad' },
          { label: 'Log + GPIO', note: 'CSV logs, relay unlock' },
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Single-shot DNN detection', text: 'An OpenCV ResNet-10 SSD runs real-time on the Pi with far better accuracy than Haar cascades, while still fitting the hardware\'s compute budget.' },
          { title: 'Precomputed encodings for recognition', text: 'face_recognition embeddings are computed offline and matched live under a confidence threshold — fast enough for a continuous camera stream.' },
          { title: 'Passive, rule-based liveness', text: 'Randomized head-pose prompts (left, right, up, down) are verified with dlib\'s 68-point landmarks — deterministic, explainable, and lightweight compared to a deep liveness model.' },
          { title: 'Direct GPIO control', text: 'The relay, PIR, buzzer, and LED are driven directly over GPIO with a shared ground, closing the loop from software to hardware.' },
          { title: 'Non-blocking threading', text: 'Separate threads for the camera, recognition, and liveness keep the pipeline smooth on constrained hardware.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Trade-offs',
        rows: [
          { title: 'DNN detector vs lighter detectors', text: 'ResNet-10 SSD is accurate but heavier; lighter or quantized models are future work for even tighter real-time budgets.' },
          { title: 'Rule-based liveness vs learned models', text: 'Head-pose prompts are explainable and auditable; a learned liveness model could be more robust to advanced spoofing.' },
          { title: 'Recognition threshold tuning', text: 'A stricter threshold reduces false accepts but increases false rejects — a deliberate safety trade-off for an access system.' },
        ],
      },
      {
        kind: 'pair',
        title: 'Challenges & how they were solved',
        rows: [
          { title: 'Real-time constraints on the Pi', text: 'Combined the SSD DNN detector, precomputed encodings, and a threaded pipeline to stay within the hardware\'s real-time budget.' },
          { title: 'Spoofing resistance', text: 'Randomized head-pose liveness prompts verify a live person rather than a static photo held up to the camera.' },
          { title: 'Hardware integration', text: 'PIR-triggered capture, GPIO relay control, and a shared common ground make the camera-to-door loop reliable.' },
          { title: 'Failsafe access', text: 'A CustomTkinter PIN fallback keeps the door usable when recognition or liveness fails.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'PIR-triggered camera pipeline',
          'Face detection and tracking (OpenCV DNN)',
          'Face recognition against precomputed encodings',
          'Randomized head-pose liveness verification (dlib 68-point)',
          'PIN fallback GUI (CustomTkinter)',
          'GPIO hardware control (relay, PIR, buzzer, LED)',
          'CSV access and intruder logs with captured frames',
        ],
        roadmap: [
          'Refactor PIN module threading',
          'Learning-based liveness detection',
          'Lighter or quantized detection models',
        ],
      },
      {
        kind: 'stack',
        title: 'Technology stack',
        items: ['Python 3.9+', 'OpenCV', 'dlib', 'face_recognition', 'Raspberry Pi 4 GPIO', 'CustomTkinter', 'Multithreading', 'SSD DNN models'],
      },
    ],
  },
  {
    id: 'workshop',
    eyebrow: 'Relational database system',
    title: 'Vehicle Service Workshop Database',
    subtitle: 'Normalized relational database for service operations',
    description: 'A normalized relational database for vehicle service operations, tracking customers, vehicles, mechanics, services, service orders, service items, and payments — with views and aggregate queries for reporting and indexes on the hot query paths. Foreign keys enforce referential integrity across all seven tables.',
    tech: ['SQL', 'MySQL / MariaDB', 'Database Design', 'Views', 'Indexes'],
    metrics: [
      { value: '07', label: 'Tables' },
      { value: '03', label: 'Views' },
      { value: '05', label: 'Indexes' },
    ],
    actions: [
      { kind: 'github', href: 'https://github.com/harisrana-dev/vehicle-workshop-database' },
    ],
    layout: 'workshop',
    visual: 'workshop',
    caseStudy: [
      {
        kind: 'problem',
        statement: 'Workshops manage customers, vehicles, repairs, and maintenance history with ad-hoc records and spreadsheets that fragment the picture of a vehicle\'s service life.',
        why: 'Without a joined record of history, workshops re-diagnose the same problems and cannot report reliably on revenue, workload, or vehicle condition.',
        who: 'Workshop operators who need one authoritative record of service operations.',
      },
      {
        kind: 'workflow',
        title: 'Implementation',
        steps: [
          'Customers and vehicles are linked so service history follows the vehicle, not the customer.',
          'Service orders reference the vehicle, mechanic, and service items involved, so every repair leaves a complete record.',
          'Reporting queries aggregate revenue, workload, and common repairs from three views over the normalized core.',
        ],
      },
      {
        kind: 'pair',
        title: 'Engineering decisions',
        rows: [
          { title: 'Normalized core, denormalized reports', text: 'Normalization keeps integrity at the core while reporting views (customer_vehicle_view, service_order_details, order_total_bill) simplify the frequent analytical queries.' },
          { title: 'Referential integrity everywhere', text: 'Foreign keys enforce that a repair record cannot reference a missing vehicle, mechanic, service, or part.' },
          { title: 'Indexes for the hot paths', text: 'Indexed lookups on customer_id, vehicle_id, mechanic_id, order_id, and payment order keep operational and reporting queries fast.' },
        ],
      },
      {
        kind: 'status',
        title: 'Shipped vs roadmap',
        shipped: [
          'Normalized schema: customers, vehicles, mechanics, services, service_orders, service_items, payments',
          'Three reporting views with aggregate bill calculation',
          'Five indexes on the hot query paths',
          'Sample dataset with join, aggregate, update, and delete queries',
        ],
        roadmap: ['Stored procedures for recurring business logic', 'Triggers for audit trails', 'Web UI for data entry'],
      },
      {
        kind: 'stack',
        title: 'Technology stack',
        items: ['SQL', 'MySQL / MariaDB', 'Database Design', 'Views', 'Indexes', 'Referential Integrity'],
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
  { number: '01', label: 'Artificial Intelligence', value: 'Computer Vision / RAG / Local LLMs' },
  { number: '02', label: 'Automotive Intelligence', value: 'Vehicle Telemetry / Fleet Systems' },
  { number: '03', label: 'Digital Twin Systems', value: 'Physics Simulation / State Modeling' },
  { number: '04', label: 'Real-Time Engineering', value: 'WebSockets / Streaming / Event-Driven' },
]
export const practice = [
  { number: '01', label: 'System Design', text: 'Architecture decisions and trade-offs' },
  { number: '02', label: 'Version Control', text: 'Branches, commits, reviews' },
  { number: '03', label: 'Documentation', text: 'Technical notes and knowledge capture' },
  { number: '04', label: 'Iterative Delivery', text: 'Milestones and controlled releases' },
] as const
export const capabilities = [
  { title: 'Artificial Intelligence & Computer Vision', visual: 'vision', items: ['Machine Learning', 'Computer Vision', 'OpenCV', 'dlib', 'Face Recognition', 'Liveness Detection', 'Facial Landmarks'] },
  { title: 'Automotive Intelligence & Digital Twins', visual: 'vehicle', items: ['Vehicle Telemetry', 'Digital Twin Systems', 'Fleet Analytics', 'Physics-Based Simulation', 'OBD-II / CAN', 'Predictive Maintenance Architecture'] },
  { title: 'Backend & Real-Time Systems', visual: 'pipeline', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'REST APIs', 'WebSockets', 'Pydantic'] },
  { title: 'Software Architecture & Engineering', visual: 'architecture', items: ['Modular Design', 'Rule Engines', 'Design Patterns', 'Docker Compose', 'Git / GitHub', 'Agile Development'] },
] as const
export const journey = [
  { date: '2026 - Present', title: 'Project Lead & Software Engineer', organization: 'DriveVitals / Self-Initiated Engineering Project', copy: 'Architecting and leading a fleet intelligence platform built on a digital twin, a normalized telemetry pipeline, and a modular analytics engine — with predictive ML in active planning. Leading a team of three through milestones, task assignment, Git workflows, reviews, feature branches, pull requests, and controlled merges.' },
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
  ['What is DriveVitals?', 'DriveVitals is my primary engineering project: a fleet intelligence platform built around a digital twin, real-time telemetry, driver behaviour and vehicle health scoring, and a React command center. Its public repository includes the full backend, frontend, migrations, and test suite.'],
  ['What are you currently studying?', 'I am pursuing a Bachelor of Science in Computer Science at The University of Lahore and expect to graduate in June 2027.'],
  ['What areas are you most interested in?', 'My main interests are artificial intelligence, automotive intelligence, digital twin systems, computer vision, vehicle telemetry, and real-time systems.'],
  ['Are these real, working projects?', 'Yes. Every project has a public repository containing runnable code, documentation, and tests, and the technical claims on this page are kept consistent with what those repositories actually contain.'],
  ['Are you open to collaboration?', 'Yes. I am interested in meaningful opportunities involving AI, automotive systems, computer vision, real-time engineering, and intelligent physical systems.'],
]
