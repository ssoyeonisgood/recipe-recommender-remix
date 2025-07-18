import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full bg-black bg-opacity-50">
      <motion.h1
        className="text-5xl sm:text-8xl text-white font- font-title mb-4 xxl:text-[200px]"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to
      </motion.h1>
      <motion.h1
        className="text-5xl sm:text-8xl text-pink-400 font-bold font-title mb-4 xxl:text-[200px]"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Recipe Recommender
      </motion.h1>
    </div>
  );
};

export default HomePage;
