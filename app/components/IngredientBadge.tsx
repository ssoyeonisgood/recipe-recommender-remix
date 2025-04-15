import { Badge } from "../components/ui/badge"

type IngredientBadgeProps = {
    ingredientName: string;
    onRemove?: () => void; // optional: 클릭 시 처리할 함수
};

const IngerdientBadge = ({ ingredientName, onRemove }: IngredientBadgeProps) => {
    return (
        <div className="h-min">
            <Badge>
                {ingredientName}
                <button className="ml-2" onClick={onRemove}>X</button>
            </Badge>
        </div>
    );
}

export default IngerdientBadge;