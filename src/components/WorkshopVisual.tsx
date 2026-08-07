export function WorkshopVisual() {
  return <div className="workshop-visual" role="img" aria-label="Vehicle service workshop information system: customers, vehicles, and inventory link through repair orders into a SQL database serving a dashboard and reports">
    <div className="eng-grid" />
    <p className="ws-title">SERVICE / INFO SYSTEM</p>
    <p className="ws-status">SCHEMA <span className="live-dot" aria-hidden="true" /> <b>NORMALIZED</b></p>
    <div className="eng-node ws-customer flow"><small>ENTITY</small><b>CUSTOMER</b></div>
    <div className="eng-node ws-vehicle flow"><small>ENTITY</small><b>VEHICLE</b></div>
    <div className="eng-node ws-inventory flow"><small>ENTITY</small><b>INVENTORY</b></div>
    <div className="eng-node ws-order flow hot"><small>LINK</small><b>REPAIR ORDER</b></div>
    <div className="eng-node ws-db flow"><small>RELATIONAL</small><b>DATABASE</b><em>SQL</em></div>
    <div className="eng-node ws-dash flow"><small>VIEW</small><b>DASHBOARD</b></div>
    <div className="eng-node ws-reports flow"><small>VIEW</small><b>REPORTS</b></div>
    <em className="ws-rel rel-1">1:N</em>
    <em className="ws-rel rel-2">1:N</em>
    <em className="ws-rel rel-3">1:N</em>
    <div className="eng-rail ws-rail-1"><b /></div>
    <div className="eng-rail ws-rail-2"><b /></div>
    <div className="eng-rail ws-rail-3"><b /></div>
    <div className="eng-rail ws-rail-4"><b /></div>
    <div className="eng-rail ws-rail-5"><b /></div>
    <div className="eng-rail ws-rail-6"><b /></div>
    <em className="ws-cue cue-query">QUERY</em>
  </div>
}
