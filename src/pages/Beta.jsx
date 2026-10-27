// /beta: qué es BETA, la comunidad que arma Nimbo en Berazategui (src/ns/Beta.jsx).
import { useSeo } from '../hooks/useSeo'
import Beta from '../ns/Beta'

export default function BetaPage() {
  useSeo({
    title: 'BETA — Encuentros de tecnología e IA en Berazategui | Nimbo',
    description:
      'BETA es la comunidad que organiza Nimbo en Berazategui: encuentros para conocernos, aprender IA en la práctica y armar proyectos juntos.',
    path: '/beta',
  })
  return <Beta />
}
