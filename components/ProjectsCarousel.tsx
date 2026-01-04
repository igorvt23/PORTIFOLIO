import { useLanguage } from '@/context/LanguageContext'; // Ajuste o caminho conforme necessário
import { projects } from '@/data/projects'; // Ajuste o caminho
import React from 'react';
import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- CONFIGURAÇÕES DO CARROSSEL ---
const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85; 
const CARD_HEIGHT = height * 0.55; 

// --- ÍCONES (Adicione suas imagens em assets/images/techs) ---
const techIcons: Record<string, any> = {
    'Python': require('@/assets/images/techs/python.png'),
    'Java': require('@/assets/images/techs/java.png'),
    'JavaScript': require('@/assets/images/techs/js.png'),
    'HTML': require('@/assets/images/techs/html.png'),
    'CSS': require('@/assets/images/techs/css.png'),
    'React Native': require('@/assets/images/techs/react.png'),
    'Git': require('@/assets/images/techs/git.png'),
    'default': require('@/assets/images/techs/code.png'), 
};

export function ProjectsCarousel() {
  const { t } = useLanguage();

  const handleOpenLink = (url: string) => {
      if(url) Linking.openURL(url);
  };

  const renderProjectItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => handleOpenLink(item.link)}
        style={[styles.cardContainer, { backgroundColor: item.backgroundColor }]}
    >
        {item.projectImage && (
            <Image source={item.projectImage} style={styles.projectImage} resizeMode="cover" />
        )}

        <View style={styles.cardContent}>
            <Text style={styles.projectTitle}>{t(item.titleKey)}</Text>
            <Text style={styles.projectYear}>{item.year}</Text>
            <Text numberOfLines={3} style={styles.projectDesc}>
                {t(item.descriptionKey)}
            </Text>

            <View style={styles.techContainer}>
                {item.technologies.map((tech: string, index: number) => (
                    <View key={index} style={styles.techIconWrapper}>
                        <Image 
                            source={techIcons[tech] || techIcons['default']} 
                            style={styles.techIcon} 
                        />
                    </View>
                ))}
            </View>
            
            <View style={styles.buttonRow}>
                <Text style={styles.linkText}>{t('view_project')} ➔</Text>
            </View>
        </View>
    </TouchableOpacity>
  );

  return (
      <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('projects')}</Text>
          <FlatList
            data={projects}
            renderItem={renderProjectItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
      </View>
  );
}

// --- ESTILOS INTERNOS DO COMPONENTE ---
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 15,
        color: '#333',
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    projectImage: {
        width: '100%',
        height: '45%', // A imagem ocupa 45% da altura do card
    },
    cardContent: {
        padding: 20,
        flex: 1, // Ocupa o resto do espaço
        justifyContent: 'space-between'
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    projectYear: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
    },
    projectDesc: {
        fontSize: 14,
        color: '#eee',
        lineHeight: 20,
    },
    techContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    techIconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
        padding: 5,
        marginRight: 8,
        marginBottom: 8,
    },
    techIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    linkText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    }
});