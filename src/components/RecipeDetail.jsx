const RecipeDetail = ({ recipe, onBack }) => {
  // Mengambil bahan dan takarannya dari API
  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const ingredient = recipe[`strIngredient${index + 1}`]?.trim();
    const measure = recipe[`strMeasure${index + 1}`]?.trim();

    if (!ingredient) return null;

    return `${measure ? `${measure} ` : ""}${ingredient}`;
  }).filter(Boolean);

  return (
    <section className="recipe-detail">
      <button className="recipe-back-button" type="button" onClick={onBack}>
        ← Kembali ke Hasil Pencarian
      </button>

      <div className="recipe-detail-header">
        <img
          className="recipe-detail-image"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <div className="recipe-detail-info">
          <span className="recipe-detail-category">{recipe.strCategory}</span>

          <h2>{recipe.strMeal}</h2>

          <p>Asal masakan: {recipe.strArea || "Tidak diketahui"}</p>
        </div>
      </div>

      <div className="recipe-detail-body">
        <section className="recipe-ingredients">
          <h3>Bahan-bahan</h3>

          <ul>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <li key={`${recipe.idMeal}-${index}`}>{ingredient}</li>
              ))
            ) : (
              <li>Informasi bahan belum tersedia.</li>
            )}
          </ul>
        </section>

        <section className="recipe-instructions">
          <h3>Cara Membuat</h3>

          <p>{recipe.strInstructions || "Instruksi memasak belum tersedia."}</p>
        </section>
      </div>

      {recipe.strYoutube && (
        <a
          className="recipe-video-link"
          href={recipe.strYoutube}
          target="_blank"
          rel="noreferrer"
        >
          Lihat Video Memasak
        </a>
      )}
    </section>
  );
};

export default RecipeDetail;
