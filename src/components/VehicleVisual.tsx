export function VehicleVisual() {
  return <div className="vehicle-visual" aria-label="Abstract vehicle telemetry visualization">
    <div className="visual-grid" />
    <div className="map-line map-line-one" /><div className="map-line map-line-two" />
    <div className="telemetry-dot dot-one" /><div className="telemetry-dot dot-two" /><div className="telemetry-dot dot-three" />
    <div className="vehicle-shell"><span className="vehicle-glow" /><span className="wheel wheel-a" /><span className="wheel wheel-b" /></div>
    <p className="visual-label label-a">ENGINE STATUS <b>OPTIMAL</b></p><p className="visual-label label-b">LIVE TELEMETRY</p>
    <div className="visual-index">DV / 01</div>
  </div>
}
