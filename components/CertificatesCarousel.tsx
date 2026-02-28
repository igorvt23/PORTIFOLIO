import { useLanguage } from "@/context/LanguageContext";
import { certificates } from "@/data/certificates";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type CertificateItem = (typeof certificates)[number];

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

const CertificateCard = ({
  item,
  t,
  onOpenPreview,
  cardWidth,
  cardHeight,
}: {
  item: CertificateItem;
  t: (key: string) => string;
  onOpenPreview: (item: CertificateItem) => void;
  cardWidth: number;
  cardHeight: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageSource = certImages[item.photo] || certImages["certificates01.png"];

  return (
    <Pressable
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onLongPress={() => setIsHovered(!isHovered)}
      onPress={() => onOpenPreview(item)}
      style={({ pressed }) => [
        styles.cardContainer,
        {
          width: cardWidth,
          height: cardHeight,
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
          </Text>
          <Text style={styles.certYear}>{item.year}</Text>
        </View>

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

export function CertificatesCarousel() {
  const { t } = useLanguage();
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;

  const CARD_WIDTH = isMobile ? width * 0.8 : width * 0.6;
  const CARD_HEIGHT = isMobile ? Math.min(height * 0.48, 430) : height * 0.36;
  const SPACING = isMobile ? 12 : 15;
  const SNAP_INTERVAL = CARD_WIDTH + SPACING;

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

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
    if (certificates.length === 0) return;
    const nextIndex = (currentIndex + 1) % certificates.length;
    scrollToIndex(nextIndex);
  };

  const handleScrollPrev = () => {
    if (certificates.length === 0) return;
    const prevIndex = currentIndex === 0 ? certificates.length - 1 : currentIndex - 1;
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

  const selectedImage =
    selectedCertificate ? certImages[selectedCertificate.photo] || certImages["certificates01.png"] : null;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{t("certificates")}</Text>

      <View style={styles.carouselWrapper}>
        <TouchableOpacity
          style={[styles.arrowButton, styles.arrowLeft, isMobile && styles.arrowButtonMobile]}
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
          renderItem={({ item }) => (
            <CertificateCard
              item={item}
              t={t}
              onOpenPreview={setSelectedCertificate}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP_INTERVAL}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
          ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.round(ev.nativeEvent.contentOffset.x / SNAP_INTERVAL);
            setCurrentIndex(newIndex);
          }}
          onScrollBeginDrag={() => setIsAutoScrolling(false)}
          getItemLayout={(_, index) => ({
            length: SNAP_INTERVAL,
            offset: SNAP_INTERVAL * index,
            index,
          })}
        />

        <TouchableOpacity
          style={[styles.arrowButton, styles.arrowRight, isMobile && styles.arrowButtonMobile]}
          onPress={() => {
            handleScrollNext();
            handleUserInteraction();
          }}
        >
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={!!selectedCertificate}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedCertificate(null)}
      >
        <Pressable style={styles.previewOverlay} onPress={() => setSelectedCertificate(null)}>
          <Pressable style={styles.previewBox}>
            {selectedImage ? (
              <Image source={selectedImage} style={styles.previewImage} resizeMode="contain" />
            ) : null}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedCertificate(null)}>
              <Text style={styles.closeBtnText}>{t("close")}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

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
    height: "60%",
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
  infoContainer: {
    marginTop: 5,
  },
  badge: {
    flexDirection: "row",
    marginBottom: 4,
  },
  badgeLabel: {
    color: "#33bffd",
    fontWeight: "bold",
    fontSize: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    flexShrink: 1,
  },
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
  arrowButtonMobile: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginTop: -17,
  },
  arrowLeft: {
    left: 10,
  },
  arrowRight: {
    right: 10,
  },
  arrowText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 32,
    marginTop: -4,
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.82)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  previewBox: {
    width: "100%",
    maxWidth: 900,
    backgroundColor: "#0f172a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 12,
    alignItems: "center",
    gap: 10,
  },
  previewImage: {
    width: "100%",
    height: 520,
    borderRadius: 8,
  },
  closeBtn: {
    backgroundColor: "#33bffd",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  closeBtnText: {
    color: "#001018",
    fontWeight: "700",
    fontSize: 13,
  },
});
