// Envuelve una composición de Remotion en un Player que se reproduce en loop, se pausa fuera de pantalla
// y vuelve a empezar al tocarla. El Player se monta recién en el navegador: en el HTML prerenderado queda el
// recuadro vacío (Remotion no corre en el servidor).
import { Player } from '@remotion/player'
import { useEffect, useRef, useState } from 'react'

export default function Fig({ component, meta, width = 800, height = 600, className, onTap = true, still, inputProps }) {
  const player = useRef(null)
  const box = useRef(null)
  const [client, setClient] = useState(false)
  useEffect(() => setClient(true), [])
  useEffect(() => {
    const el = box.current
    const io = new IntersectionObserver(([e]) => {
      const p = player.current
      if (!p || still != null) return
      if (e.isIntersecting) p.play()
      else p.pause()
    }, { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [still, client])
  const replay = () => {
    if (!onTap || !player.current) return
    player.current.seekTo(0)
    player.current.play()
  }
  return (
    <div ref={box} className={className} onClick={replay}>
      {client && <Player ref={player} component={component} inputProps={inputProps} durationInFrames={meta.durationInFrames} fps={meta.fps}
        compositionWidth={width} compositionHeight={height} loop autoPlay={still == null} initialFrame={still ?? 0} controls={false} clickToPlay={false}
        doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} style={{ width: '100%', height: '100%' }} />}
    </div>
  )
}
