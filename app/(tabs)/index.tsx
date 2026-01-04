import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { HeaderLanguageSelector } from '@/components/HeaderLanguageSelector';
import { ProjectsCarousel } from '@/components/ProjectsCarousel';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAppStyles } from "@/hooks/useAppStyles";

export default function Home() {

  const styles = useAppStyles();
  const { t } = useLanguage();
  const { toggleTheme, isDarkMode } = useTheme();
  
  // Usei ScrollView no container principal para garantir que
  // em telas pequenas o conteúdo não seja cortado.
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
          <View>
              <Text style={styles.viewHome}>
                <Image source={require('@/assets/images/icone_home_sem_fundo.png')} style={styles.logoHome}/>
              </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.headerButtons}>
                  <Text style={styles.textHeaderButtons}>{t('projects')}</Text>
              </View>
              <View style={styles.headerButtons}> 
                  <Text style={styles.textHeaderButtons}>{t('about')}</Text>
              </View>
              <View style={styles.headerButtons}>
                  <Text style={styles.textHeaderButtons}>{t('certificates')}</Text>
              </View>
              <View style={styles.headerButtons}>
                  <Text style={styles.textHeaderButtons}>{t('contact')}</Text>
              </View>
              <TouchableOpacity style={styles.headerButtonsMode} onPress={toggleTheme}>
                <Text style={{ fontSize: 18 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
             </TouchableOpacity>
              
              <HeaderLanguageSelector />
          </View>
      </View>
      
      {/* --- HERO SECTION (Resumo Inicial Modernizado) --- */}
      <View style={styles.inicialContainer}>
          
          <View style={styles.textInicialContainer}>
            {/* Aplicação dos novos estilos de texto */}
            <Text style={styles.heroGreeting}>{t('compliments')}</Text>
            <Text style={styles.heroName}>Igor Viana Tomaz</Text>
            <Text style={styles.heroCareer}>{t('career')}</Text>
          </View>
          
          <View style={styles.photoContainer}>
            <Image source={require('@/assets/images/foto_perfil.png')} style={styles.reactLogo}/>
          </View>
      </View>

      {/* --- CARROSSEL DE PROJETOS --- */}
      <ProjectsCarousel />

      {/* Espaço extra no final para rolagem */}
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}