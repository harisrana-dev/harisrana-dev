import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal], .section-heading.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 70, 280)}ms`)
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])
  return null
}
