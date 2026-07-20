type Props = { label: string; title: string; copy?: string }
export function SectionHeading({ label, title, copy }: Props) {
  return <div className="section-heading reveal"><p className="eyebrow">{label}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>
}
