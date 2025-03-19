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
          🌱 Currently working as a Junior Software Developer at ATP Tech, I'm
          contributing to various business-critical applications while
          continuously expanding my skill set. Let's connect and create
          something extraordinary together!
        </p>
      </div>
    </section>
  );
}
