"use client";
import * as React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Recipe } from "~/routes/_index";
import AIResponse from "./AIResponse";
import UploadImage from "./uploadImage";
import BadgeBoard from "./badgeBoard";
import SeletCuisineType from "./selectCuisineType";

const UserInput = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loadingBadges, setLoadingBadges] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const onSearchClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoadingRecipes(true);
    setRecipes([]);
    setIsDialogOpen(true);

    if (ingredients.length === 0) {
      console.error("No ingredients to search for.");
      setLoadingRecipes(false);
      return;
    }

    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("selectedCuisine", selectedCuisine || ""); // Ensure selectedCuisine is included
    console.log("Selected cuisine:", selectedCuisine);
    console.log("Ingredients to search for:", ingredients);

    try {
      const response = await fetch("/api/generate_recipes", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log("Recipes generated:", data.recipes);
        setRecipes(data.recipes);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
    } finally {
      setLoadingRecipes(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 sm:gap-5 sm:p-3 md:p-10">
      <div className="radial-repeating flex h-full flex-col gap-2 overflow-auto border-8 p-4 sm:flex-row sm:gap-10">
        <UploadImage
          setIngredients={setIngredients}
          setLoadingBadges={setLoadingBadges}
        />
        <BadgeBoard
          ingredients={ingredients}
          setIngredients={setIngredients}
          loadingBadges={loadingBadges}
        />
        <SeletCuisineType
          setSelectedCuisine={setSelectedCuisine}
          selectedCuisine={selectedCuisine}
        />
      </div>
      <div className="flex items-center justify-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="button-19 xxl:h-28 xxl:w-1/5 xxl:text-5xl h-12 w-full sm:w-60"
              onClick={onSearchClick}
            >
              Search
            </Button>
          </DialogTrigger>
          <DialogContent className="xxl:max-w-[2000px] xxl:h-[90%] h-full w-full sm:max-w-3xl">
            <AIResponse
              recipes={recipes}
              loadingRecipes={loadingRecipes}
              ingredients={ingredients}
              selectedCuisine={selectedCuisine || ""}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserInput;
