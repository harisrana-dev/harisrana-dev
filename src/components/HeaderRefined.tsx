import { useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { navItems } from '../data/refinedPortfolio'
export function HeaderRefined() {
  const [open, setOpen] = useState(false)
  return <header><a className="brand" href="#top">Haris Kamal Rana<span>.</span></a><nav id="primary-nav" aria-label="Main" className={open ? 'open' : ''}>{navItems.map(([label, link]) => <a onClick={() => setOpen(false)} key={label} href={link}>{label}</a>)}<a className="nav-cv" href="/Haris-Kamal-Rana-CV.pdf" download>Resume <Download size={13} /></a></nav><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>
}
