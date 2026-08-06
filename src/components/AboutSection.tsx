import { about } from '../data/refinedPortfolio'
import { SectionHeading } from './SectionHeading'

export function AboutSection() {
  return <section id="about" className="about shell">
    <SectionHeading label={about.eyebrow} title={about.title} copy={about.copy} />
    <dl className="about-facts" data-reveal>{about.facts.map(fact => <div className="about-fact" key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
  </section>
}
