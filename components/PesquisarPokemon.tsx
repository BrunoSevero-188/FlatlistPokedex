import type { CampoPesquisa, Pokemon } from "@/types/types";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

type PesquisarPokemonProps = {
  pokemons: Pokemon[];
  onResultado: (pokemons: Pokemon[]) => void;
};

// Operadores disponíveis por campo
type OperadorId = "igual" | "diferente" | "maior" | "menor" | "maior_igual" | "menor_igual";
type OperadorNome = "igual" | "diferente" | "contem";
type OperadorTipo = "igual" | "diferente" | "contem";
type Operador = OperadorId | OperadorNome | OperadorTipo;

// Mapa de operadores por campo
const operadoresPorCampo: Record<CampoPesquisa, { label: string; value: Operador }[]> = {
  id: [
    { label: "Igual", value: "igual" },
    { label: "Diferente", value: "diferente" },
    { label: "Maior", value: "maior" },
    { label: "Menor", value: "menor" },
    { label: "Maior ou Igual", value: "maior_igual" },
    { label: "Menor ou Igual", value: "menor_igual" },
  ],
  nome: [
    { label: "Igual", value: "igual" },
    { label: "Diferente", value: "diferente" },
    { label: "Contém", value: "contem" },
  ],
  tipo: [
    { label: "Igual", value: "igual" },
    { label: "Diferente", value: "diferente" },
    { label: "Contém", value: "contem" },
  ],
};

const opcoesPesquisa: { label: string; value: CampoPesquisa }[] = [
  { label: "Nome", value: "nome" },
  { label: "ID", value: "id" },
  { label: "Tipo", value: "tipo" },
];

// Lógica de filtro por campo e operador
const aplicarFiltro = (
  pokemons: Pokemon[],
  campo: CampoPesquisa,
  operador: Operador,
  termo: string
): Pokemon[] => {
  if (!termo) return pokemons;

  return pokemons.filter((pokemon) => {
    if (campo === "id") {
      const idPokemon = pokemon.id;
      const idTermo = Number(termo);
      if (isNaN(idTermo)) return false;

      switch (operador as OperadorId) {
        case "igual":       return idPokemon === idTermo;
        case "diferente":   return idPokemon !== idTermo;
        case "maior":       return idPokemon > idTermo;
        case "menor":       return idPokemon < idTermo;
        case "maior_igual": return idPokemon >= idTermo;
        case "menor_igual": return idPokemon <= idTermo;
        default:            return true;
      }
    }

    if (campo === "nome") {
      const nomePokemon = pokemon.name.toLowerCase();
      const nomeTermo = termo.toLowerCase();

      switch (operador as OperadorNome) {
        case "igual":     return nomePokemon === nomeTermo;
        case "diferente": return nomePokemon !== nomeTermo;
        case "contem":    return nomePokemon.includes(nomeTermo);
        default:          return true;
      }
    }

    if (campo === "tipo") {
      const tipoTermo = termo.toLowerCase();

      switch (operador as OperadorTipo) {
        case "igual":
          return pokemon.types.some((t) => t.toLowerCase() === tipoTermo);
        case "diferente":
          return pokemon.types.every((t) => t.toLowerCase() !== tipoTermo);
        case "contem":
          return pokemon.types.some((t) => t.toLowerCase().includes(tipoTermo));
        default:
          return true;
      }
    }

    return true;
  });
};

export function PesquisarPokemon({ pokemons, onResultado }: PesquisarPokemonProps) {
  const [texto, setTexto] = useState("");
  const [campo, setCampo] = useState<CampoPesquisa>("nome");
  const [operador, setOperador] = useState<Operador>("contem");

  const atualizarTexto = (valor: string) => {
    setTexto(valor);
    onResultado(aplicarFiltro(pokemons, campo, operador, valor.trim()));
  };

  const atualizarCampo = (novoCampo: CampoPesquisa) => {
    const primeiroOperador = operadoresPorCampo[novoCampo][0].value;
    setCampo(novoCampo);
    setOperador(primeiroOperador);
    setTexto("");
    onResultado(pokemons);
  };

  const atualizarOperador = (novoOperador: Operador) => {
    setOperador(novoOperador);
    onResultado(aplicarFiltro(pokemons, campo, novoOperador, texto.trim()));
  };

  return (
    <View style={localStyles.wrapper}>

      {/* SelectList — Campo de pesquisa */}
      <Text style={localStyles.label}>Pesquisar por</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={localStyles.scroll}
      >
        <View style={localStyles.optionRow}>
          {opcoesPesquisa.map((opcao) => {
            const selecionado = campo === opcao.value;
            return (
              <Pressable
                key={opcao.value}
                style={[localStyles.option, selecionado && localStyles.optionActive]}
                onPress={() => atualizarCampo(opcao.value)}
              >
                <Text style={[localStyles.optionText, selecionado && localStyles.optionTextActive]}>
                  {opcao.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* SelectList — Operador (muda conforme o campo) */}
      <Text style={localStyles.label}>Condição</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={localStyles.scroll}
      >
        <View style={localStyles.optionRow}>
          {operadoresPorCampo[campo].map((op) => {
            const selecionado = operador === op.value;
            return (
              <Pressable
                key={op.value}
                style={[localStyles.option, selecionado && localStyles.optionActive]}
                onPress={() => atualizarOperador(op.value)}
              >
                <Text style={[localStyles.optionText, selecionado && localStyles.optionTextActive]}>
                  {op.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Input de pesquisa */}
      <TextInput
        style={localStyles.input}
        placeholder={`Digite o ${campo}...`}
        value={texto}
        onChangeText={atualizarTexto}
        keyboardType={campo === "id" ? "numeric" : "default"}
        autoCapitalize="none"
      />
    </View>
  );
}

const localStyles = {
  wrapper: {
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  label: {
    color: "#555",
    fontSize: 13,
    fontWeight: "700" as const,
    marginBottom: 2,
  },
  scroll: {
    flexGrow: 0,
  },
  optionRow: {
    flexDirection: "row" as const,
    gap: 8,
    paddingBottom: 4,
  },
  option: {
    alignItems: "center" as const,
    backgroundColor: "#EEF2F7",
    borderColor: "#B8C7DD",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  optionActive: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  optionText: {
    color: "#333",
    fontSize: 13,
    fontWeight: "700" as const,
  },
  optionTextActive: {
    color: "#FFF",
  },
  input: {
    backgroundColor: "#F2F4F8",
    borderColor: "#B8C7DD",
    borderRadius: 8,
    borderWidth: 1,
    color: "#222",
    fontSize: 16,
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
};
