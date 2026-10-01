const TEXT = 'Nimbo ✦ Web ✦ Automatización ✦ Inteligencia artificial ✦ Datos ✦ Visión por computadora ✦ Hecho en Argentina ✦ '

export default function Marquee() {
  return (
    <div className="micro" aria-hidden="true">
      <div>{TEXT.repeat(10)}</div>
    </div>
  )
}
