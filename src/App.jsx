import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";
import Header from "./components/Header";

const App = () => {
  const [masterList, setMasterList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokemonType, setPokemonType] = useState('');
  const [typeFilteredList, setTypeFilteredList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=2000");
      const data = await result.json();

      setMasterList(data.results);
      setFilteredList(data.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFilter = async (e) => {
    const type = e.target.value;

    if(type === "") {
      setFilteredList(masterList);
      setCurrentPage(0);
      return;
    }
    setLoading(true);
    setPokemonType(type);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();

      const standardList = data.pokemon.map(p => p.pokemon);

      setFilteredList(standardList);
      setTypeFilteredList(standardList);
      setCurrentPage(0);
      setLoading(false);
    } catch(error) {
      console.error("Failed to filter by type", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const base = pokemonType ? typeFilteredList : masterList;

    if(value === "") {
      setFilteredList(base);
    } else {
      setFilteredList(
        base.filter(item => item.name.toLowerCase().includes(value))
      )
      
    }
    setCurrentPage(0);
  }

  const startIndex = currentPage * itemsPerPage;
  const visiblePokemon = filteredList.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="container">
      <Header onSearch={handleSearch} onFilter={handleFilter} />

      <div className="pokemon-list">
        
        
        { loading ?(
          <div className="absent">Loading {pokemonType} type Pokemon</div>
        ):(masterList.length > 0 && filteredList.length === 0 ? (
          <div className="absent">No Pokemon Found</div>
        ) : (
        
        visiblePokemon.map((poke) => (
          <Pokemon name={poke.name} url={poke.url} key={poke.name} />
        ))
      )
        )}
      </div>
      <div className="pagination-btn">
        <button disabled={currentPage === 0} onClick={handlePrev}>
          Previous
        </button>
        <button disabled={currentPage >= totalPages - 1} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
