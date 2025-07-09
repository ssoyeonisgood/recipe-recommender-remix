import { Link } from "@remix-run/react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </Link>
    </nav>
  );
};

export default Navigation;
