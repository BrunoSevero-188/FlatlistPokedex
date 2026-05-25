import PokemonItem from "@/components/PokemonItem";
import { styles } from "@/conjuntosCss/index.styles";
import type { Pokemon } from "@/types/types";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";

type PokemonListProps = {
  pokemons: Pokemon[];
};

export function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <LinearGradient colors={["#F2F4F8", "#DCEBFF"]} style={styles.flatList}>
      <FlatList
        key="pokemon-list-one-column"
        data={pokemons}
        numColumns={1}
        renderItem={({ item }) => <PokemonItem pokemon={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
      />
    </LinearGradient>
  );
}