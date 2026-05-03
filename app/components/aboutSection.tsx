import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@remix-run/react";
import { Camera, ChefHat, Github, Globe2, Sparkles } from "lucide-react";

const tech = ["TypeScript", "Remix", "Vercel AI SDK", "Netlify"] as const;

const ease = [0.25, 0.1, 0.25, 1] as const;

const features = [
  {
    icon: Camera,
    title: "Upload ingredient photos",
    body: "Snap what is in your fridge or on your cutting board; the app analyzes the image and fills in your ingredient list.",
  },
  {
    icon: Globe2,
    title: "Pick a cuisine",
    body: "Choose a style such as Korean or Italian so recipe suggestions match the vibe you want.",
  },
  {
    icon: Sparkles,
    title: "AI recipe ideas",
    body: "From your recognized ingredients and cuisine choice, AI suggests dishes you can actually cook right now.",
  },
] as const;

const usageSteps = [
  <>Open <strong className="text-zinc-800">Get Recipes</strong> from the top navigation.</>,
  <>
    Choose a photo, then tap <strong className="text-zinc-800">Recognize</strong>{" "}
    to detect ingredients.
  </>,
  <>Optionally edit ingredients and pick a cuisine.</>,
  <>
    Press <strong className="text-zinc-800">Search recipes</strong> to see AI
    suggestions. Expand a recipe for time, ingredients, and step-by-step
    instructions.
  </>,
] as const;

const AboutSection = () => {
  const blockRef = useRef(null);
  const inView = useInView(blockRef, { once: true, margin: "-48px" });

  const btnPrimary =
    "inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-center font-custom text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:w-auto sm:min-w-[11rem]";
  const btnSecondary =
    "inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-6 py-3.5 text-center font-custom text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:w-auto sm:min-w-[11rem]";

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-t border-zinc-200/90 bg-gradient-to-b from-zinc-50 via-white to-rose-50/40 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-200/60 to-transparent"
        aria-hidden
      />

      <div
        ref={blockRef}
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-14 lg:gap-16"
      >
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-custom text-xs font-semibold uppercase tracking-[0.2em] text-rose-600/90">
            About this site
          </p>
          <h2 className="mt-3 font-title text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Recipe Recommender
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease }}
            className="mt-5 font-custom text-lg leading-relaxed text-zinc-600 sm:text-xl"
          >
            This site is a web app that{" "}
            <strong className="font-semibold text-zinc-800">
              reads your ingredients from a photo and instantly suggests recipes
              with AI
            </strong>
            . The goal is to help you use what you already have and spend less
            time deciding what to cook.
          </motion.p>
        </header>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.06, ease }}
          className="grid w-full justify-items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {features.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white/80 p-5 text-left shadow-sm ring-1 ring-black/[0.03] backdrop-blur-sm transition hover:border-rose-200/80 hover:shadow-md"
            >
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="font-title text-lg text-zinc-900">{title}</h3>
              <p className="mt-2 font-custom text-sm leading-relaxed text-zinc-600 sm:text-[0.95rem]">
                {body}
              </p>
            </li>
          ))}
        </motion.ul>

        <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-14 xl:max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="w-full rounded-2xl border border-zinc-200/80 bg-white/70 p-6 text-left shadow-sm sm:p-8"
          >
            <h3 className="font-title text-xl text-zinc-900 sm:text-2xl">
              How to use
            </h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 font-custom text-[0.95rem] leading-relaxed text-zinc-600 sm:text-base">
              {usageSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, delay: 0.14, ease }}
            className="flex w-full flex-col items-center gap-6 lg:items-stretch"
          >
            <div className="w-full rounded-2xl border border-zinc-200/80 bg-white/80 p-6 text-left shadow-sm sm:p-7">
              <h3 className="font-title text-xl text-zinc-900 sm:text-2xl">
                Tech stack
              </h3>
              <p className="mt-3 font-custom text-[0.95rem] leading-relaxed text-zinc-600 sm:text-base">
                The UI and routing use{" "}
                <span className="font-semibold text-zinc-800">TypeScript</span>{" "}
                and <span className="font-semibold text-zinc-800">Remix</span>.
                AI features are powered by the{" "}
                <span className="font-semibold text-zinc-800">
                  Vercel AI SDK
                </span>
                , and the app is deployed on{" "}
                <span className="font-semibold text-zinc-800">Netlify</span>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-custom text-xs font-medium text-zinc-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex w-full max-w-md flex-col items-center gap-3 border-t border-zinc-200/90 pt-6 sm:max-w-none sm:flex-row sm:flex-wrap ">
              <Link to="/getRecipes" className={btnPrimary}>
                <ChefHat className="h-4 w-4 shrink-0" aria-hidden />
                Get recipes
              </Link>
              <a
                href="https://github.com/ssoyeonisgood/recipe-recommender-remix"
                target="_blank"
                rel="noopener noreferrer"
                className={btnSecondary}
              >
                <Github className="h-4 w-4 shrink-0" aria-hidden />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
