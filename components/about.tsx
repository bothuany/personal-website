export default function About() {
  return (
    <section id="about" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-foreground">About Me</h2>
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
        <p className="text-muted-foreground">
          👋 Hey there! I'm a passionate Software Engineer with a deep love for
          technology since childhood. With a strong academic background and
          hands-on experience, I'm constantly pushing the boundaries of what's
          possible in software development.
        </p>

        <div className="text-muted-foreground">
          <p className="font-semibold mb-2">🚀 What I Bring to the Table:</p>
          <ul className="list-none space-y-2">
            <li>💻 Full-stack expertise with focus on backend development</li>
            <li>🧩 Problem solver who loves tackling complex challenges</li>
            <li>📚 Continuous learner passionate about innovation</li>
            <li>🤝 Team player with strong collaboration skills</li>
          </ul>
        </div>

        <div className="text-muted-foreground">
          <p className="font-semibold mb-2">🎯 My Approach:</p>
          <ul className="list-none space-y-2">
            <li>✨ Writing clean, maintainable, and efficient code</li>
            <li>🔄 Embracing agile methodologies</li>
            <li>🌟 Delivering high-quality solutions</li>
            <li>🚀 Driving innovation in every project</li>
          </ul>
        </div>

        <p className="text-muted-foreground">
          🌱 Currently, I'm a software engineer at Turkcell working on enterprise
          applications and internal platforms. I enjoy building clean, maintainable
          systems — from microservice architectures with Kafka & Kubernetes to
          full-stack apps with Spring Boot and React. I also explore ways to
          integrate AI tooling (Cursor, MCP) into everyday development workflows.
          Previously worked at ATP Tech and interned at Eczacıbaşı Bilişim,
          Softtech, OBSS Technology, and TUSAŞ (Turkish Aerospace).
        </p>
      </div>
    </section>
  );
}
