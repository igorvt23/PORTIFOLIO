import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext'; // Para ajustar cores do modal
import { useAppStyles } from '@/hooks/useAppStyles';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';

// Usando links diretos para bandeiras de alta qualidade (FlatIcon/CDN)
const languages = [
    { 
        code: 'pt', 
        label: 'Português', 
        // Link direto para teste. Depois você pode baixar e usar require('@/assets/br.png')
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197386.png' 
    },
    { 
        code: 'en', 
        label: 'English', 
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197484.png' 
    },
    { 
        code: 'es', 
        label: 'Español', 
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197593.png' 
    },
];

export function HeaderLanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const styles = useAppStyles();
    const { isDarkMode } = useTheme(); // Para ícones condicionais
    const [modalVisible, setModalVisible] = useState(false);

    const currentLang = languages.find(l => l.code === language) || languages[0];

    const handleSelect = (code: string) => {
        setLanguage(code as any);
        setModalVisible(false);
    };

    return (
        <>
            {/* Botão do Header */}
            <TouchableOpacity 
                style={styles.langSelectorBtn} 
                onPress={() => setModalVisible(true)}
            >
                <Image 
                    source={{ uri: currentLang.flag }} 
                    style={{ width: 24, height: 24, borderRadius: 12 }} 
                />
                <Text style={styles.textHeaderButtons}>{currentLang.code.toUpperCase()}</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.languageModal}>
                        <Text style={[styles.text, { marginBottom: 20, fontWeight: 'bold', fontSize: 18 }]}>
                            {language === 'pt' ? 'Selecione o Idioma' : 'Select Language'}
                        </Text>
                        
                        <FlatList
                            data={languages}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={[
                                        styles.languageOption, 
                                        language === item.code && { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' } // Destaque se selecionado
                                    ]}
                                    onPress={() => handleSelect(item.code)}
                                >
                                    <Image 
                                        source={{ uri: item.flag }} 
                                        style={{ width: 32, height: 32, marginRight: 15 }} 
                                    />
                                    <Text style={styles.languageText}>{item.label}</Text>
                                    
                                    {language === item.code && (
                                        <Text style={{ marginLeft: 'auto', color: '#00E676', fontSize: 18 }}>●</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}