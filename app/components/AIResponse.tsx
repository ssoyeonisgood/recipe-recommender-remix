import { Recipe } from "~/routes/_index";
import { Skeleton } from "../components/ui/skeleton";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { AiFillAlert } from "react-icons/ai";
import { FcAlarmClock, FcTimeline, FcIdea } from "react-icons/fc";

const AIResponse = ({
  recipes,
  loadingRecipes,
  ingredients,
  selectedCuisine,
}: {
  recipes: Recipe[];
  loadingRecipes: boolean;
  ingredients: string[];
  selectedCuisine: string | null;
}) => {
  if (loadingRecipes) {
    return (
      <div>
        <DialogHeader>
          <DialogTitle className="xxl:text-5xl">Searching recipes...</DialogTitle>
          <DialogDescription className="xxl:text-5xl">
            AI is searching for recipes based on your ingredients.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-10 h-full w-full space-y-4 ">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    );
  }
  if (recipes.length === 0 && ingredients.length === 0) {
    return (
      <div>
        <DialogHeader className="flex flex-col items-center xxl:gap-10">
          <DialogTitle className="flex flex-row items-center justify-center xxl:gap-10">
            <AiFillAlert className="text-red-700 text-2xl mr-2 xxl:text-5xl" />
            <p className="xxl:text-5xl">Unable to Recommend Recipes</p>
            <AiFillAlert className="text-red-700 text-2xl ml-2 xxl:text-5xl" />
          </DialogTitle>
          <DialogDescription className="flex justify-center text-center xxl:text-5xl">
            We couldn&apos;t identify any ingredients. <br />
            Try uploading a clearer image or make sure you pressed the
            &apos;Recognize&apos; button.
          </DialogDescription>
        </DialogHeader>
      </div>
    );
  }

  if (recipes.length === 0 && ingredients.length > 0) {
    return (
      <div>
        <DialogHeader>
          <DialogTitle className="flex justify-center text-red-800">
            <AiFillAlert className="text-red-700 text-2xl mr-2 xxl:text-5xl" />
            No Recipes Found
            <AiFillAlert className="text-red-700 text-2xl mr-2 xxl:text-5xl" />
          </DialogTitle>
          <DialogDescription className="flex items-center justify-center text-center xxl:text-5xl">
            We couldn&apos;t find any recipes matching your selected ingredients
            <br />
            Try uploading a clearer image to get better results.
          </DialogDescription>
        </DialogHeader>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-3 items-center mb-3 font-custom">
        <FcIdea className="text-3xl xxl:text-8xl" />
        <DialogTitle className="xxl:text-5xl">Recipes</DialogTitle>
        <FcIdea className="text-3xl xxl:text-8xl" />
      </div>
      <DialogDescription className="text-sm xxl:text-5xl font-custom">
        {selectedCuisine === "" && (
          <span>
            You didn’t select a specific cuisine. We will show you random
            recipes.
            <br />
          </span>
        )}
        We found{" "}
        <span className="text-red-600 font-semibold">
          {recipes.length}
        </span>{" "}
        <span className="font-semibold">{selectedCuisine || ""} </span>
        recipe{recipes.length !== 1 ? "s" : ""} based on your ingredients.
        <br />
        Try making one using the ingredients you provided!
      </DialogDescription>
      <div className="flex flex-wrap p-2 overflow-auto xxl:p-10 font-custom">
        <Accordion type="single" collapsible className="w-full ">
          {recipes.map((recipe, index) => (
            <div key={index}>
              <AccordionItem value={index.toString()}>
                <AccordionTrigger className="text-xl font-custom xxl:text-5xl">
                  {recipe.cookName}
                </AccordionTrigger>
                <AccordionContent className="xxl:mb-20">
                  <div className="flex flex-row gap-2 items-center">
                    <FcAlarmClock className="text-xl xxl:text-5xl" />
                    <h3 className="font-semibold mb-2 xxl:text-5xl">{recipe.cookingTime}</h3>
                  </div>
                  <ul className="list-disc list-inside xxl:text-5xl">
                    {Array.isArray(recipe.ingredients) &&
                      recipe.ingredients.map(
                        (ing: { amount: string; name: string }, i: number) => (
                          <li key={i}>
                            {ing.amount} {ing.name}
                          </li>
                        )
                      )}
                  </ul>
                  <div className="flex flex-row gap-2 items-center mt-2 mb-2">
                    <FcTimeline className="text-xl xxl:text-5xl" />
                    <h3 className="font-semibold mt-2 xxl:text-5xl xxl:mt-20">Steps:</h3>
                  </div>
                  <ol className="list-decimal list-inside xxl:text-5xl">
                    {Array.isArray(recipe.steps) &&
                      recipe.steps.map((step: string, i: number) => (
                        <li key={i}>{step}</li>
                      ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AIResponse;
