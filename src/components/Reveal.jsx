import { useReveal } from '../hooks/useReveal'

/* Renders a wrapper (default <div>) that fades + lifts into view on scroll.
   `delay` maps to the data-delay stagger used in the CSS. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, shown] = useReveal()
  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-delay={delay || undefined}
      className={`${className} ${shown ? 'in' : ''}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}
