import { useState, useEffect } from "react";
import Tag from "./Tag";
import { formatPokemonData, pokemonCache } from "../utils/pokemonUtils";
import "./Pokemon.css";

const Pokemon = ({ name, url }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      if (pokemonCache[url]) {
        console.log(`Loading ${name} from cache`);
        setDetails(pokemonCache[url]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();

        const cleanData = formatPokemonData(data);
        pokemonCache[url] = cleanData;

        setDetails(cleanData);
      } catch (error) {
        console.error('Failed to load pokemon');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [url]);

  if (!details) {
    return (
      <div className="pokemon loading-card">
        <span>Loading {name}...</span>
      </div>
    );
  }

  return (
    <>
      <div className="pokemon">
        <div className="pokemon-image-container">
          <img src={details.image} alt={details.name} />
        </div>
        <div className="pokemon-details">
          <div className="pokemon-id">#{details.id}</div>
          <div className="pokemon-name">{details.name}</div>
          <div className="pokemon-types">
            {details.types.map((t) => (
              <Tag type={t.toUpperCase()} key={t} />
            ))}
          </div>
          
          <div className="pokemon-moves">Main move: {details.move}</div>
          <div className="stats-container">
            <p>HP: {details.stats.hp}</p>
            <p>Attack: {details.stats.attack}</p>
            <p>Defence: {details.stats.defense}</p>
            <p>Special Attack: {details.stats["special-attack"]}</p>
            <p>Special Defence: {details.stats["special-defense"]}</p>
            <p>Speed: {details.stats.speed}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
