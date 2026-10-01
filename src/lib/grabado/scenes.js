/* Escenas animadas de cada caso de uso + capítulos de servicios (SVG). */
/* eslint-disable */
import FX from './fx.js'
const ink='#262489',brand='#6665ff',paper='#f3ead7';
const D=d=>`style="--d:${d}s"`;
const T=(x,y,str,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||14}"${o.a?` text-anchor="${o.a}"`:''}${o.f?` fill="${o.f}"`:''}${o.w?` font-weight="${o.w}"`:''}${o.i?' font-style="italic"':''}${o.ls?` letter-spacing="${o.ls}"`:''}>${str}</text>`;
function phone(x,y,title){return `<g class="rise" ${D(.15)}>
  <rect x="${x}" y="${y}" width="220" height="380" rx="28" fill="${paper}" stroke="${ink}" stroke-width="2.5"/>
  <rect x="${x+12}" y="${y+40}" width="196" height="300" rx="3" fill="${paper}" stroke="${ink}"/>
  <rect x="${x+85}" y="${y+16}" width="50" height="8" rx="4" fill="${ink}"/>
  <rect x="${x+12}" y="${y+40}" width="196" height="40" fill="${ink}"/>
  <circle cx="${x+34}" cy="${y+60}" r="10" fill="${paper}"/>
  ${T(x+52,y+65,title,{f:paper,s:14})}
  <line x1="${x+80}" y1="${y+362}" x2="${x+140}" y2="${y+362}" stroke="${ink}" stroke-width="3" stroke-linecap="round"/></g>`}
function bubble(x,y,w,lines,out,d){const h=16+lines.length*19,X=out?x-w:x;
  return `<g class="pop" ${D(d)}><rect x="${X}" y="${y}" width="${w}" height="${h}" rx="10" fill="${out?ink:paper}" stroke="${ink}" stroke-width="1.4"/>
  ${lines.map((l,i)=>T(X+12,y+23+i*19,l,{s:13.5,f:out?paper:ink})).join('')}</g>`}
function stamp(cx,cy,w,label,d){return `<g class="stamp" ${D(d)}><rect x="${cx-w/2}" y="${cy-22}" width="${w}" height="44" rx="3" fill="none" stroke="${brand}" stroke-width="2.6"/>
  <rect x="${cx-w/2+5}" y="${cy-17}" width="${w-10}" height="34" fill="none" stroke="${brand}" stroke-width="1"/>${T(cx,cy+6,label,{a:'middle',f:brand,s:16,ls:3,w:600})}</g>`}
function gear(cx,cy,r,n){const ri=r*.8,st=2*Math.PI/n;let d='';for(let i=0;i<n;i++){const a=i*st,p=[[ri,a],[r,a+st*.18],[r,a+st*.48],[ri,a+st*.66]];
  p.forEach(([rr,aa],k)=>{d+=(i||k?'L':'M')+(cx+rr*Math.cos(aa)).toFixed(1)+','+(cy+rr*Math.sin(aa)).toFixed(1)})}return d+'Z'}

/* --- escena: tienda online --- */
const webScene=`
<rect x="90" y="56" width="620" height="388" rx="10" fill="${paper}" stroke="${ink}" stroke-width="2.2" class="draw" pathLength="1"/>
<line x1="90" y1="94" x2="710" y2="94" stroke="${ink}" class="draw" pathLength="1" ${D(.3)}/>
<g class="fade" ${D(.4)}><circle cx="112" cy="75" r="5" fill="${ink}"/><circle cx="128" cy="75" r="5" fill="none" stroke="${ink}"/><circle cx="144" cy="75" r="5" fill="none" stroke="${ink}"/>
<rect x="175" y="65" width="300" height="20" rx="10" fill="none" stroke="${ink}"/>${T(192,80,'tunegocio.com.ar',{s:12.5,i:1})}
<path d="M660 68h8l6 16h18l4-11h-26" fill="none" stroke="${ink}" stroke-width="1.8"/><circle cx="678" cy="89" r="2.5" fill="${ink}"/><circle cx="690" cy="89" r="2.5" fill="${ink}"/></g>
<g class="pop" ${D(3.05)}><circle cx="700" cy="66" r="10" fill="${brand}"/>${T(700,71,'1',{a:'middle',f:'#fff',s:13,w:600})}</g>
<g class="fade" ${D(.6)}><rect x="110" y="110" width="580" height="88" fill="url(#hl)"/><rect x="128" y="126" width="250" height="56" fill="${paper}" stroke="${ink}"/>
${T(144,152,'Nueva colección',{s:22,w:500})}${T(144,172,'Envíos a todo el país',{s:12.5,i:1})}</g>
${[0,1,2].map(i=>{const x=110+i*197;return `<g class="pop" ${D(.85+i*.18)}><rect x="${x}" y="214" width="186" height="210" fill="${paper}" stroke="${ink}"/>
<rect x="${x+10}" y="224" width="166" height="98" fill="url(${i==1?'#hd':'#hx'})" stroke="${ink}" stroke-width=".8"/>
<line x1="${x+12}" y1="342" x2="${x+120}" y2="342" stroke="${ink}" stroke-width="2"/>${T(x+12,366,['$ 12.900','$ 18.500','$ 9.700'][i],{s:15,w:600})}
<rect x="${x+12}" y="380" width="162" height="30" rx="2" fill="${i==1?ink:'none'}" stroke="${ink}"/>${T(x+93,400,'Comprar',{a:'middle',s:13.5,f:i==1?paper:ink})}</g>`}).join('')}
<circle cx="400" cy="395" r="22" fill="none" stroke="${brand}" stroke-width="2.5" class="ripple" ${D(2.85)}/>
<g class="cursor" ${D(1.5)}><path d="M398 392l0 30 8-7 6 13 6-3-6-12 11-1z" fill="${paper}" stroke="${ink}" stroke-width="1.6" stroke-linejoin="round"/></g>
<g class="rise" ${D(3.3)}><rect x="560" y="104" width="138" height="34" fill="${ink}"/>${T(629,126,'+1 pedido nuevo ✓',{a:'middle',f:paper,s:14})}</g>`;

/* --- escena: recordatorios de turnos --- */
const cal=(()=>{const x=60,y=96,w=322,h=310,cw=w/7,rh=(h-58)/5;let g='',nums='';
  for(let i=1;i<7;i++)g+=`M${(x+cw*i).toFixed(1)} ${y+58}V${y+h}`;for(let j=1;j<5;j++)g+=`M${x} ${(y+58+rh*j).toFixed(1)}H${x+w}`;
  for(let d=1;d<=31;d++){const k=d+2,c=k%7,r=k/7|0;if(r>4)continue;nums+=T(x+cw*c+8,y+58+rh*r+19,d,{s:13})}
  const k=18,cx=x+cw*(k%7)+cw/2,cy=y+58+rh*(k/7|0)+rh/2;
  return {cx,cy,svg:`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${paper}" stroke="${ink}" stroke-width="2.2" class="draw" pathLength="1"/>
  <g class="fade" ${D(.3)}><rect x="${x}" y="${y}" width="${w}" height="58" rx="6" fill="${ink}"/>${T(x+w/2,y+37,'OCTUBRE',{a:'middle',f:paper,s:18,ls:6})}
  <rect x="${x+50}" y="${y-14}" width="10" height="28" rx="4" fill="${paper}" stroke="${ink}" stroke-width="2"/><rect x="${x+w-60}" y="${y-14}" width="10" height="28" rx="4" fill="${paper}" stroke="${ink}" stroke-width="2"/></g>
  <path d="${g}" stroke="${ink}" stroke-width=".8" fill="none" class="draw" pathLength="1" ${D(.35)}/><g class="fade" ${D(.7)}>${nums}</g>
  <rect x="${cx-cw/2+4}" y="${cy-rh/2+4}" width="${cw-8}" height="${rh-8}" fill="url(#hd)" class="fade" ${D(1)}/>
  <ellipse cx="${cx}" cy="${cy}" rx="${cw*.62}" ry="${rh*.55}" fill="none" stroke="${brand}" stroke-width="3" class="draw" pathLength="1" ${D(1.05)}/>`}})();
const turnosScene=`${cal.svg}
<path d="M${cal.cx+30} ${cal.cy-8}C430 ${cal.cy-60},460 190,512 196" fill="none" stroke="${ink}" stroke-width="1.6" class="draw" pathLength="1" ${D(1.35)}/>
${phone(500,60,'Nimbo · Turnos')}
${bubble(522,158,182,['¡Hola Ana! Te recordamos','tu turno: mañana 10 hs.','¿Confirmás?'],false,1.75)}
${bubble(700,248,108,['Confirmo ✓'],true,2.7)}
${stamp(610,338,150,'CONFIRMADO',3.3)}`;

/* --- escena: facturación automática --- */
const factScene=`
<g class="rise" ${D(.15)}><path d="M60 140h170v200l-14 10-14-10-14 10-14-10-14 10-14-10-14 10-14-10-14 10-14-10-14 10-14-10-14 10z" fill="${paper}" stroke="${ink}" stroke-width="2"/>
${T(145,170,'VENTA Nº 1043',{a:'middle',s:13,ls:2})}<line x1="76" y1="182" x2="214" y2="182" stroke="${ink}" stroke-dasharray="3 3"/>
${T(78,206,'Remera lino ×2',{s:13})}${T(212,206,'$ 31.000',{a:'end',s:13})}${T(78,228,'Gorra ×1',{s:13})}${T(212,228,'$ 17.500',{a:'end',s:13})}
<line x1="76" y1="246" x2="214" y2="246" stroke="${ink}"/>${T(78,272,'Total',{s:15,w:600})}${T(212,272,'$ 48.500',{a:'end',s:15,w:600})}
<rect x="78" y="290" width="134" height="26" fill="url(#hx)"/></g>
<path d="M245 245H320" stroke="${ink}" stroke-width="1.8" class="draw" pathLength="1" ${D(.75)}/>
<g class="pop" ${D(.85)}><path class="spin" d="${gear(385,250,56,12)}" fill="url(#hx)" stroke="${ink}" stroke-width="1.8"/><circle cx="385" cy="250" r="14" fill="${paper}" stroke="${ink}" stroke-width="1.8"/>
<path class="spin rev" d="${gear(462,196,33,8)}" fill="url(#hd)" stroke="${ink}" stroke-width="1.8"/><circle cx="462" cy="196" r="8" fill="${paper}" stroke="${ink}" stroke-width="1.6"/></g>
<path d="M448 250H540" stroke="${ink}" stroke-width="1.8" class="draw" pathLength="1" ${D(1.05)}/>
<g clip-path="url(#printClip)"><g class="print" ${D(1.3)}><rect x="578" y="192" width="134" height="214" fill="${paper}" stroke="${ink}" stroke-width="1.6"/>
${T(645,222,'FACTURA C',{a:'middle',s:15,ls:2,w:600})}<line x1="592" y1="234" x2="698" y2="234" stroke="${ink}"/>
${[252,270,288,306].map((y,i)=>`<line x1="592" y1="${y}" x2="${[690,668,684,650][i]}" y2="${y}" stroke="${ink}" stroke-width="2.2" opacity=".55"/>`).join('')}
<line x1="592" y1="330" x2="698" y2="330" stroke="${ink}"/>${T(592,356,'Total',{s:14})}${T(698,356,'$ 48.500',{a:'end',s:14,w:600})}
<rect x="592" y="370" width="106" height="22" fill="url(#hl)"/></g></g>
<g class="rise" ${D(.5)}><rect x="550" y="128" width="190" height="66" rx="8" fill="${paper}" stroke="${ink}" stroke-width="2.2"/><rect x="550" y="128" width="190" height="22" rx="8" fill="url(#hl)"/>
<line x1="566" y1="192" x2="724" y2="192" stroke="${ink}" stroke-width="4"/><circle cx="720" cy="170" r="5" fill="${brand}"/></g>
${stamp(645,300,124,'ENVIADA',3.2)}
<g class="fly" ${D(3.6)}><rect x="600" y="300" width="58" height="40" fill="${paper}" stroke="${ink}" stroke-width="1.8"/><path d="M600 300l29 22 29-22" fill="none" stroke="${ink}" stroke-width="1.8"/></g>
<g class="fade" ${D(4.6)}>${T(722,56,'a tu cliente, por mail ✓',{a:'end',s:14,i:1})}</g>`;

/* --- escena: atención 24/7 --- */
const nightScene=`
<g class="pop" ${D(.2)}><path d="M250 110a95 95 0 1 0 60 170a78 78 0 1 1-60-170z" fill="url(#hx)" stroke="${ink}" stroke-width="2"/></g>
${[[110,120,9],[350,110,7],[330,300,6],[90,250,6],[380,200,5]].map(([x,y,r],i)=>`<path class="pop" ${D(.45+i*.12)} d="M${x} ${y-r}Q${x} ${y} ${x+r} ${y}Q${x} ${y} ${x} ${y+r}Q${x} ${y} ${x-r} ${y}Q${x} ${y} ${x} ${y-r}z" fill="${ink}"/>`).join('')}
<g class="rise" ${D(.7)}>${T(225,380,'03:12',{a:'middle',s:54,w:500})}${T(225,410,'vos dormís, Nimbo responde',{a:'middle',s:15,i:1})}</g>
${phone(500,60,'Tu negocio · en línea')}
${bubble(700,154,186,['¿Tienen turno el jueves?'],true,.9)}
<g class="typing" ${D(1.45)}><rect x="522" y="202" width="58" height="30" rx="10" fill="${paper}" stroke="${ink}" stroke-width="1.4"/><circle cx="538" cy="217" r="3.5" fill="${ink}"/><circle cx="551" cy="217" r="3.5" fill="${ink}"/><circle cx="564" cy="217" r="3.5" fill="${ink}"/></g>
${bubble(522,202,162,['¡Sí! Jueves 15 hs.','¿Te lo reservo?'],false,2.45)}
${bubble(700,274,74,['¡Dale!'],true,3.2)}
${bubble(522,320,170,['Listo, reservado ✓'],false,3.85)}`;

/* --- escena: agente de voz --- */
const LOGO2="M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z";
const voiceScene=`
<g class="pop" ${D(.2)}><circle cx="160" cy="210" r="78" fill="${paper}" stroke="${ink}" stroke-width="2"/>
<g transform="translate(112 160) scale(4.2)"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="url(#hd)" stroke="${ink}" stroke-width=".45"/></g></g>
<path d="M255 160a70 70 0 0 1 0 100M275 140a98 98 0 0 1 0 140" fill="none" stroke="${ink}" stroke-width="1.6" class="draw" pathLength="1" ${D(.6)}/>
<g class="fade" ${D(.9)}>${Array.from({length:23},(_,i)=>{const h=[22,46,30,70,40,90,56,34,80,60,100,72,44,88,50,66,30,76,42,58,26,40,18][i];return `<rect class="wave" style="animation-delay:${(i%7)*.11}s" x="${300+i*10}" y="${210-h/2}" width="5" height="${h}" rx="2.5" fill="${i%3?ink:brand}"/>`}).join('')}</g>
<g class="pop" ${D(1.1)}><circle cx="650" cy="210" r="78" fill="${ink}"/><path d="${LOGO2}" transform="translate(604 186) scale(.245)" fill="url(#hlp)" stroke="${paper}" stroke-width="8"/></g>
<g class="fade" ${D(1)}>${T(400,120,'Llamada entrante · 0:47',{a:'middle',s:14,ls:2})}</g>
<g class="rise" ${D(2.1)}><rect x="160" y="330" width="480" height="92" fill="${paper}" stroke="${ink}" stroke-width="1.6"/><rect x="166" y="336" width="468" height="80" fill="none" stroke="${ink}" stroke-width=".6"/>
${T(400,368,'“Te agendé el martes a las 10. ¿Te mando',{a:'middle',s:17,i:1})}${T(400,394,'la confirmación por WhatsApp?”',{a:'middle',s:17,i:1})}</g>
${stamp(560,438,170,'TURNO AGENDADO',3.3)}`;

/* --- escena: tablero + alertas --- */
const H=[90,122,104,150,178,214];
const pts=H.map((h,i)=>[128+i*60,400-h-20]);
const dataScene=`
<rect x="66" y="66" width="440" height="368" rx="8" fill="${paper}" stroke="${ink}" stroke-width="2.2" class="draw" pathLength="1"/>
<g class="fade" ${D(.3)}>${T(92,102,'VENTAS · ÚLTIMOS 6 MESES',{s:12.5,ls:2})}</g>
<g class="fade" ${D(.45)}><text x="92" y="142" font-size="32" font-weight="500" data-count="1240000" data-prefix="$ ">$ 0</text>${T(300,142,'▲ 18%',{s:15,f:brand,w:600})}</g>
<line x1="92" y1="400" x2="482" y2="400" stroke="${ink}" stroke-width="1.6" class="draw" pathLength="1" ${D(.4)}/>
${H.map((h,i)=>`<rect class="grow" ${D(.6+i*.12)} x="${110+i*60}" y="${400-h}" width="36" height="${h}" fill="url(${i%2?'#hd':'#hx'})" stroke="${ink}" stroke-width="1.4"/>`).join('')}
${['may','jun','jul','ago','sep','oct'].map((m,i)=>T(128+i*60,420,m,{a:'middle',s:12.5,i:1})).join('')}
<path d="M${pts.map(p=>p.join(' ')).join('L')}" fill="none" stroke="${brand}" stroke-width="3" stroke-linejoin="round" class="draw" pathLength="1" ${D(1.5)}/>
${pts.map((p,i)=>`<circle class="pop" ${D(1.6+i*.12)} cx="${p[0]}" cy="${p[1]}" r="5" fill="${paper}" stroke="${brand}" stroke-width="2.5"/>`).join('')}
<g class="rise" ${D(2.5)}><rect x="532" y="140" width="214" height="118" rx="6" fill="${paper}" stroke="${ink}" stroke-width="2"/><rect x="532" y="140" width="8" height="118" fill="${brand}"/>
<g class="bell"><path d="M566 196c0-14 6-22 16-22s16 8 16 22l4 6h-40z" fill="url(#hd)" stroke="${ink}" stroke-width="1.6"/><circle cx="582" cy="206" r="4" fill="${ink}"/></g>
${T(612,182,'Alerta de stock',{s:16,w:600})}${T(612,204,'Yerba 1 kg',{s:14})}${T(612,226,'quedan 3 unidades',{s:14,i:1,f:brand})}${T(552,246,'',{s:1})}</g>
<g class="rise" ${D(3.2)}><rect x="532" y="282" width="214" height="96" rx="6" fill="${paper}" stroke="${ink}" stroke-width="2"/>
<rect x="552" y="304" width="44" height="32" fill="${paper}" stroke="${ink}" stroke-width="1.6"/><path d="M552 304l22 16 22-16" fill="none" stroke="${ink}" stroke-width="1.6"/>
${T(612,316,'Reporte semanal',{s:16,w:600})}${T(612,340,'enviado a tu mail ✓',{s:14,i:1})}</g>`;


/* --- escena: web rápida + Google --- */
const seoScene=`
<g class="rise" ${D(.1)}><circle cx="200" cy="300" r="150" fill="none" stroke="${ink}" stroke-width="1" opacity=".4"/></g>
<path d="M70 300A130 130 0 0 1 330 300" fill="none" stroke="${ink}" stroke-width="16" opacity=".15"/>
<path d="M70 300A130 130 0 0 1 330 300" fill="none" stroke="url(#hd)" stroke-width="16" class="draw" pathLength="1" ${D(.3)}/>
<path d="M70 300A130 130 0 0 1 329 291" fill="none" stroke="${brand}" stroke-width="5" class="draw" pathLength="1" ${D(.5)}/>
${[0,1,2,3,4,5,6,7,8,9,10].map(i=>{const a=Math.PI+i*Math.PI/10,x1=200+112*Math.cos(a),y1=300+112*Math.sin(a),x2=200+100*Math.cos(a),y2=300+100*Math.sin(a);return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${ink}" stroke-width="1.5"/>`}).join('')}
<g class="needle" ${D(.5)}><line x1="200" y1="300" x2="200" y2="196" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="200" cy="300" r="10" fill="${ink}"/></g>
<g class="fade" ${D(.6)}><text x="200" y="360" text-anchor="middle" font-size="46" font-weight="500" data-count="98">0</text>${T(200,388,'velocidad en el celular',{a:'middle',s:14,i:1})}</g>
<g class="rise" ${D(.4)}><rect x="420" y="70" width="320" height="44" rx="22" fill="${paper}" stroke="${ink}" stroke-width="1.6"/><circle cx="446" cy="90" r="8" fill="none" stroke="${ink}" stroke-width="2"/><line x1="452" y1="96" x2="458" y2="102" stroke="${ink}" stroke-width="2"/>${T(470,97,'peluquería en palermo',{s:15,i:1})}</g>
${[['Peluquería Estilo','estilo-pelu.com',0],['Salón Bella','salonbella.com.ar',1],['tunegocio.com.ar','★ 4,9 · Reservá online',2]].map(([t,u,k])=>`<g class="${k==2?'climb':'sink'}" ${D(2.2)}><rect x="420" y="${140+k*92}" width="320" height="78" fill="${paper}" stroke="${k==2?brand:ink}" stroke-width="${k==2?2.5:1}"/>
${T(438,166+k*92,t,{s:17,w:k==2?600:500})}${T(438,190+k*92,u,{s:13.5,i:1,f:k==2?brand:ink})}<line x1="438" y1="${202+k*92}" x2="${k==2?700:660}" y2="${202+k*92}" stroke="${ink}" stroke-width="2" opacity=".3"/></g>`).join('')}
<g class="pop" ${D(3)}><rect x="640" y="146" width="88" height="24" fill="${brand}"/>${T(684,163,'Nº 1 ✓',{a:'middle',s:13.5,f:'#fff',w:600})}</g>`;

/* --- escena: previsión de demanda --- */
const hist=[[90,330],[140,318],[190,326],[240,300],[290,306],[340,282],[390,288],[440,262]];
const fc=[[490,250],[540,232],[590,224],[640,206],[690,196]];
const forecastScene=`
<rect x="60" y="56" width="680" height="380" rx="8" fill="${paper}" stroke="${ink}" stroke-width="2.2" class="draw" pathLength="1"/>
<g class="fade" ${D(.3)}>${T(86,92,'DEMANDA · YERBA 1 KG',{s:12.5,ls:2})}</g>
<line x1="86" y1="390" x2="714" y2="390" stroke="${ink}" stroke-width="1.5" class="draw" pathLength="1" ${D(.3)}/>
<path d="M440 262${fc.map(p=>`L${p[0]} ${(p[1]-6-(p[0]-440)*.12).toFixed(1)}`).join('')}${fc.slice().reverse().map(p=>`L${p[0]} ${(p[1]+6+(p[0]-440)*.12).toFixed(1)}`).join('')}Z" fill="url(#hx)" opacity=".5" class="fade" ${D(1.6)}/>
<path d="M${hist.map(p=>p.join(' ')).join('L')}" fill="none" stroke="${ink}" stroke-width="3" stroke-linejoin="round" class="draw" pathLength="1" ${D(.6)}/>
${fc.map((p,i)=>`<circle class="pop" ${D(1.9+i*.15)} cx="${p[0]}" cy="${p[1]}" r="5" fill="${brand}"/>`).join('')}
<line x1="440" y1="110" x2="440" y2="390" stroke="${ink}" stroke-width="1" class="draw" pathLength="1" ${D(1.2)}/>
<g class="fade" ${D(1.3)}>${T(448,124,'hoy',{s:13.5,i:1})}${T(600,124,'previsión',{s:13.5,i:1,f:brand})}</g>
<g class="rise" ${D(3)}><rect x="96" y="120" width="250" height="78" fill="${ink}"/>${T(112,150,'Sugerencia',{s:13,f:paper,ls:2})}${T(112,178,'Pedí 120 u. antes del 15/11',{s:16,f:paper,w:500})}</g>`;

/* --- visión por computadora: conteo --- */
function person(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-74" r="13" fill="url(#hd)" stroke="${ink}" stroke-width="1.6"/>
<path d="M-20 -54q20-8 40 0l6 46h-10l-3 50h-26l-3-50h-10z" fill="url(#hx)" stroke="${ink}" stroke-width="1.6"/></g>`}
const countScene=`
<line x1="40" y1="400" x2="760" y2="400" stroke="${ink}" stroke-width="2" class="draw" pathLength="1"/>
<rect x="40" y="400" width="720" height="40" fill="url(#hl)" class="fade" ${D(.2)}/>
<g class="fade" ${D(.3)}><rect x="300" y="120" width="200" height="280" fill="none" stroke="${ink}" stroke-width="2.4"/><rect x="286" y="104" width="228" height="16" fill="url(#hd)" stroke="${ink}"/>${T(400,99,'ENTRADA',{a:'middle',s:13,ls:4})}</g>
<path d="M118 92L230 400H600Z" fill="url(#hl)" opacity=".35" class="fade" ${D(.6)}/>
<g class="pop" ${D(.4)}><rect x="84" y="62" width="64" height="34" rx="5" fill="${ink}" transform="rotate(20 116 79)"/><circle cx="132" cy="90" r="11" fill="${paper}" stroke="${ink}" stroke-width="2"/><circle cx="132" cy="90" r="4" fill="${brand}"/><line x1="70" y1="40" x2="96" y2="64" stroke="${ink}" stroke-width="4"/></g>
<line x1="400" y1="150" x2="400" y2="400" stroke="${brand}" stroke-width="2.5" stroke-dasharray="7 6" class="fade" ${D(.9)}/>
${[0,1,2].map(i=>`<g class="walker" style="animation-delay:${-i*2.2}s"><g transform="translate(0 0)">${person(150,398)}
<rect x="122" y="294" width="56" height="108" fill="none" stroke="${brand}" stroke-width="2"/><rect x="122" y="278" width="72" height="16" fill="${brand}"/>${T(126,290,'persona 97%',{s:10.5,f:'#fff'})}</g></g>`).join('')}
<g class="rise" ${D(1.1)}><rect x="560" y="60" width="190" height="104" fill="${paper}" stroke="${ink}" stroke-width="2"/><rect x="566" y="66" width="178" height="92" fill="none" stroke="${ink}" stroke-width=".6"/>
${T(655,92,'ENTRARON HOY',{a:'middle',s:12,ls:3})}<text x="655" y="140" text-anchor="middle" font-size="44" font-weight="500" data-tick="245">245</text></g>`;

/* --- visión por computadora: tracking --- */
const plan=`<rect x="70" y="56" width="660" height="380" fill="${paper}" stroke="${ink}" stroke-width="3" class="draw" pathLength="1"/>
<g class="fade" ${D(.3)}><line x1="70" y1="380" x2="70" y2="436" stroke="${paper}" stroke-width="5"/>${T(78,428,'entrada',{s:12,i:1})}
${[0,1,2,3].map(i=>`<rect x="${170+i*130}" y="110" width="44" height="220" fill="url(${i%2?'#hd':'#hx'})" stroke="${ink}" stroke-width="1.4"/>`).join('')}
<rect x="600" y="370" width="110" height="46" fill="url(#hl)" stroke="${ink}" stroke-width="1.4"/>${T(655,398,'caja',{a:'middle',s:13,i:1})}</g>`;
const routes=['M80 410C140 400,150 360,140 300S150 120,250 90S280 300,370 340S520 300,520 220S560 90,640 120S650 330,640 360',
  'M80 410C180 420,250 380,280 300S300 110,410 120S470 360,560 350S700 300,690 200',
  'M80 410C120 380,220 360,330 380S470 250,470 180S560 60,600 150S600 390,660 390'];
const trackScene=`${plan}
${routes.map((r,i)=>`<path d="${r}" fill="none" stroke="${i==1?brand:ink}" stroke-width="1.6" opacity=".55" class="draw" pathLength="1" ${D(.8+i*.25)}/>`).join('')}
${routes.map((r,i)=>`<g class="fade" ${D(1.4+i*.2)}><g><animateMotion dur="${9+i*2.5}s" repeatCount="indefinite" path="${r}" begin="${-i*2}s"/>
<rect x="-15" y="-15" width="30" height="30" fill="none" stroke="${brand}" stroke-width="2"/><circle r="8" fill="${i==1?brand:ink}"/>
<rect x="-15" y="-33" width="${i==1?78:60}" height="16" fill="${ink}"/>${T(-11,-21,['#07 · 2m','#12 · 6m','#15 · 1m'][i],{s:11,f:paper})}</g></g>`).join('')}
<g class="rise" ${D(1.8)}><rect x="530" y="66" width="190" height="34" fill="${ink}"/>${T(625,88,'3 personas en el local',{a:'middle',s:14,f:paper})}</g>`;

/* --- visión por computadora: mapa de calor --- */
const hot=[[260,200,1],[525,265,.8],[640,392,.6]];
const heatScene=`${plan}
${hot.map(([cx,cy,w],h)=>[6,5,4,3,2,1].map(k=>`<ellipse cx="${cx}" cy="${cy}" rx="${(k*19*w+6).toFixed(0)}" ry="${(k*14*w+5).toFixed(0)}" fill="${k==1?'url(#hd)':'none'}" stroke="${k<=2?brand:ink}" stroke-width="${k<=2?2.2:1.1}" class="draw" pathLength="1" ${D(.8+h*.35+(6-k)*.14)}/>`).join('')).join('')}
<g class="rise" ${D(2.6)}><rect x="96" y="356" width="300" height="66" fill="${paper}" stroke="${ink}" stroke-width="1.6"/>
<rect x="110" y="372" width="14" height="14" fill="url(#hd)" stroke="${brand}" stroke-width="2"/>${T(132,384,'Góndola de ofertas: zona más visitada',{s:13.5})}
<rect x="110" y="396" width="14" height="14" fill="none" stroke="${ink}"/>${T(132,408,'Pasillo 3: casi nadie pasa',{s:13.5,i:1})}</g>`;

const CH=[
  {n:'I',t:'Desarrollo web',lead:'Sitios rápidos y modernos, pensados para convertir visitantes en clientes.',steps:[
    {t:'Tienda online',p:'Tu catálogo abierto 24/7, con pagos y pedidos que te llegan directo a WhatsApp.',svg:webScene},
    {t:'Rápida y visible en Google',p:'Carga al instante en el celular y está optimizada para que te encuentren cuando te buscan.',svg:seoScene}]},
  {n:'II',t:'Automatización',lead:'Tus procesos corren solos, 24/7, sin errores humanos.',steps:[
    {t:'Recordatorios de turnos',p:'Tu agenda avisa sola por WhatsApp. Menos ausencias, cero llamados.',svg:turnosScene},
    {t:'Facturación automática',p:'Cada venta genera su factura y le llega al cliente por mail. Sin tipear nada.',svg:factScene}]},
  {n:'III',t:'Chatbots y agentes IA',lead:'Atendé a tus clientes en el momento justo, por WhatsApp, Instagram, tu web o teléfono.',steps:[
    {t:'Atención 24/7 en WhatsApp',p:'Responde, agenda y vende a las 3 de la mañana. Vos dormís.',svg:nightScene},
    {t:'Agente de voz para llamadas',p:'Atiende el teléfono, entiende lo que te piden y agenda el turno.',svg:voiceScene}]},
  {n:'IV',t:'Datos con IA',lead:'Convertí tus números en decisiones.',steps:[
    {t:'Tablero de ventas y alertas',p:'Tus números en un solo lugar, con avisos antes de que sea tarde.',svg:dataScene},
    {t:'Previsión de demanda',p:'La IA mira tu historial y te dice cuánto pedir y cuándo, antes de quedarte sin stock.',svg:forecastScene}]},
  {n:'V',t:'Visión por computadora',tag:'Nuevo',lead:'Le sumamos IA a las cámaras que ya tenés para entender qué pasa en tu local.',steps:[
    {t:'Conteo de personas',p:'Sabé cuánta gente entra por día y a qué hora, sin contar a mano.',svg:countScene},
    {t:'Tracking de recorridos',p:'Seguí el recorrido de cada visitante dentro del local y cuánto tiempo se queda.',svg:trackScene},
    {t:'Mapas de calor',p:'Descubrí qué zonas atraen y cuáles nadie mira, para reubicar productos y personal.',svg:heatScene}]},
];


export {CH};
