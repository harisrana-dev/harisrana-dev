import { useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import type { CaseStudyBlock } from '../data/refinedPortfolio'

function CaseStudyTitle({ title }: { title: string }) {
  return <h4 className="cs-title">{title}</h4>
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case 'summary':
      return <p className="cs-summary">{block.text}</p>
    case 'problem':
      return (
        <div className="cs-problem">
          <div><span>Statement</span><p>{block.statement}</p></div>
          <div><span>Why it matters</span><p>{block.why}</p></div>
          <div><span>Who it serves</span><p>{block.who}</p></div>
        </div>
      )
    case 'pipeline':
      return (
        <div className="cs-section">
          <CaseStudyTitle title={block.title} />
          <div className="cs-pipeline">{block.steps.map((step, i) => (
            <div className={step.future ? 'cs-step future' : 'cs-step'} key={i}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <p>{step.label}</p>
              {step.note && <small>{step.note}</small>}
            </div>
          ))}</div>
        </div>
      )
    case 'workflow':
      return (
        <div className="cs-section">
          <CaseStudyTitle title={block.title} />
          <ol className="cs-workflow">{block.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
        </div>
      )
    case 'pair':
      return (
        <div className="cs-section">
          <CaseStudyTitle title={block.title} />
          <div className="cs-pairs">{block.rows.map((row, i) => (
            <div className="cs-pair" key={i}><h5>{row.title}</h5><p>{row.text}</p></div>
          ))}</div>
        </div>
      )
    case 'stack':
      return (
        <div className="cs-section">
          <CaseStudyTitle title={block.title} />
          <ul className="cs-stack">{block.items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      )
    case 'status':
      return (
        <div className="cs-section">
          <CaseStudyTitle title={block.title} />
          <div className="cs-status">
            <div><h5>Shipped</h5><ul>{block.shipped.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><h5>Roadmap</h5><ul>{block.roadmap.map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </div>
      )
    case 'links':
      return (
        <div className="cs-section">
          <CaseStudyTitle title={block.title} />
          <ul className="cs-links">{block.items.map(item => (
            <li key={item.label}><a href={item.href} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={14} /></a>{item.note && <small>{item.note}</small>}</li>
          ))}</ul>
        </div>
      )
  }
}

export function CaseStudy({ blocks, id }: { blocks: CaseStudyBlock[]; id: string }) {
  const [open, setOpen] = useState(false)
  if (!blocks || blocks.length === 0) return null
  const panelId = `case-study-${id}`
  return (
    <div className={open ? 'case-study open' : 'case-study'}>
      <button type="button" className="case-study-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={panelId}>
        <span>Engineering case study</span>
        <ArrowDown size={15} />
      </button>
      <div className="case-study-collapse" id={panelId} aria-hidden={!open} inert={!open}>
        <div>
          <div className="case-study-body">{blocks.map((block, i) => <Block block={block} key={i} />)}</div>
        </div>
      </div>
    </div>
  )
}
