import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './AppRefined'
import './styles.css'
import './refined.css'
import './visual-system.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
