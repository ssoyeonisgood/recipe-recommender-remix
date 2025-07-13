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
    <div className="h-full w-full flex flex-col sm:gap-5 gap-2 sm:p-10">
      <div className="radial-repeating flex sm:flex-row flex-col sm:gap-10 gap-2 h-full border-8 p-4">
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
      <div className="flex justify-center items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="button-19 sm:w-60 w-full h-12"
              onClick={onSearchClick}
            >
              Search
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl sm:h-[90%] w-full h-full">
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
