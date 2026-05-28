export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 sm:p-24 font-sans">
      <main className="max-w-2xl w-full flex flex-col items-center text-center space-y-12">
        {/* Profile Header */}
        <section className="space-y-4">
          <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto border border-zinc-200 dark:border-zinc-700">
            SWJ
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">손우진</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">
            Python Engineer @ Toss (Viva Republica)
          </p>
          <p className="max-w-md mx-auto text-zinc-500 dark:text-zinc-400 leading-relaxed">
            깔끔하고 확장 가능한 설계를 지향하며, 복잡한 문제를 단순화하는 것을 즐기는 백엔드 개발자입니다. 
            기술을 통해 세상에 긍정적인 임팩트를 주는 것에 가치를 둡니다.
          </p>
        </section>

        {/* Experience Section */}
        <section className="w-full space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Experience</h2>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-lg">Toss (Viva Republica)</h3>
                <p className="text-zinc-500">Python Engineer</p>
              </div>
              <span className="text-sm text-zinc-400 tabular-nums">2021.10 — Present</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-lg">Cupist (GLAM)</h3>
                <p className="text-zinc-500">Backend Engineer</p>
              </div>
              <span className="text-sm text-zinc-400 tabular-nums">2021.01 — 2021.10</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {["Python", "Django", "FastAPI", "Java", "Kotlin", "Spring Boot", "MySQL", "Redis", "Kafka"].map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Links Section */}
        <section className="flex flex-wrap justify-center gap-6 pt-6">
          <a 
            href="https://github.com/swj9707" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/swj9707" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700"
          >
            LinkedIn
          </a>
          <a 
            href="https://swj-techblog.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700"
          >
            Blog
          </a>
        </section>
      </main>
    </div>
  );
}
