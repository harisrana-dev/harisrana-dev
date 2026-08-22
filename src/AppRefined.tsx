import { ArrowDownRight, ArrowUpRight, Code2, Download, Mail, Network, Phone } from 'lucide-react'
import { useEffect, type ComponentType } from 'react'
import { AboutSection } from './components/AboutSection'
import { CaseStudy } from './components/CaseStudy'
import { DriveVitalsVisual } from './components/DriveVitalsVisual'
import { FaqItem } from './components/FaqItem'
import { HeaderRefined } from './components/HeaderRefined'
import { HeroSystemVisual } from './components/HeroSystemVisual'
import { KnowledgeVisual } from './components/KnowledgeVisual'
import { ProjectActions } from './components/ProjectActions'
import { ProjectMetrics } from './components/ProjectMetrics'
import { RevealObserver } from './components/RevealObserver'
import { SectionHeading } from './components/SectionHeading'
import { SecurityVisual } from './components/SecurityVisual'
import { NexusResearchSection } from './components/NexusResearchSection'
import { TechnicalVisual } from './components/TechnicalVisual'
import { WorkshopVisual } from './components/WorkshopVisual'
import { capabilities, domains, faq, journey, practice, projects } from './data/refinedPortfolio'
import type { ProjectVisualKind } from './data/refinedPortfolio'

const PROJECT_VISUALS: Record<ProjectVisualKind, ComponentType> = {
  drivevitals: DriveVitalsVisual,
  knowledge: KnowledgeVisual,
  security: SecurityVisual,
  workshop: WorkshopVisual,
}

function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const Visual = PROJECT_VISUALS[kind]
  return <Visual />
}

function AppRefined() {
  // On initial mount, scroll to the hash target (e.g. #research). Browsers
  // attempt fragment navigation before React renders, so the target element
  // does not yet exist. Re-triggering the scroll after mount makes deep-links
  // like /#research work reliably.
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      const target = document.getElementById(id)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return <><a className="skip-link" href="#main">Skip to content</a><RevealObserver /><div id="top" /><HeaderRefined /><main id="main">
    <section className="hero shell"><div className="hero-meta eyebrow" data-reveal>Computer Science / AI / Automotive Systems</div><div className="hero-content" data-reveal><h1>Building intelligent systems<br />for the <em>physical world.</em></h1><div className="hero-bottom"><p>I build intelligent systems that connect artificial intelligence, real-time data, and physical machines — from vehicle telemetry and digital twins to computer vision and fleet intelligence.</p><div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href="/Haris-Kamal-Rana-CV.pdf" download>View resume <Download size={15}/></a></div></div></div><HeroSystemVisual /></section>
    <section className="credibility shell"><div className="domain-list domain-list-four">{domains.map(d => <div className="domain" data-reveal key={d.number}><span>{d.number}</span><div><p>{d.label}</p><strong>{d.value}</strong></div></div>)}</div></section>
    <AboutSection />
    <section id="work" className="work shell"><SectionHeading label="01 / Selected work" title="Systems built with a view beyond the screen." copy="Self-initiated engineering projects exploring how software can understand, model, and interact with physical systems." />
      {projects.filter(p => p.layout === 'feature').map(p => <article className="project feature" data-reveal key={p.id}><div className="project-copy"><p className="eyebrow">{p.eyebrow}</p><h3>{p.title}</h3><h4>{p.subtitle}</h4><p>{p.description}</p>{p.detail && <p className="project-detail">{p.detail}</p>}<ul>{p.tech.map(x => <li key={x}>{x}</li>)}</ul><ProjectMetrics metrics={p.metrics} /><ProjectActions actions={p.actions} /></div>{p.visual && <ProjectVisual kind={p.visual} />}{p.caseStudy && <CaseStudy blocks={p.caseStudy} id={p.id} />}</article>)}
      <div className="practice" data-reveal>
        <span className="practice-label">Engineering practice</span>
        <div className="practice-items">{practice.map(item => <div className="practice-item" key={item.number}><span className="practice-item-label"><b>{item.number}</b><strong>{item.label}</strong></span><em>{item.text}</em></div>)}</div>
      </div>
      <div className="project-grid">
        {projects.filter(p => p.layout === 'compact' || p.layout === 'workshop').map(p => <article className={'project compact' + (p.layout === 'workshop' ? ' workshop' : '')} data-reveal key={p.id}><div><p className="eyebrow">{p.eyebrow}</p><h3>{p.title}</h3><p>{p.description}</p>{p.visual && <div className="project-mini"><ProjectVisual kind={p.visual} /></div>}</div><div className="project-footer"><span>{p.tech.join(' / ')}</span><ProjectActions actions={p.actions} /></div>{p.caseStudy && <CaseStudy blocks={p.caseStudy} id={p.id} />}</article>)}
      </div>
    </section>
    <section id="tools" className="tools shell"><SectionHeading label="02 / Capabilities" title="Tools for building intelligent systems" /><div className="capability-grid capability-grid-refined">{capabilities.map((cap, index) => <article className="capability" data-reveal key={cap.title}><span>0{index + 1}</span><TechnicalVisual kind={cap.visual} label={cap.title} /><h3>{cap.title}</h3><div>{cap.items.map(item => <p key={item}>{item}</p>)}</div></article>)}</div></section>
    <section id="experience" className="experience shell"><SectionHeading label="03 / Journey" title="Learning to build for a world in motion." /><div className="timeline">{journey.map((item, i) => <article className="timeline-item" data-reveal key={item.date}><span>{item.date}</span><div><i>0{i + 1}</i><h3>{item.title}</h3><h4>{item.organization}</h4><p>{item.copy}</p></div></article>)}</div></section>
    <NexusResearchSection />
    <section className="faq shell"><SectionHeading label="05 / FAQ" title="A few useful answers." /><div className="faq-list">{faq.map(([q,a]) => <FaqItem key={q} question={q} answer={a} />)}</div></section>
    <section id="contact" className="contact"><div className="shell contact-inner"><p className="eyebrow">06 / Start a conversation</p><h2>Let's build something <em>intelligent.</em></h2><div className="contact-footer"><p>Interested in artificial intelligence, automotive intelligence, real-time systems, or the future of intelligent machines? I'm always open to meaningful conversations.</p><a className="button button-light" href="mailto:harriskamal23@gmail.com">Get in touch <ArrowUpRight size={18}/></a></div><div className="socials"><a href="mailto:harriskamal23@gmail.com"><Mail size={17}/> harriskamal23@gmail.com</a><a href="tel:+923098999565"><Phone size={17}/> +92 309 8999565</a><a href="https://www.linkedin.com/in/hariskamalrana" target="_blank" rel="noreferrer"><Network size={17}/> LinkedIn</a><a href="https://github.com/harisrana-dev" target="_blank" rel="noreferrer"><Code2 size={17}/> GitHub</a><a href="/Haris-Kamal-Rana-CV.pdf" download><Download size={17}/> Download CV</a></div></div></section>
  </main><footer className="shell"><span>Haris Kamal Rana</span><span>AI / Automotive Intelligence / Digital Twins</span><span>© {new Date().getFullYear()} / Haris Kamal Rana</span></footer></>
}
export default AppRefined
