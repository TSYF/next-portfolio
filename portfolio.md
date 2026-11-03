# Portfolio Reference — Tomás Yañez

> **Purpose:** Context document for agents building the new portfolio in `next/`.
> Extracted on 2026-11-01 from the legacy Vue client (`client/`), the tRPC back-end
> (`back-end/`), and the resume at `/mnt/c/Users/tomas/Downloads/cv-lean.pdf`.
>
> **Rules for future agents:** Strings inside `»…«` are **verbatim source copy** — quote
> them as-is, don't paraphrase or "improve" them unless explicitly asked. Items marked
> ⚠️ are **known gaps** — do not invent content for them; ask the user instead.

---

## 1. Identity & Contact

| Field | Value |
|---|---|
| Name | Tomás Yañez (Tomás Yañez Yañez Figueroa) |
| Role | »Software Engineer« / »Ingeniero de Software« |
| Location | Santiago, Chile |
| Email | tomas.yanez.f@gmail.com |
| Phone | (56) 9 8186 6536 |
| GitHub | https://github.com/TSYF |
| LinkedIn | https://linkedin.com/in/tomas-yanez |
| YouTube | https://www.youtube.com/channel/UCaB8Ho8PfpYr-R8Sfa_hL8A |
| Site logo | »`<dev-tom>`« (rendered as `&lt;dev-tom&gt;`, accent-colored, bold italic) |

**Note:** The site (`client/`) is written in **English**; the resume is written in **Spanish**.
Keep each in its own language — do not translate one into the other without being asked.

---

## 2. Positioning / Elevator Copy

From the resume (»SOBRE MÍ«, Spanish, verbatim):

> Soy un profesional con más de 5 años de experiencia en Desarrollo y Arquitectura de Software.
>
> Aprendí a programar a los 16 años y llevo 10 años programando de forma independiente, construyendo un basto conocimiento técnico.
>
> Soy un líder nato y disfruto enseñar a mis colegas.
> Me enorgullece la excelencia profesional y ayudar a otros a crecer.
> En mi tiempo libre, busco desafíos técnicos que impulsen mi crecimiento.

Headline stats usable for marketing copy: **5+ years** professional experience,
**10 years** programming independently, started at **age 16**.

### Languages (⚠️ resolved with user)

| Language | Level |
|---|---|
| Español | Nativo |
| Inglés | C2 (near-fluent) |

> ⚠️ The PDF's IDIOMAS section renders these as Canva graphics with no extractable text.
> The values above came from the user directly — they are authoritative.

---

## 3. Site Structure (legacy `client/`)

Vue 3 + Vite SPA, two routes:

| Route | Name | Component | Contents |
|---|---|---|---|
| `/` | `home` | `MainView.vue` | Intro → Services → About → Work |
| `/skill/:slug` | `skill` | `SkillView.vue` | Skill intro → Highlights (projects) |

Global chrome: `THeader.vue` (logo + hamburger + slide-in nav) around the route outlet,
`TFooter.vue` (email + social icons) below it.

**Nav links** (`TNavbar.tsx`, anchor scroll to sections):

- »Home« → `#home`
- »My Services« → `#services`
- »About me« → `#about`
- »My Work« → `#work`

**Maintenance gate** (`MainView.vue`): when `mode === 'prod' && maintenance`, every section
except the Intro is replaced by a single Maintenance section. Config comes from
`back-end/src/config.yml`, currently:

```yaml
mode: "dev"
maintenance: true
```

---

## 4. Section Copy (verbatim)

### 4.1 Intro — `TIntro.vue`

- H1: »Hi, I am **Tomás Yañez**« (name wrapped in `<strong>`, which displays `block`)
- Subtitle (highlighted pill): »SOFTWARE ENGINEER«
- Image alt: »a picture of Tomas Yañez smiling«
- Default image: `VITE_PICTURE_1` → `pfp-humita.jpg`

### 4.2 Maintenance — `Maintenance.vue`

Spanish, shown instead of the body in prod+maintenance:

> **¡Hola!**
> El sitio actualmente está en **mantención**. 🥲
> ¡Ya volverá mi portafolio **mejor que nunca**!

(Emphasis tiers: 1st `<strong>` white, 2nd `#ffffffbb`, 3rd accent.)

### 4.3 Services — `TServices.vue`

Section title: »What I do« · CTA button: »My Work« (anchor `#work`)

**Service 1 — »Web Design + Development«**

> Through lots of projects and training in Front-End Development I've acquired many
> software development skills, ass well as a sense for how a website should look and feel.
> I am able to use this sense to create beautiful web applications. I will make use of
> these skills to design and develop a tailored web application that represents your
> brand and values.

**Service 2 — »Desktop Applications«**

> I've studied extensively the skill of making desktop applications in the Java
> programming language. I will leverage that skill while always having user experience
> and functionality as the main focus of the project to make your dream desktop
> application while managing your requirements to get the best possible outcome for
> yourself and your organization.

> ⚠️ The first service copy contains the typo »ass well as« (should be »as well as«).
> It is verbatim source — fix it only if the user asks for copyediting.
>
> ⚠️ A third service slot (»WordPress«) exists only as commented-out lorem ipsum with a
> `TODO: Fill out another service.` There is no real third service yet.

### 4.4 About — `TAbout.vue`

- H2: »Who I am«
- Subtitle: »Software Dev based in Santiago«
- Image alt: »Tomas explaining something while looking at the camera man«
- Default image: `VITE_PICTURE_2` → `pfp-duoc.jpg`

> I am a very curious person and full of enthusiasm. I always try to improve myself and
> give the best of me in everything I do, I love working on a team and tend to boost the
> teams I'm part of with motivation and leadership.
>
> Apart from Computer Science, I like chess, basketball and exercising. Although the
> thing that motivates me the most and always pushes me past my limits is fatherhood. I
> have a beautiful daughter for whom I strive to be the best father in the world.

### 4.5 Work — `TWork.vue`

- H2: »My Work«
- Subtitle: »A selection of my range of work«

Renders one card per skill, linking to `/skill/:slug`, with the skill's `description`
as card body text. ⚠️ All `skill.description` values are currently **NULL** in the DB —
see §5.2 for the recovered copy from a `.bkp` file.

### 4.6 Footer — `TFooter.vue`

- Email link text: »tomas.yanez.f@gmail.com«
- Social icons (Font Awesome): GitHub, LinkedIn, YouTube — all `target="_blank"`

### 4.7 Skill page — `SkillView.vue`

- H1: skill name, uppercased
- Subtitle: `texts[slug].subtitle`
- Section: »Highlights« / »What I'm proud of!« → project grid

### 4.8 Projects grid — `TProjects.vue`

- Figure caption = project `title` + `description`, revealed on hover
- Empty state (verbatim): »Whoops! Not any projects yet. I'll add some soon though!«

---

## 5. Data Model

Content is served over **tRPC** from `back-end/` (TypeORM + SQLite) and cached in a Pinia
store (`client/src/stores/generalStore.ts`). Endpoints: `readSiteConfig`, `readSkillsWithProjects`,
`readSkills`, `readProjects`, `readProject`, `health`.

### 5.1 Schema (`back-end/src/data/init.sql`)

```sql
project      (id, title, description, image, link, download)
skill        (id, name, subtitle, slug, description)
project_skill(project_id, skill_id)   -- many-to-many join
```

TypeScript entities: `back-end/src/entities/{Project,Skill,ProjectSkill}.ts`.

### 5.2 Seed data — the live content

**Skills** (`back-end/src/data/skill.sql`):

| id | name | subtitle | slug | description |
|---|---|---|---|---|
| 1 | Vue | »Front End!« | `vue` | ⚠️ NULL |
| 2 | HTML, CSS, JS | »The main pillars!« | `html-css-js` | ⚠️ NULL |
| 3 | Python | »King of data!« | `python` | ⚠️ NULL |
| 4 | Java | »Mine and craft!« | `java` | ⚠️ NULL |

**⚠️ Recovered skill descriptions** — the DB column is NULL, but the older
`client/src/components/sections/TWork.vue.bkp` still holds the original card copy:

| slug | Description (verbatim) |
|---|---|
| `vue` | »A JavaScript framework for Front-End development.« |
| `html-css-js` | »The three main pillars of the web. Every web front-end implements them.« |
| `python` | »N°1 language for Machine Learning and AI. There's frameworks and libraries for doing pretty much anything in it.« |
| `java` | »One of the most popular languages for software development. It's wide adoption despite it's steep learning curve serves as proof of it's reliability.« |

> These carry typos (»It's wide adoption«, »it's steep«, »it's reliability«) — verbatim.
> ⚠️ They are **not** currently served by the API. Confirm with the user before restoring.

**Projects** (`back-end/src/data/project.sql`):

| id | title | description | image | link | download |
|---|---|---|---|---|---|
| 1 | Cursos Alfaweb | »Vue + Firebase online course app« | `projects/cursos-alfaweb_project.png` | https://vue-fb-desafio-latam.web.app | false |
| 2 | E-Library | »Vue + Firebase online library app« | `projects/e-library_project.png` | https://vuefire-vite.web.app | false |

**Project↔skill links:** both projects → skill 1 (Vue) only.

### 5.3 Interface types

```ts
// client/src/stores/interfaces/project.ts
interface Project { title; image; description; link; download: boolean }
interface SkillViewText { subtitle: string; description?: string }
```

---

## 6. Design Tokens (`client/src/assets/main.scss`)

**Fonts**

- `--ff-primary: "Source Sans Pro", sans-serif` — body
- `--ff-secondary: "Source code Pro", monospace` — the highlighted subtitle pills
- `--fw-regular: 300`, `--fw-bold: 900`

**Color**

| Token | Value | Use |
|---|---|---|
| `--color-light` | `#fff` | page bg / text on dark |
| `--color-dark` | `#303030` | text on light; Services/Work/Highlights bg |
| `--color-accent` | `#16e0bd` | the brand teal — headings, buttons, logo, footer |
| `--color-accent-tr` | `#16e0bd20` | card hover background |
| `--color-light-tr` | `#fff1` | Work card background |
| `--color-light-tr-2` | `#fff7` | PNG/SVG image tile bg, maintenance text |
| `--color-light-tr-3` | `#ffffffbb` | maintenance emphasis tier 2 |
| `--color-dark-tr` | `#30303040` | project caption title |
| footer bg | `#111` | footer only |

> ⚠️ A retired accent `#CC7178` (dusty rose) is commented out in the source — teal won.

**Type scale** — mobile → `≥800px`: h1 `3rem→4.5rem`, h2 `2.25rem→3.75rem`,
h3 `1.25rem→1.5rem`, body `1rem→1.125rem`. Line-height `1.6`.

**Effects:** `--bs: 0.25em 0.25em 0.75em rgba(0,0,0,0.25)` drop shadow;
`transition: scale 200ms` on button hover (`scale: 1.1`); focus ring
`2px solid var(--color-accent)` with `2px` offset.

**Distinctive layout details worth preserving:**

- Intro photo has a `clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 100%, 0 50%)`
  notch on mobile; at `≥600px` it becomes a two-column grid with the subtitle
  breaking the grid (`left: -15em; width: calc(100% + 15em)`, right-aligned).
- About photo bottom-left corner: `border-bottom-left-radius: 120% 100%` (leaf shape).
- Services section sits on `services-bg.png`, dark, centered text, max `1000px` flex row at `≥800px`.
- Project hover: image `scale(1.2)` + fade over `750ms cubic-bezier(0.5,0,0.5,1)`,
  caption fades in at `250ms`.
- Nav: full-height dark panel sliding in from the right (`translateX(100%)` → `0`, `150ms`),
  hamburger turns accent when open.

---

## 7. Resume (cv-lean.pdf) — full content

**Meta:** 2 pages, A4, authored in Canva, title »cv-lean«, author »TOMAS YANEZ YANEZ FIGUEROA«.
Extracted with `pdftotext -layout`.

### Header

```
TOMÁS YAÑEZ                    tomas.yanez.f@gmail.com
                               (56) 9 8186 6536    in/tomas-yanez
INGENIERO DE SOFTWARE          Santiago, Chile      github.com/TSYF
```

### SOBRE MÍ

See §2 above (verbatim).

### IDIOMAS

Español: Nativo · Inglés: C2 — *(values supplied by user; not in PDF text layer)*

### EXPERIENCIA

**2026-01 – AHORA | FALABELLA — Ingeniero Full Stack**
Referencia: Alejandro Henriquez (IT Project Lead) +56 9 4931 9574

- Diseñé y desplegué microservicios para miles de usuarios activos diarios.
- Apliqué flujos ágiles y centrados en AI para mejorar la productividad.
- Colaboré con stakeholders para resolver necesidades de negocio.

**2025-02 – 2025-11 | UBIQUITY**
Referencia: Ivan Montecino (COO) +56 9 4567 2622

- *Arquitecto de Sistemas y Especialista en Ciberseguridad*
  - Diseñé, implementé y gestioné la infraestructura cloud de la empresa.
  - Reduje costos y aumenté la disponibilidad mediante una arquitectura escalable.
  - Documenté nuevas implementaciones de software.
  - Realicé pruebas de penetración, hardening y monitoreo de sistemas.
- *Líder del Equipo de TI y Desarrollo*
  - Aseguré el cumplimiento oportuno de los SLA de soporte y desarrollo.
  - Gestioné proyectos de desarrollo y arquitectura de software.
  - Potencié la gestión de requisitos, la productividad y la cultura del equipo.
- *Ingeniero Full Stack y DevOps*
  - Implementé observabilidad con logs, métricas, trazas y alertas.
  - Containericé aplicaciones y creé entornos estables con devcontainers.
  - Diseñé pipelines DevOps y DevSecOps, automatizando CI/CD y promoviendo el control de versiones.

**2025-02 – 2026-03 | FOCAL — Consultor de Ingeniería**
Referencia: Nelly Briones (COO) +56 9 3109 8241

- Agilicé la planificación aportando experiencia técnica para resolver necesidades del negocio.
- Capacité a colaboradores en habilidades técnicas, gestión y liderazgo.
- Revisé y actualicé documentos para asegurar la excelencia técnica en TI.

**2024-11 – 2025-01 | GTRACK — Ingeniero Full Stack Senior**

- Desarrollé funcionalidades para la aplicación principal.
- Realicé migraciones y aseguré la integridad de datos entre plataformas.
- Brindé atención al cliente mediante canales de soporte técnico.

**2023-04 – MID 2024-04 | STECH — Ingeniero Full Stack**
Referencia: Osvaldo Bustamante (Jefe TI) - +56 9 8782 4323

- Diseñé e implementé soluciones de software en más de cinco sistemas.
- Resolví problemas en productos de la empresa, incluida una app con más de 17.000 usuarios.
- Gestioné despliegues en cinco o más sistemas y máquinas virtuales.

**2022-10 – MID 2023-03 | FACTURACION.CL — Ingeniero Full Stack**

- Implementé funcionalidades en más de 20 flujos de negocio.
- Agilicé el desarrollo redactando y presentando más de 25 documentos técnicos.
- Resolví problemas en más de 20 módulos.

#### TRABAJO FREELANCE INDEPENDIENTE

**2023-02 – 2023-07 | Ingeniero de Software Full Stack | AR Repuestos**

- Desarrollé un frontend responsivo, un modelo de datos con más de 50 productos y un backend
  seguro, con respuestas inferiores a 600 ms y pruebas OWASP Top 10.

**2024-02 – 2024-07 | Ingeniero y Arquitecto de Backend | AR Detailing**

- Diseñé requisitos para una app móvil con cuatro líneas de negocio, construí una arquitectura
  de 10 microservicios y gestioné su infraestructura cloud en más de 7 servicios.

**2022-02 – 2022 | DESARROLLADOR WEB FREELANCE** *(no detail lines in source)*

### EDUCACIÓN

| Period | Credential | Institution |
|---|---|---|
| 2021–2022 | Desarrollo Front-End — Graduado | LATAM Challenge Academy |
| 2022–2024 | Técnico en Ingeniería Informática — Graduado | Duoc UC |
| 2022–2025 | Licenciatura en Ingeniería Informática — Graduado | Duoc UC |

### CERTIFICACIONES

| Year | Certification | Institution |
|---|---|---|
| 2021 | Fundamentos de Blue Team | Santiago de Chile University |
| 2021 | Fundamentos de Arquitectura Cloud en AWS | Santiago de Chile University |
| 2021 | Herramientas Digitales para Ciberseguridad | Santiago de Chile University |

### HABILIDADES

| Category | Tools |
|---|---|
| Bases de datos / Data Warehouses | SQL, MySQL, PostgreSQL, Oracle ADB, SQL Server, BigQuery, Firebase Realtime Database, Firestore, MongoDB |
| Análisis de datos | Power BI, Looker Studio, Excel, Jupyter Notebooks, TensorFlow |
| Lenguajes de programación | C, Rust, Python, PHP, Go, Java, JavaScript, TypeScript |
| Backend | Django, Flask, Laravel, Spring Boot, NestJS, Express.js, CodeIgniter, Actix, Gin, Mux |
| Frontend | Vue, Angular, React, Ionic, Pug, HTML, CSS, SASS, SCSS, Bootstrap, Vuetify, Ant Design |
| DevOps | Docker, Podman, Kubernetes, Linux, Git, GitHub Actions, GitLab CI, Jenkins, Terraform, CI/CD, SonarQube |
| Cloud | AWS, GCP, DigitalOcean, Linode |
| Protocolos y comunicaciones | REST, gRPC, tRPC, MQTT, AMQP, GraphQL, WebSockets |
| Testing | Pytest, PHPUnit, Jest, Cypress, Vitest |
| Seguridad | OWASP ZAP, Nessus, Caido, Metasploit Framework, Atomic Red Team |
| Redes y monitoreo | Wireshark, Nmap, Wazuh |
| Orquestación y automatización | n8n, Kestra, Apache Airflow |
| Servidores y proxies | Apache Httpd, Nginx, HAProxy |
| Procesamiento de datos | Dataflow, Apache Beam, BigQuery Dataform, Cloud Run Functions |

### PROYECTOS

**EL FRAMEWORK WEB UNIVERSAL** — *Proyecto de programación de redes de bajo nivel* · [En desarrollo]

> Proyecto de networking en C, basado en sockets TCP, para crear un framework universal de
> servidores web de alto rendimiento. En fases futuras añadirá adaptadores para más de 7
> lenguajes e invitará a contribuciones Open Source.

---

## 8. Asset Inventory

All under `client/src/assets/img/`:

| File | Used for |
|---|---|
| `pfp-humita.jpg` | Hero portrait (`VITE_PICTURE_1`) |
| `pfp-duoc.jpg` | About portrait (`VITE_PICTURE_2`) |
| `tomas-dev_1.jpeg`, `tomas-dev_2.jpeg` | Unused alternates |
| `services-bg.png` | Services section background |
| `vue.png`, `html-css-js.png`, `python.png`, `java.png` | Skill cards + skill-page hero (filename = `<slug>.png`) |
| `projects/cursos-alfaweb_project.png` | Cursos Alfaweb thumbnail |
| `projects/e-library_project.png` | E-Library thumbnail |

Also: `public/favicon.ico`, Font Awesome loaded externally.

---

## 9. Tech Stack — legacy vs target

| | `client/` (legacy) | `next/` (target) |
|---|---|---|
| Framework | Vue 3.3 + Vite 5 | Next.js 16.0.0-beta + React 19.3 |
| State | Pinia | — |
| Routing | vue-router 4 (history mode) | Next routing |
| Data | tRPC v10 client → `back-end/` | — |
| Validation | zod 3 | — |
| Styling | Sass (single `main.scss`, CSS custom props) | — |
| Tests | Vitest + Cypress | — |
| Tooling | pnpm | **Vite+ (`vp`)**, pnpm 12.16.1 |

`next/` conventions (`next/AGENTS.md`): run `vp install` after pulling, `vp check` + `vp test`
before finishing, `vpx <file>` to run TS scripts, `vp env doctor` for setup issues.
Scripts available: `dev`, `build`, `start`, `build:static` (→ `next out`, static export).

---

## 10. Open Questions for the User

1. ⚠️ Should the four skill descriptions from §5.2 be restored? They're not in the DB.
2. ⚠️ Is the third service slot (§4.3) meant to be filled, or dropped?
3. ⚠️ Is »EL FRAMEWORK WEB UNIVERSAL« a real project to feature on the site? It's in the
   CV but has no presence in the portfolio.
4. ⚠️ Only 2 projects exist, both tied to the Vue skill — the other three skills have empty
   Highlights pages. More projects, or drop the empty ones?
5. ⚠️ The CV is Spanish, the site is English. Should the new site ship bilingual, or one language?
6. ⚠️ Resume has real phone number and reference contacts with personal phone numbers.
   Should those appear on the public site, or CV-only?
