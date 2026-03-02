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
  useWindowDimensions,
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
  styleContainer?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
}

// Animated social icon button.
const SocialButton = ({ url, source, style }: SocialButtonProps) => {
  // Initial scale value (1 = default size).
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Scale up on hover/press.
  const animateIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  // Scale back to normal.
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
      onHoverIn={animateIn} // Web
      onHoverOut={animateOut} // Web
      onPressIn={animateIn} // Mobile (press)
      onPressOut={animateOut} // Mobile (release)
      style={{ marginHorizontal: 5 }}
    >
      <Animated.Image
        source={source}
        style={[
          { width: 28, height: 28, resizeMode: "contain" },
          style,
          { transform: [{ scale: scaleAnim }] }, // Apply scale animation.
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
      toValue: 1.1,
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
  const { width } = useWindowDimensions();
  const isCompactHeader = width < 900;

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
      scrollViewRef.current.scrollTo({ y, animated: true });
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleLayout = (section: string, event: LayoutChangeEvent) => {
    sectionPositions.current[section] = event.nativeEvent.layout.y;
  };

  const renderNavButtons = () => (
    <>
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
    </>
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.viewHome}>
              <TouchableOpacity onPress={scrollToTop}>
                <Image source={homeImage} style={styles.logoHome} />
              </TouchableOpacity>
            </Text>
          </View>
          {!isCompactHeader && <View style={styles.headerCenter}>{renderNavButtons()}</View>}
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
        {isCompactHeader && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 4,
              gap: 8,
              alignItems: "center",
            }}
            style={styles.headerCompactNav}
          >
            {renderNavButtons()}
          </ScrollView>
        )}
      </View>

      {/* Hero section */}
      <View style={styles.initialContainer}>
        <View style={styles.textInitialContainer}>
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

      {/* Projects carousel */}
      <View onLayout={(e) => handleLayout("projects", e)}>
        <ProjectsCarousel />
      </View>

      <View style={styles.hr} />

      <View
        onLayout={(e) => handleLayout("about", e)}
        style={{ marginBottom: 40 }}
      >
        <Text style={styles.sectionTitle}>{t("about")}</Text>

        {/* Main container - 3 columns */}
        <View style={styles.aboutContainer}>
          {/* Left column: technologies carousel */}
          <View style={styles.columnLeft}>
            <TechsCarousel />
          </View>

          {/* Middle + right columns: video presentation */}
          <View style={styles.columnRightGroup}>
            <VideoPresentation />
          </View>
        </View>
      </View>

      <View style={styles.hr} />

      {/* Certificates carousel */}
      <View onLayout={(e) => handleLayout("certificates", e)}>
        <CertificatesCarousel />
      </View>

      {/* Footer */}
      <View style={styles.footer} onLayout={(e) => handleLayout("contact", e)}>
        {/* Left: Home image and short bio */}
        <View style={styles.footerLeft}>
          <TouchableOpacity onPress={scrollToTop}>
            <Image source={homeImage} style={styles.logoHome} />
          </TouchableOpacity>
          <Text style={styles.briefBiography}>{t("briefBiography")}</Text>
        </View>

        {/* Center: same navigation buttons as header */}
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

        {/* Right: social icons column */}
        <View style={styles.footerRight}>
          <View style={styles.contactButtons}>
            <SocialButton
              url="https://github.com/igorvt23"
              source={require("@/assets/images/socials/github.png")}
              style={styles.socialMediaIcons}
            />
            <SocialButton
              url="https://www.linkedin.com/in/igor-viana-tomaz-080583238"
              source={require("@/assets/images/socials/linkedin.png")}
              style={styles.socialMediaIcons}
            />
            <SocialButton
              url="https://www.instagram.com/_hey.igors/"
              source={require("@/assets/images/socials/instagram.png")}
              style={styles.socialMediaIcons}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
