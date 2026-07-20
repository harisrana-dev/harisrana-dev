export function DriveVitalsVisual() {
  return <div className="drive-visual" aria-label="Vehicle telemetry to fleet intelligence visualization">
    <div className="drive-grid" />
    <p className="drive-title">DRIVEVITALS / DIGITAL TWIN</p><p className="drive-status">SYNC STATUS <b>LIVE</b></p>
    <div className="fleet-vehicle vehicle-one"><span>01</span></div><div className="fleet-vehicle vehicle-two"><span>02</span></div>
    <i className="sensor-point sensor-a" /><i className="sensor-point sensor-b" /><i className="sensor-point sensor-c" /><i className="sensor-point sensor-d" />
    <div className="telemetry-rail rail-one"><b /></div><div className="telemetry-rail rail-two"><b /></div>
    <div className="twin-core"><span>DIGITAL</span><strong>TWIN</strong><i /></div><div className="analytics-core"><span>ANALYTICS</span><strong>FLEET INSIGHT</strong></div>
    <div className="fleet-branch branch-one" /><div className="fleet-branch branch-two" /><div className="fleet-label">VEHICLE / TELEMETRY / TWIN / ANALYTICS</div>
  </div>
}
