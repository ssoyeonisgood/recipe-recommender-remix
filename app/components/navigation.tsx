import { Link } from "@remix-run/react";

const Navigation = ({
  logoImage,
  textColor,
}: {
  logoImage: string;
  textColor: string;
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
      <Link to="/">
        <img src={logoImage} alt="Logo" className="h-10 w-auto" />
      </Link>
      <div
        className={`flex flex-row gap-10 ${textColor} font-title text-3xl mr-10`}
      >
        <Link to="/#about">
          <p>About</p>
        </Link>
        <Link to="/getRecipes">
          <p className="text-pink-500">Get Recipes</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
