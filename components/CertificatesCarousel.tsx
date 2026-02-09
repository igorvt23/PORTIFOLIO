import { useLanguage } from "@/context/LanguageContext";
import { certificates } from "@/data/certificates";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- CONFIGURAÇÕES DO CARROSSEL ---
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.6;
const CARD_HEIGHT = height * 0.36;
const SPACING = 15;
const SNAP_INTERVAL = CARD_WIDTH + SPACING;

// --- MAPEAMENTO DE IMAGENS ---
// O require no React Native não aceita variáveis dinâmicas (ex: require(path)).
// Precisamos mapear manualmente ou importar todas.
const certImages: Record<string, any> = {
  "certificates01.png": require("@/assets/images/certificates/certificates01.png"),
  "certificates02.png": require("@/assets/images/certificates/certificates02.png"),
  "certificates03.png": require("@/assets/images/certificates/certificates03.png"),
  "certificates04.png": require("@/assets/images/certificates/certificates04.png"),
  "certificates05.png": require("@/assets/images/certificates/certificates05.png"),
  "certificates06.png": require("@/assets/images/certificates/certificates06.png"),
  "certificates07.png": require("@/assets/images/certificates/certificates07.png"),
  "certificates08.png": require("@/assets/images/certificates/certificates08.png"),
  "certificates09.png": require("@/assets/images/certificates/certificates09.png"),
  "certificates10.png": require("@/assets/images/certificates/certificates10.png"),
  "certificates11.png": require("@/assets/images/certificates/certificates11.png"),
  "certificates12.png": require("@/assets/images/certificates/certificates12.png"),
  "certificates13.png": require("@/assets/images/certificates/certificates13.png"),
  "certificates14.png": require("@/assets/images/certificates/certificates14.png"),
  "certificates15.png": require("@/assets/images/certificates/certificates15.png"),
  "certificates16.png": require("@/assets/images/certificates/certificates16.png"),
  "certificates17.png": require("@/assets/images/certificates/certificates17.png"),
  "certificates18.png": require("@/assets/images/certificates/certificates18.png"),
};

// --- COMPONENTE CARD INDIVIDUAL ---
const CertificateCard = ({ item, t }: { item: any; t: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Seleciona a imagem correta ou a padrão
  const imageSource = certImages[item.photo] || certImages["default"];

  return (
    <Pressable
      // Lógica do Hover (Web) e Long Press (Mobile)
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onLongPress={() => setIsHovered(!isHovered)}
      onPress={() => setIsHovered(!isHovered)} // No mobile, clique simples também pode alternar
      style={({ pressed }) => [
        styles.cardContainer,
        {
          // Usei uma cor padrão pois o array não tem backgroundColor.
          // Pode alternar cores se quiser.
          backgroundColor: "#1E1E1E",
          borderWidth: 1,
          borderColor: "#333",
          transform: [{ scale: pressed || isHovered ? 1.02 : 1 }],
        },
      ]}
    >
      <Image source={imageSource} style={styles.certImage} resizeMode="cover" />

      <View style={styles.cardContent}>
        <View>
          <Text style={styles.certTitle} numberOfLines={2}>
            {t(item.title)}
          </Text>{" "}
          {/* Título direto, ou t() se for traduzível */}
          <Text style={styles.certYear}>{item.year}</Text>
        </View>

        {/* Descrição Expansível (Se houver descrição no JSON) */}
        <View
          style={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            overflow: "hidden",
          }}
        >
          <Text numberOfLines={4} style={styles.certDesc}>
            {item.description ? item.description : t("no_description")}
          </Text>
        </View>

        {/* Informações Específicas de Certificado */}
        <View style={styles.infoContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{t("university")}: </Text>
            <Text style={styles.badgeText}>{item.university}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>{t("workload")}: </Text>
            <Text style={styles.badgeText}>{item.workload}h</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

// --- COMPONENTE PRINCIPAL ---
export function CertificatesCarousel() {
  const { t } = useLanguage();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // 1. Auto Scroll
  useEffect(() => {
    let interval: any;

    if (isAutoScrolling) {
      interval = setInterval(() => {
        handleScrollNext();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling]);

  // 2. Navegação
  const handleScrollNext = () => {
    if (certificates.length === 0) return;
    const nextIndex = (currentIndex + 1) % certificates.length;
    scrollToIndex(nextIndex);
  };

  const handleScrollPrev = () => {
    if (certificates.length === 0) return;
    const prevIndex =
      currentIndex === 0 ? certificates.length - 1 : currentIndex - 1;
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

  // 3. Pausa na interação
  const handleUserInteraction = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 8000);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{t("certificates")}</Text>

      <View style={styles.carouselWrapper}>
        {/* Botão Esquerda */}
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
          data={certificates}
          renderItem={({ item }) => <CertificateCard item={item} t={t} />}
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

        {/* Botão Direita */}
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
  sectionContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    marginBottom: 15,
    color: "#33bffd",
  },
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
  certImage: {
    width: "100%",
    height: "60%", // Imagem ocupa metade do card
    backgroundColor: "#ccc",
  },
  cardContent: {
    padding: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  certTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  certYear: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 5,
  },
  certDesc: {
    fontSize: 13,
    color: "#ddd",
    marginBottom: 5,
  },
  // Estilos para Universidade e Carga Horária
  infoContainer: {
    marginTop: 5,
  },
  badge: {
    flexDirection: "row",
    marginBottom: 4,
  },
  badgeLabel: {
    color: "#33bffd", // Azul destaque
    fontWeight: "bold",
    fontSize: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
  },

  // Estilos Estruturais e Setas (Iguais ao Projects)
  carouselWrapper: {
    position: "relative",
    justifyContent: "center",
  },
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
  arrowLeft: {
    left: 15,
  },
  arrowRight: {
    right: 15,
  },
  arrowText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 32,
    marginTop: -4,
  },
});
