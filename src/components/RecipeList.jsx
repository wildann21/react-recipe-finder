import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onViewDetail }) => {
  return (
    <section className="recipe-list-section">
      <div className="recipe-list-heading">
        <h2>Hasil Pencarian</h2>
        <p>{recipes.length} resep ditemukan</p>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </section>
  );
};

export default RecipeList;
