import { POKEMON_COLORS, styles } from "@/conjuntosCss/pokemon-item.styles";
import type { Pokemon } from "@/types/types";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

export type PokemonType = keyof typeof POKEMON_COLORS;

type PokemonItemProps = {
  pokemon: Pokemon;
};

const formatarNome = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export default function PokemonItem({ pokemon }: PokemonItemProps) {
  const router = useRouter();

  const type1 = pokemon.types[0] as PokemonType | undefined;
  const type2 = pokemon.types[1] as PokemonType | undefined;

  const color1 = type1 ? POKEMON_COLORS[type1] : "#F7F7F7";
  const color2 = type2 ? POKEMON_COLORS[type2] : color1;

  const hasGradient = Boolean(type1 && type2);

  const abrirDetalhes = () => {
    router.push(`/detalhes/${pokemon.id}`);
  };

  return (
    <Pressable
      onPress={abrirDetalhes}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <LinearGradient
        style={styles.card}
        colors={hasGradient ? [color1, color2] : [color1, color1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={hasGradient ? [0, 1] : undefined}
      >
        <View style={styles.header}>
          <View style={styles.imageCircle}>
            <Image
              source={{ uri: pokemon.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.id}>#{String(pokemon.id).padStart(3, "0")}</Text>
            <Text style={styles.name}>{formatarNome(pokemon.name)}</Text>
          </View>
        </View>

        <View style={styles.types}>
          {pokemon.types.map((type) => {
            const backgroundColor = POKEMON_COLORS[type as PokemonType] ?? "#777";
            return (
              <View key={type} style={[styles.typeBadge, { backgroundColor }]}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            );
          })}
        </View>
      </LinearGradient>
    </Pressable>
  );
}