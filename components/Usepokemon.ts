import { useEffect, useState } from "react";
import { carregarPokemons } from "@/components/Pokemonservice";
import type { Pokemon } from "@/types/types";

export function usePokemon() {
  const [todosPokemons, setTodosPokemons] = useState<Pokemon[]>([]);
  const [lista, setLista] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const inicializar = async () => {
      try {
        const pokemons = await carregarPokemons();
        setTodosPokemons(pokemons);
        setLista(pokemons);
      } catch {
        setErro("Não foi possível carregar os pokémons.");
      } finally {
        setLoading(false);
      }
    };

    inicializar();
  }, []);

  const mostrarTodos = () => setLista(todosPokemons);

  const mostrarPorTipo = (tipo: string) => {
    const resultado = todosPokemons.filter((pokemon) =>
      pokemon.types.some((type) => type.toLowerCase() === tipo.toLowerCase())
    );
    setLista(resultado);
  };

  return { todosPokemons, lista, setLista, loading, erro, mostrarTodos, mostrarPorTipo };
}