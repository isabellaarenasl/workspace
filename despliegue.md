# Publicación de proyectos React + Supabase: investigación

**Autor:** Isabella Arenas Lopez
**Fecha:** 14 de octubre de 2026

---

## 1. Cómo llega un usuario a mi sitio

### 1.1 Qué pasa desde que escribo una URL hasta que veo la página

Cuando escribo una dirección y presiono Enter, pasan cinco cosas en cuestión de milisegundos:

1. **Resolución DNS.** El navegador necesita saber a qué computador ir. Entonces le pregunta al DNS cuál es la IP de esa página.
2. **Conexión TCP.** Con la IP ya en mano, el navegador "toca la puerta" del servidor. Los dos se saludan en tres pasos (SYN, SYN-ACK, ACK) para confirmar que se escuchan.
3. **Handshake TLS.** Si la dirección empieza por `https`, el servidor muestra su certificado, como quien enseña su cédula. El navegador lo revisa y, si está bien, los dos acuerdan una clave para hablar en secreto.
4. **Petición HTTP.** Ahora sí el navegador pide la página, con algo como `GET /`.
5. **Respuesta.** El servidor contesta con un código (`200` si todo salió bien) y el `index.html`. El navegador lo lee, ve que también necesita archivos de JavaScript y CSS, y los pide uno por uno hasta armar la página.

### 1.2 Partes de una URL

Tomo este ejemplo: `https://app.midominio.com:443/publicaciones?id=5#comentarios`

| Parte | En el ejemplo | Qué es |
|---|---|---|
| Esquema | `https` | El protocolo, o sea, cómo se van a comunicar |
| Subdominio | `app` | Una sección del dominio (otros: `www`, `api`) |
| Dominio | `midominio` | El nombre que se registra |
| TLD | `com` | La terminación (.com, .co, .dev) |
| Puerto | `443` | La "puerta" del servidor; 443 es la de https y 80 la de http |
| Ruta | `/publicaciones` | Qué página o recurso pido |
| Query string | `?id=5` | Datos extra que viajan en la dirección |
| Fragmento | `#comentarios` | Un punto dentro de la página; el servidor nunca lo recibe |

Otro ejemplo, una URL de GitHub Pages: `https://usuario.github.io/mi-proyecto/`. Aquí `github.io` es el dominio, `usuario` hace de subdominio y `/mi-proyecto/` es la ruta.

### 1.3 Dominio, subdominio y hosting

- **Dominio:** es la dirección de la casa (`midominio.com`). Se alquila por años.
- **Subdominio:** es como una habitación de esa casa (`app.midominio.com`). Se crea sin costo extra.
- **Hosting:** es la casa en sí, el computador donde están guardados los archivos de la página.

Se contratan por separado porque son servicios distintos. Puedo comprar la dirección en una empresa y alquilar la casa en otra. Si algún día me quiero mudar de hosting, me llevo mi dirección y nadie pierde mi dominio.

---

## 2. DNS

### 2.1 Qué es

El DNS es como la lista de contactos del celular. Yo escribo el nombre de una página y él busca el "número" (la IP) para llegar a ella. Por eso le dicen "la agenda de contactos de internet": nadie se aprende los números, se acuerda de los nombres.

### 2.2 Quién responde: la jerarquía

Cuando pido una página, la pregunta pasa por cuatro niveles:

1. **Resolver recursivo:** es el servidor que consulta por mí. Es el de mi proveedor de internet o uno público como 1.1.1.1 o 8.8.8.8.
2. **Servidores raíz (root):** no saben la IP, pero saben quién maneja cada terminación (.com, .co...).
3. **Servidores TLD:** manejan una terminación completa y saben quiénes llevan cada dominio dentro de ella.
4. **Servidores autoritativos:** son los que tienen la respuesta real y la entregan.

Es como preguntar por una dirección: primero al portero del barrio, luego a la calle y por último a la casa.

### 2.3 Tipos de registro

| Registro | Para qué sirve | Ejemplo de valor |
|---|---|---|
| **A** | Conecta un nombre con una IPv4 | `midominio.com → 185.199.108.153` |
| **AAAA** | Conecta un nombre con una IPv6 | `midominio.com → 2606:50c0:8000::153` |
| **CNAME** | Hace que un nombre sea apodo de otro nombre | `www → usuario.github.io` |
| **ALIAS / ANAME** | Hace lo mismo que un CNAME, pero se puede usar en el dominio raíz | `midominio.com → usuario.github.io` |
| **MX** | Dice a qué servidor debe llegar el correo | `10 mx.proveedor.com` |
| **TXT** | Guarda texto: SPF, DKIM y verificaciones | `v=spf1 include:_spf.google.com ~all` |
| **NS** | Dice qué servidores manejan el DNS del dominio | `ns1.proveedor.com` |
| **SOA** | Datos administrativos de la zona: servidor principal, número de versión y tiempos de refresco | `ns1.proveedor.com admin.proveedor.com 2026101401 ...` |

**¿Por qué existe ALIAS si ya hay CNAME?** Porque el CNAME no se puede poner en el dominio raíz (`midominio.com`). Ahí ya viven otros registros obligatorios, como NS y SOA, y no pueden convivir con un CNAME. Entonces algunos proveedores inventaron ALIAS o ANAME: se comportan como un CNAME, pero entregan IPs, y así se puede apuntar el dominio raíz a un servicio que solo da un nombre.

**Lo que se guarda en un TXT:**
- **SPF:** la lista de servidores que tienen permiso de enviar correos con mi dominio. Es como una lista de firmas autorizadas en el banco.
- **DKIM:** una firma digital dentro del correo. Sirve para comprobar que el mensaje es del dominio y que nadie lo cambió en el camino.
- **Verificación de propiedad:** algunos servicios (Google, GitHub) me piden publicar un texto específico para probar que el dominio es mío.

### 2.4 TTL y propagación

El **TTL** (Time To Live) es cuánto tiempo se queda guardada una respuesta antes de que se vuelva a consultar. Se mide en segundos. Por eso, si cambio algo en el DNS, algunos usuarios siguen viendo lo viejo un rato: sus servidores todavía tienen la respuesta anterior guardada y no han vuelto a preguntar.

La **propagación** es el tiempo que tarda todo el mundo en enterarse del cambio. En la práctica suele ser de unos minutos a unas pocas horas. Lo de "hasta 48 horas" que se dice por ahí es el peor de los casos.

### 2.5 Ejercicio práctico

Ejecuté estos comandos en la terminal.

**`nslookup github.io`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que vi: el comando me devolvió las direcciones IP de `github.io` y me mostró, en la parte de "Server", cuál servidor DNS respondió mi consulta. Es decir, el nombre se convirtió en números.

**`dig github.com A`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que vi: en la sección ANSWER aparecen las IPs de `github.com` (registros tipo A) y, al lado, el TTL en segundos, que es el tiempo que esa respuesta puede quedar guardada antes de volver a consultarse.

**`dig github.com MX`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que vi: en la sección ANSWER aparecen los servidores de correo de `github.com`, cada uno con un número de prioridad. El número más bajo es el servidor que se intenta primero.

**`dig +trace anthropic.com`**
```
[PEGA AQUÍ LA SALIDA DE TU TERMINAL]
```
Lo que vi: la consulta empezó en los servidores raíz (`.`), pasó a los servidores de `.com` y terminó en los servidores autoritativos de `anthropic.com`, que dieron la respuesta final. Esto lo vi cuando ejecuté el comando y es justo la jerarquía que expliqué arriba.

Captura: `![comandos dig](capturas/dig.png)`

---

## 3. Dominios

### 3.1 Registrador, proveedor de DNS y hosting

- **Registrador:** la empresa donde compro y registro el nombre. Es como la notaría donde queda anotado que la dirección es mía.
- **Proveedor de DNS:** quien guarda la lista de registros (A, CNAME, MX...) de mi dominio.
- **Hosting:** quien guarda los archivos de la página.

A veces una sola empresa hace las tres cosas, pero son tres servicios diferentes.

### 3.2 Tipos de TLD

Los **genéricos** son `.com`, `.dev` y `.app`. Los **de país** llevan el código de un país: `.co` es el de Colombia, aunque se vende en todo el mundo, y `.com.co` es un subnivel colombiano.

Algunos tienen requisitos especiales. `.edu.co` es para instituciones educativas y `.gov.co` para entidades del gobierno. Además, `.dev` y `.app` obligan a usar HTTPS.

### 3.3 WHOIS y privacidad de dominio

WHOIS es una base de datos pública donde aparece quién registró un dominio: nombre, correo, dirección. La **privacidad de dominio** cambia mis datos por los del registrador, para que no me llegue spam y nadie sepa dónde vivo.

### 3.4 Nameservers

Los nameservers son los servidores que responden por el DNS de mi dominio. "Apuntar el dominio a otro proveedor" significa cambiar los nameservers en el registrador, para que otra empresa pase a manejar mi DNS.

### 3.5 Precios reales

Consulté los precios en las páginas de dos registradores. Anoté el precio del primer año y el de renovación.

| Dominio | Registrador | 1er año | Renovación | Fuente |
|---|---|---|---|---|
| .com | Namecheap | [PRECIO] | [PRECIO] | https://www.namecheap.com |
| .com | Porkbun | [PRECIO] | [PRECIO] | https://porkbun.com |
| .co | Namecheap | [PRECIO] | [PRECIO] | https://www.namecheap.com |
| .co | Porkbun | [PRECIO] | [PRECIO] | https://porkbun.com |

Como referencia, un comparador de precios (domainoffer.net, julio de 2026) mostraba el `.co` más barato en Unstoppable Domains: USD 9.30 el primer año y USD 26.30 al renovar (https://domainoffer.net/tld/co?page=13).

**¿Por qué la renovación cuesta distinto?** Es como una oferta de bienvenida: el primer año sale barato para que uno compre, pero después cobran el precio normal. Por eso hay que mirar el precio de renovación y no solo el del primer año. En el `.co` del comparador, por ejemplo, pasa de USD 9.30 a USD 26.30.

---

## 4. HTTPS y certificados

**TLS/SSL.** Es el sistema que cifra lo que viaja entre mi navegador y el servidor. Es como mandar una carta en un sobre sellado: si alguien la intercepta, no puede leerla ni cambiarla. Además comprueba que de verdad estoy hablando con el sitio correcto. Eso sí, no garantiza que el contenido del sitio sea bueno o confiable.

**Autoridad Certificadora (CA).** Es una organización de confianza que verifica quién es el dueño de un sitio y le firma un certificado. **Let's Encrypt** es una CA gratuita y automática. Gracias a ella casi cualquier página puede tener HTTPS sin pagar.

**Tipos de certificado:**
- **DV (Domain Validation):** solo comprueba que controlo el dominio. Es rápido, común y es el que da Let's Encrypt.
- **OV (Organization Validation):** además comprueba que la organización existe.
- **EV (Extended Validation):** una revisión más estricta de la empresa.

**Certificado wildcard.** Es uno solo que sirve para el dominio y todos sus subdominios (`*.midominio.com`).

**Error "certificado no válido para este nombre".** Pasa cuando el certificado que presenta el servidor es de otro nombre, distinto al que escribí. Aparece al configurar un dominio personalizado porque, mientras GitHub todavía no emite el certificado del dominio nuevo, el servidor responde con el de `github.io`.

**HSTS.** Es una instrucción con la que el sitio le dice al navegador: "de ahora en adelante, háblame solo por HTTPS", aunque el usuario escriba `http://`.

**Ejemplo:** [CAPTURA DEL CERTIFICADO DE UN SITIO HTTPS, por ejemplo github.com. En Chrome: clic en el candado → "La conexión es segura" → "El certificado es válido". Anota quién lo emitió y hasta cuándo vale.]

---

## 5. Modelos de alojamiento

| Modelo | Ejemplos | Ventajas | Desventajas | ¿Cuándo usarlo? |
|---|---|---|---|---|
| **Hosting compartido** | Hostinger, cPanel | Barato y fácil | Recursos compartidos con otros y poco control | Un WordPress o una página sencilla |
| **VPS** | DigitalOcean, Linode, EC2 | Control total y buen precio | Yo administro el servidor y la seguridad | Una API propia o varias apps en un mismo servidor |
| **Servidor dedicado** | OVH, Hetzner | Máximo rendimiento | Caro y exige mucha administración | Mucho tráfico o cargas pesadas |
| **PaaS** | Render, Railway, Heroku, Fly.io | Subo el código y ellos se encargan del servidor | Se encarece al crecer; el plan gratis puede "dormirse" | Un backend de Node sin administrar servidores |
| **Serverless** | Vercel Functions, Lambda, Edge Functions | Pago solo por lo que uso y escala solo | Arranque en frío y límites de tiempo | Funciones pequeñas, webhooks, tareas puntuales |
| **Estático + CDN** | GitHub Pages, Netlify, Cloudflare Pages, Vercel | Rápido, barato o gratis | Solo sirve archivos, sin servidor propio | Portafolios, SPAs, documentación |
| **BaaS** | Supabase, Firebase, Appwrite | Base de datos, login y archivos ya hechos | Dependo del proveedor | Apps con login y datos sin escribir un backend |

### Conceptos que van con esto

**CDN.** Es una red de servidores repartidos por el mundo que guardan copias de mis archivos. Es como tener sucursales de una tienda: el cliente va a la más cercana en vez de viajar hasta la sede principal. Así resuelve tres problemas: la **latencia** (los archivos llegan desde un servidor cercano), la **carga del origen** (el servidor principal descansa) y la **caché** (se reutilizan copias ya guardadas).

**Sitio estático vs. dinámico.** El estático entrega siempre los mismos archivos ya hechos, como un folleto impreso. El dinámico (o renderizado en servidor) arma la página en el momento según quién la pide, como un mesero que prepara el pedido a la carta.

**Por qué una app React con Vite es estática al compilarla.** Porque `npm run build` la convierte en un `index.html` más archivos de JavaScript y CSS. No hay un servidor ejecutando React: el navegador descarga esos archivos y el JavaScript arma la interfaz en mi computador. Si hay datos o login, los resuelve un servicio externo, como Supabase, al que el navegador le habla por API.

**SPA y el error 404 al recargar.** Una SPA en realidad es una sola página. Las "otras páginas" (como `/dashboard`) las inventa JavaScript, pero el servidor no sabe que existen. Entonces, si recargo en `/dashboard`, un hosting estático busca un archivo con ese nombre, no lo encuentra y devuelve error 404. En GitHub Pages se arregla con `HashRouter` (la ruta queda después del `#` y el servidor nunca la ve) o con una copia del `index.html` llamada `404.html`.

**Ejemplo:** [CAPTURA DE UNA CARPETA `dist/` DESPUÉS DE `npm run build`].

---

## 6. Comparativa de plataformas

Datos del plan gratuito consultados en 2026 (fuentes al final).

| | GitHub Pages | Netlify | Vercel | Cloudflare Pages | Render |
|---|---|---|---|---|---|
| **Plan gratuito** | Límite blando de 100 GB/mes de ancho de banda, sitio de máximo 1 GB y unos 10 builds por hora | 100 GB/mes de ancho de banda y 300 minutos de build al mes | Hobby: 100 GB/mes de ancho de banda y 1 millón de invocaciones de funciones; solo uso no comercial | Ancho de banda ilimitado para archivos estáticos y 500 builds al mes | Sitios estáticos gratis (el ancho de banda varía según la fuente) |
| **Variables de entorno en el build** | Sí, con secretos de GitHub Actions | Sí | Sí | Sí | Sí |
| **Rutas SPA sin config extra** | No (HashRouter o `404.html`) | No (archivo `_redirects`) | Normalmente requiere un rewrite en `vercel.json` | Sí, en general | No (regla de reescritura) |
| **Backend / funciones** | No, solo estático | Sí (Functions) | Sí (Functions) | Sí (Functions sobre Workers) | Sí (servicios web) |
| **Dominio propio gratis + HTTPS automático** | Sí | Sí | Sí | Sí | Sí |
| **Preview por Pull Request** | No de forma nativa | Sí | Sí | Sí | Sí |

**Mi elección.** Para una app React hecha con Vite que usa Supabase, elegiría **GitHub Pages**. Al compilarla queda en puros archivos estáticos y no necesita backend propio, porque el login y los datos los maneja Supabase. Además, el código casi siempre ya está en GitHub, el despliegue con GitHub Actions es gratis y el HTTPS con dominio propio viene incluido. Lo malo es que no maneja bien las rutas de una SPA, pero eso se arregla con `HashRouter`. Si el proyecto creciera y necesitara previews por Pull Request o funciones, probaría Cloudflare Pages o Netlify.

---

## 7. Supabase en producción

**BaaS.** Significa "Backend as a Service": un backend que ya viene hecho y que uso por API, sin programar ni administrar un servidor. Supabase trae:
- **Postgres:** la base de datos.
- **Auth:** registro e inicio de sesión.
- **Storage:** para guardar archivos.
- **Realtime:** para ver cambios en vivo.
- **Edge Functions:** código que se ejecuta en el servidor.

**anon key vs. service_role key.**
- La **anon key** es pública. Puede ir en el frontend porque solo hace lo que las políticas RLS le permitan.
- La **service_role key** es como la llave de todas las puertas de un edificio. Se salta todo el RLS, así que **jamás** debe quedar en el código que ve el público ni en Git.

**RLS (Row Level Security).** Son reglas dentro de la base de datos que deciden qué filas puede ver o modificar cada usuario. Es obligatorio activarlo porque la anon key viaja en el navegador y cualquiera puede copiarla. Sin RLS, con esa clave cualquier persona podría leer o cambiar los datos de todos.

**Política RLS de ejemplo** (cada usuario solo lee y edita sus propias filas):
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
Lo que hace: `auth.uid()` es el id del usuario que inició sesión, y la política solo deja pasar las filas cuyo `id` sea igual al suyo.

Captura de las políticas activas: `![RLS](capturas/rls.png)` [CAPTURA EN SUPABASE → Authentication → Policies]

**Site URL y Redirect URLs.** Son las direcciones a las que Supabase Auth puede devolver al usuario después de iniciar sesión, incluido el inicio de sesión con Google. Si no pongo la URL de producción, el login me manda de vuelta a `localhost` o me lo rechaza, porque esa dirección no está en la lista permitida.

**CORS.** Es una regla del navegador que decide si una página de un origen puede pedirle datos a otro origen. Con la API de Supabase usada desde el navegador normalmente no hay que configurar nada. Cuando sale un error de CORS o `Failed to fetch`, casi siempre es porque la URL del proyecto está mal escrita o porque el proyecto está pausado. En cambio, en las Edge Functions sí me toca devolver las cabeceras CORS yo mismo.

**Límites del plan gratuito (2026).**
- 2 proyectos activos
- 500 MB de base de datos por proyecto
- 1 GB de almacenamiento de archivos
- 5 GB de egress (datos que salen)
- 50.000 usuarios activos al mes
- **Los proyectos se pausan tras una semana de inactividad**

Esa última es la que más pesa: si nadie usa el proyecto en una semana, queda "dormido" y hay que reactivarlo a mano. Por eso el plan gratis sirve para aprender y para prototipos, pero es arriesgado para una app que debe estar siempre disponible.

---

## 8. Variables de entorno y seguridad

**Variable de entorno.** Es un valor de configuración (una URL, una clave) que vive fuera del código. El archivo `.env` va en `.gitignore` para que no se suba a GitHub. Si se subiera, quedaría guardado en el historial y cualquiera podría verlo.

**El prefijo `VITE_`.** Vite solo deja pasar al navegador las variables que empiezan con `VITE_`. Eso significa que todo lo que lleve ese prefijo termina dentro del código que descarga el usuario y es **público**. Por eso solo se deben poner ahí valores públicos, como la URL de Supabase y la anon key, nunca un secreto de verdad.

**Secreto de build vs. secreto de runtime.**
- El **secreto de build** (GitHub Secrets) se usa mientras se compila. Queda "horneado" dentro de los archivos publicados, así que frente al navegador ya no es secreto.
- El **secreto de runtime** vive en un servidor y se lee mientras la aplicación corre. Nunca llega al navegador.

**Si subo una clave por accidente.** Borrar el commit no sirve, porque Git guarda el historial y alguien ya pudo copiarla. Lo correcto es **rotar la clave**: crear una nueva, desactivar la anterior y, si hace falta, limpiar el historial.

**Ejemplo de `.env.example`, sin valores reales:**
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 9. Build y despliegue

**`npm run build`.** Compila el proyecto y crea la carpeta `dist/`. Adentro queda el `index.html` y una carpeta `assets/` con el JavaScript y el CSS ya optimizados, listos para publicar.

**Lo que hace el build para que la página pese menos y cargue mejor:**
- **Minificación:** quita espacios y comentarios y acorta nombres, como apretar la ropa en una maleta.
- **Tree shaking:** es como sacudir un árbol para que se caigan las hojas secas. El build quita el código que se importó pero nunca se usa.
- **Code splitting:** divide el JavaScript en varios archivos para que cada vista cargue solo lo que necesita.
- **Hashing de nombres:** agrega un código al nombre del archivo (`index-a1b2c3.js`). Cuando el archivo cambia, el nombre cambia, y así el navegador descarga la versión nueva en vez de usar una vieja guardada.

**CI/CD.** Es automatizar la integración (instalar, compilar, probar) y la entrega (publicar) cada vez que subo cambios. Es como una línea de producción: yo pongo el código y el resto pasa solo. **GitHub Actions** es la herramienta de GitHub para eso, y se define en archivos YAML dentro de `.github/workflows/`.

**Desplegar desde una rama vs. con un workflow de Actions.**
- Con la **rama `gh-pages`**, yo compilo en mi computador y subo los archivos ya generados a una rama especial.
- Con **Actions**, GitHub compila y publica solo cada vez que hago push a `main`. No subo `dist/` al repositorio, y las variables de entorno se inyectan desde los secretos.

**Ejemplo:** [CAPTURA DE `dist/` Y DEL WORKFLOW EN VERDE EN LA PESTAÑA ACTIONS].

---

## Entregables

- URL pública del proyecto: [ ]
- Captura del workflow de Actions en verde: [ ]
- Captura de las políticas RLS activas en Supabase: [ ]

## Fuentes consultadas

- GitHub Docs, dominio personalizado para Pages: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Docs, límites de Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Límites del plan gratuito de Supabase (Cloudzero): https://www.cloudzero.com/blog/supabase-pricing/
- Límites del plan gratuito de Supabase (Makerkit): https://makerkit.dev/blog/saas/supabase-pricing
- Página oficial de precios de Supabase: https://supabase.com/pricing
- Comparativa de hosting estático (Netlify, Cloudflare, GitHub Pages): https://developer.puter.com/blog/netlify-alternatives/
- Alternativas a GitHub Pages: https://bootstrap.build/articles/github-pages-alternatives/
- Comparativa de hosting Jamstack: https://guptadeepak.com/tools/top-5-static-site-hosting-jamstack-platforms-2026/
- Comparador de precios de dominios .co: https://domainoffer.net/tld/co?page=13
- Namecheap: https://www.namecheap.com
- Porkbun: https://porkbun.com
