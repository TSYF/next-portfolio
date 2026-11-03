export const projects = [
  {
    slug: "nestjs-d2-diagrams",
    title: "NestJS D2 Diagrams",
    number: "01",
    year: "2026",
    status: "Open source · v1.3.0",
    summary: "Generate D2 component and class diagrams from NestJS projects",
    description:
      "A command-line tool that turns NestJS source code into C4-style component and class diagrams using D2.",
    tone: "cyan",
    visual: "diagram",
    featured: true,
    tags: ["TypeScript", "NestJS", "ts-morph", "D2"],
    stack: ["TypeScript", "Commander", "ts-morph", "D2", "NestJS"],
    repo: "https://github.com/TSYF/NestJS-D2-Diagrams",
    live: null,
    image: null,
    overview:
      "NestJS D2 Diagrams reads a NestJS project and generates two architecture views: a component diagram for modules and their imports, and a class diagram for dependency-injection relationships. It can also run interactively to add technology and description metadata to components.",
    challenge:
      "Architecture already exists in the source, but it is distributed across decorators, modules, and constructors. The goal was to make that structure visible without maintaining a second, hand-written diagram that drifts away from the code.",
    architecture: [
      {
        title: "Parse the TypeScript AST",
        description:
          "Uses ts-morph to read source files, @Module() decorator metadata, providers, controllers, exports, and class constructors.",
      },
      {
        title: "Understand dependency injection",
        description:
          "Detects typed constructor injections, @Inject() tokens, and optional dependencies across all classes—not only classes marked @Injectable().",
      },
      {
        title: "Generate portable D2",
        description:
          "Writes component-diagram.d2 and class-diagram.d2 files with C4-style structure. Interactive prompts can enrich components with descriptions and technology metadata.",
      },
    ],
    highlights: [
      "Component and class diagram generation",
      "Universal constructor-injection detection",
      "Interactive C4 metadata prompts",
      "Custom project and output paths",
    ],
    code: {
      label: "Generate both architecture views",
      language: "shell",
      content: "npx nest-d2 generate --project ./my-app --output ./docs/diagrams",
    },
  },
  {
    slug: "c-webserver",
    title: "C Webserver",
    number: "02",
    year: "2024",
    status: "In development",
    summary: "A low-level TCP and HTTP server framework written in C",
    description:
      "An in-development networking project built around TCP sockets, with separate TCP and HTTP layers and a small hash-table utility.",
    tone: "violet",
    visual: "server",
    featured: true,
    tags: ["C", "TCP sockets", "HTTP", "Hash tables"],
    stack: ["C", "POSIX sockets", "HTTP", "Make"],
    repo: "https://github.com/TSYF/c-webserver",
    live: null,
    image: null,
    overview:
      "C Webserver explores the foundation of a universal web server framework. The current source separates the TCP transport from HTTP requests and responses, exposes configurable constructors, and includes test executables for both server layers.",
    challenge:
      "The project is about understanding the machinery that higher-level web frameworks hide: configuring sockets, receiving bytes, modeling requests and responses, and sending a well-formed HTTP response.",
    architecture: [
      {
        title: "TCP transport layer",
        description:
          "TcpServer owns the socket configuration and exposes launch, receive, handle, output, and send functions. Domain, service, protocol, interface, port, and backlog are configurable.",
      },
      {
        title: "HTTP request and response model",
        description:
          "The HTTP layer separates method, path, version, headers, and body, while responses model status, content type, location, and body with dedicated response helpers.",
      },
      {
        title: "Utilities and test binaries",
        description:
          "A hash-table implementation supports HTTP headers and statuses. TestTcpServer, TestHttpServer, and a Makefile provide focused entry points for exercising the two layers.",
      },
    ],
    highlights: [
      "TCP socket abstraction",
      "HTTP request and response structures",
      "Hash-table-backed headers and statuses",
      "Separate TCP and HTTP test servers",
    ],
    note: {
      title: "The universal direction",
      description:
        "The longer-term roadmap is a high-performance universal web framework with adapters for more than seven languages and an invitation for open-source contributions. Those adapters are future work, not a claim about the current build.",
    },
  },
  {
    slug: "go-router",
    title: "Go Router",
    number: "03",
    year: "2024",
    status: "Open-source experiment",
    summary: "A simple web HTTP framework in Go using just the net/http module",
    description:
      "A small HTTP router with method-specific handlers, route parameters, middleware, and a RequestData wrapper built on Go’s standard library.",
    tone: "orange",
    visual: "router",
    featured: true,
    tags: ["Go", "net/http", "Routing", "Middleware"],
    stack: ["Go", "net/http", "regexp"],
    repo: "https://github.com/TSYF/go-router",
    live: null,
    image: null,
    overview:
      "Go Router is an experiment in building the routing layer directly on net/http. It supports GET, POST, PUT, PATCH, and DELETE handlers, parameterized paths such as /products/{id}, prefix-based middleware, and a Listen helper with defaults.",
    challenge:
      "The aim was to learn what a framework actually does beneath its API: matching methods and paths, enriching requests with parameters, running middleware, and satisfying Go’s http.Handler interface.",
    architecture: [
      {
        title: "A standard-library HTTP handler",
        description:
          "Router implements ServeHTTP. RequestData embeds http.Request and adds a parameter map, so handlers keep access to the original request while receiving route values.",
      },
      {
        title: "Methods and parameterized routes",
        description:
          "Each HTTP verb has its own handler map. A {parameter} expression identifies dynamic segments and extracts their values into RequestData.Params.",
      },
      {
        title: "Prefix middleware",
        description:
          "The Use API registers method-specific middleware against path prefixes. Matching middleware runs before the resolved route handler.",
      },
    ],
    highlights: [
      "Five HTTP method registration APIs",
      "Dynamic {id} route parameters",
      "Method and path-aware middleware",
      "A small example product API",
    ],
    code: {
      label: "A route with a dynamic parameter",
      language: "go",
      content:
        'router.Get("/products/thing/{id}", func(res http.ResponseWriter, req *r.RequestData) {\n  res.Write([]byte("Here\'s your id: " + req.Params["id"]))\n})',
    },
  },
  {
    slug: "cursos-alfaweb",
    title: "Cursos Alfaweb",
    number: "04",
    year: "2022",
    status: "Early project",
    summary: "Vue + Firebase online course app",
    description:
      "An early course-management application with authentication, protected administration routes, and course creation and editing flows.",
    tone: "cyan",
    visual: "screenshot",
    featured: false,
    tags: ["Vue 2", "Firebase", "Vuetify", "Vuex"],
    stack: ["Vue 2", "Vue Router", "Vuex", "Firebase Authentication", "Vuetify", "Vuelidate"],
    repo: "https://github.com/TSYF/Cursos-Alfaweb",
    live: "https://vue-fb-desafio-latam.web.app",
    image: "/images/cursos-alfaweb.png",
    overview:
      "Cursos Alfaweb combines public course browsing with login and registration views, a protected administration area, and dedicated screens for adding and editing courses. It is an early exploration of a complete Vue and Firebase product flow.",
    challenge:
      "Create one application that could serve visitors browsing courses and authenticated administrators maintaining course content, while keeping each task in a clear, dedicated view.",
    architecture: [
      {
        title: "View and route structure",
        description:
          "Vue Router separates home, login, registration, administration, and course-editing routes. Navigation guards redirect unauthenticated visitors away from admin views.",
      },
      {
        title: "Application state and identity",
        description:
          "Vuex coordinates application state while Firebase Authentication supports the login and registration flows and the protected admin experience.",
      },
      {
        title: "Course administration UI",
        description:
          "Vuetify drawers, dialogs, and an admin table shape the management experience, with Vuelidate and form helpers supporting course and account forms.",
      },
    ],
    highlights: [
      "Course creation and editing",
      "Protected admin and edit routes",
      "Login and registration flows",
      "Reusable drawers, dialogs, and validation rules",
    ],
  },
  {
    slug: "e-library",
    title: "E-Library",
    number: "05",
    year: "2022",
    status: "Early project",
    summary: "Vue + Firebase online library app",
    description:
      "An early Vue and Firebase application for authenticated users to save, edit, and organize a personal library of URLs.",
    tone: "orange",
    visual: "screenshot",
    featured: false,
    tags: ["Vue 3", "Firebase", "Pinia", "Ant Design Vue"],
    stack: [
      "Vue 3",
      "Vite",
      "Pinia",
      "Firestore Lite",
      "Firebase Authentication",
      "Ant Design Vue",
    ],
    repo: "https://github.com/TSYF/vuefire-antd",
    live: "https://vuefire-vite.web.app",
    image: "/images/e-library.png",
    overview:
      "E-Library pairs account registration and sign-in with a personal URL collection. Users can add, edit, and delete records, receive a short NanoID for each saved URL, and query only documents associated with their account.",
    challenge:
      "Pair a small personal content library with account-based data and straightforward CRUD interactions, including ownership checks when records are changed or removed.",
    architecture: [
      {
        title: "Pinia data stores",
        description:
          "Separate URL and user stores coordinate authentication state, document loading, and create, edit, and delete actions without coupling those concerns to individual components.",
      },
      {
        title: "User-scoped Firestore records",
        description:
          "Each URL document stores the authenticated user ID. Queries filter by that ID, and edit and delete actions verify that the document belongs to the current user.",
      },
      {
        title: "Vue component and test setup",
        description:
          "Dedicated URL form, list, and edit components keep interactions focused. Vitest and Cypress configurations provide unit and end-to-end testing entry points.",
      },
    ],
    highlights: [
      "URL creation, editing, and deletion",
      "User-scoped queries and ownership checks",
      "NanoID short identifiers",
      "Vitest and Cypress testing setup",
    ],
    code: {
      label: "A query scoped to the signed-in user",
      language: "javascript",
      content: 'const q = query(col, where("user", "==", uid));',
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const archiveProjects = projects.filter((project) => !project.featured);

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
