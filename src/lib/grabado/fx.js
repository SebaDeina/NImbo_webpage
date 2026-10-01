/* Ilustraciones de fantasía en SVG grabado (isla, dirigible, emblemas, bandadas). */
/* eslint-disable */
/* ================= ilustraciones de fantasía (SVG grabado) ================= */
const FX=(function(){
const ink='#262489',paper='#f3ead7',brand='#6665ff';
const S=`stroke="${ink}"`;
function pine(x,y,s){return `<path d="M${x} ${y-34*s}L${x+12*s} ${y}L${x-12*s} ${y}Z" fill="${paper}" ${S} stroke-width="1.4"/><path d="M${x} ${y-34*s}L${x+12*s} ${y}L${x} ${y}Z" fill="url(#hd)"/><path d="M${x-7*s} ${y-14*s}L${x+7*s} ${y-14*s}M${x-4*s} ${y-24*s}L${x+4*s} ${y-24*s}" ${S} stroke-width=".8"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y+5*s}" ${S} stroke-width="2"/>`}
function bird(x,y,s,d){return `<g transform="translate(${x} ${y}) scale(${s})"><path class="flap" style="animation-delay:${d}s" d="M-13 0Q-6.5 -8 0 0Q6.5 -8 13 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>`}
function flock(n,seed){let r=seed,o='';const R=()=>(r=(r*9301+49297)%233280)/233280;for(let i=0;i<n;i++)o+=bird(i*26+R()*18,(i%2?14:0)+R()*18,.7+R()*.5,R()*.6);return o}

/* isla flotante */
function island(uid){return `<svg viewBox="-14 -24 328 360" class="isl" aria-hidden="true">
<defs><clipPath id="rk${uid}"><path d="M14 108L286 108L256 150L266 172L228 206L236 226L192 256L174 292L150 306L132 282L108 258L76 232L82 208L48 178L56 156Z"/></clipPath>
<linearGradient id="fg${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${paper}"/><stop offset="1" stop-color="${paper}" stop-opacity="0"/></linearGradient></defs>
<g class="falls" stroke="url(#fg${uid})" stroke-width="2.2" fill="none"><path d="M14 112V330"/><path d="M19 112V318" style="animation-delay:-.4s"/><path d="M9 114V300" style="animation-delay:-.8s"/></g>
<path d="M14 108L286 108L256 150L266 172L228 206L236 226L192 256L174 292L150 306L132 282L108 258L76 232L82 208L48 178L56 156Z" fill="${paper}" ${S} stroke-width="2.2"/>
<g clip-path="url(#rk${uid})"><path d="M150 108L300 108L300 320L150 320Z" fill="url(#hd)"/><path d="M14 108L60 108L120 230L150 320L0 320Z" fill="url(#hl)"/>
<path d="M70 112L96 160L88 204M120 112L132 172L118 244M182 112L170 182L160 270M232 112L214 166L204 220M262 140L238 190" fill="none" ${S} stroke-width="1.2"/></g>
<path d="M150 306q-5 12 1 24M134 284q-8 10 -4 22M174 292q6 10 2 20" fill="none" ${S} stroke-width="1.2"/>
<g class="pebbles" fill="${paper}" ${S}><rect x="146" y="318" width="6" height="5"/><rect x="132" y="312" width="4" height="4" style="animation-delay:-1.3s"/><rect x="164" y="316" width="5" height="4" style="animation-delay:-2.2s"/></g>
<path d="M8 110Q150 72 292 110Q150 126 8 110Z" fill="${paper}" ${S} stroke-width="2"/>
<path d="M8 110Q150 126 292 110Q150 118 8 110Z" fill="url(#hd)"/>
${Array.from({length:22},(_,i)=>{const x=22+i*12.4,y=110-38*(1-Math.pow((x-150)/142,2))+2;return `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l2 -5l2 5" fill="none" ${S} stroke-width=".9"/>`}).join('')}
${pine(70,100,1)}${pine(92,96,.8)}${pine(222,97,.9)}${pine(246,102,.75)}
<rect x="138" y="36" width="24" height="60" fill="${paper}" ${S} stroke-width="1.8"/><rect x="150" y="36" width="12" height="60" fill="url(#hd)"/>
<rect x="145" y="52" width="9" height="12" fill="${ink}"/><path d="M144 96v-12a6 6 0 0 1 12 0v12" fill="${ink}"/>
<path d="M132 38L150 2L168 38Z" fill="${paper}" ${S} stroke-width="1.8"/><path d="M150 2L168 38L150 38Z" fill="url(#hx)"/>
<line x1="150" y1="2" x2="150" y2="-18" ${S} stroke-width="1.6"/><path class="pennant" d="M150 -18L170 -13L150 -8Z" fill="${brand}"/>
<path d="M182 92h18v-14l-9 -9l-9 9z" fill="${paper}" ${S} stroke-width="1.4"/><path d="M191 69l9 9v14h-9z" fill="url(#hd)"/>
</svg>`}

/* dirigible */
const airship=`<svg viewBox="0 0 420 230" class="ship-svg" aria-hidden="true"><g class="ship-bob">
<defs><clipPath id="env"><ellipse cx="210" cy="70" rx="160" ry="56"/></clipPath></defs>
<path d="M150 120L176 160M210 126L210 160M270 120L244 160M120 110L170 160M300 110L250 160" ${S} stroke-width="1.1"/>
<path d="M78 50L34 14L44 58Z M78 90L34 126L44 82Z" fill="url(#hx)" ${S} stroke-width="1.6"/>
<ellipse cx="210" cy="70" rx="160" ry="56" fill="${paper}" ${S} stroke-width="2.4"/>
<g clip-path="url(#env)"><path fill-rule="evenodd" d="M50 70a160 56 0 1 0 320 0a160 56 0 1 0 -320 0zM54 46a156 48 0 1 0 312 0a156 48 0 1 0 -312 0z" fill="url(#hd)"/>
<path fill-rule="evenodd" d="M50 70a160 56 0 1 0 320 0a160 56 0 1 0 -320 0zM56 34a154 50 0 1 0 308 0a154 50 0 1 0 -308 0z" fill="url(#hl)" opacity=".8"/>
${[-80,-40,40,80].map(k=>`<path d="M50 70Q210 ${70+k} 370 70" fill="none" ${S} stroke-width=".9" opacity=".7"/>`).join('')}
${[100,150,210,270,320].map(x=>{const h=56*Math.sqrt(1-Math.pow((x-210)/160,2));return `<ellipse cx="${x}" cy="70" rx="${(12*h/56).toFixed(1)}" ry="${h.toFixed(1)}" fill="none" ${S} stroke-width=".9"/>`}).join('')}</g>
<rect x="166" y="58" width="88" height="24" fill="${ink}"/><text x="210" y="76" text-anchor="middle" font-size="16" letter-spacing="5" fill="${paper}" font-family="Cormorant Garamond,serif" font-weight="600">NIMBO</text>
<circle cx="370" cy="70" r="5" fill="${ink}"/>
<path d="M164 160L256 160L246 188L174 188Z" fill="${paper}" ${S} stroke-width="1.8"/><path d="M210 160L256 160L246 188L210 188Z" fill="url(#hl)"/>
${[180,198,216,234].map(x=>`<rect x="${x}" y="166" width="10" height="9" fill="${ink}"/>`).join('')}
<line x1="164" y1="174" x2="150" y2="174" ${S} stroke-width="2"/><circle cx="148" cy="174" r="3" fill="${ink}"/>
<ellipse class="prop" cx="146" cy="174" rx="3.5" ry="17" fill="url(#hx)" ${S} stroke-width="1.2"/>
</g></svg>`;

/* emblemas por servicio */
const frame=(id,inner)=>`<svg viewBox="0 0 240 240" class="emblem" aria-hidden="true"><defs><clipPath id="${id}"><circle cx="120" cy="120" r="104"/></clipPath></defs>
<circle cx="120" cy="120" r="114" fill="${paper}" ${S} stroke-width="1.6"/><circle cx="120" cy="120" r="104" fill="none" ${S} stroke-width=".8"/>
<g clip-path="url(#${id})">${inner}</g></svg>`;
const waves=y=>Array.from({length:4},(_,k)=>`<path class="wave-x" d="M-120 ${y+k*10}${'q15 -6 30 0t30 0'.repeat(8)}" fill="none" ${S} stroke-width="1.1" style="animation-delay:${-k*.5}s"/>`).join('');
const E={
I:frame('em1',`<rect x="0" y="0" width="240" height="190" fill="url(#hl)" opacity=".35"/>
<g class="beam"><path d="M120 76L-30 30L-30 110Z" fill="url(#hl)"/><path d="M120 76L270 30L270 110Z" fill="url(#hl)"/></g>
${waves(192)}
<path d="M30 206Q60 172 100 174L146 172Q180 170 214 206L240 240L0 240Z" fill="url(#hx)" ${S} stroke-width="1.6"/>
<path d="M104 174L110 92L130 92L136 174Z" fill="${paper}" ${S} stroke-width="1.8"/><path d="M120 92L130 92L136 174L120 174Z" fill="url(#hl)"/>
<path d="M106 142L134 142L135 154L105 154Z M108.5 110L131.5 110L132.5 122L107.5 122Z" fill="url(#hd)" ${S} stroke-width=".8"/>
<rect x="102" y="86" width="36" height="6" fill="${paper}" ${S} stroke-width="1.4"/>
<rect x="110" y="68" width="20" height="18" fill="${paper}" ${S} stroke-width="1.4"/><circle class="glow" cx="120" cy="77" r="6" fill="${brand}"/><path d="M116 68v18M124 68v18" ${S}/>
<path d="M106 68L120 52L134 68Z" fill="url(#hx)" ${S} stroke-width="1.4"/>
<g style="color:${ink}">${bird(60,46,.7,0)}${bird(80,36,.55,.3)}${bird(186,52,.6,.15)}</g>`),
II:frame('em2',`<g class="cloud-x"><path d="M150 54q4-14 18-10q8-12 20 -2q14 0 12 12h-50z" fill="${paper}" ${S} stroke-width="1.2"/></g>
<path d="M-10 204Q120 150 250 204L250 250L-10 250Z" fill="url(#hl)" ${S} stroke-width="1.4"/>
<path d="M96 198L104 104L136 104L144 198Z" fill="${paper}" ${S} stroke-width="1.8"/><path d="M120 104L136 104L144 198L120 198Z" fill="url(#hd)"/>
<path d="M112 198v-18a8 8 0 0 1 16 0v18" fill="${ink}"/><rect x="114" y="132" width="10" height="12" fill="${ink}"/>
<path d="M98 106Q120 74 142 106Z" fill="url(#hx)" ${S} stroke-width="1.6"/>
<g class="sails">${[0,90,180,270].map(a=>`<g transform="rotate(${a} 120 90)"><rect x="126" y="83" width="80" height="14" fill="url(#hx)" ${S} stroke-width="1.3"/><line x1="120" y1="90" x2="206" y2="90" ${S} stroke-width="1.6"/></g>`).join('')}<circle cx="120" cy="90" r="6" fill="${ink}"/></g>
<g><path class="spin" d="${gearP(56,196,22,10)}" fill="url(#hx)" ${S} stroke-width="1.4"/><circle cx="56" cy="196" r="6" fill="${paper}" ${S}/>
<path class="spin rev" d="${gearP(86,214,14,8)}" fill="url(#hd)" ${S} stroke-width="1.3"/><circle cx="86" cy="214" r="4" fill="${paper}" ${S}/></g>`),
III:frame('em3',`<g class="cloud-x"><path d="M30 70q4-14 18-10q8-12 20 -2q14 0 12 12h-50z" fill="${paper}" ${S} stroke-width="1.2"/></g>
<g class="cloud-x" style="animation-delay:-6s"><path d="M150 190q4-12 16-9q7-10 18 -2q12 0 10 11h-44z" fill="${paper}" ${S} stroke-width="1.2"/></g>
<g class="bob">
<path d="M72 124L36 104L40 122L32 142Z" fill="url(#hx)" ${S} stroke-width="1.4"/>
<path class="wing2" d="M120 112Q100 70 70 72Q92 90 96 110Z" fill="url(#hd)" ${S} stroke-width="1.2"/>
<path d="M70 124Q96 100 150 104Q172 106 178 118Q160 138 116 140Q84 140 70 124Z" fill="${paper}" ${S} stroke-width="1.8"/>
<path d="M84 132Q116 142 160 128Q140 140 116 140Q96 140 84 132Z" fill="url(#hl)"/>
<circle cx="172" cy="102" r="15" fill="${paper}" ${S} stroke-width="1.8"/><circle cx="176" cy="99" r="2.8" fill="${ink}"/>
<path d="M186 99L203 104L186 109Z" fill="${paper}" ${S} stroke-width="1.4"/>
<path class="wing" d="M122 114Q102 50 46 56Q78 80 84 104Q102 120 122 120Z" fill="${paper}" ${S} stroke-width="1.8"/>
<path class="wing" d="M118 112L70 64M114 114L60 74M110 116L64 90" fill="none" ${S} stroke-width=".9"/>
<path d="M112 138l-4 12M124 138v12" ${S} stroke-width="1.6"/>
<g class="swing"><line x1="118" y1="150" x2="118" y2="162" ${S} stroke-width="1.2"/><rect x="94" y="162" width="48" height="32" fill="${paper}" ${S} stroke-width="1.6"/><path d="M94 162l24 18l24 -18" fill="none" ${S} stroke-width="1.4"/><circle cx="118" cy="182" r="4.5" fill="${brand}"/></g>
</g>`),
IV:frame('em4',`<rect x="0" y="0" width="240" height="160" fill="url(#hl)" opacity=".45"/>
<path d="M60 40a20 20 0 1 0 18 28a16 16 0 1 1 -18 -28z" fill="${paper}" ${S} stroke-width="1.4"/>
<path d="M150 40L176 58L196 46L210 70" fill="none" ${S} stroke-width=".9" class="draw-loop"/>
${[[150,40,5],[176,58,4],[196,46,5],[210,70,4],[104,30,3],[36,110,3],[200,110,3]].map(([x,y,r],i)=>`<path class="twinkle" style="animation-delay:${i*.37}s" d="M${x} ${y-r*1.6}Q${x} ${y} ${x+r*1.6} ${y}Q${x} ${y} ${x} ${y+r*1.6}Q${x} ${y} ${x-r*1.6} ${y}Q${x} ${y} ${x} ${y-r*1.6}z" fill="${ink}"/>`).join('')}
<path d="M-10 210Q120 168 250 210L250 250L-10 250Z" fill="url(#hx)" ${S} stroke-width="1.4"/>
<rect x="72" y="150" width="96" height="46" fill="${paper}" ${S} stroke-width="1.8"/><rect x="120" y="150" width="48" height="46" fill="url(#hd)"/>
<path d="M112 196v-14a8 8 0 0 1 16 0v14" fill="${ink}"/>
<g class="scope"><rect x="113" y="66" width="16" height="70" fill="${paper}" ${S} stroke-width="1.6"/><rect x="113" y="84" width="16" height="8" fill="url(#hd)"/><rect x="110" y="62" width="22" height="8" fill="${ink}"/></g>
<path d="M72 150A48 48 0 0 1 168 150Z" fill="${paper}" ${S} stroke-width="1.8"/><path d="M120 102A48 48 0 0 1 168 150L120 150Z" fill="url(#hx)"/>
<path d="M96 150A24 48 0 0 1 120 102M144 150A24 48 0 0 0 120 102" fill="none" ${S} stroke-width=".9"/>`),
V:frame('em5',`<circle cx="120" cy="96" r="78" fill="url(#hl)" opacity=".5"/>
<path d="M-10 200Q120 176 250 204" fill="none" ${S} stroke-width="9" stroke-linecap="round"/><path d="M-10 200Q120 176 250 204" fill="none" stroke="${paper}" stroke-width="3" stroke-dasharray="2 9"/>
<path d="M200 198q16 -18 34 -8q-14 18 -34 8z M26 196q-14 -18 -30 -8q12 18 30 8z" fill="url(#hx)" ${S} stroke-width="1.2"/>
<path d="M76 196Q58 150 72 112Q80 72 120 70Q160 72 168 112Q182 150 164 196Z" fill="${paper}" ${S} stroke-width="1.8"/>
<path d="M76 122Q62 162 82 196L94 190Q84 160 90 126Z M164 122Q178 162 158 196L146 190Q156 160 150 126Z" fill="url(#hd)" ${S} stroke-width="1.2"/>
<path d="M82 88L70 50L100 76Z M158 88L170 50L140 76Z" fill="url(#hx)" ${S} stroke-width="1.4"/>
${[0,1,2,3,4].map(r=>Array.from({length:5},(_,c)=>`<path d="M${96+c*10+(r%2)*5} ${146+r*9}l5 4l5 -4" fill="none" ${S} stroke-width=".9"/>`).join('')).join('')}
<circle cx="100" cy="110" r="25" fill="${paper}" ${S} stroke-width="1.4"/><circle cx="140" cy="110" r="25" fill="${paper}" ${S} stroke-width="1.4"/>
${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{const a=i*Math.PI/6;return `<path d="M${(100+17*Math.cos(a)).toFixed(1)} ${(110+17*Math.sin(a)).toFixed(1)}L${(100+24*Math.cos(a)).toFixed(1)} ${(110+24*Math.sin(a)).toFixed(1)}M${(140+17*Math.cos(a)).toFixed(1)} ${(110+17*Math.sin(a)).toFixed(1)}L${(140+24*Math.cos(a)).toFixed(1)} ${(110+24*Math.sin(a)).toFixed(1)}" ${S} stroke-width=".8"/>`}).join('')}
<circle cx="100" cy="110" r="14" fill="${paper}" ${S} stroke-width="2"/><circle cx="140" cy="110" r="14" fill="${paper}" ${S} stroke-width="2"/>
<g class="pupil"><circle cx="100" cy="110" r="8" fill="${brand}"/><circle cx="100" cy="110" r="5" fill="${ink}"/><circle cx="98" cy="107" r="1.6" fill="#fff"/></g>
<g class="pupil"><circle cx="140" cy="110" r="8" fill="${brand}"/><circle cx="140" cy="110" r="5" fill="${ink}"/><circle cx="138" cy="107" r="1.6" fill="#fff"/></g>
<circle class="lid" cx="100" cy="110" r="14.5" fill="${paper}" ${S} stroke-width="2"/><circle class="lid" cx="140" cy="110" r="14.5" fill="${paper}" ${S} stroke-width="2"/>
<path d="M114 124L120 138L126 124Z" fill="${ink}"/>
<path d="M104 196l-4 8M110 196v9M130 196v9M136 196l4 8" ${S} stroke-width="2"/>`)
};
function gearP(cx,cy,r,n){const ri=r*.78,st=2*Math.PI/n;let d='';for(let i=0;i<n;i++){const a=i*st;[[ri,a],[r,a+st*.18],[r,a+st*.48],[ri,a+st*.66]].forEach(([rr,aa],k)=>{d+=(i||k?'L':'M')+(cx+rr*Math.cos(aa)).toFixed(1)+','+(cy+rr*Math.sin(aa)).toFixed(1)})}return d+'Z'}
return {island,airship,E,flock};
})();


export default FX;
