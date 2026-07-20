export function HeroSystemVisual() {
  return <aside className="hero-system" aria-label="AI telemetry digital twin physical system visualization">
    <div className="hero-system-grid" />
    <p className="system-caption cap-ai">AI / INFERENCE</p><i className="system-node ai-node" />
    <span className="system-link link-a" /><p className="system-caption cap-telemetry">TELEMETRY</p><i className="system-node telemetry-node" />
    <span className="system-link link-b" /><div className="system-core"><b>SYSTEM</b><span>DIGITAL TWIN</span></div>
    <span className="system-link link-c" /><p className="system-caption cap-physical">PHYSICAL SYSTEM</p><i className="system-node physical-node" />
    <em className="hero-value v-speed">SPEED <strong>064</strong></em><em className="hero-value v-rpm">RPM <strong>3180</strong></em><em className="hero-value v-temp">TEMP <strong>87 C</strong></em>
  </aside>
}
