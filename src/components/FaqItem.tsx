import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
export function FaqItem({ question, answer }: {question: string; answer: string}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return <div className={'faq-item ' + (open ? 'is-open' : '')}>
    <button aria-expanded={open} aria-controls={id + '-answer'} onClick={() => setOpen(!open)}><span>{question}</span><Plus size={19} /></button>
    <div id={id + '-answer'} className="faq-answer"><p>{answer}</p></div>
  </div>
}
