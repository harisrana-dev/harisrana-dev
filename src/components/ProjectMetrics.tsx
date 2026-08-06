import type { ProjectMetric } from '../data/refinedPortfolio'

export function ProjectMetrics({ metrics }: { metrics: ProjectMetric[] | undefined }) {
  if (!metrics || metrics.length === 0) return null
  return <dl className="project-metrics">{metrics.map(metric => <div className="project-metric" key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>)}</dl>
}
