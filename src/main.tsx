import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './AppRefined'
import './styles.css'
import './refined.css'
import './visual-system.css'

// Reveal-hidden states are scoped under .js so the page stays readable
// if JavaScript fails to load.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
