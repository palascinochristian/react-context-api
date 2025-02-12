import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchContext } from "../contexts/SearchContext";
import { useAlertContext } from "../contexts/AlertContext";

export default function Recipes() {
  const [recipesList, setRecipeList] = useState([]);
  const { search } = useSearchContext();
  const { setAlertData } = useAlertContext();

  // Richiesta API al backend per .json con array di oggetti (recipes)
  const fetchRecipes = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setRecipeList(res.data);
    });
  };

  // useEffect per eseguire la richiesta SOLO al caricamento della pagina
  useEffect(() => {
    fetchRecipes();
  }, []);

  //useEffect per l'alert generico
  useEffect(() => {
    setAlertData({
      type: "info",
      message: "Le nostre ricette sono in continuo aggiornamento",
    });
  }, [setAlertData]);

  // Filtro per la ricerca
  const recipesListFiltered = recipesList.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  // Inizializzo una variabile per il form
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: [],
  });

  // Passo i valori inseriti nel form
  const handleFormField = (fieldName, value) => {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }));
  };

  // Aggiungo una nuova ricetta facendo una richiesta POST al server backend
  const addNewRecipe = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/posts", formData).then((res) => {
      setRecipeList((current) => [...current, res.data]);
      setFormData({
        title: "",
        content: "",
        image: "",
        tags: [],
      });
      setAlertData({
        type: "added",
        message: `Hai aggiunto ${res.data.title} alla lista delle ricette!`,
      });
    });
  };

  // Elimino una delle ricette presenti facendo una richiesta DELETE al server backend
  const deleteRecipe = (recipeToDelete) => {
    axios
      .delete(`http://localhost:3001/posts/${recipeToDelete.id}`)
      .then(() => {
        setRecipeList((current) =>
          current.filter((recipe) => recipe.id !== recipeToDelete.id)
        );
        setAlertData({
          type: "deleted",
          message: `Hai eliminato ${recipeToDelete.title} dalla lista delle ricette!`,
        });
      });
  };

  return (
    <div className="container">
      <div className="recipeList">
        {recipesListFiltered.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} deleteRecipe={deleteRecipe} />
        ))}

        <form onSubmit={addNewRecipe}>
          <label htmlFor="title">Nome ricetta:</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleFormField("title", e.target.value)}
          />
          <label htmlFor="content">Descrizione:</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleFormField("content", e.target.value)}
          />
          <label htmlFor="image">Immagine:</label>
          <input
            id="image"
            type="text"
            value={formData.image}
            onChange={(e) => handleFormField("image", e.target.value)}
          />
          <label htmlFor="tags">Scegli categoria:</label>
          <select
            name="tags"
            id="tags"
            value={formData.tags[0] || ""}
            onChange={(e) => handleFormField("tags", [e.target.value])}
          >
            <option value="">Seleziona</option>
            <option value="Dolce">Dolce</option>
            <option value="Salato">Salato</option>
            <option value="Vegetariano">Vegetariano</option>
          </select>
          <button type="submit">Aggiungi</button>
        </form>
      </div>
    </div>
  );
}
