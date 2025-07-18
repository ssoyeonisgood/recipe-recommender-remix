import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@remix-run/react";

const AboutSection = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  const buttonClass = (bgColor: string) =>
    `relative w-full h-10 xxl:text-5xl xxl:h-full sm:h-20 max-w-[460px] ${bgColor} text-white font-custom text-base md:text-xl font-bold px-6 md:px-12 py-3 flex justify-center items-center leading-7 transform -rotate-2 cursor-pointer select-none after:content-[''] after:absolute after:border-2 after:border-white after:bottom-1 after:left-1 after:w-[calc(100%-1px)] after:h-[calc(100%-1px)] hover:after:bottom-[2px] hover:after:left-[2px]`;

  return (
    <section
      id="about"
      className="flex flex-col xl:flex-row gap-5 xl:gap-10 p-10 sm:p-14 ml:p-20 items-center justify-center h-full bg-blue-950"
    >
      <div className="xl:w-1/2 xl:h-full flex items-center justify-center">
        <p
          ref={titleRef}
          className="font-title text-xxl md:text-3xl xl:text-6xl text-pink-400 font-bold flex flex-col items-center justify-center gap-2 xl:gap-8 xxl:text-9xl"
        >
          Hello! This is
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={
              isTitleInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }
            }
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="text-white text-3xl md:text-5xl xl:text-8xl text-center xxl:text-[200px]"
          >
            Recipe Recommender,
          </motion.span>
          an AI web app.
        </p>
      </div>
      <div className="xl:w-1/2 h-full gap-4 sm:gap-6 flex flex-col xl:justify-center items-center relative overflow-auto xxl:gap-20">
        <div className="w-full relative">
          <img
            src="/sticker1.png"
            alt="sticker1"
            className="xxl:w-80  hidden xl:block w-40 z-10 relative top-0 left-0 rotate-[10deg] transform transition-transform duration-500 hover:rotate-[-10deg] hover:scale-105"
          />
        </div>
        <p className="font-custom text-white text-lg sm:text-xxl font-semibold z-10 relative xxl:text-6xl">
          This app uses AI to recommend recipes based on the ingredients you
          provide. You can upload an image of your ingredients, and the AI will
          recognize them and suggest recipes that you can cook with those
          ingredients. It&apos;s a fun and interactive way to discover new
          recipes and make the most out of what you have in your kitchen!
        </p>
        <p className="font-custom text-white text-lg sm:text-xxl font-semibold xxl:text-6xl">
          This web app is built using{" "}
          <span className="text-pink-500 font-bold">TypeScript</span>,{" "}
          <span className="text-pink-500 font-bold">Remix</span>, and the{" "}
          <span className="text-pink-500 font-bold">Vercel AI SDK</span>, and
          it&apos;s deployed on{" "}
          <span className="text-pink-500 font-bold">Netlify</span>. It combines
          a smooth user experience with powerful AI-driven recipe
          recommendations.
        </p>
        <div className="w-full xxl:h-96 h-60 relative flex flex-row gap-4 justify-center">
          <div className="lg:w-3/5 flex flex-col gap-3 sm:gap-6">
            <p className="font-custom text-white text-lg sm:text-xxl font-semibold xxl:text-6xl">
              Ready to try the Recipe Recommender?
            </p>
            <Link to="/getRecipes" className={buttonClass("bg-pink-600")}>
              Try it now!!
            </Link>
            <p className="font-custom text-white text-lg sm:text-xxl font-semibold xxl:text-6xl">
              Do you want to see my code?
            </p>
            <a
              href="https://github.com/ssoyeonisgood/recipe-recommender-remix"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("bg-blue-600")}
            >
              Go to my repo
            </a>
          </div>
          <div className="lg:w-2/5 relative">
            <img
              src="/sticker2.png"
              alt="sticker2"
              className="xxl:w-80 xxl:right-80 hidden lg:block w-40 absolute top-0 right-36 rotate-[-10deg] z-20"
            />
            <img
              src="/sticker3.png"
              alt="sticker3"
              className="xxl:w-80 hidden lg:block w-40 absolute top-12 right-10 rotate-[12deg] z-30 transform transition-transform duration-500 hover:rotate-[-10deg] hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
