import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Searchbar from "../components/Searchbar";
import Loader from "../components/Loader";

export default function SearchRecipes() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(
    function () {
      async function fetchIndianRecipes() {
        try {
          setIsLoading(true);
          const appId = import.meta.env.VITE_appId;
          const appKey = import.meta.env.VITE_appKey;

          const res = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&cuisine=Indian`
          );
          if (!res.ok) {
            throw new Error("Something went wrong.");
          }
          const data = await res.json();
          console.log(data);
          // Check if the API response contains recipes
          if (data.hits && data.hits.length > 0) {
            setRecipes(data.hits);
          } else {
            throw new Error("No Indian recipes found.");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      // Only fetch Indian recipes if the query length is at least 3 characters
      if (query.length >= 3) {
        fetchIndianRecipes();
      } else {
        // Clear the recipes and selectedRecipe if the query length is less than 3 characters
        setRecipes([]);
        setSelectedRecipe(null);
      }
    },
    [query]
  );

  function handleRecipeClick(recipe) {
    setSelectedRecipe(recipe);
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <Searchbar
          value={query}
          onChange={e => setQuery(e.target.value)}
          isLoading={isLoading}
        />
        <BackButton destination="/" />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {selectedRecipe ? (
            <div className="mx-14 text-left flex flex-col items-left">
              <h1 className="flex items-center text-yellow-500 justify-between border-b my-1 uppercase text-5xl font-bold">
                {selectedRecipe.recipe.label}
              </h1>
              <img
                src={selectedRecipe.recipe.image}
                alt={selectedRecipe.recipe.label}
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50px",
                }}
                className="mb-3 mt-5" // Adjust the width and height as needed
              />
              <p className="text-black text-4xl font-semibold mb-3 ">
                Calories :{" "}
                <span className="text-yellow-500">
                  {" "}
                  {selectedRecipe.recipe.calories}{" "}
                </span>
              </p>

              <p className="text-black text-4xl font-semibold mb-3 ">
                Cuisine Type :{" "}
                <span className="text-yellow-500">
                  {" "}
                  {selectedRecipe.recipe.cuisineType}{" "}
                </span>
              </p>
              <p className="text-black text-4xl font-semibold mb-3 ">
                Diet Labels :
                <span className="text-yellow-500">
                  {selectedRecipe.recipe.dietLabels.length > 0
                    ? ` ${selectedRecipe.recipe.dietLabels.join(", ")} `
                    : " No Diet Labels"}
                </span>
              </p>

              <p className="text-black text-4xl font-semibold mb-3 ">
                Ingredients :{" "}
                <span className="text-yellow-500">
                  {selectedRecipe.recipe.ingredientLines.join(", ")}
                </span>
              </p>
              <p className="text-black text-4xl font-semibold mb-3 ">
                Meal Type :{" "}
                <span className="text-yellow-500">
                  {" "}
                  {selectedRecipe.recipe.mealType.join(",")}{" "}
                </span>
              </p>
              <p className="text-black text-4xl font-semibold mb-3 ">
                Dish Type :{" "}
                <span className="text-yellow-500">
                  {selectedRecipe.recipe.dishType.join(",")}
                </span>
              </p>
              <p className="text-black text-4xl font-semibold mb-3 ">
                Recipe :{" "}
                <span className="text-yellow-500">
                  <a href={selectedRecipe.recipe.url}>
                    <u>Click here to get the recipe</u>
                  </a>{" "}
                </span>
              </p>

              {/* Display more details about the selected recipe here */}
              <button
                className="my-4 flex text-lg rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-gray-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-5 py-3"
                style={{ maxWidth: "200px" }} // Adjust the max-width as needed
                onClick={() => setSelectedRecipe(null)}
              >
                Back to Results
              </button>
              <br></br>
            </div>
          ) : (
            query.length >= 3 && ( // Display when query is valid
              <div className="my-4 px-4 text-left flex flex-col items-center">
                <h2 className="text-5xl text-yellow-400 font-bold border-b-2 mb-9">
                  Search Results
                </h2>
                <ul className="text-3xl font">
                  {recipes.map(recipe => (
                    <li
                      key={recipe.recipe.uri}
                      onClick={() => handleRecipeClick(recipe)}
                      style={{ cursor: "pointer" }}
                      className="border-b-2"
                    >
                      <p>{recipe.recipe.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
