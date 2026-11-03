function BrowserBar({ label = "CASE STUDY" }) {
  return (
    <div className="project-browser-bar" aria-hidden="true">
      <i />
      <i />
      <i />
      <span>{label}</span>
    </div>
  );
}

function DiagramVisual() {
  return (
    <div className="diagram-canvas">
      <svg viewBox="0 0 800 460" fill="none" aria-hidden="true">
        <path d="M205 130 390 85M205 160l190 120M465 105l140 110M465 280l140-110" />
        <path d="m386 82 16-10-5 18M594 210l14 12-18 3M394 275l13 14-18 2" />
      </svg>
      <div className="diagram-node diagram-node--app">
        <small>COMPONENT</small>
        <strong>AppModule</strong>
        <span>imports</span>
      </div>
      <div className="diagram-node diagram-node--user">
        <small>MODULE</small>
        <strong>UserModule</strong>
        <span>providers · controllers</span>
      </div>
      <div className="diagram-node diagram-node--class">
        <small>CLASS</small>
        <strong>UserService</strong>
        <span>@Injectable()</span>
      </div>
      <div className="diagram-caption">
        <i /> AST in. Architecture out.
      </div>
    </div>
  );
}

function ServerVisual() {
  return (
    <div className="server-canvas">
      <div className="server-language">C</div>
      <div className="server-stack">
        <div>
          <small>APPLICATION</small>
          <strong>HttpServer</strong>
          <span>request · response</span>
        </div>
        <i>
          <b>↓</b>
        </i>
        <div>
          <small>TRANSPORT</small>
          <strong>TcpServer</strong>
          <span>socket · receive · send</span>
        </div>
      </div>
      <div className="server-status">
        <span>
          <i /> socket open
        </span>
        <code>127.0.0.1:8080</code>
      </div>
    </div>
  );
}

function RouterVisual() {
  return (
    <div className="router-canvas">
      <div className="router-method-list" aria-hidden="true">
        <span>GET</span>
        <span>POST</span>
        <span>PUT</span>
        <span>PATCH</span>
        <span>DELETE</span>
      </div>
      <div className="router-route router-route--one">
        <small>GET</small>
        <code>/products</code>
        <i>→</i>
      </div>
      <div className="router-route router-route--two">
        <small>GET</small>
        <code>
          /products/thing/<b>{"{id}"}</b>
        </code>
        <i>→</i>
      </div>
      <div className="router-route router-route--three">
        <small>USE</small>
        <code>middleware(req)</code>
        <i>→</i>
      </div>
      <div className="router-output">
        <span>RequestData</span>
        <strong>Params["id"]</strong>
      </div>
    </div>
  );
}

export default function ProjectVisual({ project, eager = false }) {
  if (project.image) {
    return (
      <div className="project-image-wrap">
        <BrowserBar label="EARLY PROJECT" />
        <img
          src={project.image}
          alt={`${project.title} application interface`}
          width="900"
          height="900"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      </div>
    );
  }

  return (
    <div
      className={`project-image-wrap project-generative project-generative--${project.visual}`}
      aria-hidden="true"
    >
      <BrowserBar label={`${project.year} / ${project.status}`} />
      {project.visual === "diagram" ? <DiagramVisual /> : null}
      {project.visual === "server" ? <ServerVisual /> : null}
      {project.visual === "router" ? <RouterVisual /> : null}
    </div>
  );
}
