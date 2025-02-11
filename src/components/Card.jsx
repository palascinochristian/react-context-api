import { Link } from "react-router-dom";

export default function Card({ recipe, deleteRecipe, onClick }) {
  return (
    <>
      <div className="recipe">
        <Link to={`/recipes/${recipe.id}`}>
          <h2 className="recipe-title">{recipe.title}</h2>
        </Link>
        <button onClick={() => deleteRecipe(recipe)}>🗑️</button>
      </div>

      {recipe.content && (
        <div className="recipe-content">
          {recipe.content}
          {recipe.image && (
            <div className="recipe-image">
              <img
                src={
                  recipe.image.startsWith("http://") ||
                  recipe.image.startsWith("https://")
                    ? recipe.image
                    : `http://localhost:3001${recipe.image}`
                }
                alt={recipe.title}
              />
            </div>
          )}
          {recipe.tags && (
            <div className="recipe-tags">Tags: {recipe.tags}</div>
          )}
        </div>
      )}
    </>
  );
}
