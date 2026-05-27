import { useEffect, useState } from "react";

export type PokemonDetalhes = {
  id: number;
  name: string;
  image: string;
  imageFront: string;
  types: string[];
  abilities: { name: string; isHidden: boolean }[];
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
  baseExperience: number | null;
  moves: string[];
};

type PokemonDetalhesApi = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
      showdown?: {
        front_default: string | null;
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  base_experience: number | null;
  moves: { move: { name: string } }[];
};

const montarDetalhes = (json: PokemonDetalhesApi): PokemonDetalhes => ({
  id: json.id,
  name: json.name,
  image:
    json.sprites.other?.showdown?.front_default ??
    json.sprites.front_default ??
    json.sprites.other?.["official-artwork"]?.front_default ??
    "",
  imageFront: json.sprites.front_default ?? "",
  types: json.types.map((tipo) => tipo.type.name),
  abilities: json.abilities.map((ability) => ({
    name: ability.ability.name,
    isHidden: ability.is_hidden,
  })),
  stats: json.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  })),
  height: json.height,
  weight: json.weight,
  baseExperience: json.base_experience,
  moves: json.moves.slice(0, 10).map((move) => move.move.name),
});

export function usePokemonDetalhes(id: number) {
  const [detalhes, setDetalhes] = useState<PokemonDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    const buscar = async () => {
      if (!Number.isFinite(id) || id <= 0) {
        setDetalhes(null);
        setErro("Pokémon não encontrado.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErro("");

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
          throw new Error("Erro ao carregar Pokémon.");
        }

        const json: PokemonDetalhesApi = await response.json();

        if (ativo) {
          setDetalhes(montarDetalhes(json));
        }
      } catch {
        if (ativo) {
          setDetalhes(null);
          setErro("Não foi possível carregar os detalhes do Pokémon.");
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    };

    buscar();

    return () => {
      ativo = false;
    };
  }, [id]);

  return { detalhes, loading, erro };
}
