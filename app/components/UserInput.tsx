"use client";
import * as React from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import IngredientBadge from "./IngredientBadge";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { useRef, useState } from "react";
import { Recipe } from "~/routes/_index";
import { CiImageOn } from "react-icons/ci";
import AIResponse from "./AIResponse";
import { compressFile } from "~/lib/utils";
import { cookingTimeOptions } from "~/lib/values";

const UserInput = () => {
  const [cookingTime, setCookingTime] = useState(cookingTimeOptions[0].value);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loadingBadges, setLoadingBadges] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const onImageAnalyzeClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLoadingBadges(true);
    event.preventDefault();

    const formData = new FormData();
    const fileInput = fileInputRef.current;

    if (fileInput?.files && fileInput.files[0]) {
      const originalFile = fileInput.files[0];
      const compressedFile = await compressFile(originalFile);
      formData.append("file", compressedFile);

      try {
        const response = await fetch("/api/analyze_image", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          console.log("File uploaded:", data.ingredientLabels);
          const ingredientLabels = data.ingredientLabels.map(
            (label: { name: string }) => label.name
          );
          setIngredients(ingredientLabels);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoadingBadges(false);
      }
    }
  };

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
    console.log(ingredients);
    formData.append("cookingTime", cookingTime);

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
    <div className="h-full w-full flex flex-col sm:gap-10 gap-2 sm:p-10">
      <div className="flex sm:flex-row flex-col sm:gap-10 gap-2 h-full">
        <div className="flex flex-col sm:gap-5 gap-2 sm:w-1/2 sm:h-full h-[60%]">
          <div>
            <Label htmlFor="picture">Picture</Label>
            <Input
              ref={fileInputRef}
              accept="image/*"
              id="picture"
              type="file"
              className="border-black"
              onChange={handleImageChange}
            />
          </div>
          <div className="rounded-xl border-2 h-full border-dotted border-black/20 sm:p-4 p-1 flex flex-col gap-2 justify-center items-center text-5xl">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-auto sm:max-h-[350px] max-h-[190px] object-contain rounded-xl"
              />
            ) : (
              <CiImageOn />
            )}
          </div>
          <Button className="w-full" onClick={onImageAnalyzeClick}>
            Recognize
          </Button>
        </div>
        <div className="flex flex-col gap-2 sm:w-1/2 sm:h-full h-[40%]">
          <div className="h-full w-full flex flex-col gap-1">
            <Label htmlFor="ingredients">Ingredients</Label>
            {loadingBadges ? (
              <div className="h-full bg-white rounded-xl p-4 space-y-2 shadow-md">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-1/2 sm:visible hidden" />
                <Skeleton className="h-6 w-2/3 sm:visible hidden" />
                <Skeleton className="h-6 w-full sm:visible hidden" />
              </div>
            ) : (
              <div
                id="ingredients"
                className=" bg-orange-200 rounded-xl p-4 overflow-auto flex flex-wrap gap-2"
              >
                <div className="flex flex-wrap gap-2 overflow-auto sm:max-h-[350px] max-h-[100px]">
                  {ingredients.length > 0 ? (
                    ingredients.map((ingredient) => (
                      <IngredientBadge
                        key={ingredient}
                        ingredientName={ingredient}
                        onRemove={() =>
                          setIngredients(
                            ingredients.filter((i) => i !== ingredient)
                          )
                        }
                      />
                    ))
                  ) : (
                    <p className="text-gray-700 font-custom">
                      No ingredients recognized. Try uploading your image of
                      ingredients
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div id="cooking-time" className="flex flex-col">
            <Label htmlFor="cookingTime" className="mb-2">
              Cooking Time
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-orange-400 text-white">
                  {cookingTime}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={cookingTime}
                  onValueChange={setCookingTime}
                >
                  {cookingTimeOptions.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-red-600 mt-auto sm:w-56 w-full"
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
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserInput;
