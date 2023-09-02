// import Navbar from "../components/Navbar";

import ButtonEl from "../components/ButtonEl";

export default function Home() {
  return (
    <div className="my-14 px-4 text-center flex flex-col items-center">
      <h1 className="text-5xl font-bold my-10">
        <span className="mb-3 block">Bring Out The Foodie In You.</span>
        <span className="text-yellow-500 text-4xl font-bold">
          Food Because Why Not?
        </span>
      </h1>
      <ButtonEl buttonTitle="Search Recipes 📖" destination="/recipes" />
      <ButtonEl
        buttonTitle="Feedback: Your Voice Matters 🫡 "
        destination="/feedback"
      />
      <p className="text-sm text-gray-400  mt-14"> © Spoonacular 2023</p>
    </div>
  );
}
