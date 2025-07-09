import type { MetaFunction } from "@remix-run/node";
// import UserInput from "~/components/UserInput";
import HomePage from "~/components/homePage";
import Introduction from "~/components/introduction";
import Navigation from "~/components/navigation";

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
      <div className="bg-[url('/plate.png')] bg-cover bg-center h-screen">
        <Navigation />
        <HomePage />
        <Introduction />
      </div>
    </main>
  );
}
