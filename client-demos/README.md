# Demos de clientes

Webs de propuesta **fuera del sitio principal** de Nimbo. Cada carpeta es un sitio estático independiente que deployás en Vercel con su propio subdominio.

```
client-demos/
  _template/          ← copiá esto para cada cliente nuevo
  pizzeria-don-luis/  ← ejemplo: un cliente = una carpeta
```

## Flujo por cliente

### 1. Crear la demo

```bash
cp -R client-demos/_template client-demos/nombre-del-cliente
```

Editá `index.html` y `styles.css` con el contenido del negocio.

### 2. Probar en local

Abrí `client-demos/nombre-del-cliente/index.html` en el navegador, o:

```bash
cd client-demos/nombre-del-cliente && npx serve .
```

### 3. Deploy en Vercel (un proyecto por cliente)

1. **Vercel** → **Add New** → **Project** → mismo repo de Nimbo
2. **Root Directory:** `client-demos/nombre-del-cliente`
3. **Framework Preset:** Other (sitio estático, sin build)
4. **Deploy**
5. **Settings → Domains** → agregá `nombre-del-cliente.nimbodata.com`
6. En tu DNS (donde está `nimbodata.com`), agregá el registro que Vercel te indique (CNAME)

> Cada cliente = **proyecto Vercel separado**. Cuando cierre el trato o expire la demo, borrás el proyecto y el subdominio.

### 4. Conectar con la landing de propuesta

En `src/data/prospects.js`:

```js
'nombre-del-cliente': {
  name: 'Nombre del Negocio',
  industry: 'rubro',
  demoUrl: 'https://nombre-del-cliente.nimbodata.com',
  image: null, // o '/demos/captura.jpg' si preferís screenshot en vez de iframe
},
```

Link de venta: `https://nimbodata.com/propuesta/nombre-del-cliente`

## DNS para muchos subdominios

| Opción | Cuándo usarla |
|--------|----------------|
| **CNAME por cliente** | Pocas demos activas; control total |
| **Wildcard `*.nimbodata.com`** | Muchas demos; igual tenés que registrar cada subdominio en su proyecto Vercel |

El wildcard en DNS no crea proyectos solos: cada subdominio sigue necesitando un deploy en Vercel.

## Borrar una demo temporal

1. Vercel → proyecto del cliente → **Delete Project**
2. Opcional: borrá la carpeta en `client-demos/`
3. Quitá la entrada en `src/data/prospects.js`
