import Link from "next/link";
import { Lora } from "next/font/google";
import Button from "../global/button";

const lora = Lora({ subsets: ["latin"], style: "italic" });

const Hero = () => {
  return (
    <section className="relative p-7 pt-[15vh] flex flex-col gap-8 items-center justify-center bg-[url(/hero.png)] bg-bottom bg-cover bg-blend-difference text-center">
      <div className="p-1 pl-4 flex gap-x-5 items-center rounded-full bg-[linear-gradient(90deg,#1C166E,#020208)] border border-white text-sm font-normal">
        <span>AutoFlow is an open-source automation platform</span>
        <Link
          href="https://github.com/AbdullahSheikh7"
          target="_blank"
          className={`rounded-full px-4.5 py-2 bg-[#6D63FB] shadow-[inset_1px_1px_4px_1px_rgba(255,255,255,0.5),inset_-1px_-1px_4px_1px_rgba(0,0,0,0.5)] text-white text-xs`}
        >
          Meet the Developer
        </Link>
      </div>

      <h1 className="text-4xl font-medium leading-tight md:text-6xl">
        Automate your workflow
        <br />
        with <span className={`${lora.className} italic`}>AutoFlow</span>
      </h1>

      <p className="max-w-2xl text-base text-white/60 md:text-lg">
        Autoflow is a web-based automation software designed
        <br className="hidden md:block" />
        for everyone from individual to enterprise
      </p>

      <div className="flex items-center gap-4">
        <Button href="/sign-up" title="Get started" />
        <Button href="/docs" title="Read the blog" variant="outline" />
      </div>

      <div className="flex items-center gap-2 text-white/40">
        <span className="text-lg">↓</span>
        <span className="text-sm">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
