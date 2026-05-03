import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { ArrowDown, ChefHat } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const btnPrimary =
  "inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-center font-custom text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:w-auto sm:min-w-[11rem]";
const btnSecondary =
  "inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-6 py-3.5 text-center font-custom text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 sm:w-auto sm:min-w-[11rem]";

const HomePage = () => {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-x-hidden overflow-y-visible px-4 py-10 sm:px-6 sm:py-12">
      {/* Rotating plate (clockwise) — behind overlays & content */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 flex h-[70vh] -translate-y-1/2 items-center justify-center"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease }}
      >
        <motion.img
          src="/plate_.png"
          alt=""
          className="h-full w-auto max-w-[min(92vw,1000px)] select-none object-contain object-center will-change-transform"
          initial={{ scale: 0.94 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            scale: { duration: 0.55, ease },
            rotate: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/45 via-white/35 to-white/65"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        className="relative z-10 mx-auto flex w-full min-w-0 max-w-2xl shrink-0 flex-col items-center px-6 py-10 text-center sm:max-w-4xl sm:px-10 sm:py-12 lg:max-w-5xl lg:px-14 lg:py-14 xl:max-w-6xl"
      >
        <p className="font-custom text-xs font-semibold uppercase tracking-[0.2em] text-rose-600/90">
          AI cooking companion
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease }}
          className="mt-4 w-full min-w-0 text-balance font-title text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.08]"
        >
          <span className="block text-zinc-900">Welcome to</span>
          <span className="mt-2 block bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text pb-1.5 text-transparent sm:mt-3 sm:pb-2 lg:pb-2.5">
            Recipe Recommender
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease }}
          className="mx-auto mt-6 max-w-xl font-custom text-lg leading-relaxed text-zinc-600 sm:text-xl"
        >
          Upload a photo of your ingredients, pick a cuisine, and get{" "}
          <strong className="font-semibold text-zinc-800">
            AI-matched recipe ideas
          </strong>{" "}
          you can cook tonight—same flow as the rest of this site.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
        >
          <Link to="/getRecipes" className={btnPrimary}>
            <ChefHat className="h-4 w-4 shrink-0" aria-hidden />
            Get recipes
          </Link>
          <Link to="/#about" className={btnSecondary}>
            <ArrowDown className="h-4 w-4 shrink-0" aria-hidden />
            Learn more
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
