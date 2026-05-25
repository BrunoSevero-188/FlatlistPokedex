import type { PokemonType } from "@/components/PokemonItem";
import { POKEMON_COLORS } from "@/conjuntosCss/pokemon-item.styles";
import { usePokemonDetalhes } from "@/hooks/usePokemonDetalhes";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  type DimensionValue,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Sp. Ataque",
  "special-defense": "Sp. Defesa",
  speed: "Velocidade",
};

const corDaStat = (valor: number): string => {
  if (valor >= 100) return "#4CAF50";
  if (valor >= 70) return "#8BC34A";
  if (valor >= 50) return "#FFC107";
  if (valor >= 30) return "#FF9800";
  return "#F44336";
};

const formatarNome = (name: string) =>
  name
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");

export default function DetalhesPokemon() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const idPokemon = Number(id);
  const { detalhes, loading, erro } = usePokemonDetalhes(idPokemon);

  const type1 = detalhes?.types[0] as PokemonType | undefined;
  const type2 = detalhes?.types[1] as PokemonType | undefined;
  const color1 = type1 ? POKEMON_COLORS[type1] : "#4A90E2";
  const color2 = type2 ? POKEMON_COLORS[type2] : color1;

  if (loading) {
    return (
      <View style={styles.centralized}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Carregando Pokémon...</Text>
      </View>
    );
  }

  if (erro || !detalhes) {
    return (
      <View style={styles.centralized}>
        <Text style={styles.erro}>{erro || "Pokémon não encontrado."}</Text>
        <Pressable style={styles.voltarBtn} onPress={() => router.back()}>
          <Text style={styles.voltarBtnText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[color1, color2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable style={styles.voltar} onPress={() => router.back()}>
          <Text style={styles.voltarText}>Voltar</Text>
        </Pressable>

        <Text style={styles.idText}>#{String(detalhes.id).padStart(3, "0")}</Text>
        <Text style={styles.nomeText}>{formatarNome(detalhes.name)}</Text>

        <View style={styles.tiposRow}>
          {detalhes.types.map((tipo) => (
            <View key={tipo} style={styles.tipoBadge}>
              <Text style={styles.tipoText}>{tipo.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Image
          source={{ uri: detalhes.image }}
          style={styles.imagemGrande}
          resizeMode="contain"
        />
      </LinearGradient>

      <View style={styles.corpo}>
        <Text style={styles.sectionTitle}>Informações Gerais</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Altura</Text>
            <Text style={styles.infoValor}>{(detalhes.height / 10).toFixed(1)} m</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Peso</Text>
            <Text style={styles.infoValor}>{(detalhes.weight / 10).toFixed(1)} kg</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Exp. Base</Text>
            <Text style={styles.infoValor}>{detalhes.baseExperience ?? "-"}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.habilidadesGrid}>
          {detalhes.abilities.map((ability) => (
            <View
              key={ability.name}
              style={[styles.habilidadeCard, ability.isHidden && styles.habilidadeHidden]}
            >
              <Text style={styles.habilidadeNome}>{formatarNome(ability.name)}</Text>
              {ability.isHidden && (
                <Text style={styles.habilidadeHiddenLabel}>Oculta</Text>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Estatísticas Base</Text>
        <View style={styles.statsContainer}>
          {detalhes.stats.map((stat) => {
            const largura = `${Math.min((stat.value / 255) * 100, 100)}%` as DimensionValue;

            return (
              <View key={stat.name} style={styles.statRow}>
                <Text style={styles.statNome}>
                  {STAT_LABELS[stat.name] ?? formatarNome(stat.name)}
                </Text>
                <Text style={styles.statValor}>{stat.value}</Text>
                <View style={styles.statBarBg}>
                  <View
                    style={[
                      styles.statBarFill,
                      {
                        width: largura,
                        backgroundColor: corDaStat(stat.value),
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Principais Movimentos</Text>
        <View style={styles.movesGrid}>
          {detalhes.moves.map((move) => (
            <View key={move} style={[styles.moveBadge, { borderColor: color1 }]}>
              <Text style={[styles.moveText, { color: color1 }]}>
                {formatarNome(move)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  centralized: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 20,
  },
  loadingText: {
    color: "#555",
    fontSize: 15,
    marginTop: 8,
  },
  erro: {
    color: "#C03028",
    fontSize: 16,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    paddingTop: 54,
    paddingBottom: 110,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  voltar: {
    position: "absolute",
    top: 54,
    left: 20,
  },
  voltarText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  voltarBtn: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  voltarBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
  idText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  nomeText: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0,
  },
  tiposRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  tipoBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderColor: "rgba(255,255,255,0.6)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  tipoText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
  },
  imagemGrande: {
    width: 220,
    height: 220,
    marginTop: 16,
    marginBottom: -100,
  },
  corpo: {
    marginTop: 110,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
    marginTop: 20,
    marginBottom: 10,
  },
  infoGrid: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginBottom: 4,
  },
  infoValor: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
  },
  habilidadesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  habilidadeCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  habilidadeHidden: {
    backgroundColor: "#F3EEFF",
    borderColor: "#9B59B6",
    borderWidth: 1,
  },
  habilidadeNome: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  habilidadeHiddenLabel: {
    fontSize: 10,
    color: "#9B59B6",
    fontWeight: "700",
    marginTop: 2,
  },
  statsContainer: {
    gap: 10,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statNome: {
    width: 90,
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
  },
  statValor: {
    width: 34,
    fontSize: 14,
    fontWeight: "800",
    color: "#222",
    textAlign: "right",
  },
  statBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: "#E8ECF0",
    borderRadius: 6,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 6,
  },
  movesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  moveBadge: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  moveText: {
    fontSize: 13,
    fontWeight: "700",
  },
});