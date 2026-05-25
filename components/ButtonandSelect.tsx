import { styles } from "@/conjuntosCss/index.styles";
import { POKEMON_COLORS } from "@/conjuntosCss/pokemon-item.styles";
import { Button, ScrollView, Text, View } from "react-native";

type ButtonandSelectProps = {
  mostrarTodos: () => void;
  mostrarPorTipo: (tipo: string) => void;
};

export default function ButtonandSelect({ mostrarTodos, mostrarPorTipo }: ButtonandSelectProps) {
  const listaDeTipos = Object.keys(POKEMON_COLORS) as (keyof typeof POKEMON_COLORS)[];

  return (
    <View style={styles.buttons}>
      <Text style={styles.filterTitle}>Filtrar por tipo:</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
        <View style={styles.typeButtons}>
          <Button onPress={mostrarTodos} title="Todos" color="#4A90E2" />

          {listaDeTipos.map((tipo) => (
            <Button
              key={tipo}
              title={tipo.toUpperCase()}
              onPress={() => mostrarPorTipo(tipo)}
              color={POKEMON_COLORS[tipo]}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}