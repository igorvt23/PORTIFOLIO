import { useTheme } from "@/context/ThemeContext";
import {
  Platform,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export const useAppStyles = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isSmallMobile = width < 430;
  const isDesktop = width >= 1200;
  const isLargeDesktop = width >= 1600;

  const colors = {
    headerBackground: isDarkMode ? "#052659" : "#33bffd",
    background: isDarkMode ? "#121212" : "#FFFFFF",
    text: isDarkMode ? "#FFFFFF" : "#000000",
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
    text: {
      color: colors.text,
      fontSize: 16,
    },
    hr: {
      width: "80%",
      marginLeft: "10%",
      marginTop: 30,
      marginBottom: 30,
      borderBottomColor: colors.headerBackground,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: 10,
    },

    header: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      width: "100%",
      height: isMobile ? undefined : Platform.OS === "ios" ? 100 : 80,
      minHeight: Platform.OS === "ios" ? (isMobile ? 98 : 100) : isMobile ? 90 : 80,
      paddingTop:
        Platform.OS === "android"
          ? (StatusBar.currentHeight ?? 0) + (isMobile ? 8 : 0)
          : isMobile
            ? 28
            : 40,
      paddingBottom: isMobile ? 8 : 0,
      paddingHorizontal: isMobile ? 10 : 15,
      backgroundColor: colors.headerBackground,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 10,
    },
    headerTopRow: {
      width: "100%",
      maxWidth: 1400,
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: isMobile ? 0 : isLargeDesktop ? 18 : 8,
      gap: isMobile ? 8 : 0,
    },
    headerLeft: {
      justifyContent: "flex-start",
      flex: 0,
      width: isMobile ? "auto" : undefined,
    },
    headerCenter: {
      flex: isMobile ? 0 : 1,
      flexDirection: "row",
      justifyContent: isMobile ? "flex-start" : "center",
      alignItems: "center",
      flexWrap: "nowrap",
      gap: isMobile ? 6 : 10,
      width: "100%",
      maxWidth: 1400,
      alignSelf: "center",
      paddingHorizontal: isMobile ? 0 : isLargeDesktop ? 18 : 8,
      marginTop: isMobile ? 8 : 0,
    },
    headerRight: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      flex: 0,
      gap: isMobile ? 8 : 12,
      width: isMobile ? "auto" : undefined,
      flexShrink: 0,
    },
    headerButtons: {
      paddingVertical: isMobile ? 5 : 6,
      paddingHorizontal: isMobile ? 10 : 12,
      borderRadius: 999,
      borderWidth: 1.5,
      borderColor: colors.accent,
      backgroundColor: isDarkMode ? "rgba(51,191,253,0.12)" : "rgba(5,38,89,0.1)",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 0,
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
      backgroundColor: colors.modalBackground,
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
      height: isMobile ? 32 : 35,
      width: isMobile ? 32 : 35,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 0,
    },
    headerCompactNav: {
      width: "100%",
      maxWidth: 1400,
      alignSelf: "center",
      marginTop: 6,
      paddingHorizontal: isMobile ? 0 : isLargeDesktop ? 18 : 8,
      paddingBottom: 2,
    },
    textHeaderButtons: {
      color: colors.text,
      fontWeight: "600",
      fontSize: isSmallMobile ? 11 : 12,
    },
    viewHome: {
      alignSelf: "center",
      justifyContent: "center",
    },
    logoHome: {
      height: isMobile ? 34 : 40,
      width: isSmallMobile ? 116 : isMobile ? 130 : 160,
    },

    initialContainer: {
      width: "100%",
      maxWidth: 1400,
      paddingVertical: isMobile ? 24 : 40,
      paddingHorizontal: isMobile ? 14 : 28,
      alignSelf: "center",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: isMobile ? 12 : isLargeDesktop ? 72 : 36,
      minHeight: isMobile ? undefined : 420,
    },
    photoContainer: {
      marginBottom: isMobile ? 25 : 0,
      elevation: 15,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      borderRadius: 40,
      height: "auto",
    },
    reactLogo: {
      width: isMobile
        ? Math.min(width * 0.72, 300)
        : isLargeDesktop
          ? 420
          : isDesktop
            ? 360
            : 300,
      height: isMobile
        ? Math.min(width * 0.72, 300)
        : isLargeDesktop
          ? 420
          : isDesktop
            ? 360
            : 300,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: colors.accent,
    },
    textInitialContainer: {
      flex: isMobile ? 0 : 1,
      maxWidth: isMobile ? "100%" : 560,
      alignItems: isMobile ? "center" : "flex-start",
      justifyContent: "center",
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
      fontSize: isMobile ? 28 : isLargeDesktop ? 54 : 44,
      fontWeight: "900",
      color: colors.text,
      textAlign: isMobile ? "center" : "left",
      marginBottom: 5,
      lineHeight: isMobile ? 34 : isLargeDesktop ? 60 : 50,
    },
    heroCareer: {
      fontSize: isMobile ? 17 : isLargeDesktop ? 28 : 22,
      fontWeight: "600",
      color: colors.subText,
      textAlign: isMobile ? "center" : "left",
    },

    footer: {
      minHeight: isMobile ? 220 : 150,
      backgroundColor: colors.headerBackground,
      flexDirection: isMobile ? "column" : "row",
      width: "100%",
      paddingHorizontal: isMobile ? 20 : 28,
      paddingVertical: isMobile ? 18 : 0,
      alignItems: "center",
    },
    footerLeft: {
      flex: isMobile ? 0 : 2,
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-start",
      maxWidth: isMobile ? "100%" : 460,
    },
    footerCenter: {
      flex: isMobile ? 0 : 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: isMobile ? 8 : 10,
      flexWrap: "wrap",
      marginVertical: isMobile ? 12 : 0,
      width: isMobile ? "100%" : undefined,
    },
    footerRight: {
      flex: isMobile ? 0 : 0,
      justifyContent: "center",
      alignItems: isMobile ? "center" : "flex-end",
      minWidth: isMobile ? undefined : 64,
      marginTop: isMobile ? 6 : 0,
    },
    contactButtons: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    briefBiography: {
      color: colors.text,
      textAlign: isMobile ? "center" : "left",
    },
    socialMediaIcons: {
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
      flexDirection: isMobile ? "column" : "row",
      width: "100%",
      alignItems: isDesktop ? "flex-start" : "center",
      justifyContent: "space-between",
      marginTop: 20,
      gap: isMobile ? 16 : 0,
    },
    columnLeft: {
      width: isMobile ? "auto" : isDesktop ? 84 : 100,
      marginRight: isMobile ? 0 : 10,
      alignItems: "center",
      alignSelf: "center",
    },
    columnRightGroup: {
      flex: 1,
      width: isMobile ? "100%" : undefined,
    },
  });
};
