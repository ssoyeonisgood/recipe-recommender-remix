import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
// import UserInput from "~/components/UserInput";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "Recipe Recommender App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export interface Recipe {
  cookName: string;
  cookingTime: string;
  ingredients: { amount: string; name: string }[];
  steps: string[];
}

export default function Index() {
  return (
    <main className="flex h-screen flex-col">
      <div>
        <div className="relative bg-[url('/plate.png')] bg-cover bg-center h-screen">
          <nav className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </Link>
          </nav>
          <div className="flex flex-col items-center justify-center text-center h-full bg-black bg-opacity-50">
            <motion.h1
              className="text-8xl text-pink-400 font-bold font-title mb-4"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Recipe Recommender
            </motion.h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full bg-blue-950"></div>
      </div>
    </main>
  );
}
