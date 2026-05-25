import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  buttons: {
    gap: 8,
    marginBottom: 12,
    padding: 10,
  },
  filterTitle: {
    color: "#333",
    fontSize: 18,
    fontWeight: "700",
  },
  typeScroll: {
    marginVertical: 10,
  },
  typeButtons: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 20,
  },
  flatList: {
    borderRadius: 8,
    flex: 1,
  },
  error: {
    color: "#C03028",
    fontSize: 16,
    textAlign: "center",
  },
  pageTitle: {
    textAlign: "center",
    color: "#333",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },
  searchContainer: {
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: "#F2F4F8",
    borderColor: "#B8C7DD",
    borderRadius: 8,
    borderWidth: 1,
    color: "#222",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchOptions: {
    flexDirection: "row",
    gap: 8,
  },
  searchOption: {
    alignItems: "center",
    backgroundColor: "#EEF2F7",
    borderColor: "#B8C7DD",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 9,
  },
  searchOptionActive: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  searchOptionText: {
    color: "#333",
    fontSize: 13,
    fontWeight: "700",
  },
  searchOptionTextActive: {
    color: "#FFF",
  },
  list: {
    gap: 5,
    padding: 5,
    paddingBottom: 16,
  },
});
