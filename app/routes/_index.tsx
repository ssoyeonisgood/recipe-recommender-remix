import type { MetaFunction } from "@remix-run/node";
// import UserInput from "~/components/UserInput";
import HomePage from "~/components/homePage";
import AboutSection from "~/components/aboutSection";
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
    <main className="flex flex-col">
      <div className="flex min-h-screen flex-col bg-cover bg-center">
        <Navigation />
        <div className="flex min-h-0 flex-1 flex-col">
          <HomePage />
        </div>
      </div>
      <AboutSection />
    </main>
  );
}
