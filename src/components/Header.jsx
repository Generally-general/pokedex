
const Header = ({ onSearch, onFilter }) => {
  const pokemon_types = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];
  
  
  return (
    <>
      <div className="header">
        PokeDex
        <div className="search-bar-container">
          Name: <input onChange={onSearch} type="text" placeholder="Search pokemon" />
        </div>
        <div className="filter-container">
          Type:
          <select onChange={onFilter}>
            <option value="">-All-</option>
            {pokemon_types.map((type) => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Header;
