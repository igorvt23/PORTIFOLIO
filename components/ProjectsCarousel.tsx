import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

// Icons
const techIcons: Record<string, any> = {
  Python: require("@/assets/images/techs/python.png"),
  Pygame: require("@/assets/images/techs/pygame.png"),
  NumPy: require("@/assets/images/techs/numpy.png"),
  Blender: require("@/assets/images/techs/blender.png"),
  JUnit: require("@/assets/images/techs/JUnit.png"),
  Java: require("@/assets/images/techs/java.png"),
  JavaScript: require("@/assets/images/techs/js.png"),
  HTML: require("@/assets/images/techs/html.png"),
  CSS: require("@/assets/images/techs/css.png"),
  "React Native": require("@/assets/images/techs/react.png"),
  Git: require("@/assets/images/techs/git.png"),
  React: require("@/assets/images/techs/react.png"),
  Expo: require("@/assets/images/techs/expo.png"),
  Typescript: require("@/assets/images/techs/typescript.png"),
  ChatGpt: require("@/assets/images/techs/gpt.png"),
  default: require("@/assets/images/techs/code.png"),
};

// Card component
const ProjectCard = ({
  item,
  t,
  styles,
  cardWidth,
  cardHeight,
}: {
  item: any;
  t: any;
  styles: ReturnType<typeof createStyles>;
  cardWidth: number;
  cardHeight: number;
}) => {
  const handleOpenLink = () => {
    if (item.link) Linking.openURL(item.link);
  };

  return (
    <Pressable
      onPress={handleOpenLink}
      // Hover/long-press handlers intentionally omitted.
      style={({ pressed }) => [
        styles.cardContainer,
        {
          width: cardWidth,
          height: cardHeight,
          backgroundColor: item.backgroundColor,
          // Keep press feedback only.
          transform: [{ scale: pressed ? 1.02 : 1 }],
        },
      ]}
    >
      {item.projectImage && (
        <Image
          source={item.projectImage}
          style={styles.projectImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.cardContent}>
        <View>
          <Text style={[styles.projectTitle, { color: item.color }]}>
            {t(item.titleKey)}
          </Text>
          <Text style={[styles.projectYear, { color: item.color }]}>
            {item.year}
          </Text>
        </View>

        {/* Description is always visible */}
        <View style={styles.descContainer}>
          <Text
            numberOfLines={3}
            style={[styles.projectDesc, { color: item.color }]}
          >
            {t(item.descriptionKey)}
          </Text>
        </View>

        <View style={styles.techContainer}>
          {item.technologies.slice(0, 4).map((tech: string, index: number) => (
            <View key={index} style={styles.techIconWrapper}>
              <Image
                source={techIcons[tech] || techIcons["default"]}
                style={styles.techIcon}
              />
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Text style={[styles.linkText, { color: item.color }]}>
            {t("view_project")} ➔
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export function ProjectsCarousel() {
  const { t } = useLanguage();
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const CARD_WIDTH = isMobile ? width * 0.82 : width * 0.75;
  const CARD_HEIGHT = isMobile ? Math.min(height * 0.52, 470) : height * 0.4;
  const SPACING = isMobile ? 12 : 20;
  const SNAP_INTERVAL = CARD_WIDTH + SPACING;
  const styles = createStyles(isMobile);

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-scroll logic
  useEffect(() => {
    let interval: any;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        handleScrollNext();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling]);

  const handleScrollNext = () => {
    if (projects.length === 0) return;
    const nextIndex = (currentIndex + 1) % projects.length;
    scrollToIndex(nextIndex);
  };

  const handleScrollPrev = () => {
    if (projects.length === 0) return;
    const prevIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const handleUserInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 8000);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{t("projects")}</Text>

      <View style={styles.carouselWrapper}>
        <TouchableOpacity
          style={[styles.arrowButton, styles.arrowLeft]}
          onPress={() => {
            handleScrollPrev();
            handleUserInteraction();
          }}
        >
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={projects}
          renderItem={({ item }) => (
            <ProjectCard
              item={item}
              t={t}
              styles={styles}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: (width - CARD_WIDTH) / 2,
          }}
          ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(
              ev.nativeEvent.contentOffset.x / SNAP_INTERVAL,
            );
            setCurrentIndex(newIndex);
          }}
          onScrollBeginDrag={() => setIsAutoScrolling(false)}
          getItemLayout={(data, index) => ({
            length: SNAP_INTERVAL,
            offset: SNAP_INTERVAL * index,
            index,
          })}
        />

        <TouchableOpacity
          style={[styles.arrowButton, styles.arrowRight]}
          onPress={() => {
            handleScrollNext();
            handleUserInteraction();
          }}
        >
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const createStyles = (isMobile: boolean) =>
  StyleSheet.create({
  sectionContainer: { marginTop: 30, marginBottom: 20 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginBottom: 15,
    color: "#33bffd",
  },
  carouselWrapper: { position: "relative", justifyContent: "center" },
  cardContainer: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  projectImage: { width: "100%", height: "45%" },
  cardContent: { padding: isMobile ? 14 : 20, flex: 1, justifyContent: "space-between" },
  projectTitle: { fontSize: isMobile ? 16 : 18, fontWeight: "bold", marginBottom: 2 },
  projectYear: { fontSize: 12, marginBottom: 5 },

  // Description container
  descContainer: {
    marginVertical: 5,
    flexGrow: 1,
  },
  projectDesc: { fontSize: isMobile ? 12 : 13, lineHeight: isMobile ? 17 : 18 },

  techContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  techIconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  techIcon: { width: 16, height: 16, resizeMode: "contain" },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end" },
  linkText: {
    fontWeight: "bold",
    fontSize: isMobile ? 12 : 13,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    backgroundColor: "rgba(5, 38, 89, 0.85)",
    borderWidth: 1,
    borderColor: "#33bffd",
    width: isMobile ? 34 : 40,
    height: isMobile ? 34 : 40,
    borderRadius: isMobile ? 17 : 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: isMobile ? -17 : -20,
  },
  arrowLeft: { left: isMobile ? 8 : 15 },
  arrowRight: { right: isMobile ? 8 : 15 },
  arrowText: {
    color: "#fff",
    fontSize: isMobile ? 26 : 30,
    fontWeight: "bold",
    lineHeight: isMobile ? 28 : 32,
    marginTop: isMobile ? -3 : -4,
  },
});
