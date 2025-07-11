import { useState } from "react";
import { Label } from "./ui/label";
import IngredientBadge from "./IngredientBadge";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type BadgeBoardProps = {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  loadingBadges: boolean;
};

const BadgeBoard = ({
  ingredients,
  setIngredients,
  loadingBadges,
}: BadgeBoardProps) => {
  const [manualInput, setManualInput] = useState("");

  const handleAddIngredient = () => {
    const trimmed = manualInput.trim().toLowerCase();

    if (loadingBadges) return;

    if (ingredients.length === 0) {
      alert(
        "AI has not recognized any ingredients yet. Please try again after image recognition."
      );
      return;
    }

    if (!manualInput) {
      alert("Please enter an ingredient.");
      return;
    }

    if (ingredients.includes(trimmed)) {
      alert(`"${trimmed}" is already in the ingredient list.`);
      return;
    }

    setIngredients((prev) => [...prev, trimmed]);
    setManualInput("");
  };
  return (
    <div className="flex flex-col gap-2 sm:w-2/5 sm:h-full h-[40%]">
      <div className="h-full w-full flex flex-col gap-2">
        <Label htmlFor="ingredients" className="text-lg font-semibold">
          Ingredients
        </Label>
        <div
          id="ingredients"
          className=" bg-blue-300 rounded-xl p-4 overflow-auto flex flex-wrap gap-2 h-full w-full"
        >
          <div className="flex flex-wrap items-start content-start gap-2 overflow-auto h-full w-full">
            {loadingBadges ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-20" />
              ))
            ) : ingredients.length > 0 ? (
              ingredients.map((ingredient) => (
                <IngredientBadge
                  key={ingredient}
                  ingredientName={ingredient}
                  onRemove={() =>
                    setIngredients((prev) =>
                      prev.filter((i) => i !== ingredient)
                    )
                  }
                />
              ))
            ) : (
              <p className="text-gray-700 font-custom">
                No ingredients recognized. Try uploading your image of
                ingredients.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Textarea
            placeholder="Add ingredients manually (optional)"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
          />
          <Button className="h-full" onClick={handleAddIngredient}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BadgeBoard;
