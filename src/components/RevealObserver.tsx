import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal], .section-heading.reveal')
    const revealed = new Set<HTMLElement>()
    const reveal = (element: HTMLElement) => {
      if (revealed.has(element)) return
      revealed.add(element)
      element.classList.add('is-visible')
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement)
      })
    }, { threshold: 0 })
    let ticking = false
    const revealInView = () => {
      elements.forEach((element) => {
        if (revealed.has(element)) return
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) reveal(element)
      })
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { revealInView(); ticking = false })
    }
    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 70, 280)}ms`)
      observer.observe(element)
    })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    const initial = window.setTimeout(onScroll, 150)
    return () => {
      window.clearTimeout(initial)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
    }
  }, [])
  return null
}
