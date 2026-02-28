import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { techs } from "../data/techs";

interface TechItemData {
  id: string;
  name: string;
  icon: ImageSourcePropType;
}

const INFINITE_TECHS = [...techs, ...techs, ...techs, ...techs];

export const TechsCarousel = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1200;
  const containerHeight = isDesktop ? 240 : 300;
  const itemSize = isDesktop ? 68 : 80;
  const iconSize = isDesktop ? 42 : 50;
  const itemMarginVertical = isDesktop ? 6 : 10;
  const itemHeight = itemSize + itemMarginVertical * 2;
  const styles = createStyles({
    containerHeight,
    itemSize,
    iconSize,
    itemMarginVertical,
  });

  const listRef = useRef<FlatList>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (!isPaused) {
      interval = setInterval(() => {
        setScrollOffset((prevOffset) => {
          const nextOffset = prevOffset + 1;

          // Correção: Usar "techs" aqui também
          const originalListHeight = techs.length * itemHeight;

          if (nextOffset >= originalListHeight) {
            listRef.current?.scrollToOffset({ offset: 0, animated: false });
            return 0;
          }

          return nextOffset;
        });
      }, 25);
    }

    return () => clearInterval(interval);
  }, [isPaused, itemHeight]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({
        offset: scrollOffset,
        animated: false,
      });
    }
  }, [scrollOffset]);

  const getItemLayout = (_: any, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: TechItemData;
    index: number;
  }) => {
    const uniqueId = `${item.id}-${index}`;
    const isHovered = hoveredId === uniqueId;

    return (
      <Pressable
        onHoverIn={() => {
          setIsPaused(true);
          setHoveredId(uniqueId);
        }}
        onHoverOut={() => {
          setIsPaused(false);
          setHoveredId(null);
        }}
        style={styles.itemContainer}
      >
        <Image
          source={item.icon}
          style={[styles.icon, isHovered && styles.iconHovered]}
          resizeMode="contain"
        />
        {isHovered && (
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>{item.name}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={listRef}
        data={INFINITE_TECHS}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const createStyles = ({
  containerHeight,
  itemSize,
  iconSize,
  itemMarginVertical,
}: {
  containerHeight: number;
  itemSize: number;
  iconSize: number;
  itemMarginVertical: number;
}) =>
  StyleSheet.create({
  carouselContainer: {
    height: containerHeight,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 10,
  },
  listContent: {
    paddingVertical: 0,
    alignItems: "center",
  },
  itemContainer: {
    height: itemSize,
    width: itemSize,
    marginVertical: itemMarginVertical,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: iconSize,
    height: iconSize,
    opacity: 0.7,
  },
  iconHovered: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tooltipContainer: {
    position: "absolute",
    bottom: -10,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  tooltipText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
