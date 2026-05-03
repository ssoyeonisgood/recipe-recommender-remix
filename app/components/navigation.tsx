import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const aboutActive =
    location.pathname === "/" && location.hash === "#about";
  const recipesActive = location.pathname.startsWith("/getRecipes");

  const linkBase =
    "rounded-lg px-2 py-1.5 font-title text-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:px-3 md:text-2xl xxl:text-5xl";

  const linkIdle =
    "text-slate-800 hover:bg-rose-50/90 hover:text-slate-950";

  const linkActive = "bg-rose-100 text-rose-900 ring-1 ring-rose-200/90";

  const recipesActiveClass =
    "bg-rose-100 text-rose-900 ring-1 ring-rose-200/90";

  const recipesIdle =
    "text-rose-600 hover:bg-rose-50/90 hover:text-rose-700";

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 text-slate-900 shadow-md shadow-slate-900/8 backdrop-blur-md transition-shadow sm:px-5 sm:py-3",
        )}
      >
        <Link
          to="/"
          className={cn(
            "shrink-0 rounded-lg font-title text-lg font-semibold text-slate-800 outline-offset-2 transition-colors hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400/90 md:text-2xl xxl:text-5xl",
          )}
        >
          Soyeon&apos;s project
        </Link>

        <div className="flex flex-row items-center gap-1 sm:gap-2 md:gap-3">
          <Link
            to="/#about"
            className={cn(linkBase, linkIdle, aboutActive && linkActive, "font-custom font-semibold",)}
          >
            About
          </Link>
          <Link
            to="/getRecipes"
            className={cn(
              linkBase,
              "font-custom font-semibold",
              recipesIdle,
              recipesActive && recipesActiveClass,
            )}
          >
            Get Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
