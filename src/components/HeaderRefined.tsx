import { useEffect, useRef, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { navItems } from '../data/refinedPortfolio'

export function HeaderRefined() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Move focus into the menu when it opens so keyboard users start at the
  // first link instead of tabbing through the (now visible) dropdown.
  useEffect(() => {
    if (open) firstLinkRef.current?.focus()
  }, [open])

  // Reset the menu state when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 760px)')
    const onChange = () => {
      if (!mql.matches) setOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return (
    <header>
      <a className="brand" href="#top" onClick={() => setOpen(false)}>Haris Kamal Rana<span>.</span></a>
      <nav id="primary-nav" aria-label="Main" className={open ? 'open' : ''}>
        {navItems.map(([label, link], index) => <a ref={index === 0 ? firstLinkRef : undefined} onClick={() => setOpen(false)} key={label} href={link}>{label}</a>)}
        <a className="nav-cv" href="/Haris-Kamal-Rana-CV.pdf" download>Resume <Download size={13} /></a>
      </nav>
      <button ref={menuButtonRef} type="button" className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  )
}
