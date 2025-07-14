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
    event: React.MouseEvent<HTMLButtonElement>,
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
            (label: { name: string }) => label.name,
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
    <div className="flex flex-col gap-2 sm:h-full sm:w-2/5">
      <Label
        htmlFor="picture"
        className="font-custom text-base font-semibold sm:text-lg xxl:text-5xl"
      >
        Picture
      </Label>
      <Input
        ref={fileInputRef}
        accept="image/*"
        id="picture"
        type="file"
        className="cursor-pointer border-2 border-black hover:bg-black/10 xxl:h-20"
        onChange={handleImageChange}
      />
      <div className="hidden h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-black p-1 text-5xl sm:flex sm:p-4">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="h-full w-full rounded-xl object-contain"
          />
        ) : (
          <CiImageOn />
        )}
      </div>
      <Button
        className="w-full xxl:h-36 xxl:text-5xl"
        onClick={onImageAnalyzeClick}
      >
        Recognize
      </Button>
    </div>
  );
};

export default UploadImage;
