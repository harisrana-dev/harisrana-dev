import { useState } from 'react'
import { Plus } from 'lucide-react'
export function FaqItem({ question, answer }: {question: string; answer: string}) {
  const [open, setOpen] = useState(false)
  return <div className={'faq-item ' + (open ? 'is-open' : '')}>
    <button aria-expanded={open} onClick={() => setOpen(!open)}><span>{question}</span><Plus size={19} /></button>
    <div className="faq-answer"><p>{answer}</p></div>
  </div>
}
