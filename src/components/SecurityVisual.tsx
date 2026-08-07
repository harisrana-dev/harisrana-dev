export function SecurityVisual() {
  return <div className="security-visual" role="img" aria-label="Smart door security flow: camera, face detection, recognition engine, decision logic, door controller, access granted or denied, and an event log">
    <div className="eng-grid" />
    <p className="sd-title">ACCESS CONTROL / SECURITY</p>
    <p className="sd-status">STATE <span className="live-dot" aria-hidden="true" /> <b>ARMED</b></p>
    <div className="eng-node sd-cam flow"><small>TRIGGER</small><b>CAMERA</b><i className="sd-camscan" aria-hidden="true" /></div>
    <div className="eng-node sd-detect flow"><small>CV</small><b>FACE DETECT</b></div>
    <div className="eng-node sd-match flow"><small>ENGINE</small><b>RECOGNITION</b></div>
    <div className="eng-node sd-decide flow hot"><small>RULES</small><b>DECISION LOGIC</b></div>
    <div className="eng-node sd-door flow"><small>GPIO</small><b>DOOR CONTROL</b></div>
    <div className="eng-node sd-access flow"><small>RESULT</small><b>GRANTED / DENIED</b></div>
    <div className="sd-log"><small>RECORD</small><b>EVENT LOG</b><em>CSV</em></div>
    <i className="sd-pulse" />
    <em className="sd-readout">MATCH / 98.4%</em>
    <i className="sd-confidence" aria-hidden="true" />
    <div className="eng-rail sd-rail-1"><b /></div>
    <div className="eng-rail sd-rail-2"><b /></div>
    <div className="eng-rail sd-rail-3"><b /></div>
    <div className="eng-rail sd-rail-4"><b /></div>
    <div className="eng-rail sd-rail-5"><b /></div>
    <div className="sd-pin"><b /></div>
    <em className="sd-pin-label">PIN</em>
    <div className="eng-rail sd-rail-log"><b /></div>
  </div>
}
