import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";

type SeletCuisineTypeProps = {
  setSelectedCuisine: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCuisine: string | null;
};

const SeletCuisineType = ({
  setSelectedCuisine,
  selectedCuisine,
}: SeletCuisineTypeProps) => {
  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  const itemData = [
    {
      img: "./Koreanfood.png",
      title: "Korean",
    },
    {
      img: "./Americanfood.png",
      title: "American",
    },
    {
      img: "./Chinesefood.png",
      title: "Chinese",
    },
    {
      img: "./Frenchfood.png",
      title: "French",
    },
    {
      img: "./Indianfood.png",
      title: "Indian",
    },
    {
      img: "./Italianfood.png",
      title: "Italian",
    },
    {
      img: "./Japanesefood.png",
      title: "Japanese",
    },
    {
      img: "./Mexicanfood.png",
      title: "Mexican",
    },
    {
      img: "./MiddleEasternfood.png",
      title: "Middle Eastern",
    },
  ];
  return (
    <div className="flex flex-col sm:w-1/5 sm:h-full h-[60%] gap-2">
      <Label htmlFor="cuisine" className="font-custom text-lg font-semibold">
        Cuisine
      </Label>
      <ScrollArea className="h-[430px] w-full rounded-md border-2 border-black p-4">
        {itemData.map((item) => (
          <div key={item.title}>
            <button
              onClick={() => handleCuisineSelect(item.title)}
              className="w-full"
              aria-label={`Select ${item.title} cuisine`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="hover:opacity-75 w-full h-auto rounded-lg"
              />
            </button>
            <p className="font-custom font-semibold text-center">
              {item.title}
            </p>
            <Separator className="my-2 bg-black" />
          </div>
        ))}
      </ScrollArea>
      <div className="flex justify-between items-center mt-2">
        <Label htmlFor="cuisine">Selected Cuisine: </Label>
        <span className="text-lg text-black font-semibold font-custom">
          {selectedCuisine || "None"}
        </span>
      </div>
    </div>
  );
};
export default SeletCuisineType;
