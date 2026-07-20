type VisualKind = 'vehicle' | 'vision' | 'pipeline' | 'architecture'

export function TechnicalVisual({ kind, label }: { kind: VisualKind; label: string }) {
  if (kind === 'vision') return <div className="technical-visual vision-visual" aria-label={label}>
    <div className="scan-frame"><i className="scan-line" /><span className="face-box box-a" /><span className="face-box box-b" /><b className="feature-point p1" /><b className="feature-point p2" /><b className="feature-point p3" /><b className="feature-point p4" /><em>FACE MATCH / 98.4%</em></div>
    <div className="vision-readout"><span>LIVENESS</span><strong>VALID</strong></div>
  </div>
  if (kind === 'pipeline') return <div className="technical-visual pipeline-visual" aria-label={label}>
    <div className="pipeline-node">SOURCE</div><i /><div className="pipeline-node active">PROCESS</div><i /><div className="pipeline-node">ANALYZE</div><i /><div className="pipeline-node">VIEW</div>
  </div>
  if (kind === 'architecture') return <div className="technical-visual architecture-visual" aria-label={label}>
    <span className="module m1">CORE</span><span className="module m2">API</span><span className="module m3">DATA</span><span className="module m4">EVENTS</span><i className="architecture-line l1" /><i className="architecture-line l2" /><i className="architecture-line l3" />
  </div>
  return <div className="technical-visual mini-telemetry" aria-label={label}>
    <span className="mini-grid" /><span className="mini-vehicle" /><i className="sensor s1" /><i className="sensor s2" /><i className="sensor s3" /><b className="telemetry-flow f1" /><b className="telemetry-flow f2" /><em>STREAM / LIVE</em>
  </div>
}
