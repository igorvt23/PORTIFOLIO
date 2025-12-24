
import { Image, Text, View } from 'react-native';

import { HeaderLanguageSelector } from '@/components/HeaderLanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStyles } from "@/hooks/useAppStyles";

export default function Home() {
  const styles = useAppStyles();
  const { t } = useLanguage();
  
  return (
    <View style={styles.container}>  
      {/* Aqui aplicamos o estilo do header */}
      <View style={styles.header}>
          
          <View>
              <Text style={styles.viewHome}>
                
                <Image source={require('@/assets/images/icone_home_sem_fundo.png')} style={styles.logoHome}/>
              </Text>
          </View>
          <View style={styles.headerButtons}>
              <Text style={styles.textHeaderButtons}>{t('projects')}</Text>
          </View>
          <View style={styles.headerButtons}> 
                {/* SKILLS, EXPERIÊNCIAS, SOBRE MIM */}
              <Text style={styles.textHeaderButtons}>{t('about')}</Text>
          </View>
          <View style={styles.headerButtons}>
              <Text style={styles.textHeaderButtons}>{t('certificates')}</Text>
          </View>
          <View style={styles.headerButtons}>
              <Text style={styles.textHeaderButtons}>{t('contact')}</Text>
          </View>
          <View style={styles.headerButtonsMode}>
              <Text style={styles.textHeaderButtons}>🌙</Text>
          </View>
          <HeaderLanguageSelector />
      </View>
      
      {/* Aqui aplicamos o estilo da página inicial - (foto e resumo) */}
      <View style={styles.inicialContainer}>
          <View style={styles.photoContainer}>
            <Image source={require('@/assets/images/foto_perfil.png')} style={styles.reactLogo}/>
          </View>
          <View style={styles.textInicialContainer}>
            <Text>{t('compliments')}</Text>
            <Text>Igor Viana Tomaz</Text>
            <Text>{t('career')}</Text>
          </View>
      </View>

      {/* Aqui mostramos em formato de carrossel todos os nossos projetos e tecnologias! Quando apertar em cima deve abrir no github */}
      <View></View>

      
      {/* Aqui temos nosso vídeo de apresentação, texto de legenda e  tecnologias que domino (carrossel vertical) */}
      <View>
        <View></View>
        <View></View>
        <View></View>
      </View>

      
      {/* Aqui temos meus certificados */}
      <View></View>

      {/* Footer com formas de contato */}
      <View></View>
    </View>
  );
}