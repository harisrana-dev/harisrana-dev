import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

// ---------------------------------------------------------------------------
// Verified Nexus Phase 3/4 research data. All values are committed artifacts.
// ---------------------------------------------------------------------------

const corpus = {
  docs: 109,
  chunks: '1,857',
  queries: 218,
  categories: ['conceptual', 'technical', 'exact', 'implementation', 'architecture', 'troubleshooting'],
  sources: ['CPython 3.12', 'FastAPI 0.115', 'SQLite'],
  wikilinks: 93,
  chunkConfig: '1200 / 150',
}

const baselines = [
  {
    name: 'Semantic',
    recall1: 18.8,
    recall3: 28.6,
    recall5: 33.1,
    mrr: 0.669,
    ndcg5: 0.418,
    latency: 566,
    color: '#6E93C4',
  },
  {
    name: 'Lexical',
    recall1: 16.0,
    recall3: 24.9,
    recall5: 30.3,
    mrr: 0.588,
    ndcg5: 0.415,
    latency: 111,
    color: '#8B96A5',
  },
  {
    name: 'Hybrid RRF',
    recall1: 20.7,
    recall3: 30.9,
    recall5: 37.3,
    mrr: 0.735,
    ndcg5: 0.498,
    latency: 641,
    color: '#CCFF3D',
  },
]

const rrfKValues = [1, 5, 10, 30, 60, 100, 200]
const rrfNDGValues = [0.362, 0.438, 0.455, 0.493, 0.498, 0.494, 0.491]
const rrfMRRValues = [0.601, 0.683, 0.706, 0.732, 0.735, 0.731, 0.724]

const chunkSizes = [
  { label: '1000 / 125', recall1: 21.1, recall5: 36.2, ndcg5: 0.481, mrr: 0.742, best: 'R@1 / MRR' },
  { label: '1200 / 150', recall1: 20.7, recall5: 37.3, ndcg5: 0.498, mrr: 0.735, best: 'Balanced' },
  { label: '2400 / 300', recall1: 19.3, recall5: 38.1, ndcg5: 0.502, mrr: 0.710, best: 'NDCG@5' },
]

const graphResult = {
  hybridNDCG: 0.501,
  graphNDCG: 0.467,
  pValue: '<0.001',
  expandValues: [1, 3, 5],
  expandNDG: [0.489, 0.478, 0.467],
}

const threats = [
  { title: 'Synthetic queries', text: 'Template-generated queries may not represent real user information needs.' },
  { title: 'Lexical ground truth', text: 'Term-overlap validation introduces known lexical bias into relevance labels.' },
  { title: 'Corpus scale', text: '109 documents may not generalize to much larger repositories.' },
  { title: 'Single embedding model', text: 'All results depend on ONNX MiniLM-L6-v2.' },
  { title: 'Sparse graph', text: 'Only 93 Wikilinks available for graph experiments.' },
  { title: 'No human judgments', text: 'Automated relevance labels were not human-validated.' },
]

const rigor = [
  'Reproducible evaluation pipeline',
  'Multiple retrieval baselines',
  'RRF parameter sweep (K ∈ [1, 200])',
  'Chunk-size ablation',
  'Paired statistical comparisons',
  'Bootstrap confidence intervals',
  'NDCG regression validation',
  'Honest negative result',
  'Documented threats to validity',
]

const evalCommands = [
  { cmd: 'run-all', desc: 'Full evaluation suite' },
  { cmd: 'baseline', desc: 'Strategy comparison' },
  { cmd: 'rrf_sweep', desc: 'K sensitivity analysis' },
  { cmd: 'chunking_sweep', desc: 'Chunk size ablation' },
  { cmd: 'graph_rag', desc: 'Graph expansion experiment' },
  { cmd: 'graph_ablation', desc: 'Expansion depth sweep' },
  { cmd: 'plots', desc: 'Regenerate figures' },
  { cmd: 'report', desc: 'Regenerate tables' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function barH(value: number, max: number) {
  return `${(value / max) * 100}%`
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MetadataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="nrx-meta-card">
      <span className="nrx-meta-label">{label}</span>
      <strong className="nrx-meta-value">{value}</strong>
    </div>
  )
}

function ResultBar({ name, value, max, color }: { name: string; value: number; max: number; color: string }) {
  return (
    <div className="nrx-bar-row">
      <span className="nrx-bar-label">{name}</span>
      <div className="nrx-bar-track">
        <div className="nrx-bar-fill" style={{ height: barH(value, max), background: color }} />
      </div>
      <span className="nrx-bar-value">{value.toFixed(3)}</span>
    </div>
  )
}

function StrategyCard({ s, ndcgMax }: { s: typeof baselines[0]; ndcgMax: number }) {
  const isHybrid = s.name === 'Hybrid RRF'
  return (
    <article className={'nrx-strategy-card' + (isHybrid ? ' nrx-strategy-highlight' : '')}>
      {isHybrid && <span className="nrx-badge">BEST BASELINE</span>}
      <h4>{s.name}</h4>
      <div className="nrx-metric-grid">
        <div className="nrx-metric"><span className="nrx-metric-val">{s.recall1}%</span><span className="nrx-metric-lbl">Recall@1</span></div>
        <div className="nrx-metric"><span className="nrx-metric-val">{s.recall3}%</span><span className="nrx-metric-lbl">Recall@3</span></div>
        <div className="nrx-metric"><span className="nrx-metric-val">{s.recall5}%</span><span className="nrx-metric-lbl">Recall@5</span></div>
        <div className="nrx-metric"><span className="nrx-metric-val">{s.mrr.toFixed(3)}</span><span className="nrx-metric-lbl">MRR</span></div>
        <div className="nrx-metric nrx-metric-primary"><span className="nrx-metric-val">{s.ndcg5.toFixed(3)}</span><span className="nrx-metric-lbl">NDCG@5</span></div>
        <div className="nrx-metric"><span className="nrx-metric-val">{s.latency}<small>ms</small></span><span className="nrx-metric-lbl">Latency</span></div>
      </div>
      <div className="nrx-bar-chart">
        <ResultBar name="NDCG@5" value={s.ndcg5} max={ndcgMax} color={s.color} />
        <ResultBar name="MRR" value={s.mrr} max={1} color={s.color} />
        <ResultBar name="R@5" value={s.recall5 / 100} max={0.6} color={s.color} />
      </div>
    </article>
  )
}

function PipelineStep({ label, note, accent }: { label: string; note?: string; accent?: boolean }) {
  return (
    <div className={'nrx-pipe-step' + (accent ? ' nrx-pipe-accent' : '')}>
      <span className="nrx-pipe-dot" />
      <div>
        <strong>{label}</strong>
        {note && <small>{note}</small>}
      </div>
    </div>
  )
}

function ThreatCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="nrx-threat">
      <span className="nrx-threat-icon">!</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  )
}

function TerminalBlock({ commands }: { commands: typeof evalCommands }) {
  return (
    <div className="nrx-terminal">
      <div className="nrx-terminal-bar"><span /><span /><span /></div>
      <div className="nrx-terminal-body">
        <p className="nrx-terminal-prompt">$ python -m nexus.knowledge.evaluation <span className="nrx-terminal-cmd">{"{command}"}</span></p>
        {commands.map(c => (
          <div key={c.cmd} className="nrx-terminal-row">
            <code>{c.cmd}</code>
            <span>{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function NexusResearchSection() {
  const [expanded, setExpanded] = useState(false)
  const ndcgMax = 0.55

  return (
    <section id="research" className="nrx-research shell">
      <SectionHeading
        label="04 / Research"
        title="Empirical evaluation of hybrid information retrieval."
        copy="An empirical study of retrieval strategies for local developer knowledge repositories — investigating semantic, lexical, RRF-fused, and graph-augmented retrieval under controlled evaluation."
      />

      {/* ════════════════════════════════════════════════════════════════════
           TEASER — visible by default
           ════════════════════════════════════════════════════════════════════ */}
      <div className="nrx-teaser" data-reveal>
        <div className="nrx-teaser-content">
          <p className="eyebrow">Nexus</p>
          <h3>Empirical Evaluation of Hybrid Information Retrieval</h3>
          <p className="nrx-teaser-copy">
            A reproducible evaluation of semantic, lexical, hybrid (RRF), and graph-augmented
            retrieval on a 109-document technical corpus with 218 validated queries across six
            categories — including controlled ablation studies and an honest negative result.
          </p>
        </div>
        <div className="nrx-meta-grid">
          <MetadataCard label="Research type" value="Empirical IR" />
          <MetadataCard label="Corpus" value={`${corpus.docs} docs / ${corpus.chunks} chunks`} />
          <MetadataCard label="Queries" value={String(corpus.queries)} />
          <MetadataCard label="Methods" value="Semantic · Lexical · Hybrid RRF · Graph" />
          <MetadataCard label="Metrics" value="Recall@K · MRR · NDCG@5" />
          <MetadataCard label="Environment" value="Local / CPU / reproducible" />
        </div>
        <div className="nrx-teaser-preview">
          <div className="nrx-preview-row">
            <span className="nrx-preview-label">Hybrid baseline</span>
            <span className="nrx-preview-val">NDCG@5 0.498</span>
            <span className="nrx-preview-arrow">→</span>
            <span className="nrx-preview-label">Graph expanded</span>
            <span className="nrx-preview-val nrx-preview-degraded">0.467</span>
          </div>
        </div>
        <button
          className="nrx-toggle-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="nrx-detailed-research"
        >
          {expanded ? 'Hide Research ↑' : 'Read Research →'}
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
           DETAILED RESEARCH — hidden by default, revealed on toggle
           ════════════════════════════════════════════════════════════════════ */}
      <div
        id="nrx-detailed-research"
        className={'nrx-detailed' + (expanded ? ' nrx-detailed-open' : '')}
        aria-hidden={!expanded}
      >
        <div className="nrx-detailed-inner">

          {/* ── Research Questions ── */}
          <div className="nrx-rq-block">
            <h4 className="nrx-sub">Research Questions</h4>
            <p className="nrx-rq-primary">How do semantic, lexical, hybrid, and graph-augmented retrieval strategies perform on technical developer knowledge repositories?</p>
            <ol className="nrx-rq-list">
              <li>Does hybrid RRF retrieval outperform individual retrieval signals?</li>
              <li>How sensitive is retrieval quality to the RRF constant <em>K</em>?</li>
              <li>How does chunk size affect retrieval quality?</li>
              <li>Does Wikilink graph propagation improve retrieval?</li>
            </ol>
          </div>

          {/* ── Experimental Pipeline ── */}
          <div className="nrx-pipeline-block">
            <h4 className="nrx-sub">Experimental Pipeline</h4>
            <div className="nrx-pipeline-visual">
              <div className="nrx-pipe-col nrx-pipe-main">
                <PipelineStep label="Technical Documentation" note="CPython · FastAPI · SQLite" accent />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Corpus Construction" note={`${corpus.docs} docs, ${corpus.chunks} chunks`} />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Markdown Chunking" note={`Config: ${corpus.chunkConfig}`} />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Embedding + Lexical Index" note="ONNX MiniLM · ChromaDB" accent />
                <span className="nrx-pipe-fork" />
                <div className="nrx-pipe-split">
                  <PipelineStep label="Semantic Retrieval" note="Vector search" />
                  <PipelineStep label="Lexical Retrieval" note="Keyword match" />
                </div>
                <span className="nrx-pipe-merge" />
                <PipelineStep label="RRF Fusion" note="K = 60" accent />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Ranked Results" />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Recall / MRR / NDCG@5" accent />
              </div>
              <div className="nrx-pipe-col nrx-pipe-graph">
                <span className="nrx-pipe-subtitle">Graph-RAG path</span>
                <PipelineStep label="Hybrid Retrieval" />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Wikilink Expansion" note="expand_k ∈ {1, 3, 5}" />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Graph-Augmented Ranking" />
                <span className="nrx-pipe-arrow" />
                <PipelineStep label="Evaluation" />
                <div className="nrx-negative-tag">NEGATIVE RESULT</div>
              </div>
            </div>
          </div>

          {/* ── Baseline Results ── */}
          <div className="nrx-results-block">
            <h4 className="nrx-sub">Baseline Comparison</h4>
            <p className="nrx-results-intro">
              Hybrid retrieval achieved the strongest overall baseline performance, with Recall@5 = 0.373
              and MRR = 0.735. Improvement over semantic retrieval is statistically significant
              (Wilcoxon <em>p</em> &lt; 0.001). Semantic vs lexical is not significant (<em>p</em> = 0.82).
            </p>
            <div className="nrx-strategy-grid">
              {baselines.map(s => <StrategyCard key={s.name} s={s} ndcgMax={ndcgMax} />)}
            </div>
          </div>

          {/* ── Statistical Significance ── */}
          <div className="nrx-stats-row">
            <div className="nrx-stat">
              <span className="nrx-stat-label">Hybrid &gt; Semantic</span>
              <span className="nrx-stat-val"><em>p</em> &lt; 0.001</span>
              <span className="nrx-stat-tag nrx-stat-sig">Significant</span>
            </div>
            <div className="nrx-stat">
              <span className="nrx-stat-label">Hybrid &gt; Lexical</span>
              <span className="nrx-stat-val"><em>p</em> &lt; 0.001</span>
              <span className="nrx-stat-tag nrx-stat-sig">Significant</span>
            </div>
            <div className="nrx-stat">
              <span className="nrx-stat-label">Semantic vs Lexical</span>
              <span className="nrx-stat-val"><em>p</em> = 0.82</span>
              <span className="nrx-stat-tag nrx-stat-ns">Not significant</span>
            </div>
          </div>

          {/* ── Ablation: RRF K Sensitivity ── */}
          <div className="nrx-ablation-block">
            <h4 className="nrx-sub">RRF Parameter Sensitivity</h4>
            <div className="nrx-k-chart">
              <div className="nrx-k-axis">
                {rrfKValues.map((k, i) => (
                  <div key={k} className="nrx-k-col">
                    <div className="nrx-k-bars">
                      <div className="nrx-k-bar nrx-k-bar-ndcg" style={{ height: barH(rrfNDGValues[i], 0.55) }} title={`NDCG@5: ${rrfNDGValues[i].toFixed(3)}`} />
                      <div className="nrx-k-bar nrx-k-bar-mrr" style={{ height: barH(rrfMRRValues[i], 1) }} title={`MRR: ${rrfMRRValues[i].toFixed(3)}`} />
                    </div>
                    <span className={'nrx-k-label' + (k >= 30 && k <= 60 ? ' nrx-k-optimal' : '')}>{k}</span>
                  </div>
                ))}
              </div>
              <div className="nrx-k-legend">
                <span><span className="nrx-k-dot nrx-k-dot-ndcg" /> NDCG@5</span>
                <span><span className="nrx-k-dot nrx-k-dot-mrr" /> MRR</span>
                <span className="nrx-k-optimal-label">← near-optimal region (K=30–60)</span>
              </div>
            </div>
            <p className="nrx-ablation-note">
              Performance was relatively stable around K=30–60, supporting K=60 as a reasonable default
              rather than an arbitrary constant. The production choice is backed by measurement.
            </p>
          </div>

          {/* ── Ablation: Chunk Size ── */}
          <div className="nrx-ablation-block">
            <h4 className="nrx-sub">Chunk-Size Ablation</h4>
            <div className="nrx-chunk-grid">
              {chunkSizes.map(c => (
                <div key={c.label} className="nrx-chunk-card">
                  <span className="nrx-chunk-label">{c.label}</span>
                  <span className="nrx-chunk-best">{c.best}</span>
                  <div className="nrx-chunk-metrics">
                    <div><span>R@1</span><strong>{c.recall1}%</strong></div>
                    <div><span>R@5</span><strong>{c.recall5}%</strong></div>
                    <div><span>NDCG@5</span><strong>{c.ndcg5.toFixed(3)}</strong></div>
                    <div><span>MRR</span><strong>{c.mrr.toFixed(3)}</strong></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="nrx-ablation-note">
              No single configuration clearly dominated across every metric. Small chunks favoured
              first-result precision; large chunks improved overall ranking. The production default
              (1200/150) balances both — a deliberate trade-off, not a universally optimal choice.
            </p>
          </div>

          {/* ── Graph-RAG Negative Result ── */}
          <div className="nrx-negative-block">
            <div className="nrx-negative-header">
              <span className="nrx-negative-tag nrx-negative-badge">NEGATIVE RESULT</span>
              <h4>Graph Expansion Hurt Retrieval Quality</h4>
            </div>
            <div className="nrx-negative-compare">
              <div className="nrx-negative-card">
                <span className="nrx-negative-label">Hybrid RRF</span>
                <span className="nrx-negative-val">{graphResult.hybridNDCG.toFixed(3)}</span>
                <span className="nrx-negative-metric">NDCG@5</span>
              </div>
              <div className="nrx-negative-arrow">→</div>
              <div className="nrx-negative-card nrx-negative-degraded">
                <span className="nrx-negative-label">Graph Hybrid</span>
                <span className="nrx-negative-val">{graphResult.graphNDCG.toFixed(3)}</span>
                <span className="nrx-negative-metric">NDCG@5</span>
                <span className="nrx-negative-p"><em>p</em> {graphResult.pValue}</span>
              </div>
            </div>
            <div className="nrx-negative-sweep">
              <h5>Expansion depth sweep</h5>
              <div className="nrx-sweep-row">
                {graphResult.expandValues.map((k, i) => (
                  <div key={k} className="nrx-sweep-item">
                    <div className="nrx-sweep-bar-wrap">
                      <div className="nrx-sweep-bar" style={{ height: barH(graphResult.expandNDG[i], 0.55) }} />
                    </div>
                    <span className="nrx-sweep-k">k={k}</span>
                    <span className="nrx-sweep-val">{graphResult.expandNDG[i].toFixed(3)}</span>
                  </div>
                ))}
              </div>
              <p className="nrx-negative-note">
                On this corpus, Wikilink expansion consistently degraded ranking quality. The sparse graph
                and navigational nature of the links introduced lower-quality candidates rather than
                useful semantic context. Controlled ablation confirms monotonic degradation with
                increasing expansion depth.
              </p>
            </div>
          </div>

          {/* ── Metric Validation Story ── */}
          <div className="nrx-validation-block">
            <h4 className="nrx-sub">Metric Validation &amp; Correction</h4>
            <p>
              During validation, an NDCG@5 implementation issue was identified: duplicate source
              documents were counted as separate relevant items, which could produce NDCG values
              above 1.0. The metric was corrected to deduplicate source documents before DCG
              calculation. All experiments were subsequently rerun, producing the final reported
              results. This process demonstrated metric validation, skepticism toward preliminary
              results, and willingness to correct methodology.
            </p>
          </div>

          {/* ── Methodological Rigor ── */}
          <div className="nrx-rigor-block">
            <h4 className="nrx-sub">Methodological Rigor</h4>
            <div className="nrx-rigor-grid">
              {rigor.map(item => (
                <div key={item} className="nrx-rigor-item">
                  <span className="nrx-rigor-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Threats to Validity ── */}
          <div className="nrx-threats-block">
            <h4 className="nrx-sub">Threats to Validity</h4>
            <p className="nrx-threats-intro">
              Documented limitations make the research more credible, not weaker. These threats
              constrain the generalizability of the findings and define the scope of valid conclusions.
            </p>
            <div className="nrx-threats-grid">
              {threats.map(t => <ThreatCard key={t.title} title={t.title} text={t.text} />)}
            </div>
          </div>

          {/* ── Human Evaluation ── */}
          <div className="nrx-human-block">
            <h4 className="nrx-sub">Human Evaluation Framework</h4>
            <div className="nrx-human-grid">
              <div className="nrx-human-card">
                <span className="nrx-human-num">94</span>
                <span className="nrx-human-label">Candidate queries</span>
              </div>
              <div className="nrx-human-card">
                <span className="nrx-human-num">6</span>
                <span className="nrx-human-label">Query categories</span>
              </div>
              <div className="nrx-human-card">
                <span className="nrx-human-num">3</span>
                <span className="nrx-human-label">Relevance levels</span>
              </div>
            </div>
            <div className="nrx-human-scale">
              <span>0 — Irrelevant</span>
              <span>1 — Partially relevant</span>
              <span>2 — Highly relevant</span>
            </div>
            <div className="nrx-human-status">
              <span className="nrx-human-status-tag">ANNOTATION-READY</span>
              <p>Human evaluation framework prepared; annotation intentionally left open to avoid fabricated labels.</p>
            </div>
          </div>

          {/* ── Reproducibility ── */}
          <div className="nrx-repro-block">
            <h4 className="nrx-sub">Reproducibility</h4>
            <p>
              All experiments are runnable from committed artifacts. The evaluation pipeline is
              deterministic, uses bootstrap confidence intervals, and includes paired statistical
              comparisons. The corpus, queries, ground truth, and results are versioned in the repository.
            </p>
            <TerminalBlock commands={evalCommands} />
          </div>

          {/* ── Research Output ── */}
          <div className="nrx-output-block">
            <h4 className="nrx-sub">Research Output</h4>
            <div className="nrx-output-card">
              <h5>Empirical Evaluation of Hybrid Information Retrieval for Local Developer Knowledge Repositories</h5>
              <div className="nrx-output-items">
                <span>Technical report</span>
                <span>Evaluation datasets</span>
                <span>Experiment results</span>
                <span>Figures</span>
                <span>Reproducible evaluation code</span>
                <span>Graph ablation</span>
                <span>Human evaluation framework</span>
              </div>
            </div>
          </div>

          {/* ── Impact + Links ── */}
          <div className="nrx-impact-block">
            <p className="nrx-impact-text">
              The project evolved from a local knowledge assistant into a reproducible IR evaluation
              laboratory, using controlled experiments to investigate retrieval quality rather than
              relying on anecdotal demonstrations.
            </p>
            <div className="nrx-impact-links">
              <a className="button button-dark" href="https://github.com/harisrana-dev/nexus" target="_blank" rel="noreferrer">View code</a>
              <a className="text-link" href="https://github.com/harisrana-dev/nexus/blob/main/docs/paper/phase3-ir-evaluation.md" target="_blank" rel="noreferrer">Read paper →</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
