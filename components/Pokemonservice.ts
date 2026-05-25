import type { Pokemon, PokemonApi, PokemonImageApi } from "@/types/types";

const buscarImagemPokemon = async (id: number): Promise<string> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const json: PokemonImageApi = await response.json();

  return (
    json.sprites.other?.showdown?.front_default ??
    json.sprites.front_default ??
    ""
  );
};

export const processarPokemon = async (pokemon: PokemonApi): Promise<Pokemon> => {
  const image = await buscarImagemPokemon(pokemon.id);

  return {
    id: pokemon.id,
    image,
    name: pokemon.name,
    types: pokemon.pokemontypes,
  };
};

export const comparador = (a: Pokemon, b: Pokemon) => a.id - b.id;

export const carregarPokemons = async (): Promise<Pokemon[]> => {
  const response = await fetch("https://chiquitto.com.br/pokemons/");
  const json = await response.json();
  const pokemons = await Promise.all(json["data"].map(processarPokemon));
  return pokemons.sort(comparador);
};