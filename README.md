# Haris Rana

CS student building systems at the intersection of **software engineering**, **AI/information retrieval**, and **empirical evaluation** — with an emphasis on measuring what works.

<a href="mailto:harriskamal23@gmail.com"><img src="https://img.shields.io/badge/Email-0d1117?style=for-the-badge&logo=gmail&logoColor=e6edf3" /></a>
<a href="https://www.linkedin.com/in/hariskamalrana"><img src="https://img.shields.io/badge/LinkedIn-0d1117?style=for-the-badge&logo=linkedin&logoColor=e6edf3" /></a>
<a href="https://harisrana-dev.vercel.app/"><img src="https://img.shields.io/badge/Portfolio-0d1117?style=for-the-badge&logo=vercel&logoColor=e6edf3" /></a>

---

## About

I build systems that rely on faithful representation of the world — whether that's a fleet's true operational state or what an information-retrieval system can actually find and rank. My focus is on:

- **Rigorous system design:** Architecture that holds up under real constraints (SOLID, DI, testability)
- **Empirical measurement:** Not assuming what works — building instruments to measure it (IR evaluation, statistical testing, ablation studies)
- **Honest reporting:** When a hypothesis fails, analyze why and document it (graph-RAG negative result, threats to validity)
- **Software engineering discipline:** Modular boundaries, automated testing (430+ tests), concurrency safety, reproducibility
- **Information Retrieval:** Hybrid retrieval, ranking, RAG grounding, evaluation methodology — building retrieval systems that must be measured to be trusted

<br>

---

## Featured Project — Nexus

**Local-first knowledge and Information Retrieval system for engineering teams.**

Nexus combines personal knowledge ingestion (Obsidian markdown), Git-aware development history capture, hybrid retrieval (semantic + lexical with RRF fusion), grounded RAG, and **reproducible empirical retrieval evaluation** — all running locally and offline-first.

**Why it matters:** Retrieval quality must be measured to be trusted. Nexus includes a research-oriented evaluation laboratory (109 documents, 1,857 chunks, 218 queries across 6 categories) with statistical testing, ablation studies, and honest reporting of negative findings.

### Key Capabilities

- **Hybrid retrieval:** Semantic vector search (MiniLM ONNX) fused with punctuation-tolerant lexical matching via Reciprocal Rank Fusion — significantly outperforms either strategy alone (NDCG@5: 0.498 vs 0.418/0.415, Wilcoxon p<0.001)
- **Git-aware indexing:** Post-commit hook captures commits, generates summaries, writes them back to vault, indexes automatically — knowledge base self-updates
- **Empirical evaluation:** RRF K ablation (K ∈ [5, 200], stable), chunk-size ablation (precision/recall tradeoff), graph-RAG experiment with controlled negative result, human evaluation framework
- **Grounded RAG:** Context construction with source attribution, explicit anti-hallucination rules, multiple LLM providers (Ollama local, Groq/OpenRouter cloud)
- **Reproducible science:** All experiments runnable from committed artifacts; deterministic evaluation; documented limitations and threats to validity
- **Interfaces:** Textual terminal TUI (slash commands, history), Streamlit web UI, asynchronous background operations
- **Engineering rigor:** 430+ automated tests (fully offline, no API calls), file-lock safety, dependency injection, modular architecture

### Research Findings

**Finding 1 — Hybrid RRF significantly outperforms individual strategies.**
Semantic and lexical retrieval each achieve NDCG@5 of ~0.42. Hybrid fusion reaches 0.498 — a 19% improvement. Improvement over semantic is statistically significant (Wilcoxon p<0.001).

**Finding 2 — RRF constant K is stable.**
Performance remains consistent across K ∈ [5, 200]; production default K=60 is near-optimal.

**Finding 3 — Graph augmentation via wikilinks degrades retrieval.**
Counter to the graph-RAG hypothesis, expansion reduced NDCG@5 from 0.498 to 0.467 (p<0.001). Analysis shows sparse connectivity (93 links / 109 docs), navigational vs semantic mismatch, and controlled ablation confirms monotonic degradation. This negative result demonstrates rigorous experimental discipline — measure a hypothesis and report what you find, even when it's unfavorable.

**Limitations:** Synthetic query generation may introduce term-overlap bias; single embedding model; relatively small corpus; sparse Wikilink graph; incomplete human relevance annotations.

### Repository & Documentation

- **Code:** https://github.com/harisrana-dev/nexus
- **Research paper:** [docs/paper/phase3-ir-evaluation.md](https://github.com/harisrana-dev/nexus/blob/main/docs/paper/phase3-ir-evaluation.md)
- **Evaluation artifacts:** Committed datasets, results, figures, full reproducibility instructions

`Python` `FastAPI` `Streamlit` `Textual` `RAG` `Information Retrieval` `ONNX` `Embedding` `RRF` `Statistical Testing` `Empirical Evaluation`

<br>

---

## Other Projects

### DriveVitals — Fleet Intelligence & Digital Twin Platform

Live digital twin simulation of vehicles and drivers, with real-time analytics and monitoring dashboard. Models fleet operations as continuous state (physics-based vehicle behavior, driver decision modeling) separate from analytics and presentation layers — enabling independent evolution of each layer.

**Architecture:** Python simulation runtime → FastAPI + WebSocket gateway → PostgreSQL data layer → React dashboard. Fully modular with SOLID principles and dependency injection; designed to absorb OBD-II hardware and predictive-maintenance ML models as next milestone.

`Python` `FastAPI` `WebSockets` `React` `PostgreSQL` · [Repository](https://github.com/harisrana-dev/DriveVitals)

### Smart Door Security System

Embedded facial authentication (detection → encoding → recognition) with liveness verification via head-pose analysis and randomized prompts. GPIO door control with PIN fallback and event logging — fully CPU-only and frame-skipped on Raspberry Pi.

`Python` `OpenCV` `Raspberry Pi` · [Repository](https://github.com/harisrana-dev)

### Vehicle Service Workshop Database

Normalized relational schema (1NF–3NF) for workshop operations: customers, vehicles, repairs, inventory, payments. SQL views and reports for service history and workshop analytics.

`SQL` `MySQL` · [Repository](https://github.com/harisrana-dev)

<br>

---

## Research & Technical Interests

Building systems requires understanding what they can and cannot do. My focus areas:

- **Information Retrieval:** Hybrid retrieval strategies, ranking quality, embedding models, evaluation metrics, statistical testing
- **Retrieval-Augmented Generation (RAG):** Grounding LLM generation in retrieval results, context quality, source attribution, hallucination prevention
- **Empirical Evaluation:** Designing retrieval benchmarks, ablation studies, reproducible experiments, honest reporting of limitations
- **AI Systems:** Embedding quality, local-first execution, multi-provider LLM support, inference efficiency
- **Software Engineering:** Modular architecture, concurrent/distributed safety, comprehensive testing, maintainability at scale

The common thread: **build systems that work in practice → measure them rigorously → understand their limits → improve them iteratively.**

<br>

---

## Technical Stack

### Languages & Core
![Python](https://img.shields.io/badge/-Python-0d1117?style=flat-square&logo=python&logoColor=3776AB) ![C++](https://img.shields.io/badge/-C%2B%2B-0d1117?style=flat-square&logo=cplusplus&logoColor=00599C) ![TypeScript](https://img.shields.io/badge/-TypeScript-0d1117?style=flat-square&logo=typescript&logoColor=3178C6) ![JavaScript](https://img.shields.io/badge/-JavaScript-0d1117?style=flat-square&logo=javascript&logoColor=F7DF1E)

Algorithms · Data Structures · OOP · System Design · Software Architecture

### AI & Information Retrieval
![RAG](https://img.shields.io/badge/-RAG-0d1117?style=flat-square) ![Vector Search](https://img.shields.io/badge/-Vector%20Search-0d1117?style=flat-square) ![Embeddings](https://img.shields.io/badge/-Embeddings-0d1117?style=flat-square) ![ONNX](https://img.shields.io/badge/-ONNX-0d1117?style=flat-square&logo=onnx)

Hybrid Retrieval · RRF Fusion · Ranking · LLM APIs · Grounding · Statistical Testing · Empirical Evaluation

### Backend & Data
![FastAPI](https://img.shields.io/badge/-FastAPI-0d1117?style=flat-square&logo=fastapi&logoColor=009688) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-0d1117?style=flat-square&logo=postgresql&logoColor=336791) ![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-0d1117?style=flat-square) ![Chroma](https://img.shields.io/badge/-Chroma-0d1117?style=flat-square)

REST APIs · WebSockets · Relational Modeling · Query Optimization · Vector Databases

### Frontend & Interfaces
![React](https://img.shields.io/badge/-React-0d1117?style=flat-square&logo=react&logoColor=61DAFB) ![Streamlit](https://img.shields.io/badge/-Streamlit-0d1117?style=flat-square&logo=streamlit&logoColor=FF6B6B) ![Textual](https://img.shields.io/badge/-Textual-0d1117?style=flat-square)

Real-Time Dashboards · Terminal UIs · Interactive Applications

### Engineering & DevOps
![pytest](https://img.shields.io/badge/-pytest-0d1117?style=flat-square&logo=pytest&logoColor=0A9FDC) ![Ruff](https://img.shields.io/badge/-Ruff-0d1117?style=flat-square) ![Git](https://img.shields.io/badge/-Git-0d1117?style=flat-square&logo=git&logoColor=F05032) ![Linux](https://img.shields.io/badge/-Linux-0d1117?style=flat-square&logo=linux&logoColor=FCC624)

SOLID Principles · Dependency Injection · Testing · CI/CD · Reproducibility

<br>
---

## Current Focus

Actively developing toward graduate-level Computer Science research, with emphasis on:

- **Empirical retrieval evaluation:** Designing, running, and rigorously analyzing retrieval experiments — measuring before claiming
- **Honest experimentation:** Measuring hypotheses, reporting negative results, documenting limitations and threats to validity
- **Reproducible science:** Committed datasets, deterministic evaluation, transparent methodology
- **Modular AI systems:** Building intelligence on solid architectural foundations that can be tested, modified, and improved independently
- **Research discipline:** Statistical testing (Wilcoxon, bootstrap CIs), ablation studies, experimental controls, proper research documentation

The progression: build real systems → measure what actually works → understand why → improve systematically → document for others to build on.

<br>

## Education & Training

**BSCS**, University of Lahore — CGPA 3.66/4.00, expected June 2027

**Elements of AI**, University of Helsinki & MinnaLearn — July 2025

<br>

---

## Connect

[![Email](https://img.shields.io/badge/harriskamal23@gmail.com-0d1117?style=flat-square&logo=gmail&logoColor=e6edf3)](mailto:harriskamal23@gmail.com)
[![LinkedIn](https://img.shields.io/badge/hariskamalrana-0d1117?style=flat-square&logo=linkedin&logoColor=e6edf3)](https://www.linkedin.com/in/hariskamalrana)
[![GitHub](https://img.shields.io/badge/harisrana--dev-0d1117?style=flat-square&logo=github&logoColor=e6edf3)](https://github.com/harisrana-dev)
[![Portfolio](https://img.shields.io/badge/Portfolio-0d1117?style=flat-square&logo=vercel&logoColor=e6edf3)](https://harisrana-dev.vercel.app/)
