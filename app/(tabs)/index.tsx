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
  const iconMode = (isDarkMode) ? require('@/assets/images/sunny.png') : require('@/assets/images/moon.png');
  const homeImage = (isDarkMode) ? require('@/assets/images/icone_home_branco.png') : require('@/assets/images/icone_home_preto.png');
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
          <View style={styles.headerLeft}>
              <Text style={styles.viewHome}>
                <Image source={homeImage} style={styles.logoHome}/>
              </Text>
          </View>
          <View style={styles.headerCenter}>
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
          </View>
          <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerButtonsMode} onPress={toggleTheme}>
                <Image source={iconMode} style={{ width: 32, height: 32 }}/>
             </TouchableOpacity>
              
              <HeaderLanguageSelector />
          </View>
      </View>
      
      {/* --- HERO SECTION  --- */}
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