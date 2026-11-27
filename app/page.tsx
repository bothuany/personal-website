import Motion from "@/components/motion";
import { ai, backend, belief, languages, path, site, tools } from "@/content/site";
import { NODE_H, countText, wire } from "@/lib/motion";

export default function Page() {
  const L = site.links;
  const nodes = Object.fromEntries(ai.flow.nodes.map(n => [n.id, n]));
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="cursor" aria-hidden="true" />
      <div className="intro" aria-hidden="true">
        <div className="count"><b>0</b><span>%</span></div>
        <p className="who mono">{site.name} · {site.city}</p>
      </div>

      <header className="top">
        <a className="mark" href="#top" aria-label="RBD, back to the top">RBD</a>
        <nav className="mono" aria-label="Sections">
          <a href="#backend">Backend</a>
          <a href="#ai">AI</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <div className="meter mono" aria-hidden="true"><b className="idx">01</b><span className="bar"><i /></span><span className="name">Hello</span></div>

      <main id="top">
        <section className="hero" data-name="Hello">
          <div className="stick">
            <canvas id="dots" aria-hidden="true" />
            <div className="cap">
              <div>
                <h1>{site.name}</h1>
                <p className="tagline">{site.tagline}</p>
              </div>
              <p>Software developer in {site.city}.</p>
            </div>
          </div>
        </section>

        <section className="statement" data-name="Belief">
          <div className="stick">
            <p className="say">
              {belief.lead.split(" ").map((w, i) => <span key={i} className="word">{w} </span>)}
              {belief.hot.split(" ").map((w, i) => <span key={`h${i}`} className="word hot">{w} </span>)}
            </p>
          </div>
        </section>

        <section className="numbers" id="backend" data-name="Backend" data-tone="light">
          <p className="scene-label mono">03 · Backend</p>
          <h3>{backend.title}</h3>
          <p className="intro-line">{backend.intro}</p>
          <div className="grid4 three">
            {backend.numbers.map(n => {
              const end = countText(n.to, n);
              return (
                <div key={n.text}>
                  <div className="big" data-to={n.to} data-format={n.format} data-suffix={n.suffix} data-decimals={n.decimals}>
                    {end.main}{end.sup && <sup>{end.sup}</sup>}
                  </div>
                  <p>{n.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="insilode" id="ai" data-name="AI">
          <div className="stick">
            <div className="left">
              <p className="kicker mono">04 · How I build</p>
              <h2>{ai.title}</h2>
              <ol className="feats">
                {ai.points.map((f, i) => <li key={i}><span className="n mono">{String(i + 1).padStart(2, "0")}</span><span>{f}</span></li>)}
              </ol>
              <div className="also">
                <p>{ai.insilode.lead} <b>{ai.insilode.name}</b>. {ai.insilode.text}</p>
                <a className="cta" href={ai.insilode.try} target="_blank" rel="noopener">Try Insilode <span aria-hidden="true">→</span></a>
                <a className="cta ghost" href={ai.insilode.github} target="_blank" rel="noopener">GitHub</a>
                <a className="cta ghost" href={ai.starter} target="_blank" rel="noopener">claude-starter</a>
              </div>
            </div>
            <div className="flow" aria-hidden="true">
              <svg viewBox="0 0 760 560" preserveAspectRatio="xMidYMid meet">
                {ai.flow.edges.map(([a, b, guess]) => (
                  <path key={a + b} className={`edge${guess ? " guess" : ""}`} d={wire(nodes[a], nodes[b])} />
                ))}
                {ai.flow.nodes.map(n => (
                  <g key={n.id} className="node" data-id={n.id} transform={`translate(${n.x} ${n.y})`}>
                    <rect width={n.w} height={NODE_H} rx={10} />
                    <text x={16} y={28} className="t">{n.t}</text>
                    <text x={16} y={47}>{n.s}</text>
                  </g>
                ))}
                <text x={470} y={340} className="tagl">↳ ACROSS A QUEUE</text>
                <text x={0} y={548} className="cap-l">A request through two services, as Insilode draws it</text>
                <circle r={14} className="halo" />
                <circle r={5} className="pulse" />
              </svg>
            </div>
          </div>
        </section>

        <section className="timeline" id="path" data-name="Path">
          <div className="stick">
            <h3>The path so far</h3>
            <div className="track">
              <div className="line"><i /></div>
              {path.map(p => (
                <div key={p.year} className="stop"><div className="yr">{p.year}</div><h4>{p.title}</h4><p>{p.text}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="tools" data-name="Tools">
          <p className="scene-label mono">06 · What I build with</p>
          {tools.map((row, i) => (
            <div key={i} className={`row${row.outline ? " out" : ""}`} data-speed={row.speed}>
              {[...row.items, ...row.items].map((t, j) => <span key={j} className={row.hot.includes(t) ? "hot" : undefined}>{t}</span>)}
            </div>
          ))}
          <div className="langs mono">
            {languages.map(l => <span key={l}>{l}</span>)}
            <a href={L.resume} target="_blank" rel="noopener">Full resume (PDF) →</a>
          </div>
        </section>

        <section className="contact" id="contact" data-name="Contact" data-tone="light">
          <p className="scene-label mono">07 · Contact</p>
          <div>
            <h2>Say<br />hello</h2>
            <a className="mail" href={`mailto:${L.email}`} aria-label={`Email ${L.email}`}>
              {[...L.email].map((c, i) => <span key={i} className="ch" aria-hidden="true">{c}</span>)}
            </a>
            <div className="links">
              <a href={L.github} target="_blank" rel="noopener">GitHub</a>
              <a href={L.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a href={L.medium} target="_blank" rel="noopener">Medium</a>
              <a href={L.resume} target="_blank" rel="noopener">Resume</a>
            </div>
          </div>
          <div className="end mono"><span>© 2026 {site.name}</span><span>{site.city}</span></div>
        </section>
      </main>
      <Motion />
    </>
  );
}
