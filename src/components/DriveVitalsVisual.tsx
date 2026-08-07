import { useEffect, useRef, useState } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function DriveVitalsVisual() {
  const reduced = useReducedMotion()
  const visualRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({ speed: 64, rpm: 3180, temp: 87, health: 94 })

  // Gentle live drift so the panel reads as a running system, not a diagram.
  // Gated on actual visibility so the off-screen panel (content-visibility:auto)
  // doesn't keep waking React every 1.4s.
  useEffect(() => {
    if (reduced) return
    const node = visualRef.current
    if (!node) return
    const tick = () => {
      setMetrics(prev => ({
        speed: clamp(prev.speed + (Math.random() - 0.5) * 14, 52, 82),
        rpm: clamp(prev.rpm + (Math.random() - 0.5) * 900, 2200, 3900),
        temp: clamp(prev.temp + (Math.random() - 0.5) * 5, 82, 93),
        health: clamp(prev.health + (Math.random() - 0.5) * 2, 90, 98),
      }))
    }
    let interval: number | undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries[0]?.isIntersecting
      if (visible && interval === undefined) interval = window.setInterval(tick, 1400)
      if (!visible && interval !== undefined) {
        window.clearInterval(interval)
        interval = undefined
      }
    }, { threshold: 0 })
    observer.observe(node)
    return () => {
      observer.disconnect()
      if (interval !== undefined) window.clearInterval(interval)
    }
  }, [reduced])

  return (
    <div className="drive-visual" role="img" ref={visualRef} aria-label="Fleet intelligence pipeline: vehicle telemetry into a digital twin, then FastAPI backend, analytics engine, WebSocket streaming, React dashboard, and fleet intelligence">
      <div className="drive-grid" />
      <p className="drive-title">DRIVEVITALS / DIGITAL TWIN</p>
      <p className="drive-status">SYNC STATUS <span className="live-dot" aria-hidden="true" /> <b>LIVE</b></p>
      <div className="fleet-vehicle vehicle-one"><span>01</span></div>
      <div className="fleet-vehicle vehicle-two"><span>02</span></div>
      <i className="sensor-point sensor-a" /><i className="sensor-point sensor-b" /><i className="sensor-point sensor-c" /><i className="sensor-point sensor-d" />
      <div className="telemetry-rail rail-one"><b /></div>
      <div className="telemetry-rail rail-two"><b /></div>
      <div className="dv-readout" aria-hidden="true">
        <span>SPD <b>{String(metrics.speed).padStart(3, '0')}</b></span>
        <span>RPM <b>{metrics.rpm}</b></span>
        <span>TEMP <b>{metrics.temp}°C</b></span>
      </div>
      <div className="twin-core"><span>DIGITAL</span><strong>TWIN</strong><i /></div>
      <div className="dv-stage stage-api flow"><small>BACKEND</small><b>FASTAPI</b></div>
      <div className="dv-stage stage-ana flow"><small>ENGINE</small><b>ANALYTICS</b></div>
      <div className="dv-stage stage-ws flow"><small>STREAM</small><b>WEBSOCKET</b></div>
      <div className="dv-stage stage-ui flow"><small>CLIENT</small><b>REACT UI</b></div>
      <div className="dv-meter" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="analytics-core"><span>FLEET</span><strong>INTELLIGENCE</strong></div>
      <div className="dv-fleet" aria-hidden="true">
        <span>FLEET <b>12</b></span>
        <span>HEALTH <b>{metrics.health}%</b></span>
        <span>ALERTS <b>02</b></span>
      </div>
      <div className="dv-rail rail-api"><b /></div>
      <div className="dv-rail rail-ana"><b /></div>
      <div className="dv-rail rail-ws"><b /></div>
      <div className="dv-rail rail-ui"><b /></div>
      <div className="dv-rail rail-core"><b /></div>
      <i className="dv-scan" aria-hidden="true" />
      <p className="fleet-label">VEHICLE / TELEMETRY / TWIN / ANALYTICS / UI</p>
    </div>
  )
}
