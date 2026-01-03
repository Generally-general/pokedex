
export const pokemonCache = {};

export const formatPokemonData = (apiData) => {
  const { id, name, sprites, types, stats, moves } = apiData;

  return {
    id,
    name,
    image: sprites.other["official-artwork"].front_default || sprites.front_default,
    types: types.map(t => t.type.name),
    stats: stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {}),
    move: moves.length > 0 ? moves[0].move.name : "Unknown",
  };
};