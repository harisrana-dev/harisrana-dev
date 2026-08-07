import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
export function FaqItem({ question, answer }: {question: string; answer: string}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return <div className={'faq-item ' + (open ? 'is-open' : '')}>
    <button type="button" aria-expanded={open} aria-controls={id + '-answer'} onClick={() => setOpen(!open)}><span>{question}</span><Plus size={19} /></button>
    <div id={id + '-answer'} className="faq-answer" aria-hidden={!open}><p>{answer}</p></div>
  </div>
}
