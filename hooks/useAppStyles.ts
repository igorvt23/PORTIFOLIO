import { useTheme } from "@/context/ThemeContext";
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

// Pegamos a largura da tela para calcular tamanhos responsivos
const { width } = Dimensions.get("window");
const isMobile = width < 768;

export const useAppStyles = () => {
  const { isDarkMode } = useTheme();

  // Defining Dynamic Colors
  const colors = {
    headerBackground: isDarkMode ? "#052659" : "#33bffd",
    background: isDarkMode ? "#121212" : "#FFFFFF",
    text: isDarkMode ? "#FFFFFF" : "#000000",
    // NOVA COR: Verde Neon para destaque (Accent)
    accent: "#33bffd",
    secondBackgroundSelected: "#b7b7b7",
    secondBackground: "#777777ff",
    secondText: isDarkMode ? "#C1E8FF" : "#052659",
    borderColor: isDarkMode ? "#E0E0E0" : "#333333",
    subText: isDarkMode ? "#A1A1AA" : "#52525B",
    modalBackground: isDarkMode ? "#1E1E1E" : "#F5F5F5",
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    // --- ESTILO QUE ESTAVA FALTANDO (Isso corrige o erro) ---
    text: {
      color: colors.text,
      fontSize: 16,
    },

    hr: {
      width: "80%",
      marginLeft: "10%",
      marginTop: 30,
      marginBottom: 30,
      // marginRight: 150,
      borderBottomColor: colors.headerBackground,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: 10,
    },

    // --- HEADER ---
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: Platform.OS === "ios" ? 100 : 80,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
      paddingHorizontal: 15,
      backgroundColor: colors.headerBackground,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 10,
    },
    headerLeft: {
      justifyContent: "flex-start",
      flex: 0,
    },

    // Bloco Central: Flex 1 faz ele ocupar TODO o espaço sobrando, empurrando as pontas
    headerCenter: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center", // Centraliza os itens no meio da tela
      alignItems: "center",
      gap: 10,
    },

    // Bloco Direito: Alinha itens no final
    headerRight: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      flex: 0,
      gap: 8,
    },
    headerButtons: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.borderColor,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 8,
      cursor: "pointer",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    languageModal: {
      width: "85%",
      maxWidth: 340,
      backgroundColor: colors.modalBackground, // Definido no hook (passo anterior)
      borderRadius: 25,
      padding: 25,
      elevation: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
    },
    languageOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 12,
      marginBottom: 8,
    },
    languageText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: "500",
    },
    langSelectorBtn: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.borderColor,
      gap: 8,
    },
    headerButtonsMode: {
      height: 35,
      width: 35,
      // borderRadius: 17.5,
      // borderWidth: 1.5,
      // borderColor: isDarkMode ? '#FFFFFF' : '#052659',
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 8,
    },
    textHeaderButtons: {
      color: colors.text,
      fontWeight: "600",
      fontSize: 12,
    },
    viewHome: {
      justifyContent: "center",
    },
    logoHome: {
      height: 40,
      width: 160,
      // resizeMode: 'contain',
    },

    // --- HERO SECTION ---
    inicialContainer: {
      width: "100%",
      maxWidth: 1200,
      paddingVertical: 40,
      paddingHorizontal: 20,
      alignSelf: "center",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 20,
    },
    photoContainer: {
      marginBottom: 25,
      elevation: 15,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      borderRadius: 40,
      height: "auto",
    },
    reactLogo: {
      width: 600,
      height: 600,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: colors.accent,
    },
    textInicialContainer: {
      alignItems: "center",
    },
    heroGreeting: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.accent,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginBottom: 10,
    },
    heroName: {
      fontSize: 32,
      fontWeight: "900",
      color: colors.text,
      textAlign: "center",
      marginBottom: 5,
    },
    heroCareer: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.subText,
      textAlign: "center",
    },

    footer: {
      height: 150, // Altura maior para caber a coluna de ícones
      backgroundColor: colors.headerBackground,
      flexDirection: "row",
      paddingHorizontal: 20,
      alignItems: "center",
    },
    footerLeft: {
      flex: 3,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    footerCenter: {
      flex: 4,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
    },
    footerRight: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end", // Alinha a coluna toda à direita
    },
    contactButtons: {
      flexDirection: "column", // Ícones um embaixo do outro
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    briefBiography: {
      color: colors.text,
      textAlign: "left",
    },
    socialMedias: {
      width: 28,
      height: 28,
      resizeMode: "contain",
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
      marginBottom: 15,
      color: "#33bffd",
    },
    aboutContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
    },
    columnLeft: {
      width: 100,
      marginRight: 10,
    },
    columnRightGroup: {
      flex: 1,
    },
  });
};
