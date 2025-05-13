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
}: {
  recipes: Recipe[];
  loadingRecipes: boolean;
  ingredients: string[];
}) => {
  if (loadingRecipes) {
    return (
      <div>
        <DialogHeader>
          <DialogTitle>Searching recipes...</DialogTitle>
          <DialogDescription>
            AI is searching for recipes based on your ingredients.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-10 h-full w-full space-y-4">
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
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center justify-center">
            <AiFillAlert className="text-red-700 text-2xl mr-2" />
            Unable to Recommend Recipes
            <AiFillAlert className="text-red-700 text-2xl ml-2" />
          </DialogTitle>
          <DialogDescription className="flex justify-center text-center">
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
            <AiFillAlert className="text-red-700 text-2xl mr-2" />
            No Recipes Found
            <AiFillAlert className="text-red-700 text-2xl mr-2" />
          </DialogTitle>
          <DialogDescription className="flex items-center justify-center text-center">
            We couldn&apos;t find any recipes matching your selected ingredients
            and cooking time. <br />
            Try adjusting the cooking time or uploading a clearer image to get
            better results.
          </DialogDescription>
        </DialogHeader>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-3 items-center mb-3">
        <FcIdea className="text-3xl" />
        <DialogTitle>Recipes</DialogTitle>
        <FcIdea className="text-3xl" />
      </div>
      <DialogDescription>
        We found{" "}
        <span className="text-red-600 font-semibold">{recipes.length}</span>{" "}
        recipe{recipes.length !== 1 ? "s" : ""} based on your ingredients and
        cooking time. <br />
        Try making one using the ingredients you provided!
      </DialogDescription>
      <div className="flex flex-wrap p-2 overflow-auto">
        <Accordion type="single" collapsible className="w-full">
          {recipes.map((recipe, index) => (
            <div key={index}>
              <AccordionItem value={index.toString()}>
                <AccordionTrigger className="text-xl font-custom">
                  {recipe.cookName}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row gap-2 items-center">
                    <FcAlarmClock className="text-xl" />
                    <h3 className="font-semibold mb-2">{recipe.cookingTime}</h3>
                  </div>
                  <ul className="list-disc list-inside">
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
                    <FcTimeline className="text-xl" />
                    <h3 className="font-semibold mt-2">Steps:</h3>
                  </div>
                  <ol className="list-decimal list-inside">
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
