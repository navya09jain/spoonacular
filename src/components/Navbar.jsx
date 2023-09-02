import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b  bg-yellow-400 px-4 py-7 uppercase sm:px-6 text-3xl ">
      <Link to="/" className="tracking-widest ">
        🍽️ Spoonacular
      </Link>
    </header>
  );
}

export default Navbar;
