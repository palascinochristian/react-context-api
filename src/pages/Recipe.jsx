import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          navigate("/404");
        }
      });
  }, [id, navigate]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipeList">
      <div className="recipe">
        <h2 className="recipe-title">{recipe.title}</h2>
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
    </div>
  );
}
