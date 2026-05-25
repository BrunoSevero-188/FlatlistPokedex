export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type PokemonApi = {
  id: number;
  name: string;
  pokemontypes: string[];
};

export type PokemonImageApi = {
  sprites: {
    front_default: string | null;
    other?: {
      showdown?: {
        front_default: string | null;
      };
    };
  };
};

export type CampoPesquisa = "nome" | "id" | "tipo";