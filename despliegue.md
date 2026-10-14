# Despliegue de Conéctate Candelaria (React + Vite + Supabase)

**Proyecto:** Conéctate Candelaria, aplicación web para comunicar estudiantes y profesores de la institución educativa Candelaria.
**Tecnologías:** React 19, Vite, React Router DOM, Bootstrap 5 y Supabase Auth.
**Repositorio:** [URL DE TU REPOSITORIO]
**URL pública:** [https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/]
**Fecha de la investigación:** 14 de octubre de 2026

---

## 1. Cómo llega un usuario a mi sitio

### 1.1 Del navegador a la página

Cuando escribo la URL de mi proyecto y presiono Enter, pasa lo siguiente:

1. **Resolución DNS:** el navegador no sabe dónde está `usuario.github.io`, así que pregunta a un servidor DNS por su dirección IP.
2. **Conexión TCP:** con la IP, el navegador abre una conexión con el servidor (SYN, SYN-ACK, ACK).
3. **Handshake TLS:** como la URL empieza por `https`, navegador y servidor acuerdan cómo cifrar la conversación. El servidor muestra su certificado y el navegador comprueba que sea válido.
4. **Petición HTTP:** el navegador envía algo como `GET /NOMBRE-DEL-REPO/`.
5. **Respuesta:** el servidor devuelve un código `200` y el `index.html`. El navegador lo lee y pide los archivos JS y CSS que ese HTML menciona. Luego React arma la interfaz.

### 1.2 Partes de una URL

Ejemplo: `https://app.midominio.com:443/publicaciones?id=5#comentarios`

| Parte | En el ejemplo |
|---|---|
| Esquema | `https` |
| Subdominio | `app` |
| Dominio | `midominio` |
| TLD | `com` |
| Puerto | `443` |
| Ruta | `/publicaciones` |
| Query string | `?id=5` |
| Fragmento | `#comentarios` |

**La URL de mi proyecto:** `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`
- Esquema: `https`
- Subdominio + dominio + TLD: `TU-USUARIO.github.io` (aquí `github.io` es el dominio y `TU-USUARIO` hace de subdominio)
- Ruta: `/NOMBRE-DEL-REPO/`
- Puerto: 443 (implícito)

### 1.3 Dominio, subdominio y hosting

- **Dominio:** el nombre de la dirección (`midominio.com`). Se alquila por años.
- **Subdominio:** una parte que se antepone al dominio (`www`, `app`) y que no cuesta extra.
- **Hosting:** el computador donde están guardados los archivos de la página.

Se contratan por separado porque son servicios distintos. El dominio es la dirección; el hosting es la casa. Puedo cambiar de hosting sin perder mi dirección, y comprar el dominio en una empresa y alojar la página en otra.

---

## 2. DNS

### 2.1 ¿Qué es?

El DNS (Domain Name System) traduce nombres como `github.com` en direcciones IP. Le dicen "la agenda de contactos de internet" porque, igual que el celular, yo busco un nombre y el sistema me da el número.

### 2.2 Jerarquía

1. **Resolver recursivo:** el que consulta por mí (el de mi proveedor de internet, o uno público como 1.1.1.1 o 8.8.8.8).
2. **Servidores raíz:** indican quién atiende cada terminación (`.com`, `.co`...).
3. **Servidores TLD:** indican quiénes son los servidores de cada dominio de esa terminación.
4. **Servidores autoritativos:** guardan los registros reales del dominio y dan la respuesta final.

### 2.3 Tipos de registro

| Registro | Para qué sirve | Ejemplo de valor |
|---|---|---|
| **A** | Nombre → IPv4 | `midominio.com → 185.199.108.153` |
| **AAAA** | Nombre → IPv6 | `midominio.com → 2606:50c0:8000::153` |
| **CNAME** | Un nombre es alias de otro nombre | `www → usuario.github.io` |
| **ALIAS / ANAME** | Como un CNAME, pero permitido en el dominio raíz | `midominio.com → usuario.github.io` |
| **MX** | A qué servidor llega el correo del dominio | `10 mx.proveedor.com` |
| **TXT** | Texto: SPF, DKIM, verificación de propiedad | `v=spf1 include:_spf.google.com ~all` |
| **NS** | Qué servidores manejan el DNS del dominio | `ns1.proveedor.com` |
| **SOA** | Datos administrativos de la zona (servidor principal, serial, tiempos de refresco) | `ns1.proveedor.com admin.proveedor.com 2026101401 ...` |

**¿Por qué existen ALIAS/ANAME si ya hay CNAME?** El estándar no permite un CNAME en el dominio raíz porque ahí ya deben existir otros registros (NS, SOA, a veces MX). Algunos proveedores crearon ALIAS/ANAME, que se comportan como un CNAME pero entregan IPs, para poder apuntar el dominio raíz a un servicio que solo da un nombre.

**TXT en detalle:**
- **SPF:** lista los servidores autorizados para enviar correo en nombre del dominio.
- **DKIM:** firma digital en los correos para comprobar que no fueron alterados y que vienen del dominio.
- **Verificación de propiedad:** un servicio (Google, GitHub) pide que publique un texto específico en el DNS para demostrar que el dominio es mío.

### 2.4 TTL y propagación

El **TTL** (Time To Live) es el tiempo, en segundos, que un resolver puede guardar una respuesta antes de volver a preguntar. Por eso un cambio de DNS no se ve de inmediato: muchos resolvers siguen usando la respuesta vieja hasta que se les acaba el TTL.

La **propagación** es el tiempo que tarda todo el mundo en enterarse del cambio. En la práctica suele ser de minutos a unas pocas horas. El "hasta 48 horas" que se menciona es el peor caso.

### 2.5 Ejercicio práctico

Ejecuté estos comandos en la terminal y esta fue la salida:

**`nslookup github.io`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que observo: el comando me devolvió [N] direcciones IP para `github.io`, respondidas por el servidor DNS [IP o nombre que aparece en "Server"].

**`dig github.com A`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que observo: en la sección ANSWER aparece(n) la(s) IP(s) [IP] con un TTL de [número] segundos.

**`dig github.com MX`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que observo: los servidores de correo del dominio son [nombres que aparecen], cada uno con su prioridad.

**`dig +trace anthropic.com`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que observo: la consulta empezó en los servidores raíz (`.`), pasó a los servidores de `.com` y terminó en los servidores autoritativos de `anthropic.com`, que dieron la respuesta final.

Captura: `![comandos dig](capturas/dig.png)`

---

## 3. Dominios

- **Registrador:** empresa autorizada para registrar y vender nombres de dominio. **Proveedor de DNS:** quien guarda los registros (A, CNAME, MX...). **Hosting:** quien guarda los archivos de la página. A veces una sola empresa hace los tres papeles, pero son servicios distintos.
- **TLD genéricos vs. de país:** `.com`, `.dev` y `.app` son genéricos. `.co` es el código de país de Colombia (aunque se vende como dominio global), y `.com.co` es un subnivel colombiano. Algunas terminaciones tienen requisitos especiales, como `.edu.co` (para instituciones educativas) o `.gov.co` (entidades del gobierno). Además, `.dev` y `.app` obligan a usar HTTPS.
- **WHOIS:** base de datos pública con los datos de quien registró un dominio. La **privacidad de dominio** reemplaza mis datos personales por los del registrador, para evitar spam y acoso.
- **Nameservers:** servidores que responden por el DNS de mi dominio. "Apuntar el dominio a otro proveedor" significa cambiar los nameservers en el registrador para que otra empresa maneje mi DNS.

### Precios reales (consultados en julio de 2026)

| Dominio | Registrador | 1er año | Renovación | Fuente |
|---|---|---|---|---|
| .co | Unstoppable Domains | USD 9.30 | USD 26.30 | https://domainoffer.net/tld/co?page=13 |
| .co | Namecheap | [VER PÁGINA] | [VER PÁGINA] | https://domainoffer.net/tld/co?page=3 |
| .com | Porkbun | USD 4.66 | [VER PÁGINA] | https://domainoffer.net/tld/cool/cloudflare |
| .com | Namecheap | USD 5.98 | [VER PÁGINA] | https://domainoffer.net/tld/cool/cloudflare |

> Estos precios los saqué del comparador domainoffer.net, que se actualiza a diario. Antes de entregar, abre la página de cada registrador (por ejemplo namecheap.com y porkbun.com), confirma el precio de un `.com` y un `.co`, y agrega una captura.

**¿Por qué cambia el precio al renovar?** Porque el primer año suele tener un descuento promocional para atraer clientes, y después se cobra el precio normal. Por eso conviene mirar el precio de renovación y no solo el del primer año. Un ejemplo real: el `.co` más barato cuesta USD 9.30 el primer año, pero USD 26.30 al renovar.

---

## 4. HTTPS y certificados

- **TLS/SSL:** protocolo que cifra la comunicación entre el navegador y el servidor. Protege que nadie en el camino (por ejemplo, en un WiFi público) pueda leer o modificar lo que se envía, y comprueba que realmente hablo con el sitio correcto. No garantiza que el sitio sea confiable en su contenido.
- **Autoridad Certificadora (CA):** organización de confianza que verifica y firma certificados. **Let's Encrypt** es una CA gratuita y automática; por eso hoy casi cualquier sitio puede tener HTTPS sin costo.
- **DV, OV y EV:**
  - **DV (Domain Validation):** solo comprueba que controlo el dominio. Es el más común y el de Let's Encrypt.
  - **OV (Organization Validation):** además verifica que la organización existe.
  - **EV (Extended Validation):** verificación más estricta de la empresa.
- **Wildcard:** certificado que cubre un dominio y todos sus subdominios (`*.midominio.com`).
- **Error "certificado no válido para este nombre":** el certificado que presenta el servidor es de otro nombre distinto al que escribí. Aparece al configurar un dominio personalizado porque, mientras GitHub aún no emite el certificado del dominio nuevo, responde con el de `github.io`.
- **HSTS:** cabecera con la que el sitio le indica al navegador que, de ahí en adelante, solo se conecte por HTTPS, aunque el usuario escriba `http://`.

**Mi ejemplo:** [CAPTURA DEL CERTIFICADO DE TU SITIO PUBLICADO. En Chrome: clic en el candado → "La conexión es segura" → "El certificado es válido". Anota el emisor y la fecha de vencimiento].

---

## 5. Modelos de alojamiento

| Modelo | Ventajas | Desventajas | ¿Cuándo usarlo? |
|---|---|---|---|
| **Hosting compartido** (Hostinger, cPanel) | Barato y fácil | Recursos compartidos, poco control | Un WordPress o página sencilla |
| **VPS** (DigitalOcean, Linode, EC2) | Control total, buen precio | Yo administro el servidor y la seguridad | API propia o varias apps en un mismo servidor |
| **Servidor dedicado** (OVH, Hetzner) | Máximo rendimiento | Caro y exige administración | Mucho tráfico o cargas pesadas |
| **PaaS** (Render, Railway, Heroku, Fly.io) | Subo el código y se encargan del servidor | Más caro al crecer; el plan gratis puede "dormir" | Un backend de Node sin administrar servidores |
| **Serverless** (Vercel Functions, Lambda, Edge Functions) | Pago por uso, escala solo | Arranque en frío, límites de tiempo | Funciones pequeñas, webhooks, tareas puntuales |
| **Estático + CDN** (GitHub Pages, Netlify, Cloudflare Pages, Vercel) | Rápido, barato o gratis | Solo archivos, sin servidor propio | Portafolios, SPAs, documentación |
| **BaaS** (Supabase, Firebase, Appwrite) | Base de datos, login y archivos ya listos | Dependo del proveedor | Apps con login y datos sin escribir un backend |

### Conceptos extra

- **CDN:** red de servidores repartidos por el mundo que guardan copias de mis archivos. Resuelve la **latencia** (el usuario recibe los archivos desde un servidor cercano), reduce la **carga del origen** y aprovecha la **caché**.
- **Sitio estático vs. dinámico/renderizado en servidor:** el estático entrega siempre los mismos archivos ya hechos. El dinámico genera la página en el servidor en el momento, según quién la pide.
- **Por qué mi app React con Vite es estática al compilar:** `npm run build` convierte el proyecto en un `index.html` más archivos JS y CSS. No hay servidor ejecutando React: el navegador descarga esos archivos y el JavaScript arma la interfaz. Conéctate Candelaria funciona así, y los datos y el login los resuelve Supabase por API.
- **SPA y el error 404 al recargar:** una SPA tiene una sola página real (`index.html`) y rutas como `/publicaciones` o `/mensajes` las simula JavaScript con React Router. Si recargo en `/publicaciones`, un hosting estático busca un archivo con ese nombre, no lo encuentra y devuelve 404. Por eso en GitHub Pages uso `HashRouter` (la ruta queda tras el `#`, y el servidor nunca la ve).

**Mi ejemplo:** [CAPTURA DE LA CARPETA `dist/` DESPUÉS DE `npm run build`].

---

## 6. Comparativa de plataformas

Datos de planes gratuitos consultados en 2026 (fuentes al final).

| | GitHub Pages | Netlify | Vercel | Cloudflare Pages | Render |
|---|---|---|---|---|---|
| **Plan gratuito** | Límite blando de 100 GB/mes de ancho de banda, sitio de máx. 1 GB y unos 10 builds por hora | 100 GB/mes de ancho de banda y 300 min de build/mes | Hobby: 100 GB/mes de ancho de banda y 1 M de invocaciones de funciones; solo uso no comercial | Ancho de banda ilimitado para estáticos y 500 builds/mes | Sitios estáticos gratis (el límite de ancho de banda varía según la fuente; ver nota) |
| **Variables de entorno en el build** | Sí, mediante secretos en GitHub Actions | Sí | Sí | Sí | Sí |
| **Rutas SPA sin config extra** | No (HashRouter o `404.html`) | No (requiere archivo `_redirects`) | Normalmente requiere un rewrite en `vercel.json` | Sí, en general | No (requiere regla de reescritura) |
| **Backend / funciones** | No, solo archivos estáticos | Sí (Functions) | Sí (Functions) | Sí (Functions sobre Workers) | Sí (servicios web) |
| **Dominio propio gratis + HTTPS automático** | Sí | Sí | Sí | Sí | Sí |
| **Preview por Pull Request** | No de forma nativa | Sí | Sí | Sí | Sí |

> **Nota sobre Render:** las fuentes que consulté no coinciden en el ancho de banda de los sitios estáticos gratis (una dice 5 GB y otras 100 GB). Antes de entregar, confirma el dato en la página oficial de Render. Las filas de rutas SPA y de previews las completé con lo que sé de cada plataforma; verifícalas rápidamente en su documentación si tu profesor lo exige.

**Mi elección:** para Conéctate Candelaria elegiría **GitHub Pages**. Mi proyecto es una app React hecha con Vite que, al compilarse, es solo archivos estáticos, y no necesito un backend propio porque el login y los datos los resuelve Supabase. Además, el código ya está en GitHub, el despliegue con GitHub Actions es gratis y el dominio con HTTPS viene incluido. Su desventaja es que no maneja bien las rutas de una SPA, y por eso uso `HashRouter`. Si el proyecto creciera y necesitara previews por Pull Request o funciones, consideraría Cloudflare Pages o Netlify.

---

## 7. Supabase en producción

- **BaaS (Backend as a Service):** un backend ya construido que uso por API, sin programar ni administrar un servidor. Supabase ofrece **Postgres** (base de datos), **Auth** (registro e inicio de sesión), **Storage** (archivos), **Realtime** (cambios en vivo) y **Edge Functions** (código en el servidor).
- **anon key vs. service_role key:** la **anon key** es pública, puede ir en el frontend y solo tiene los permisos que le dejen las políticas RLS. La **service_role key** se salta todo el RLS (es como una llave maestra), así que **jamás** debe ir en el frontend ni en Git. En Conéctate Candelaria uso solo la anon key.
- **RLS (Row Level Security):** reglas dentro de la base de datos que deciden qué filas puede leer o modificar cada usuario. Es obligatorio activarlo porque la anon key viaja en el navegador y cualquiera puede verla; sin RLS, cualquiera con esa clave podría leer o cambiar mis datos.

**Política RLS de ejemplo** (el usuario solo lee y edita sus propias filas):
```sql
-- Cambia "perfiles" y "id" por el nombre real de tu tabla y columna
alter table perfiles enable row level security;

create policy "Ver solo mis datos"
on perfiles for select
to authenticated
using (auth.uid() = id);

create policy "Editar solo mis datos"
on perfiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
```

Captura de mis políticas activas: `![RLS](capturas/rls.png)` [TOMA LA CAPTURA EN SUPABASE → Authentication → Policies]

- **Site URL y Redirect URLs:** le indican a Supabase Auth a qué direcciones puede devolver al usuario después de iniciar sesión (incluido el inicio de sesión con Google). Si no configuro la URL de producción, el login me redirige a `localhost` o es rechazado, porque la URL no está en la lista permitida.
- **CORS:** es una regla del navegador que decide si una página de un origen puede pedir datos a otro origen. Con la API de Supabase usada desde el navegador normalmente no hay que configurar nada; los errores de CORS o `Failed to fetch` suelen venir de una URL de proyecto mal escrita o de proyecto pausado. En cambio, las Edge Functions sí requieren que yo devuelva las cabeceras CORS. [CONFIRMA ESTE PUNTO EN LA DOCUMENTACIÓN OFICIAL DE SUPABASE Y PON LA URL EN FUENTES]
- **Límites del plan gratuito (2026):** 2 proyectos activos, base de datos de 500 MB por proyecto, almacenamiento de archivos de 1 GB, 5 GB de egress, 50.000 usuarios activos al mes, y **los proyectos se pausan tras una semana de inactividad**. Para una app que debe estar siempre activa eso es un riesgo, y por eso un proyecto escolar poco usado puede aparecer "caído" hasta reactivarlo.

---

## 8. Variables de entorno y seguridad

- **Variable de entorno:** valor de configuración que vive fuera del código (una URL, una clave). El archivo `.env` va en `.gitignore` para que no se suba al repositorio; si se subiera, quedaría en el historial de Git y cualquiera podría verlo.
- **Prefijo `VITE_`:** Vite solo expone al código del navegador las variables que empiezan con `VITE_`. Eso implica que todo lo que lleve ese prefijo termina dentro del bundle final y es **público**. Por eso solo pongo ahí la URL de Supabase y la anon key, nunca un secreto real.
- **Secreto de build vs. secreto de runtime:** un secreto de build (GitHub Secrets) se usa al compilar y queda "horneado" dentro de los archivos publicados, así que no es realmente secreto frente al navegador. Un secreto de runtime vive en un servidor y se lee mientras la aplicación corre, sin llegar nunca al navegador.
- **Si subí una clave por error a Git:** borrar el commit no basta, porque la clave queda en el historial y pudo haber sido copiada. Hay que **rotar la clave** (generar una nueva y desactivar la anterior) y, si hace falta, limpiar el historial.

**Mi ejemplo** (`.env.example` de mi proyecto, sin valores reales):
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 9. Build y despliegue

- **`npm run build`:** compila el proyecto y genera la carpeta `dist/` con el `index.html` y una carpeta `assets/` con el JS y CSS optimizados, listos para publicar.
- **Minificación:** quitar espacios y comentarios y acortar nombres para que los archivos pesen menos.
- **Tree shaking:** eliminar del bundle el código que se importa pero nunca se usa.
- **Code splitting:** dividir el JS en varios archivos para cargar solo lo necesario en cada vista.
- **Hashing de nombres de archivo:** agregar un código al nombre (`index-a1b2c3.js`); cuando el archivo cambia, el nombre cambia y el navegador lo descarga de nuevo en vez de usar uno viejo en caché.
- **CI/CD:** automatizar la integración (instalar, compilar, probar) y la entrega (publicar) cada vez que subo cambios. **GitHub Actions** es la herramienta de GitHub para eso: se define en archivos YAML dentro de `.github/workflows/`.
- **Desplegar desde una rama (`gh-pages`) vs. con un workflow de Actions:** con la rama, yo compilo en mi computador y subo los archivos ya generados a una rama especial. Con Actions, GitHub compila y publica automáticamente cada vez que hago push a `main`, así no subo `dist/` al repositorio y las variables de entorno se inyectan desde los secretos.

**Mi ejemplo:** [CAPTURA DE `dist/` Y CAPTURA DEL WORKFLOW EN VERDE EN LA PESTAÑA ACTIONS].

---

## Entregables

- URL pública: [ ]
- Captura del workflow de Actions en verde: [ ]
- Captura de las políticas RLS activas en Supabase: [ ]

## Fuentes consultadas

- GitHub Docs, dominio personalizado para Pages: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Docs, límites de Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Límites del plan gratuito de Supabase (Cloudzero): https://www.cloudzero.com/blog/supabase-pricing/
- Límites del plan gratuito de Supabase (Makerkit): https://makerkit.dev/blog/saas/supabase-pricing
- Página oficial de precios de Supabase: https://supabase.com/pricing
- Comparativa de plataformas de hosting estático (Netlify, Cloudflare, GitHub Pages): https://developer.puter.com/blog/netlify-alternatives/
- Comparativa de alternativas a GitHub Pages: https://bootstrap.build/articles/github-pages-alternatives/
- Comparativa de hosting Jamstack: https://guptadeepak.com/tools/top-5-static-site-hosting-jamstack-platforms-2026/
- Precios de dominios .co: https://domainoffer.net/tld/co?page=13
- Precios de dominios por registrador: https://domainoffer.net/tld/cool/cloudflare
