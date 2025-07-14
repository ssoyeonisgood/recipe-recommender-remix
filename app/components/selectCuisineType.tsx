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
    <div className="flex h-48 flex-col gap-2 sm:h-full sm:w-1/5 xxs:h-28">
      <Label
        htmlFor="cuisine"
        className="font-custom text-base font-semibold sm:text-lg xxl:text-5xl"
      >
        Cuisine
      </Label>
      <ScrollArea className="w-full rounded-md border-2 border-black p-4 xxs:p-1">
        {itemData.map((item) => (
          <div key={item.title}>
            {/* mobile*/}
            <button
              onClick={() => handleCuisineSelect(item.title)}
              className="block w-full rounded-md font-semibold text-black transition hover:bg-pink-100 sm:hidden"
              aria-label={`Select ${item.title} cuisine`}
            >
              {item.title}
            </button>

            {/* desktop */}
            <button
              onClick={() => handleCuisineSelect(item.title)}
              className="hidden w-full sm:block"
              aria-label={`Select ${item.title} cuisine`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-auto w-full rounded-lg hover:opacity-75"
              />
            </button>
            <p className="hidden text-center font-custom font-semibold sm:block">
              {item.title}
            </p>

            <Separator className="my-1 bg-black sm:my-2" />
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-col items-center justify-between sm:mt-2">
        <Label htmlFor="cuisine" className="xxl:text-5xl">
          Selected Cuisine:{" "}
        </Label>
        <span className="font-custom text-base font-semibold text-red-700 sm:text-lg xxl:text-5xl">
          {selectedCuisine || "None"}
        </span>
      </div>
    </div>
  );
};
export default SeletCuisineType;
