import { Link } from "@remix-run/react";

const Navigation = ({
  logoImage,
  textColor,
}: {
  logoImage: string;
  textColor: string;
}) => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between p-2 sm:p-4">
      <Link to="/">
        <img src={logoImage} alt="Logo" className="h-5 w-auto sm:h-7 md:h-10" />
      </Link>
      <div
        className={`flex flex-row gap-3 md:gap-10 ${textColor} mr-2 font-title text-lg sm:text-2xl md:mr-10 md:text-3xl`}
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
