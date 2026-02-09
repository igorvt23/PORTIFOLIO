import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { techs } from "../data/techs";

interface TechItemData {
  id: string;
  name: string;
  icon: ImageSourcePropType;
}

const INFINITE_TECHS = [...techs, ...techs, ...techs, ...techs];

const ITEM_HEIGHT = 100;

export const TechsCarousel = () => {
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
          const originalListHeight = techs.length * ITEM_HEIGHT;

          if (nextOffset >= originalListHeight) {
            listRef.current?.scrollToOffset({ offset: 0, animated: false });
            return 0;
          }

          return nextOffset;
        });
      }, 25);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToOffset({
        offset: scrollOffset,
        animated: false,
      });
    }
  }, [scrollOffset]);

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
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

const styles = StyleSheet.create({
  carouselContainer: {
    height: 300,
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
    height: 80,
    width: 80,
    marginVertical: 10, // Importante: 10+10+80 = 100 (ITEM_HEIGHT)
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
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
