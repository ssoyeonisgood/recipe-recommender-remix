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
        "AI has not recognized any ingredients yet. Please try again after image recognition.",
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
    <div className="flex flex-col gap-2 sm:h-full sm:w-2/5">
      <div className="flex h-full w-full flex-col gap-2">
        <Label
          htmlFor="ingredients"
          className="xxl:text-5xl font-custom text-base font-semibold sm:text-lg"
        >
          Ingredients
        </Label>
        <div
          id="ingredients"
          className="xxs:h-28 xs:h-48 flex h-60 w-full flex-wrap gap-2 overflow-auto rounded-xl bg-blue-300 p-4 sm:h-full"
        >
          <div className="flex h-full w-full flex-wrap content-start items-start gap-2 overflow-auto">
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
                      prev.filter((i) => i !== ingredient),
                    )
                  }
                />
              ))
            ) : (
              <p className="xxl:text-5xl xxl:p-4 font-custom text-gray-700">
                No ingredients recognized. Try uploading your image of
                ingredients.
              </p>
            )}
          </div>
        </div>
        <div className="xxl:h-40 flex h-10 flex-row gap-2 text-sm">
          <Textarea
            placeholder="Add ingredients manually (optional)"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
          />
          <Button className="xxl:text-5xl h-full" onClick={handleAddIngredient}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BadgeBoard;
