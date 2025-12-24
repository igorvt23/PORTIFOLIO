import { useLanguage } from '@/context/LanguageContext';
import { useAppStyles } from '@/hooks/useAppStyles';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export function HeaderLanguageSelector() {
  const stylesApp = useAppStyles();
  const { language, setLanguage } = useLanguage();
  
  // Cores dinâmicas para o Picker
  const textColor = stylesApp.text.color;
  
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue) => setLanguage(itemValue)}
        style={[
            styles.picker, 
            { color: textColor } // Garante que o texto apareça no Dark Mode
        ]}
        dropdownIconColor={textColor} // Muda a cor da setinha (Android/Web)
        itemStyle={{ color: textColor }} // Muda a cor dos itens (iOS)
      >
        {/* USANDO EMOJIS PARA AS BANDEIRAS */}
        <Picker.Item label="🇧🇷 PT" value="pt" />
        <Picker.Item label="🇺🇸 EN" value="en" />
        <Picker.Item label="🇪🇸 ES" value="es" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150,150,150, 0.3)',
    borderRadius: 8,
    marginLeft: 10,
  },
  picker: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        cursor: 'pointer',
      } as any
    })
  }
});