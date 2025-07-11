import { FC } from "react";
import Navigation from "~/components/navigation";
import UserInput from "~/components/UserInput";
import { motion } from "framer-motion";

const getRecipes: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-blue-200">
      <Navigation logoImage="/logo2.png" textColor="text-black" />
      <div className="flex flex-col items-center justify-center h-full w-4/5 mt-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-title text-7xl mb-6 text-blue-900"
        >
          Get Your Recipes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="text-2xl font-custom max-w-xl text-center"
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
