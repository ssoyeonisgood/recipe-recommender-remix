import { Badge } from "./ui/badge";

type IngredientBadgeProps = {
  ingredientName: string;
  onRemove?: () => void;
};

const IngerdientBadge = ({
  ingredientName,
  onRemove,
}: IngredientBadgeProps) => {
  return (
    <div className="h-min">
      <Badge>
        {ingredientName}
        <button className="ml-2" onClick={onRemove}>
          X
        </button>
      </Badge>
    </div>
  );
};

export default IngerdientBadge;
