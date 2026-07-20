import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/portfolio'
export function Header() {
  const [open, setOpen] = useState(false)
  return <header><a className="brand" href="#top">Haris Kamal Rana<span>.</span></a><nav className={open ? 'open' : ''}>{navItems.map(([label, link]) => <a onClick={() => setOpen(false)} key={label} href={link}>{label}</a>)}</nav><button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>
}
