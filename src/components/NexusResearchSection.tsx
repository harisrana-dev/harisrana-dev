import { SectionHeading } from './SectionHeading'

const corpus = {
  docs: 109,
  chunks: '1,857',
  queries: 218,
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

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function NexusResearchSection() {
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
        <div className="nrx-teaser-actions">
          <a
            className="nrx-toggle-btn"
            href="/nexus-ir-paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Research →
          </a>
          <a
            className="button button-dark"
            href="https://github.com/harisrana-dev/nexus"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>


    </section>
  )
}
