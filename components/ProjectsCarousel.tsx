import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects"; // IMPORTANTE: Certifique-se que o caminho está certo
import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// --- CONFIGURAÇÕES DO CARROSSEL ---
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = height * 0.4;
const SPACING = 20;
const SNAP_INTERVAL = CARD_WIDTH + SPACING;

// --- ÍCONES ---
const techIcons: Record<string, any> = {
  Python: require("@/assets/images/techs/python.png"),
  Java: require("@/assets/images/techs/java.png"),
  JavaScript: require("@/assets/images/techs/js.png"),
  HTML: require("@/assets/images/techs/html.png"),
  CSS: require("@/assets/images/techs/css.png"),
  "React Native": require("@/assets/images/techs/react.png"),
  Git: require("@/assets/images/techs/git.png"),
  default: require("@/assets/images/techs/code.png"),
};

// --- COMPONENTE CARD ---
const ProjectCard = ({ item, t }: { item: any; t: any }) => {
  const handleOpenLink = () => {
    if (item.link) Linking.openURL(item.link);
  };

  return (
    <Pressable
      onPress={handleOpenLink}
      // Removidos os onHoverIn/Out e onLongPress
      style={({ pressed }) => [
        styles.cardContainer,
        {
          backgroundColor: item.backgroundColor,
          // Mantive apenas o efeito de clique (pressed)
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

        {/* DESCRIÇÃO AGORA SEMPRE VISÍVEL */}
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
          data={projects} // Usa os dados importados corretamente
          renderItem={({ item }) => <ProjectCard item={item} t={t} />}
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

// --- ESTILOS ---
const styles = StyleSheet.create({
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
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  projectImage: { width: "100%", height: "45%" },
  cardContent: { padding: 20, flex: 1, justifyContent: "space-between" },
  projectTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 2 }, // Reduzi margem bottom
  projectYear: { fontSize: 12, marginBottom: 5 },

  // Novo estilo para o container da descrição
  descContainer: {
    marginVertical: 5,
    flexGrow: 1, // Ajuda a ocupar o espaço disponível se necessário
  },
  projectDesc: { fontSize: 13, lineHeight: 18 }, // Ajustei levemente fonte/linha para caber melhor

  techContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  techIconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  techIcon: { width: 16, height: 16, resizeMode: "contain" }, // Reduzi um pouco os ícones para ganhar espaço
  buttonRow: { flexDirection: "row", justifyContent: "flex-end" },
  linkText: { fontWeight: "bold", fontSize: 14 },
  arrowButton: {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  arrowLeft: { left: 15 },
  arrowRight: { right: 15 },
  arrowText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 32,
    marginTop: -4,
  },
});
