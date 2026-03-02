import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext'; // Modal selected option contrast
import { useAppStyles } from '@/hooks/useAppStyles';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Language } from '@/constants/translations';

// Using direct high-quality flag URLs (FlatIcon/CDN)
const languages = [
    { 
        code: 'pt', 
        label: 'Português', 
        // Direct URL for testing; can be replaced by local assets later.
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
    const { language, setLanguage, t } = useLanguage();
    const styles = useAppStyles();
    const { isDarkMode } = useTheme(); // For selected option highlight
    const [modalVisible, setModalVisible] = useState(false);

    const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

    const handleSelect = (code: Language) => {
        setLanguage(code);
        setModalVisible(false);
    };

    return (
        <>
            {/* Header button */}
            <TouchableOpacity 
                style={styles.langSelectorBtn} 
                onPress={() => setModalVisible(true)}
            >
                <Image 
                    source={{ uri: currentLanguage.flag }} 
                    style={{ width: 24, height: 24, borderRadius: 12 }} 
                />
                <Text style={styles.textHeaderButtons}>{currentLanguage.code.toUpperCase()}</Text>
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
                            {t('select_language')}
                        </Text>
                        
                        <FlatList
                            data={languages}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={[
                                        styles.languageOption, 
                                        language === item.code && { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' } // Highlight selected option
                                    ]}
                                    onPress={() => handleSelect(item.code as Language)}
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
