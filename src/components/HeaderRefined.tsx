import { useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { navItems } from '../data/refinedPortfolio'
export function HeaderRefined() {
  const [open, setOpen] = useState(false)
  return <header><a className="brand" href="#top">Haris Kamal Rana<span>.</span></a><nav className={open ? 'open' : ''}>{navItems.map(([label, link]) => <a onClick={() => setOpen(false)} key={label} href={link}>{label}</a>)}<a className="nav-cv" href="/Haris-Kamal-Rana-CV.pdf" download>Resume <Download size={13} /></a></nav><button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>
}
