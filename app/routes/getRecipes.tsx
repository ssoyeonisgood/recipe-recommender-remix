import { FC } from "react";
import Navigation from "~/components/navigation";
import UserInput from "~/components/UserInput";
import { motion } from "framer-motion";

const getRecipes: FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-blue-200">
      <Navigation logoImage="/logo2.png" textColor="text-black" />
      <div className="xxs:mt-18 xs:mt-10 xs:mb-5 xs:p-1 flex h-full w-full flex-col items-center p-10 sm:mt-12 sm:p-1 xl:mt-0 xl:w-4/5 xl:p-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="xxs:text-xl xxs:mb-0 mb-2 font-title text-3xl text-blue-900 sm:mb-2 sm:text-4xl md:mb-6 md:text-5xl xl:text-7xl"
        >
          Get Your Recipes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="xxs:text-sm xxs:mb-0 mb-4 max-w-xl text-center font-custom text-base sm:mb-0 sm:text-lg md:text-2xl"
        >
          Upload your ingredients&apos; image and we&apos;ll recommend delicious
          recipes using AI!
        </motion.p>
        <UserInput />
      </div>
    </div>
  );
};

export default getRecipes;
