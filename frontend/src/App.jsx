import { useState } from 'react'
import axios from 'axios';
import { Heart } from 'lucide-react';

const menuItems = [
  {item: "Search Results"},
  {item: "Favourites"}
]

function App() {
  const [searchText, setSearchText] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [clickedMenuItem, setClickedMenuItem] = useState(0);
  const [favouriteRecipe, setFavouriteRecipe] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const submittedValue = formData.get('searchText')?.toString().trim() || "";

    if(!submittedValue) {
      console.log("Search text cannot be empty!");
      return;
    }

    setSearchText(submittedValue);

    try {
      const response = await axios.get(`http://localhost:3000/api/recipes/search`, {
        params: {
          searchText: submittedValue
        }
      });
      console.log(response.data);
      setRecipe(response.data.data);
      setClickedMenuItem(0);
    } catch(err){
      console.error(err);
    }
  }

  const handleSelectedRecipe = async(index) => {
    const addedFavouriteRecipe = recipe[index];
    
    console.log(`Selected index is ${index}, and the recipe is`, addedFavouriteRecipe);

    const recipeLoad = {
      recipe_id: addedFavouriteRecipe.id,
      name: addedFavouriteRecipe.name,
      description: addedFavouriteRecipe.description,
      cuisine: addedFavouriteRecipe.cuisine,
      meal_type: addedFavouriteRecipe.meal_type,
      difficulty: addedFavouriteRecipe.difficulty,
      prep_time: addedFavouriteRecipe.prep_time,
      cook_time: addedFavouriteRecipe.cook_time,
      servings: addedFavouriteRecipe.servings,
      calories_per_serving: addedFavouriteRecipe.calories_per_serving,
      protein: addedFavouriteRecipe.protein,
      dietary_tags: addedFavouriteRecipe.dietary_tags,
      instructions: addedFavouriteRecipe.instructions,
      ingredients: addedFavouriteRecipe.ingredients
    }

    try{
      const response = await axios.post(`http://localhost:3001/api/recipes/favourite`, recipeLoad)
      console.log(response.data);
      setSelectedRecipe(addedFavouriteRecipe);

    } catch(err) {
      console.log(err);
    }

  };

  const handleMenuItemClick = async (menuItemIndex) => {
    setClickedMenuItem(menuItemIndex);
    getFavouriteRecipe();
  };

  const getFavouriteRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/recipes/favourite`);
      console.log(response.data);
      setFavouriteRecipe(response.data);
      
    } catch(err){
      console.error(err);
    }
  };

  const visibleMenuItem = clickedMenuItem === 0? recipe : favouriteRecipe;

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold m-6">Recipe</h1>

      <form onSubmit={handleSubmit} className="flex flex-row m-4 space-x-4">
        <input name="searchText" type="text" placeholder="type a recipe or ingredient" className="w-full h-10 border border-black p-4 rounded-full">
        </input>

        <button type="submit" aria-label="search_button" className="w-50 h-10 bg-blue-900 text-white rounded-full cursor-pointer">
          Search
        </button>
      </form>

      <div className="flex flex-row w-80 gap-6 mt-6 mb-6 bg-gray-200 rounded-full p-1">
        {menuItems.map((menuItem, index) => (
          <button onClick={() => handleMenuItemClick(index)} key={index} className={`w-[200px] p-3 text-sm rounded-full cursor-pointer 
              ${clickedMenuItem === index ? 'bg-blue-900 text-white' : 'bg-transparent text-gray-700'}`}>
            {menuItem.item}
          </button>
        ))}
      </div>

    
      <section className="flex flex-col gap-4 m-4 w-full max-w-4xl">
          <div className="flex flex-col gap-6">          
            {visibleMenuItem.map((recipe, index) => {

              const isFavourite = favouriteRecipe.some(favourite => favourite.recipe_id == recipe.recipe_id || favourite.recipe_id == recipe.id);

              return(

              <div key={recipe.id} className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                
                <div className="flex flex-row justify-between items-center">
                      <p className="text-lg font-bold">{recipe.name}</p>
                      <button onClick={() => handleSelectedRecipe(index)} className="cursor-pointer">
                        <Heart className={isFavourite ? "fill-red-500 text-red-500" : "text-gray-500"} />
                      </button>
                </div>

                <div className="flex flex-row w-full gap-4"> 
                  <div  className="flex flex-col w-1/2">
                    <p className="font-bold text-sm mb-1">Description:</p>
                    <p key={recipe.id} className="text-sm">{recipe.description}</p>
                  </div> 

                  <div className="flex flex-col w-1/2">
                    <p className="font-bold text-sm mb-1">Instructions:</p>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      {recipe.instructions?.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div> 

                </div>
              </div> 
            );
          })}
          </div>
      </section>
    </div>
  )
}

export default App
