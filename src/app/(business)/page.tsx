import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background stars */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1px_1px_at_20%_30%,rgba(255,255,255,0.4)_0%,transparent_40%),radial-gradient(1px_1px_at_80%_20%,rgba(255,255,255,0.3)_0%,transparent_40%),radial-gradient(1px_1px_at_60%_70%,rgba(255,255,255,0.3)_0%,transparent_40%)] opacity-40" />

      {/* Hero */}
      <section className="relative z-10 mx-auto mt-24 flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Badge */}
        <div className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm backdrop-blur">
          <span className="text-white/70">
            AutoFlow is an open-source automation platform
          </span>
          <Link
            href="#"
            className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-600"
          >
            Meet the Developer
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-medium leading-tight md:text-6xl">
          Automate your workflow
          <br />
          with{" "}
          <span className="font-serif italic text-indigo-300">AutoFlow</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl text-base text-white/60 md:text-lg">
          Autoflow is a web-based automation software designed
          <br className="hidden md:block" />
          for everyone from individual to enterprise
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="#"
            className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            Get started
          </Link>

          <Link
            href="#"
            className="rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:bg-white/5"
          >
            Read the blog
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-24 flex flex-col items-center gap-2 text-white/40">
          <span className="text-sm">Scroll Down</span>
          <span className="text-lg">↓</span>
        </div>
      </section>
    </main>
  );
}
