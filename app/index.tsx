import ButtonandSelect from "@/components/ButtonandSelect";
import { PesquisarPokemon } from "@/components/PesquisarPokemon";
import { PokemonList } from "@/components/PokemonList";
import { usePokemon } from "@/components/Usepokemon";
import { styles } from "@/conjuntosCss/index.styles";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const {
    todosPokemons,
    lista,
    setLista,
    loading,
    erro,
    mostrarTodos,
    mostrarPorTipo,
  } = usePokemon();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Pokedex</Text>
      <PesquisarPokemon pokemons={todosPokemons} onResultado={setLista} />
      <ButtonandSelect mostrarTodos={mostrarTodos} mostrarPorTipo={mostrarPorTipo} />
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : erro ? (
        <Text style={styles.error}>{erro}</Text>
      ) : (
        <PokemonList pokemons={lista} />
      )}
    </View>
  );
}
