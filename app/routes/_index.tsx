import type { MetaFunction } from "@remix-run/node";
import UserInput from "~/components/UserInput";

export const meta: MetaFunction = () => {
  return [
    { title: "Recipe Recommender App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export interface Recipe {
  cookName: string;
  cookingTime: string;
  ingredients: { amount: string; name: string; }[];
  steps: string[];

}


export default function Index() {
  return (
    <main className="flex h-screen flex-col bg-white bg-cover bg-center">
      <div className="flex justify-center items-center h-full">
        <div className="bg-orange-100/70 border-dashed border-8 rounded-3xl sm:h-[90%] h-[95%] sm:w-4/5 w-[95%] flex justify-center items-center flex-col sm:gap-10 sm:p-10 p-5 gap-2">
          <div className="flex justify-center items-center flex-col gap-2">
            <h1 className="font-custom sm:text-6xl text-2xl font-bold text-center">Recipe Recommender</h1>
            <p className="text-gray-700 font-custom text-center text-sm sm:text-xl">Upload a picture of your ingredients and get recipe recommendations!</p>
          </div>
          <UserInput />
        </div>
      </div>
    </main>
  );
}