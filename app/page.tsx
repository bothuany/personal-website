import Film from "@/components/film";
import { chapters, earlierInternships, experience, projects, school, site, skills } from "@/content/site";

export default function Page() {
  const L = site.links;
  return (
    <>
      <Film />

      <header className="matte top">
        <a className="mark" href="#top" aria-label="RBD, back to the start">RBD</a>
        <nav aria-label="Quick links">
          <a href="#credits">Credits</a>
          <a href={L.resume} target="_blank" rel="noopener">Resume</a>
          <a href={`mailto:${L.email}`}>Email</a>
        </nav>
      </header>
      <div className="matte bottom">
        <span id="where">Istanbul, blue hour</span>
        <button id="sound" type="button" aria-pressed="false">Sound off</button>
      </div>

      <main id="top">
        <section className="title" data-g="dusk" data-where="Istanbul, blue hour">
          <div className="card">
            <h1 aria-label="RBD, Recep Batuhan Dikmen">RBD</h1>
            <p className="name" lang="tr">{site.name}</p>
            <p className="role">{site.role}</p>
          </div>
        </section>

        {chapters.map(c => (
          <section key={c.where} className="chapter" data-g={c.grade} data-where={c.where} style={{ height: `${c.lines.length * 70 + 60}vh` }}>
            <div className="stage">
              <p className="super" lang={c.placeLang}>
                {c.place}
                <span lang="en">{c.when}</span>
              </p>
              <div className="subs">
                {c.lines.map(line => <p key={line}>{line}</p>)}
              </div>
            </div>
          </section>
        ))}

        <section className="credits" data-g="deep" data-where="Credits" data-flow id="credits" aria-label="Credits">
          <div className="group">
            <h2>RBD</h2>
            <p className="lone">a portfolio by {site.name}</p>
          </div>
          <div className="group">
            <h2>Work</h2>
            <dl>
              {experience.map(e => (
                <Row key={e.title} dt={e.title.toLowerCase()} dd={e.company} small={`${e.years}. ${e.note}`} />
              ))}
            </dl>
            <p className="lone">Earlier internships at {earlierInternships.join(", ")}</p>
          </div>
          <div className="group">
            <h2>Projects</h2>
            <dl>
              {projects.map(p => (
                <Row key={p.name} dt={p.org} dd={p.href ? <a href={p.href} target="_blank" rel="noopener">{p.name}</a> : p.name} small={p.summary} />
              ))}
            </dl>
          </div>
          <div className="group">
            <h2>Tools</h2>
            <dl>{skills.map(s => <Row key={s.group} dt={s.group} dd={s.items} />)}</dl>
          </div>
          <div className="group">
            <h2>School</h2>
            <dl>{school.map(s => <Row key={s.what} dt={s.what} dd={s.where} small={s.note} />)}</dl>
          </div>
          <div className="group">
            <h2>Shot on</h2>
            <p className="lone">a few hundred lines of GLSL, no footage</p>
          </div>
        </section>

        <section className="contact" data-g="dawn" data-where="Istanbul, first light">
          <div>
            <p className="label">Contact</p>
            <a className="mail" href={`mailto:${L.email}`}>{L.email}</a>
            <p className="links">
              <a href={L.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a href={L.github} target="_blank" rel="noopener">GitHub</a>
              <a href={L.medium} target="_blank" rel="noopener">Medium</a>
              <a href={L.resume} target="_blank" rel="noopener">Resume</a>
            </p>
            <p className="where">Istanbul, UTC+3</p>
          </div>
        </section>
      </main>
    </>
  );
}

function Row({ dt, dd, small }: { dt: string; dd: React.ReactNode; small?: string }) {
  return (
    <>
      <dt>{dt}</dt>
      <dd>
        {dd}
        {small ? <small>{small}</small> : null}
      </dd>
    </>
  );
}
