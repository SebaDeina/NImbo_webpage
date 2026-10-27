// Hero · cielo vivo: la foto de nubes (public/cielo.jpg, de Pixabay) dibujada en violeta, con las nubes
// derivando despacio (las de abajo, más cerca, más rápido), como un grabado de líneas calculado píxel a píxel.
// `lineCss` se mide en px de pantalla y `cssScale` es cuántos px de composición hay por px de
// pantalla: así el dibujo tiene el mismo tamaño en el celular y en la compu, sin moiré.
import { useEffect, useRef, useState } from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'

export const HERO = { fps: 15, durationInFrames: 15 * 60 }

const CROSS = 45 // cuadros de fundido al final, para que el loop no salte
const INK_RGB = [0x4f, 0x4f, 0xd5]
const CAP = 0.56 // oscuridad máxima: el cielo queda liviano y las nubes, blancas

let photo
const loadPhoto = () =>
  (photo ??= new Promise((ok, fail) => {
    const im = new Image()
    im.onload = () => ok(im)
    im.onerror = fail
    im.src = '/cielo.jpg'
  }))

// mapa de "oscuridad" del tamaño del canvas, espejado a lo ancho para que la deriva nunca se quede sin imagen
function buildMap(im, W, H) {
  const want = W / H
  let sw = im.width, sh = im.width / want
  if (sh > im.height) { sh = im.height; sw = im.height * want }
  const sx = (im.width - sw) * 0.4
  const sy = (im.height - sh) * 0.55
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const g = c.getContext('2d', { willReadFrequently: true })
  g.filter = `blur(${Math.max(0.6, (W / sw) * 1.1)}px)`
  g.drawImage(im, sx, sy, sw, sh, 0, 0, W, H)
  const px = g.getImageData(0, 0, W, H).data
  const v = new Float32Array(W * H)
  const hist = new Uint32Array(256)
  for (let i = 0; i < W * H; i++) {
    // pesa el rojo: el cielo azul queda oscuro y las nubes blancas, claras
    const m = Math.round(0.62 * px[i * 4] + 0.3 * px[i * 4 + 1] + 0.08 * px[i * 4 + 2])
    v[i] = m
    hist[m]++
  }
  const pct = (q) => { let acc = 0; for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc >= q * W * H) return i } return 255 }
  const lo = pct(0.005), hi = pct(0.995)
  const W2 = W * 2
  const D = new Float32Array(W2 * H)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const a = Math.min(1, Math.max(0, (v[y * W + x] - lo) / (hi - lo || 1)))
      const d = Math.min(CAP, Math.pow(1 - a, 2.0) * 0.78)
      D[y * W2 + x] = d
      D[y * W2 + (W2 - 1 - x)] = d
    }
  }
  return { D, W, H, W2 }
}

export function Hero({ lineCss = 4.4, cssScale = 1 }) {
  const frame = useCurrentFrame()
  const { width: W, height: H, durationInFrames: T } = useVideoConfig()
  const canvas = useRef(null)
  const [map, setMap] = useState(null)
  const cache = useRef({})

  useEffect(() => {
    let live = true
    loadPhoto().then((im) => { if (live) setMap(buildMap(im, W, H)) })
    return () => { live = false }
  }, [W, H])

  useEffect(() => {
    // si cambió el tamaño, esperar al mapa nuevo: con el viejo quedan filas sin dibujar
    if (!map || map.W !== W || map.H !== H || !canvas.current) return
    const c = cache.current
    const p = lineCss * cssScale
    if (c.W !== W || c.H !== H || c.p !== p) {
      c.W = W; c.H = H; c.p = p
      c.img = new ImageData(W, H)
      c.out = new Uint32Array(c.img.data.buffer)
      c.sinx = new Float32Array(W)
      for (let x = 0; x < W; x++) c.sinx[x] = p * 0.24 * Math.sin(x / (p * 7))
      c.rowF = new Float32Array(H)
      for (let y = 0; y < H; y++) c.rowF[y] = 0.18 + 0.82 * Math.pow(y / H, 1.4)
      c.lut = new Uint32Array(64)
      for (let i = 0; i < 64; i++) {
        const k = i / 63
        const r = Math.round(255 + (INK_RGB[0] - 255) * k)
        const g = Math.round(255 + (INK_RGB[1] - 255) * k)
        const b = Math.round(254 + (INK_RGB[2] - 254) * k)
        c.lut[i] = (255 << 24) | (b << 16) | (g << 8) | r
      }
    }
    const { D, W2 } = map
    const { out, sinx, rowF, lut } = c
    const v = (W * 0.38) / T // las filas de abajo recorren ~38% del ancho por vuelta
    const fadeFrom = T - CROSS
    const w = frame > fadeFrom ? smooth((frame - fadeFrom) / CROSS) : 0
    const half = p / 2
    const sharp = 2.8
    for (let y = 0; y < H; y++) {
      const f = rowF[y]
      const sh = frame * v * f
      const sh2 = sh - T * v * f
      const base = y * W2
      const row = y * W
      for (let x = 0; x < W; x++) {
        let d = sample(D, base, W2, x + sh)
        if (w > 0) d = d * (1 - w) + sample(D, base, W2, x + sh2) * w
        const q = y + sinx[x] + d * p * 0.35
        const ph = q - Math.floor(q / p) * p
        const dist = Math.abs(ph - half) / half
        let ink = (d * 1.05 - dist) * sharp + 0.5
        ink = ink < 0 ? 0 : ink > 1 ? 1 : ink
        out[row + x] = lut[(ink * 63) | 0]
      }
    }
    canvas.current.getContext('2d').putImageData(c.img, 0, 0)
  }, [frame, map, W, H, T, lineCss, cssScale])

  return (
    <AbsoluteFill style={{ background: '#fefefe' }}>
      <canvas ref={canvas} width={W} height={H} style={{ width: '100%', height: '100%', display: 'block' }} />
    </AbsoluteFill>
  )
}

function sample(D, base, W2, u) {
  const i = Math.floor(u)
  const fr = u - i
  const i0 = ((i % W2) + W2) % W2
  const i1 = i0 + 1 === W2 ? 0 : i0 + 1
  return D[base + i0] * (1 - fr) + D[base + i1] * fr
}

const smooth = (t) => t * t * (3 - 2 * t)
