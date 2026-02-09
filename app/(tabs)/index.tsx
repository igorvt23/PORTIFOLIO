import React, { useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  ImageStyle,
  LayoutChangeEvent,
  Linking,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { CertificatesCarousel } from "@/components/CertificatesCarousel";
import { HeaderLanguageSelector } from "@/components/HeaderLanguageSelector";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { TechsCarousel } from "@/components/TechsCarousel";
import { VideoPresentation } from "@/components/VideoPresentation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppStyles } from "@/hooks/useAppStyles";

interface SocialButtonProps {
  url: string;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}

interface NavButtonProps {
  title: string;
  onPress: () => void;
  styleContainer?: StyleProp<ViewStyle>; // Ajuste a tipagem conforme necessário (ViewStyle)
  styleText?: StyleProp<TextStyle>; // Ajuste a tipagem (TextStyle)
}

// Componente para o botão animado
const SocialButton = ({ url, source, style }: SocialButtonProps) => {
  // Valor inicial da escala (1 = tamanho normal)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animar para aumentar (Escala 1.2)
  const animateIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: 300, // 0.3s transition
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  // Animar para voltar ao normal (Escala 1)
  const animateOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      onHoverIn={animateIn} // Funciona na Web
      onHoverOut={animateOut} // Funciona na Web
      onPressIn={animateIn} // Funciona no Mobile (toque)
      onPressOut={animateOut} // Funciona no Mobile (soltar)
      style={{ marginHorizontal: 5 }} // Espacinho extra se precisar
    >
      <Animated.Image
        source={source}
        style={[
          style,
          { transform: [{ scale: scaleAnim }] }, // Aplica a animação
        ]}
      />
    </Pressable>
  );
};

const NavButton = ({
  title,
  onPress,
  styleContainer,
  styleText,
}: NavButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.1, // Aumenta 10%
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const animateOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={animateIn}
      onHoverOut={animateOut}
      onPressIn={animateIn}
      onPressOut={animateOut}
    >
      <Animated.View
        style={[styleContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styleText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default function Home() {
  const styles = useAppStyles();
  const { t } = useLanguage();
  const { toggleTheme, isDarkMode } = useTheme();

  const scrollViewRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});

  const iconMode = isDarkMode
    ? require("@/assets/images/sunny.png")
    : require("@/assets/images/moon.png");
  const homeImage = isDarkMode
    ? require("@/assets/images/icone_home_branco.png")
    : require("@/assets/images/icone_home_preto.png");

  const scrollToSection = (section: string) => {
    const y = sectionPositions.current[section];
    if (section === "contact") {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      return;
    }
    if (y !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: y, animated: true });
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleLayout = (section: string, event: LayoutChangeEvent) => {
    sectionPositions.current[section] = event.nativeEvent.layout.y;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.viewHome}>
            <TouchableOpacity onPress={scrollToTop}>
              <Image source={homeImage} style={styles.logoHome} />
            </TouchableOpacity>
          </Text>
        </View>
        <View style={styles.headerCenter}>
          <NavButton
            title={t("projects")}
            onPress={() => scrollToSection("projects")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
          <NavButton
            title={t("about")}
            onPress={() => scrollToSection("about")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
          <NavButton
            title={t("certificates")}
            onPress={() => scrollToSection("certificates")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
          <NavButton
            title={t("contact")}
            onPress={() => scrollToSection("contact")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButtonsMode}
            onPress={toggleTheme}
          >
            <Image source={iconMode} style={{ width: 32, height: 32 }} />
          </TouchableOpacity>

          <HeaderLanguageSelector />
        </View>
      </View>

      {/* --- HERO SECTION  --- */}
      <View style={styles.inicialContainer}>
        <View style={styles.textInicialContainer}>
          {/* Aplicação dos novos estilos de texto */}
          <Text style={styles.heroGreeting}>{t("compliments")}</Text>
          <Text style={styles.heroName}>Igor Viana Tomaz</Text>
          <Text style={styles.heroCareer}>{t("career")}</Text>
        </View>

        <View style={styles.photoContainer}>
          <Image
            source={require("@/assets/images/profilePicture.png")}
            style={styles.reactLogo}
          />
        </View>
      </View>

      <View style={styles.hr} />

      {/* --- CARROSSEL DE PROJETOS --- */}
      <View onLayout={(e) => handleLayout("projects", e)}>
        <ProjectsCarousel />
      </View>

      <View style={styles.hr} />

      <View
        onLayout={(e) => handleLayout("about", e)}
        style={{ marginBottom: 40 }}
      >
        <Text style={styles.sectionTitle}>{t("about")}</Text>

        {/* CONTAINER MESTRE - 3 COLUNAS */}
        <View style={styles.aboutContainer}>
          {/* 1. ESQUERDA: Carrossel de Tecnologias */}
          <View style={styles.columnLeft}>
            <TechsCarousel />
          </View>

          {/* 2 & 3. MEIO E DIREITA: O Componente de Vídeo já contem as duas colunas */}
          <View style={styles.columnRightGroup}>
            <VideoPresentation />
          </View>
        </View>
      </View>

      <View style={styles.hr} />

      {/* --- CARROSSEL DE PROJETOS --- */}
      <View onLayout={(e) => handleLayout("certificates", e)}>
        <CertificatesCarousel />
      </View>

      {/* <View style={styles.hr} /> */}

      {/* Espaço extra no final para rolagem */}
      <View style={styles.footer} onLayout={(e) => handleLayout("contact", e)}>
        {/* ESQUERDA: Apenas a imagem da Home */}
        <View style={styles.footerLeft}>
          <TouchableOpacity onPress={scrollToTop}>
            <Image source={homeImage} style={styles.logoHome} />
          </TouchableOpacity>
          <Text style={styles.briefBiography}>{t("briefBiography")}</Text>
        </View>

        {/* CENTRO: Botões (Iguais ao Header) */}
        <View style={styles.footerCenter}>
          <NavButton
            title={t("projects")}
            onPress={() => scrollToSection("projects")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
          <NavButton
            title={t("about")}
            onPress={() => scrollToSection("about")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
          <NavButton
            title={t("certificates")}
            onPress={() => scrollToSection("certificates")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
          <NavButton
            title={t("contact")}
            onPress={() => scrollToSection("contact")}
            styleContainer={styles.headerButtons}
            styleText={styles.textHeaderButtons}
          />
        </View>

        {/* DIREITA: Ícones em COLUNA */}
        <View style={styles.footerRight}>
          <View style={styles.contactButtons}>
            <SocialButton
              url="https://github.com/igorvt23"
              source={require("@/assets/images/socials/github.png")}
              style={styles.socialMedias}
            />
            <SocialButton
              url="https://www.linkedin.com/in/igor-viana-tomaz-080583238"
              source={require("@/assets/images/socials/linkedin.png")}
              style={styles.socialMedias}
            />
            <SocialButton
              url="https://www.instagram.com/_hey.igors/"
              source={require("@/assets/images/socials/instagram.png")}
              style={styles.socialMedias}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
