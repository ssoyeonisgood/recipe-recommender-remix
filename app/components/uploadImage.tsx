import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CiImageOn } from "react-icons/ci";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { compressFile } from "~/lib/utils";

type UploadImageProps = {
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  setLoadingBadges: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadImage = ({
  setIngredients,
  setLoadingBadges,
}: UploadImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="flex flex-col gap-2 sm:w-2/5 sm:h-full h-[60%]">
      <Label htmlFor="picture" className="font-custom text-lg font-semibold">
        Picture
      </Label>
      <Input
        ref={fileInputRef}
        accept="image/*"
        id="picture"
        type="file"
        className="border-black border-2 cursor-pointer hover:bg-black/10 "
        onChange={handleImageChange}
      />
      <div className="rounded-xl border-2 h-full border-black sm:p-4 p-1 flex flex-col gap-2 justify-center items-center text-5xl">
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
  );
};

export default UploadImage;
