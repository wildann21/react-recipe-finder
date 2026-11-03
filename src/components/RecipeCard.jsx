const RecipeCard = ({ recipe, onViewDetail }) => {
  return (
    <article className="recipe-card">
      <img
        className="recipe-card-image"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        loading="lazy"
      />

      <div className="recipe-card-content">
        <h3>{recipe.strMeal}</h3>

        <div className="recipe-card-meta">
          <span>{recipe.strCategory || "Kategori tidak tersedia"}</span>
          <span>{recipe.strArea || "Asal tidak tersedia"}</span>
        </div>

        <button
          className="recipe-view-button"
          type="button"
          onClick={() => onViewDetail(recipe.idMeal)}
        >
          Lihat Resep
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;
