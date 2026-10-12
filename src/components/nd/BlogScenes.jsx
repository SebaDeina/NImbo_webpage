/*
  Ilustraciones animadas de las portadas del blog: una escena por tema, dibujada en
  SVG (viewBox 400×300) y animada con CSS (src/styles/blog-scenes.css). Las tarjetas
  blancas son iguales en todos los fondos; lo que va afuera usa var(--pv-o) para
  adaptarse al color de la categoría. Un artículo nuevo sin escena propia usa la de
  su categoría (ver sceneFor).
*/

const INK = '#26248A'
const BRAND = '#6665FF'
const LINE = '#E6E4F2'
const SOFT = '#F1F0FA'
const OK = '#2fbf71'

// demora de la animación (segundos)
const d = (s) => ({ '--d': `${s}s` })

function Card({ x, y, w, h, r = 14 }) {
  return (
    <g>
      <rect x={x} y={y + 6} width={w} height={h} rx={r} className="sc-shadow" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#fff" />
    </g>
  )
}

function Dots({ x, y }) {
  return [0, 1, 2].map((i) => <circle key={i} cx={x + i * 11} cy={y} r="3.5" fill={LINE} />)
}

function Sparkle({ x, y, s = 1, delay = 0, fill = 'var(--pv-o)' }) {
  return (
    <path
      className="sc-pulse"
      style={d(delay)}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-12C1.5-4 4-1.5 12 0 4 1.5 1.5 4 0 12-1.5 4-4 1.5-12 0-4-1.5-1.5-4 0-12Z"
      fill={fill}
    />
  )
}

/* Velocidad de carga: la página carga y el velocímetro llega a verde */
function Speed() {
  return (
    <>
      <Card x={70} y={46} w={260} h={208} />
      <Dots x={90} y={66} />
      <rect x={130} y={60} width={150} height={12} rx={6} fill={SOFT} />
      <rect x={70} y={82} width={260} height={3} fill={SOFT} />
      <rect x={70} y={82} width={260} height={3} fill={BRAND} className="sc-grow-x sc-6" />
      <path d="M130 200A70 70 0 0 1 270 200" fill="none" stroke={SOFT} strokeWidth="14" strokeLinecap="round" />
      <path d="M130 200A70 70 0 0 1 270 200" fill="none" stroke={OK} strokeWidth="14" strokeLinecap="round" pathLength="100" className="sc-gauge" />
      <g className="sc-needle">
        <line x1="200" y1="200" x2="200" y2="146" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <circle cx="200" cy="200" r="7" fill={INK} />
      </g>
      <text x="200" y="236" textAnchor="middle" className="sc-t" fill={INK} fontSize="17" fontWeight="600">
        0,9 s
      </text>
      <Sparkle x={346} y={60} delay={1.2} />
    </>
  )
}

/* ROI: las barras crecen, la tendencia sube y aparece el retorno */
function Roi() {
  const H = [40, 58, 52, 84, 112]
  return (
    <>
      <Card x={60} y={46} w={280} h={208} />
      <rect x={82} y={66} width={90} height={9} rx={4.5} fill={LINE} />
      <line x1="82" y1="228" x2="318" y2="228" stroke={LINE} strokeWidth="2" />
      {H.map((h, i) => (
        <rect key={i} x={92 + i * 44} y={228 - h} width={28} height={h} rx={5} fill={i === 4 ? BRAND : '#DCD8F5'} className="sc-grow-y sc-6" style={d(i * 0.15)} />
      ))}
      <path d="M106 184L150 166 194 172 238 140 282 104" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="100" className="sc-draw sc-6" style={d(0.9)} />
      <g className="sc-pop sc-6" style={d(1.6)}>
        <rect x={236} y={60} width={84} height={30} rx={15} fill="#E4F7EC" />
        <text x={278} y={80} textAnchor="middle" className="sc-t" fill="#1c7a47" fontSize="13" fontWeight="600">
          + ROI
        </text>
      </g>
    </>
  )
}

/* Automatizar con IA: los datos pasan de un sistema a otro por el engranaje */
function Auto() {
  return (
    <>
      <line x1="120" y1="150" x2="160" y2="150" className="sc-wire" />
      <line x1="240" y1="150" x2="280" y2="150" className="sc-wire" />
      <circle cx="120" cy="150" r="5" fill="var(--pv-o)" className="sc-flow" style={{ '--dx': '40px' }} />
      <circle cx="240" cy="150" r="5" fill="var(--pv-o)" className="sc-flow" style={{ '--dx': '40px', ...d(1) }} />
      <Card x={40} y={115} w={80} h={70} />
      <rect x={58} y={134} width={44} height={32} rx={4} fill="none" stroke={INK} strokeWidth="2.5" />
      <path d="M58 136L80 152 102 136" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <Card x={160} y={98} w={80} h={104} />
      <g className="sc-spin">
        <circle cx="200" cy="150" r="22" fill="none" stroke={BRAND} strokeWidth="9" strokeDasharray="7.2 6.6" />
        <circle cx="200" cy="150" r="16" fill={BRAND} />
        <circle cx="200" cy="150" r="6" fill="#fff" />
      </g>
      <Card x={280} y={115} w={80} h={70} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={296} y={132 + i * 13} width={48} height={7} rx={3.5} fill={LINE} />
          <rect x={296} y={132 + i * 13} width={48} height={7} rx={3.5} fill={OK} className="sc-grow-x sc-6" style={d(1.4 + i * 0.3)} />
        </g>
      ))}
      <Sparkle x={200} y={70} delay={0.4} />
      <Sparkle x={330} y={92} s={0.6} delay={1.4} />
    </>
  )
}

/* Agente vs. chatbot: el menú fijo contra el agente que entiende y resuelve */
function Agent() {
  return (
    <>
      <Card x={36} y={62} w={152} h={180} />
      <text x={56} y={88} className="sc-t" fill="#8a88a8" fontSize="11">
        Chatbot
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={52} y={102 + i * 32} width={120} height={24} rx={12} fill={SOFT} />
          <circle cx={66} cy={114 + i * 32} r={6} fill={LINE} />
          <rect x={78} y={111 + i * 32} width={60 + i * 10} height={6} rx={3} fill={LINE} />
        </g>
      ))}
      <Card x={212} y={62} w={152} h={180} />
      <text x={232} y={88} className="sc-t" fill={BRAND} fontSize="11" fontWeight="600">
        Agente IA
      </text>
      <rect x={262} y={100} width={88} height={26} rx={13} fill="#DCD8F5" />
      <rect x={274} y={110} width={64} height={6} rx={3} fill="#fff" />
      <g className="sc-typing sc-6">
        <rect x={228} y={136} width={52} height={24} rx={12} fill={SOFT} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={242 + i * 12} cy={148} r={3.5} fill="#a5a3bd" className="sc-bounce" style={d(i * 0.15)} />
        ))}
      </g>
      <g className="sc-pop sc-6" style={d(2.4)}>
        <rect x={228} y={136} width={116} height={42} rx={14} fill={INK} />
        <rect x={240} y={148} width={84} height={6} rx={3} fill="#B9B8FF" />
        <rect x={240} y={160} width={60} height={6} rx={3} fill="#B9B8FF" />
      </g>
      <g className="sc-pop sc-6" style={d(3.2)}>
        <rect x={228} y={192} width={116} height={26} rx={13} fill="#E4F7EC" />
        <text x={286} y={209} textAnchor="middle" className="sc-t" fill="#1c7a47" fontSize="11" fontWeight="600">
          ✓ Turno agendado
        </text>
      </g>
    </>
  )
}

/* CRM: un cliente avanza por las etapas hasta "Ganado" */
function Crm() {
  const COLS = ['Nuevo', 'Propuesta', 'Ganado']
  return (
    <>
      <Card x={36} y={48} w={328} h={210} />
      {COLS.map((c, i) => (
        <g key={c}>
          <circle cx={58 + i * 104} cy={74} r={4} fill={i === 2 ? OK : i === 1 ? BRAND : '#B9B8FF'} />
          <text x={68 + i * 104} y={78} className="sc-t" fill={INK} fontSize="11" fontWeight="600">
            {c}
          </text>
          <rect x={50 + i * 104} y={88} width={92} height={156} rx={10} fill="#F7F6FC" />
        </g>
      ))}
      {[
        [0, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ].map(([c, r], i) => (
        <g key={i}>
          <rect x={58 + c * 104} y={98 + r * 48} width={76} height={38} rx={8} fill="#fff" stroke={LINE} />
          <rect x={66 + c * 104} y={108 + r * 48} width={44} height={6} rx={3} fill={LINE} />
          <rect x={66 + c * 104} y={120 + r * 48} width={28} height={6} rx={3} fill={SOFT} />
        </g>
      ))}
      <g className="sc-crm">
        <rect x={58} y={194} width={76} height={38} rx={8} fill="#fff" stroke={BRAND} strokeWidth="2" />
        <circle cx={72} cy={213} r={7} fill={BRAND} />
        <rect x={84} y={206} width={40} height={6} rx={3} fill={INK} />
        <rect x={84} y={217} width={26} height={6} rx={3} fill="#DCD8F5" />
      </g>
    </>
  )
}

/* Transformación digital: del papel a la pantalla */
function Transf() {
  return (
    <>
      <g transform="rotate(-6 100 150)">
        <Card x={46} y={84} w={104} h={136} r={6} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={62} y={106 + i * 20} width={i === 4 ? 40 : 72} height={5} rx={2.5} fill={LINE} />
        ))}
      </g>
      <path d="M168 150H232" className="sc-wire" />
      <path d="M226 142L236 150 226 158" fill="none" stroke="var(--pv-o)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="168" cy="150" r="5" fill="var(--pv-o)" className="sc-flow" style={{ '--dx': '56px' }} />
      <Card x={250} y={58} w={112} h={186} r={18} />
      <rect x={292} y={68} width={28} height={5} rx={2.5} fill={LINE} />
      {[30, 46, 38, 62].map((h, i) => (
        <rect key={i} x={266 + i * 21} y={176 - h} width={14} height={h} rx={4} fill={i === 3 ? BRAND : '#DCD8F5'} className="sc-grow-y sc-6" style={d(0.8 + i * 0.15)} />
      ))}
      <g className="sc-pop sc-6" style={d(1.8)}>
        <rect x={264} y={194} width={84} height={26} rx={13} fill="#E4F7EC" />
        <text x={306} y={211} textAnchor="middle" className="sc-t" fill="#1c7a47" fontSize="11" fontWeight="600">
          ✓ Online
        </text>
      </g>
      <Sparkle x={200} y={96} s={0.8} delay={0.6} />
      <Sparkle x={370} y={52} s={0.6} delay={1.6} />
    </>
  )
}

/* WhatsApp: llega la consulta y el asistente responde solo */
function Whatsapp() {
  return (
    <>
      <Card x={128} y={24} w={144} h={252} r={24} />
      <rect x={128} y={24} width={144} height={44} rx={24} fill="#25D366" />
      <rect x={128} y={46} width={144} height={22} fill="#25D366" />
      <circle cx={152} cy={46} r={10} fill="#fff" opacity=".9" />
      <rect x={168} y={40} width={60} height={6} rx={3} fill="#fff" opacity=".9" />
      <rect x={168} y={50} width={36} height={5} rx={2.5} fill="#fff" opacity=".6" />
      <g className="sc-pop sc-7" style={d(0.2)}>
        <rect x={142} y={84} width={92} height={30} rx={12} fill={SOFT} />
        <rect x={152} y={96} width={64} height={6} rx={3} fill="#C9C6E0" />
      </g>
      <g className="sc-typing sc-7" style={d(0.9)}>
        <rect x={198} y={124} width={46} height={22} rx={11} fill="#DCF8C6" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={210 + i * 11} cy={135} r={3} fill="#5fb37a" className="sc-bounce" style={d(i * 0.15)} />
        ))}
      </g>
      <g className="sc-pop sc-7" style={d(2.6)}>
        <rect x={160} y={124} width={98} height={46} rx={12} fill="#DCF8C6" />
        <rect x={170} y={136} width={76} height={6} rx={3} fill="#8fcf9f" />
        <rect x={170} y={148} width={54} height={6} rx={3} fill="#8fcf9f" />
        <text x={250} y={165} textAnchor="end" className="sc-t" fill="#34B7F1" fontSize="9" fontWeight="600">
          ✓✓
        </text>
      </g>
      <g className="sc-pop sc-7" style={d(3.4)}>
        <rect x={142} y={180} width={80} height={30} rx={12} fill={SOFT} />
        <rect x={152} y={192} width={50} height={6} rx={3} fill="#C9C6E0" />
      </g>
      <g className="sc-pop sc-7" style={d(4.2)}>
        <rect x={176} y={220} width={82} height={30} rx={12} fill="#DCF8C6" />
        <rect x={186} y={232} width={48} height={6} rx={3} fill="#8fcf9f" />
      </g>
      <Sparkle x={300} y={88} delay={2.6} />
      <Sparkle x={96} y={200} s={0.6} delay={0.8} />
    </>
  )
}

/* Prompts: se escribe el pedido y la IA devuelve la respuesta */
function Prompt() {
  return (
    <>
      <Card x={56} y={62} w={288} h={52} r={26} />
      <rect x={80} y={84} width={180} height={8} rx={4} fill={INK} className="sc-type sc-7" />
      <rect x={80} y={80} width={2.5} height={16} fill={BRAND} className="sc-caret sc-7" />
      <circle cx={318} cy={88} r={14} fill={BRAND} />
      <path d="M312 88H324M319 83L324 88 319 93" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Card x={56} y={132} w={288} h={116} />
      <g className="sc-pop sc-7" style={d(2.4)}>
        <circle cx={82} cy={156} r={11} fill="#EEEDFF" />
        <path d="M82 148C82.8 153 84 154.2 89 155 84 155.8 82.8 157 82 162 81.2 157 80 155.8 75 155 80 154.2 81.2 153 82 148Z" fill={BRAND} />
      </g>
      {[220, 196, 236, 140].map((w, i) => (
        <rect key={i} x={102} y={150 + i * 22} width={w} height={8} rx={4} fill={i === 3 ? '#DCD8F5' : LINE} className="sc-grow-x sc-7" style={d(2.8 + i * 0.3)} />
      ))}
      <Sparkle x={356} y={52} delay={0.3} />
      <Sparkle x={40} y={250} s={0.6} delay={1.3} />
    </>
  )
}

/* Página web: el sitio se arma bloque por bloque y alguien toca el botón */
function Web() {
  return (
    <>
      <Card x={56} y={36} w={288} h={228} />
      <Dots x={76} y={56} />
      <rect x={120} y={50} width={160} height={12} rx={6} fill={SOFT} />
      <g className="sc-pop sc-7" style={d(0.2)}>
        <rect x={76} y={78} width={248} height={86} rx={10} fill="#EEEDFF" />
        <rect x={92} y={96} width={130} height={11} rx={5.5} fill={INK} />
        <rect x={92} y={114} width={96} height={7} rx={3.5} fill="#B9B8FF" />
        <rect x={92} y={134} width={70} height={18} rx={9} fill={BRAND} className="sc-click sc-7" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="sc-pop sc-7" style={d(0.8 + i * 0.3)}>
          <rect x={76 + i * 86} y={176} width={76} height={70} rx={10} fill={SOFT} />
          <rect x={86 + i * 86} y={186} width={56} height={30} rx={6} fill={['#DCD8F5', '#F6F1E7', '#E4F7EC'][i]} />
          <rect x={86 + i * 86} y={224} width={40} height={6} rx={3} fill={LINE} />
        </g>
      ))}
      <path className="sc-cursor sc-7" d="M0 0L0 22 6 16 10 25 14 23 10 15 18 15Z" fill={INK} stroke="#fff" strokeWidth="1.5" />
      <Sparkle x={358} y={48} delay={1.1} />
    </>
  )
}

/* IA sin gastar una fortuna: el plan se tilda y los ahorros se apilan */
function Guide() {
  return (
    <>
      <Card x={70} y={44} w={196} h={212} />
      <rect x={90} y={64} width={100} height={10} rx={5} fill={INK} />
      <rect x={202} y={60} width={48} height={18} rx={9} fill="#EEEDFF" />
      <text x={226} y={73} textAnchor="middle" className="sc-t" fill={BRAND} fontSize="10" fontWeight="600">
        2026
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={90} y={96 + i * 38} width={20} height={20} rx={5} fill="#fff" stroke="#cfcbe3" strokeWidth="1.5" />
          <path d={`M94 ${106 + i * 38}l4.5 4.5 8-9`} fill="none" stroke={OK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength="100" className="sc-draw sc-7" style={d(0.4 + i * 0.5)} />
          <rect x={122} y={103 + i * 38} width={[110, 90, 120, 76][i]} height={7} rx={3.5} fill={LINE} />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="sc-coin sc-7" style={d(1 + i * 0.5)}>
          <ellipse cx={316} cy={232 - i * 16} rx={30} ry={9} fill="#E8B84A" />
          <rect x={286} y={222 - i * 16} width={60} height={10} fill="#E8B84A" />
          <ellipse cx={316} cy={222 - i * 16} rx={30} ry={9} fill="#F6D27A" />
        </g>
      ))}
      <Sparkle x={344} y={112} delay={2.6} />
    </>
  )
}

/* SEO local: cae el pin en el mapa y el negocio sube al primer resultado */
function Seo() {
  return (
    <>
      <Card x={30} y={50} w={210} h={200} />
      <g clipPath="url(#scMap)">
        <rect x={30} y={50} width={210} height={200} fill="#F7F6FC" />
        <path d="M30 120H240M30 196H240M96 50V250M180 50V250" stroke="#fff" strokeWidth="9" />
        <path d="M30 236C80 220 110 250 160 230S220 200 240 214" stroke="#DCD8F5" strokeWidth="14" fill="none" />
        <rect x={110} y={134} width={56} height={48} rx={6} fill="#E4F7EC" />
      </g>
      <clipPath id="scMap">
        <rect x={30} y={50} width={210} height={200} rx={14} />
      </clipPath>
      <ellipse cx={138} cy={160} rx={22} ry={7} fill={BRAND} className="sc-ripple sc-6" style={d(0.6)} />
      <g className="sc-drop sc-6">
        <path d="M138 160C126 144 118 134 118 122a20 20 0 0 1 40 0c0 12-8 22-20 38Z" fill={BRAND} />
        <circle cx={138} cy={122} r={7} fill="#fff" />
      </g>
      <Card x={214} y={92} w={160} h={136} />
      <rect x={228} y={106} width={132} height={18} rx={9} fill={SOFT} />
      <circle cx={240} cy={115} r={4} fill="none" stroke="#a5a3bd" strokeWidth="1.6" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={228} y={136 + i * 30} width={132} height={24} rx={8} fill={i === 0 ? 'transparent' : '#fff'} />
          <rect x={256} y={142 + i * 30} width={[80, 90, 70][i]} height={6} rx={3} fill={LINE} />
          <rect x={256} y={152 + i * 30} width={50} height={5} rx={2.5} fill={SOFT} />
        </g>
      ))}
      <g className="sc-pop sc-6" style={d(1.2)}>
        <rect x={228} y={136} width={132} height={24} rx={8} fill="#EEEDFF" stroke={BRAND} strokeWidth="1.5" />
        <circle cx={242} cy={148} r={8} fill={BRAND} />
        <text x={242} y={151.5} textAnchor="middle" className="sc-t" fill="#fff" fontSize="9" fontWeight="600">
          1°
        </text>
        <rect x={256} y={142} width={80} height={6} rx={3} fill={INK} />
        <rect x={256} y={152} width={50} height={5} rx={2.5} fill="#B9B8FF" />
      </g>
    </>
  )
}

const BY_SLUG = {
  'velocidad-de-carga-web-por-que-importa': Speed,
  'como-medir-el-roi-de-una-automatizacion': Roi,
  'automatiza-tu-negocio-con-ia': Auto,
  'agentes-de-ia-vs-chatbots': Agent,
  'que-es-un-crm-y-por-que-tu-pyme-lo-necesita': Crm,
  'transformacion-digital-pymes-argentina': Transf,
  'automatizar-pyme-ia-chatbot-whatsapp': Whatsapp,
  'como-escribir-prompts-chatgpt': Prompt,
  'por-que-tu-negocio-necesita-una-pagina-web': Web,
  'ia-para-pymes-argentinas-guia-2026': Guide,
  'seo-local-argentina-como-aparecer-en-google': Seo,
}
const BY_CATEGORY = {
  'Diseño Web': Web,
  SEO: Seo,
  'Automatización & IA': Auto,
  'Inteligencia Artificial': Prompt,
  'Transformación Digital': Transf,
}

export function sceneFor(post) {
  return BY_SLUG[post.slug] || BY_CATEGORY[post.category] || Web
}
