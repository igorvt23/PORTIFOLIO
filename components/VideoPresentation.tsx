import { useLanguage } from "@/context/LanguageContext";
import { FontAwesome } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- DADOS ---
const TRANSCRIPTS = {
  pt: [
    { time: 0, text: "Olá, meu nome é Igor Viana Tomaz," },
    { time: 3000, text: "eu sou desenvolvedor de software" },
    { time: 4800, text: "e atualmente atuo na área de tecnologia." },
    { time: 7400, text: "Nesse vídeo, eu quero me apresentar de forma" },
    { time: 9800, text: "rápida e mostrar um pouco de como eu trabalho," },
    { time: 12300, text: "penso, e encaro o desenvolvimento de software." },
    { time: 14400, text: "Bora lá!" },
    { time: 15900, text: "Bom, e quem sou eu?" },
    { time: 17200, text: "eu me considero uma pessoa curiosa" },
    { time: 19300, text: "que gosta de entender como as coisas funcionam" },
    { time: 20500, text: "funcionam por trás. Para mim," },
    { time: 22600, text: "não é só programar, não é só escrever código," },
    { time: 26300, text: "mas sim resolver problemas de forma lógica" },
    { time: 29400, text: "organizada, é que organização é uma das " },
    { time: 33000, text: "coisas que eu mais gosto. Eu gosto de manter." },
    { time: 36600, text: "Sempre busco desenvolver soluções que sejam" },
    { time: 39500, text: "claras, funcionais e fáceis de manter." },
    { time: 42100, text: "Pensando tanto em quem vai usar, mas também" },
    { time: 44900, text: "em quem vai fazer manutenção depois." },
    { time: 46700, text: "É uma coisa muito importante!" },
    { time: 48900, text: "Bom, e como eu trabalho?" },
    { time: 51000, text: "No meu dia a dia, eu procuro entender bem as" },
    { time: 53400, text: "necessidades antes de começar a desenvolver." },
    { time: 56100, text: "Eu gosto de planejar estruturar e só depois" },
    { time: 59200, text: "partir para a implementação. " },
    { time: 100100, text: "Eu valorizo o código limpo organizado e boas" },
    { time: 104300, text: "práticas porque acredito que isso faz a" },
    {
      time: 107300,
      text: "diferença ao longo do prazo, tanto em projetos pequenos",
    },
    { time: 111300, text: "quanto também para projetos grandes." },
    { time: 112900, text: " Então, é algo que eu sempre levo comigo." },
    { time: 114800, text: "A área de tecnologia também está sempre mudando," },
    {
      time: 117600,
      text: "então aprender constantemente faz parte do processo.",
    },
    {
      time: 120900,
      text: "Tenho interesse também em evoluir não só tecnicamente,",
    },
    { time: 123900, text: "mas também em responsabilidades comunicação," },
    { time: 127000, text: "trabalho em equipe, isso aí eu valorizo muito." },
    { time: 131100, text: "Vejo cada projeto também como uma oportunidade" },
    { time: 133700, text: "de melhorar e aprender algo novo," },
    { time: 136500, text: "então sempre procurando uma evolução constante." },
    {
      time: 139900,
      text: "Acho que é isso, consegui me apresentar um pouquinho",
    },
    {
      time: 143400,
      text: "aqui, e bom, aqui no portfólio você vai encontrar alguns projetos",
    },
    {
      time: 146300,
      text: "algumas certificações minhas também, que apresentam",
    },
    {
      time: 150100,
      text: "minha forma de pensar, desenvolver, bom, aqui estamos em casa,",
    },
    {
      time: 153800,
      text: "fique à vontade para explorar se quiser entrar em contato também,",
    },
    { time: 157700, text: "lá embaixo, tu encontra minhas redes sociais" },
    {
      time: 200800,
      text: "que a gente pode conversar, será um prazer em conversar,",
    },
    { time: 203800, text: "e obrigado pelo seu tempo. Aqui do lado também," },
    {
      time: 207200,
      text: "vai ter as tecnologias em que eu atualmente trabalho",
    },
    {
      time: 211400,
      text: "e é isso, muito obrigado pelo seu tempo, e até mais!",
    },
  ],
  en: [
    { time: 0, text: "Hello, my name is Igor Viana Tomaz," },
    { time: 3000, text: "I am a software developer" },
    { time: 4800, text: "and I currently work in the technology field." },
    { time: 7400, text: "In this video, I want to introduce myself in a" },
    { time: 9800, text: "quick way and show a bit of how I work," },
    { time: 12300, text: "think, and approach software development." },
    { time: 14400, text: "Let’s go!" },
    { time: 15900, text: "So, who am I?" },
    { time: 17200, text: "I consider myself a curious person" },
    { time: 19300, text: "who likes to understand how things work" },
    { time: 20500, text: "behind the scenes. For me," },
    {
      time: 22600,
      text: "it’s not just programming, it’s not just writing code,",
    },
    { time: 26300, text: "but solving problems in a logical" },
    { time: 29400, text: "organized way, and organization is one of the" },
    { time: 33000, text: "things I enjoy the most. I like to keep things." },
    { time: 36600, text: "I always try to develop solutions that are" },
    { time: 39500, text: "clear, functional, and easy to maintain." },
    { time: 42100, text: "Thinking not only about who will use it," },
    { time: 44900, text: "but also about who will maintain it later." },
    { time: 46700, text: "That is very important!" },
    { time: 48900, text: "So, how do I work?" },
    { time: 51000, text: "In my daily routine, I try to fully understand the" },
    { time: 53400, text: "needs before starting development." },
    { time: 56100, text: "I like to plan, structure, and only then" },
    { time: 59200, text: "move on to implementation." },
    { time: 100100, text: "I value clean, organized code and good" },
    { time: 104300, text: "practices because I believe that makes a" },
    {
      time: 107300,
      text: "difference in the long run, both in small projects",
    },
    { time: 111300, text: "and also in large ones." },
    { time: 112900, text: "So, it’s something I always carry with me." },
    { time: 114800, text: "Technology is always changing," },
    { time: 117600, text: "so continuous learning is part of the process." },
    {
      time: 120900,
      text: "I’m also interested in growing not only technically,",
    },
    { time: 123900, text: "but also in responsibility, communication," },
    { time: 127000, text: "teamwork — I value that a lot." },
    { time: 131100, text: "I see every project as an opportunity" },
    { time: 133700, text: "to improve and learn something new," },
    { time: 136500, text: "always seeking constant growth." },
    {
      time: 139900,
      text: "I think that’s it, I managed to introduce myself a little",
    },
    {
      time: 143400,
      text: "here, and in this portfolio you will find some projects,",
    },
    { time: 146300, text: "as well as some of my certifications," },
    {
      time: 150100,
      text: "that reflect the way I think and develop. So, welcome,",
    },
    {
      time: 153800,
      text: "feel free to explore, and if you want to get in touch,",
    },
    { time: 157700, text: "down below you’ll find my social media" },
    { time: 200800, text: "so we can talk — it will be a pleasure," },
    { time: 203800, text: "and thank you for your time. Here on the side," },
    {
      time: 207200,
      text: "you’ll also see the technologies I currently work with.",
    },
    {
      time: 211400,
      text: "That’s it, thank you very much for your time, and see you soon!",
    },
  ],
  es: [
    { time: 0, text: "Hola, mi nombre es Igor Viana Tomaz," },
    { time: 3000, text: "soy desarrollador de software" },
    { time: 4800, text: "y actualmente trabajo en el área de tecnología." },
    { time: 7400, text: "En este video, quiero presentarme de una" },
    { time: 9800, text: "manera rápida y mostrar un poco de cómo trabajo," },
    { time: 12300, text: "pienso y enfrento el desarrollo de software." },
    { time: 14400, text: "¡Vamos allá!" },
    { time: 15900, text: "Bueno, ¿y quién soy yo?" },
    { time: 17200, text: "me considero una persona curiosa" },
    {
      time: 19300,
      text: "a la que le gusta entender cómo funcionan las cosas",
    },
    { time: 20500, text: "por detrás. Para mí," },
    { time: 22600, text: "no es solo programar, no es solo escribir código," },
    { time: 26300, text: "sino resolver problemas de forma lógica" },
    { time: 29400, text: "y organizada, y la organización es una de las" },
    { time: 33000, text: "cosas que más me gustan. Me gusta mantener todo." },
    { time: 36600, text: "Siempre busco desarrollar soluciones que sean" },
    { time: 39500, text: "claras, funcionales y fáciles de mantener." },
    { time: 42100, text: "Pensando no solo en quien las va a usar," },
    { time: 44900, text: "sino también en quien dará mantenimiento después." },
    { time: 46700, text: "¡Eso es muy importante!" },
    { time: 48900, text: "Bueno, ¿y cómo trabajo?" },
    { time: 51000, text: "En mi día a día, trato de entender bien las" },
    { time: 53400, text: "necesidades antes de empezar a desarrollar." },
    { time: 56100, text: "Me gusta planificar, estructurar y solo después" },
    { time: 59200, text: "pasar a la implementación." },
    { time: 100100, text: "Valoro el código limpio, organizado y las buenas" },
    { time: 104300, text: "prácticas porque creo que eso marca la" },
    {
      time: 107300,
      text: "diferencia a largo plazo, tanto en proyectos pequeños",
    },
    { time: 111300, text: "como también en proyectos grandes." },
    { time: 112900, text: "Entonces, es algo que siempre llevo conmigo." },
    { time: 114800, text: "El área de tecnología está siempre cambiando," },
    {
      time: 117600,
      text: "así que aprender constantemente es parte del proceso.",
    },
    {
      time: 120900,
      text: "También tengo interés en crecer no solo técnicamente,",
    },
    { time: 123900, text: "sino también en responsabilidad, comunicación," },
    { time: 127000, text: "trabajo en equipo — eso lo valoro mucho." },
    { time: 131100, text: "Veo cada proyecto como una oportunidad" },
    { time: 133700, text: "de mejorar y aprender algo nuevo," },
    { time: 136500, text: "buscando siempre una evolución constante." },
    { time: 139900, text: "Creo que es eso, logré presentarme un poquito" },
    {
      time: 143400,
      text: "aquí, y en este portafolio encontrarás algunos proyectos,",
    },
    { time: 146300, text: "y también algunas certificaciones mías," },
    {
      time: 150100,
      text: "que reflejan mi forma de pensar y desarrollar. Bienvenido,",
    },
    {
      time: 153800,
      text: "siéntete libre de explorar, y si quieres contactarme,",
    },
    { time: 157700, text: "abajo encontrarás mis redes sociales" },
    { time: 200800, text: "para que podamos conversar — será un placer," },
    { time: 203800, text: "y gracias por tu tiempo. Aquí al lado también," },
    {
      time: 207200,
      text: "verás las tecnologías con las que trabajo actualmente.",
    },
    {
      time: 211400,
      text: "Eso es todo, muchas gracias por tu tiempo, ¡y hasta pronto!",
    },
  ],
};


const VIDEO_SOURCE = require("../assets/videos/video_pt.mp4");

export const VideoPresentation = () => {
  const { language } = useLanguage();
  const videoRef = useRef<Video>(null);
  const listRef = useRef<FlatList>(null);

  const [status, setStatus] = useState<any>({});
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTranscript =
    TRANSCRIPTS[language as keyof typeof TRANSCRIPTS] || TRANSCRIPTS.pt;

  const handlePlayPress = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };

  useEffect(() => {
    if (status.positionMillis) {
      const currentTime = status.positionMillis;
      const newIndex = currentTranscript.findIndex((line, index) => {
        const nextLine = currentTranscript[index + 1];
        return (
          currentTime >= line.time && (!nextLine || currentTime < nextLine.time)
        );
      });

      if (newIndex !== -1 && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        listRef.current?.scrollToIndex({
          index: newIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }, [status.positionMillis]);

  const showPlayButton = !status.isPlaying;

  return (
    <View style={styles.container}>
      {/* SEÇÃO DO VÍDEO GIGANTE */}
      <View style={styles.videoSection}>
        <Video
          ref={videoRef}
          style={[
            styles.video,
            Platform.OS === "web"
              ? {
                  // @ts-ignore
                  objectFit: "cover", // Preenche tudo sem deixar borda preta
                  // @ts-ignore
                  objectPosition: "center", // Centraliza o rosto
                }
              : {},
          ]}
          source={VIDEO_SOURCE}
          useNativeControls={true}
          resizeMode={ResizeMode.COVER}
          isLooping={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        {showPlayButton && (
          <TouchableOpacity
            style={styles.playOverlay}
            onPress={handlePlayPress}
            activeOpacity={0.8}
          >
            <View style={styles.playIconContainer}>
              <FontAwesome
                name="play"
                size={80} // Ícone ainda maior
                color="white"
                style={{ marginLeft: 8 }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* SEÇÃO DA LEGENDA */}
      <View style={styles.lyricsSection}>
        <FlatList
          ref={listRef}
          data={currentTranscript}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 100 }}
          renderItem={({ item, index }) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity
                onPress={() => {
                  videoRef.current?.setPositionAsync(item.time);
                  videoRef.current?.playAsync();
                }}
              >
                <Text
                  style={[
                    styles.lyricText,
                    isActive ? styles.activeText : styles.inactiveText,
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 30,
    width: "100%",
    maxWidth: 1700, // Largura Extrema
    height: 750,    // Altura Extrema (Quase tela cheia vertical em laptops)
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  videoSection: {
    flex: 4, // O vídeo é 4x maior que a legenda
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 20, // Borda mais arredondada
    position: "relative",
    overflow: "hidden",
    elevation: 15, // Sombra forte
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 20,
  },
  playIconContainer: {
    width: 120, // Botão Massivo
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 209, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#00D1FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
  },
  lyricsSection: {
    flex: 1, // Legenda fica fina na lateral
    height: "90%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  lyricText: {
    fontSize: 18,
    marginBottom: 24,
    fontWeight: "500",
  },
  activeText: {
    color: "#00D1FF",
    fontSize: 24, // Texto ativo bem grande
    fontWeight: "800",
  },
  inactiveText: {
    color: "#666",
  },
});