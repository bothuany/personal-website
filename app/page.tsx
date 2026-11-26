import Motion from "@/components/motion";
import { belief, insilode, languages, numbers, path, site, starter, tools } from "@/content/site";
import { NODE_H, countText, wire } from "@/lib/motion";

export default function Page() {
  const L = site.links;
  const nodes = Object.fromEntries(insilode.flow.nodes.map(n => [n.id, n]));
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
          <a href="#insilode">Insilode</a>
          <a href="#path">Path</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <div className="meter mono" aria-hidden="true"><b className="idx">01</b><span className="bar"><i /></span><span className="name">Hello</span></div>

      <main id="top">
        <section className="hero" data-name="Hello">
          <div className="stick">
            <canvas id="dots" aria-hidden="true" />
            <div className="cap">
              <h1>{site.name}</h1>
              <p>Software developer in {site.city}. <b>I build Insilode</b>, an editor that shows how code runs.</p>
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

        <section className="insilode" id="insilode" data-name="Insilode">
          <div className="stick">
            <div className="left">
              <p className="kicker mono">What I’m building · open source</p>
              <h2>Insilode</h2>
              <p className="tag">{insilode.tagline} <em>{insilode.tagHot}</em></p>
              <ol className="feats">
                {insilode.features.map((f, i) => <li key={i}><span className="n mono">{String(i + 1).padStart(2, "0")}</span><span>{f}</span></li>)}
              </ol>
              <a className="cta" href={insilode.links.try} target="_blank" rel="noopener">Try it in your browser <span aria-hidden="true">→</span></a>
              <a className="cta ghost" href={insilode.links.github} target="_blank" rel="noopener">GitHub</a>
            </div>
            <div className="flow" aria-hidden="true">
              <svg viewBox="0 0 760 560" preserveAspectRatio="xMidYMid meet">
                {insilode.flow.edges.map(([a, b, guess]) => (
                  <path key={a + b} className={`edge${guess ? " guess" : ""}`} d={wire(nodes[a], nodes[b])} />
                ))}
                {insilode.flow.nodes.map(n => (
                  <g key={n.id} className="node" data-id={n.id} transform={`translate(${n.x} ${n.y})`}>
                    <rect width={n.w} height={NODE_H} rx={10} />
                    <text x={16} y={28} className="t">{n.t}</text>
                    <text x={16} y={47}>{n.s}</text>
                  </g>
                ))}
                <text x={470} y={340} className="tagl">↳ ACROSS A QUEUE</text>
                <circle r={14} className="halo" />
                <circle r={5} className="pulse" />
              </svg>
            </div>
          </div>
        </section>

        <section className="numbers" data-name="Numbers" data-tone="light">
          <p className="scene-label mono">04 · Day job, in numbers</p>
          <h3>The systems I work on are used by a lot of people.</h3>
          <div className="grid4">
            {numbers.map(n => {
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
          <p className="day mono">Software developer at Turkcell since 2025</p>
        </section>

        <section className="starter" data-name="Method" data-tone="light">
          <p className="scene-label mono">05 · How I work with AI</p>
          <div className="rules">
            {starter.rules.map(r => <p key={r} className="rule">{r}<span>.</span></p>)}
          </div>
          <div className="foot">
            <p>{starter.text}</p>
            <a className="cta dark" href={starter.href} target="_blank" rel="noopener">claude-starter on GitHub <span aria-hidden="true">→</span></a>
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
          <p className="scene-label mono">07 · What I build with</p>
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
          <p className="scene-label mono">08 · Contact</p>
          <div>
            <h2>Write<br />to me</h2>
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
