import { ArrowUpRight, BookOpen, Code2, ExternalLink, FileText, Workflow } from 'lucide-react'
import type { ProjectAction, ProjectActionKind } from '../data/refinedPortfolio'

const DEFAULTS: Record<ProjectActionKind, { label: string; icon: typeof Code2 }> = {
  github: { label: 'View on GitHub', icon: Code2 },
  architecture: { label: 'Architecture', icon: Workflow },
  demo: { label: 'Live demo', icon: ExternalLink },
  documentation: { label: 'Docs', icon: BookOpen },
  'case-study': { label: 'Case study', icon: FileText },
}

export function ProjectActions({ actions }: { actions: ProjectAction[] }) {
  const available = actions.filter(a => a.available !== false && a.href)
  if (available.length === 0) return null
  return <div className="project-actions">{available.map(action => {
    const Icon = DEFAULTS[action.kind].icon
    return <a className="text-link" key={action.kind} href={action.href} target="_blank" rel="noreferrer">{action.label ?? DEFAULTS[action.kind].label}<ArrowUpRight size={15} /></a>
  })}</div>
}
