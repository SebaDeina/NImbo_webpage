/* Motor de grabado: dibuja nubes/relieves con líneas de buril sobre <canvas>.
   Portado del mockup (2026-10). */
/* eslint-disable */
/* ================= utilidades ================= */
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const sstep=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function noise2(seed){
  const r=rng(seed),P=new Float32Array(1024);for(let i=0;i<1024;i++)P[i]=r();
  const h=(x,y)=>P[(Math.imul(x,374761393)^Math.imul(y,668265263))&1023];
  return (x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
    const a=h(xi,yi),b=h(xi+1,yi),c=h(xi,yi+1),d=h(xi+1,yi+1);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
}
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const LIGHT=(()=>{const v=[-0.5,-0.8,0.55],m=Math.hypot(...v);return v.map(x=>x/m)})();
const DPR=typeof window==='undefined'?1:Math.min(window.devicePixelRatio||1,(window.matchMedia&&window.matchMedia('(max-width:760px)').matches)?1.25:1.6);

/* Motor de grabado: sample(px,py) -> {b (luz 0..1), z (relieve, curva las líneas), e (distancia al borde)} o null.
   Dibuja líneas de buril cuyo grosor depende de la sombra + contra-trama en las zonas oscuras. */
function engrave(cv,W,H,sample,o){
  const w=Math.round(W*DPR),h=Math.round(H*DPR);
  cv.width=w;cv.height=h;cv.style.width=W+'px';cv.style.height=H+'px';
  const ctx=cv.getContext('2d'),img=ctx.createImageData(w,h),d=img.data;
  const P=hex(o.paper),I=hex(o.ink),s=o.s,n=noise2(o.seed||7),y0=Math.max(0,Math.floor((o.top||0)*DPR));
  for(let j=y0;j<h;j++){const py=(j+.5)/DPR;
    for(let i=0;i<w;i++){const px=(i+.5)/DPR,r=sample(px,py);if(!r)continue;
      const jit=(n(px*.035,py*.035)-.5)*2.4;
      const u=py-(r.z||0)*.42+jit, m=((u%s)+s)%s, dl=Math.abs(m-s/2);
      const b=clamp(r.b,0,1); let hw=s*.5*Math.pow(1-b,1.25)*.96*(r.k||1);
      hw*=.78+.44*n(px*.08+40,py*.5);             // trazo irregular, "cortado a mano"
      let ink=clamp((hw-dl)*DPR+.5,0,1);
      if(b<.4){const v=px*.5+py*.866-(r.z||0)*.2,m2=((v%s)+s)%s,d2=Math.abs(m2-s/2),cw=s*.5*((.4-b)/.4)*.72;ink=Math.max(ink,clamp((cw-d2)*DPR+.5,0,1))}
      if(r.e!=null){const th=.55+1.25*(1-b);ink=Math.max(ink,clamp((th-r.e)*DPR+.5,0,1)*(r.eo??1))}
      const k=(j*w+i)*4;d[k]=P[0]+(I[0]-P[0])*ink;d[k+1]=P[1]+(I[1]-P[1])*ink;d[k+2]=P[2]+(I[2]-P[2])*ink;d[k+3]=255}}
  ctx.putImageData(img,0,0);
}

/* Banco de nubes tipo cúmulo: silueta = unión de lóbulos elípticos (grandes en la base,
   chicos en las crestas). El volumen sale de un mapa de altura desenfocado (lóbulos fundidos)
   y los contornos de buril se dibujan solo en la parte alta de cada lóbulo. */
function cloudBank(W,H,{base,rmin,rmax,seed,fade}){
  const R=rng(seed),puffs=[],SY=.72;
  for(let x=-rmax;x<W+rmax;){const r=rmin+R()*(rmax-rmin);const big={cx:x,cy:base-r*(.05+R()*.3),r};puffs.push(big);
    const k=2+(R()*3|0);for(let q=0;q<k;q++){const a=-Math.PI*(.18+R()*.64),r2=r*(.32+R()*.3);
      puffs.push({cx:big.cx+Math.cos(a)*r*.78,cy:big.cy+Math.sin(a)*r*SY*.78,r:r2})}
    x+=r*(1.05+R()*.7)}
  puffs.sort((a,b)=>(b.cy+b.r*SY)-(a.cy+a.r*SY));   // el que llega más abajo queda adelante
  const W1=Math.ceil(W)+2,H1=Math.ceil(H)+2,m=new Float32Array(W1*H1);
  for(let y=0;y<H1;y++)if(y>base)for(let x=0;x<W1;x++)m[y*W1+x]=1;
  for(const p of puffs){const ry=p.r*SY;for(let y=Math.max(0,Math.floor(p.cy-ry));y<Math.min(H1,p.cy+ry);y++)
    for(let x=Math.max(0,Math.floor(p.cx-p.r));x<Math.min(W1,p.cx+p.r);x++){const dx=(x-p.cx)/p.r,dy=(y-p.cy)/ry;if(dx*dx+dy*dy<1)m[y*W1+x]=1}}
  const hb=Float32Array.from(m),hs=Float32Array.from(m);blur(hb,W1,H1,Math.round(rmax*.45));blur(hs,W1,H1,Math.max(3,Math.round(rmin*.22)));
  const cols=Array.from({length:W1},()=>[]);
  for(const p of puffs)for(let x=Math.max(0,Math.floor(p.cx-p.r));x<=Math.min(W1-1,Math.ceil(p.cx+p.r));x++)cols[x].push(p);
  let top=H;for(const p of puffs)top=Math.min(top,p.cy-p.r*SY);
  const hgt=(x,y)=>{const k=y*W1+x;return hb[k]*.55+hs[k]*.45};
  const sample=(px,py)=>{const x=Math.min(W1-2,Math.max(1,px|0)),y=Math.min(H1-2,Math.max(1,py|0)),k=y*W1+x;
    if(m[k]<.5)return null;
    const gx=(hgt(x+1,y)-hgt(x-1,y))/2,gy=(hgt(x,y+1)-hgt(x,y-1))/2,K=rmax*.9;
    let nx=-gx*K,ny=-gy*K,nz=1;const L=Math.hypot(nx,ny,nz);nx/=L;ny/=L;nz/=L;
    let b=.1+.9*Math.max(0,nx*LIGHT[0]+ny*LIGHT[1]+nz*LIGHT[2]);
    b=b*.8+.2*hs[k];
    let e=null,eo=1;
    for(const p of cols[x]){const ry=p.r*SY,dx=(px-p.cx)/p.r,dy=(py-p.cy)/ry,dd=dx*dx+dy*dy;if(dd<1){
      e=(1-Math.sqrt(dd))*Math.min(p.r,ry);eo=dy<-.15?1:dy<.2?(.2-dy)/.35:0;if(py>base)eo*=.3;break}}
    if(py>base&&e===null){const t=clamp((py-base)/(H*.3),0,1);b=fade==='light'?Math.max(b,.55+.45*t):b*(1-.5*t)}
    return {b,z:hgt(x,y)*rmax*.3,e,eo}};
  return {sample,top};
}

/* Cordillera para el horizonte del footer */
function ridge(W,H,seed){
  const n=noise2(seed),ry=x=>{const a=n(x*.0035,3.1),b=n(x*.011,9.7),c=n(x*.04,1.3);
    return H*.12+H*.42*(1-(.62*(1-Math.abs(2*a-1))+.28*b+.1*c))};
  const cache=new Float32Array(Math.ceil(W)+3);for(let x=0;x<cache.length;x++)cache[x]=ry(x-1);
  const top=Math.min(...cache);
  return {top,sample:(px,py)=>{const x=(px|0)+1,R=cache[x];if(py<R)return null;
    const xl=Math.max(0,x-8),xr=Math.min(cache.length-1,x+8),slope=(cache[xr]-cache[xl])/(xr-xl);
    let b=.74-clamp(slope,-.6,.6)*.9+(n(px*.012,py*.09)-.5)*.4-.22*clamp((py-R)/(H*.5),0,1);
    return {b:clamp(b,.32,1),z:-(R-top)*.55*Math.exp(-(py-R)/(H*.25)),e:py-R}}};
}

/* Logo Nimbo como "retrato" grabado: mapa de altura por desenfoque de la silueta */
const LOGO="M271.84,16.97c15.42,12.31,28,33.93,28.55,53.89,13.64-.57,26.09-.17,38.52,5.87,56.51,27.48,43.11,115.68-20.22,122.53l-261.99-.05c-62.34-7.28-77.99-89.68-23.15-121.24,14.02-8.07,30.12-8.07,45.94-6.19,1.71-.48,5.47-10.25,6.98-12.67,10.49-16.9,33.25-31.45,53.83-31.99,3.61-.09,18.6,3.19,19.55,2.91.59-.17,6.77-7.6,8.32-8.95,29.26-25.43,72.35-29.12,103.66-4.12Z";
function blur(a,w,h,r){const t=new Float32Array(a.length);for(let p=0;p<3;p++){
  for(let y=0;y<h;y++){let s=0;const o=y*w;for(let x=-r;x<=r;x++)s+=a[o+clamp(x,0,w-1)];for(let x=0;x<w;x++){t[o+x]=s/(2*r+1);s+=a[o+Math.min(x+r+1,w-1)]-a[o+Math.max(x-r,0)]}}
  for(let x=0;x<w;x++){let s=0;for(let y=-r;y<=r;y++)s+=t[clamp(y,0,h-1)*w+x];for(let y=0;y<h;y++){a[y*w+x]=s/(2*r+1);s+=t[Math.min(y+r+1,h-1)*w+x]-t[Math.max(y-r,0)*w+x]}}}}
function logoSample(W,H){
  const w=Math.round(W*DPR),h=Math.round(H*DPR),oc=document.createElement('canvas');oc.width=w;oc.height=h;
  const c=oc.getContext('2d'),lw=W*.66,sc=lw/374.63;
  c.setTransform(sc*DPR,0,0,sc*DPR,(W-lw)/2*DPR,(H-199.26*sc)/2*DPR+H*.04*DPR);c.fillStyle='#fff';c.fill(new Path2D(LOGO));
  const raw=c.getImageData(0,0,w,h).data,m=new Float32Array(w*h);for(let i=0;i<m.length;i++)m[i]=raw[i*4+3]/255;
  const hm=Float32Array.from(m),R=Math.round(W*.07*DPR);blur(hm,w,h,R);
  const K=W*.07*1.7;
  return (px,py)=>{const ex=(px-W/2)/(W/2),ey=(py-H/2)/(H/2);if(ex*ex+ey*ey>.93)return null;
    const i=Math.min(w-2,Math.max(1,px*DPR|0)),j=Math.min(h-2,Math.max(1,py*DPR|0)),k=j*w+i,mv=m[k];
    if(mv<.5)return {b:.38+.12*(1-ey),z:0,k:1};   // cielo rayado del medallón
    const gx=(hm[k+1]-hm[k-1])/2*DPR,gy=(hm[k+w]-hm[k-w])/2*DPR;let nx=-gx*K,ny=-gy*K,nz=1;const L=Math.hypot(nx,ny,nz);nx/=L;ny/=L;nz/=L;
    let b=.12+.88*Math.max(0,nx*LIGHT[0]+ny*LIGHT[1]+nz*LIGHT[2]);
    // borde: distancia aproximada al contorno por el valor de máscara de los vecinos
    let e=9;for(const dd of [2,4,6]){const s=Math.round(dd*DPR*.5);if(m[k-s]<.5||m[k+s]<.5||m[k-s*w]<.5||m[k+s*w]<.5){e=dd*.5;break}}
    return {b:b*.85+.15*hm[k],z:hm[k]*W*.08,e}};
}


export const INK='#262489',PAPER='#f3ead7';
export {clamp,sstep,rng,noise2,engrave,cloudBank,blur,logoSample};
