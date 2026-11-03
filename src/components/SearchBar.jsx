const SearchBar = ({ searchTerm, onSearchChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        placeholder="Contoh: Chicken, Pasta, Beef..."
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button
        className="search-button"
        type="submit"
        disabled={!searchTerm.trim()}
      >
        Cari
      </button>
    </form>
  );
};

export default SearchBar;
