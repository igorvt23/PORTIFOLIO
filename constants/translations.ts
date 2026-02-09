export type Language = 'pt' | 'en' | 'es';

const startDate = new Date('2025-02-01');

const getExperienceText = (lang: Language): string => {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    const m = now.getMonth() - startDate.getMonth();

    if (m < 0 || (m === 0 && now.getDate() < startDate.getDate())) {
        years--;
    }

    if (years < 1) years = 0; 
    
    // Retorna o texto formatado por idioma
    if (lang === 'pt') return years <= 1 ? '1 ano' : `${years} anos`;
    if (lang === 'es') return years <= 1 ? '1 año' : `${years} años`;
    return years <= 1 ? '1 year' : `${years} years`;
};

const expPt = getExperienceText('pt');
const expEn = getExperienceText('en');
const expEs = getExperienceText('es');

export const translations = {
  pt: {
    welcome: "Bem-vindo",
    about: "Sobre mim",
    projects: "Projetos",
    contact: "Contato",
    certificates: "Certificados",
    compliments: "Olá, eu sou",
    career: "Desenvolvedor de Software",
    briefBiography: `Desenvolvedor web com ${ expPt } de experiência, focado em aprendizado constante e no desenvolvimento de soluções práticas e bem estruturadas.`,

    // PROJECTS
    view_project: 'Ver no GitHub',

    p1_title: 'Visualizador 3D com Texturas em OpenGL',
    p1_desc: 'Desenvolver um sistema gráfico interativo com capacidade de visualizar objetos 3D aplicando texturas realistas. A aplicação simula elementos gráficos utilizando a biblioteca OpenGL com suporte do Pygame para gerenciamento de janelas e eventos.O projeto foi desenvolvido como parte da avaliação da disciplina de Computação Gráfica e explora a manipulação de malhas, mapeamento de texturas e interação com o ambiente gráfico 3D.',

    p2_title: 'Sistema de Gestão e Busca de Documentos Compressos com Índice Dinâmico',
    p2_desc: 'Desenvolva um sistema capaz de gerenciar, indexar, ordenar e buscar documentos de texto armazenados em disco. O sistema deve suportar a inserção, remoção, ordenação e compressão de documentos, além de oferecer buscas eficientes por palavras-chave. Os documentos devem ser armazenados de forma persistente em arquivos e indexados por múltiplas estruturas de dados, como árvores, tabelas hash e estruturas auxiliares para compressão e ordenação.',

    p3_title: 'Menu Pokemóns',
    p3_desc: 'Com este projeto baseado em um vídeo do youtuber DEV EM DOBRO, aprendi noções básicas de html, JavaScript e principalmente CSS.',

    p4_title: 'DevLinks',
    p4_desc: 'Programa exclusivo e gratuito, promovido pela Rocketseat para ensino de tecnologia WEB. O DevLinks é um agregador de links para usar como cartão de visitas online.',

    p5_title: 'Game luta com log',
    p5_desc: 'Jogo, simples e básico criado para testes e aprendizado da linguagem JavaScript!Foi feito pelo professor Bonieky no seu curso B7Web!',

    p6_title: 'Projeto The Last Of Us',
    p6_desc: 'Feito com base no curso do Dev em dobro.',

    // CERTIFICATES
    university: 'Universidade',
    workload: 'Carga horária',

    c1_title: 'Modelos, métodos e técnicas da engenharia de software',
    c2_title: 'Teoria da computação e compiladores',
    c3_title: 'Usabilidade, desenvolvimento web, mobile e jogos',
    c4_title: 'Computação gráfica e realidade virtual',
    c5_title: 'Estruturas matemáticas',
    c6_title: 'Estruturas de dados e análise de algoritmos',
    c7_title: 'Gestão e qualidade de software',
    c8_title: 'Inteligência artificial',
    c9_title: 'Análise de dados e big data',
    c10_title: 'Inovação, sustentabilidade e competitividade empresarial',
    c11_title: 'Sistemas distribuídos e mobile',
    c12_title: 'DevLink',
    c13_title: 'Git e GitHub: Trabalhe colaborativamente e mostre todo seu potencial como desenvolvedor',
    c14_title: 'Introdução a programação em javascript',
    c15_title: 'Lógica, algoritmos e programação orientado a objetos',
    c16_title: 'MySQL',
    c17_title: 'PHP Básico',
    c18_title: 'PHP Básico',    

  },
  en: {
    welcome: "Welcome",
    about: "About me",
    projects: "Projects",
    contact: "Contact",
    certificates: "Certificates",
    compliments: "Hello, I'm",
    career: "Software Developer",
    briefBiography: `Web developer with ${expEn} of experience, focused on continuous learning and developing practical and well-structured solutions.`,

    //PROJECT
    view_project: 'View on GitHub',

    p1_title: '3D Viewer with OpenGL Textures',
    p1_desc: 'Develop an interactive graphics system capable of visualizing 3D objects by applying realistic textures. The application simulates graphic elements using the OpenGL library with Pygame support for window and event management. The project was developed as part of the evaluation for the Computer Graphics course and explores mesh manipulation, texture mapping, and interaction with the 3D graphics environment.',

    p2_title: 'Compressed Document Management and Search System with Dynamic Index',
    p2_desc: 'Develop a system capable of managing, indexing, sorting, and searching text documents stored on disk. The system should support the insertion, removal, sorting, and compression of documents, as well as offering efficient keyword searches. Documents should be stored persistently in files and indexed by multiple data structures, such as trees, hash tables, and auxiliary structures for compression and sorting.',

    p3_title: 'Pokemon Menu',
    p3_desc: 'With this project based on a video by the YouTuber DEV EM DOBRO, I learned basic concepts of HTML, JavaScript, and especially CSS.',

    p4_title: 'DevLinks',
    p4_desc: 'Exclusive and free program, promoted by Rocketseat for teaching web technology. DevLinks is a link aggregator to use as an online business card.',

    p5_title: 'Game fights with log',
    p5_desc: 'Simple and basic game created for testing and learning the JavaScript language! It was made by Professor Bonieky in his B7Web course!',

    p6_title: 'The Last Of Us Project',
    p6_desc: 'Based on the Dev em dobro course.',

    // CERTIFICATES:
    university: 'University',
    workload: 'Workload',
    c1_title: 'Software Engineering Models, Methods, and Techniques',
    c2_title: 'Computation Theory and Compilers',
    c3_title: 'Usability, Web, Mobile, and Game Development',
    c4_title: 'Computer Graphics and Virtual Reality',
    c5_title: 'Mathematical Structures',
    c6_title: 'Data Structures and Algorithm Analysis',
    c7_title: 'Software Management and Quality',
    c8_title: 'Artificial Intelligence',
    c9_title: 'Data Analysis and Big Data',
    c10_title: 'Innovation, Sustainability, and Business Competitiveness',
    c11_title: 'Distributed Systems and Mobile',
    c12_title: 'DevLink',
    c13_title: 'Git and GitHub: Work Collaboratively and Show Your Full Potential as a Developer',
    c14_title: 'Introduction to Programming in Javascript',
    c15_title: 'Logic, algorithms and object-oriented programming',
    c16_title: 'MySQL',
    c17_title: 'Basic PHP',
    c18_title: 'Basic PHP',

  },
  es: {
    welcome: "Bienvenido",
    about: "Sobre mí",
    projects: "Proyectos",
    contact: "Contacto",
    certificates: "Certificados",
    compliments: "Hola, soy yo",
    career: "Desarrollador de Software",
    briefBiography: `Desarrollador web con ${expEs} de experiencia, enfocado en el aprendizaje continuo y desarrollo de soluciones prácticas y bien estructuradas.`,

    //PROJECT
    view_project: 'Ver en GitHub',

    p1_title: 'Visor 3D con texturas OpenGL',
    p1_desc: 'Desarrollar un sistema gráfico interactivo capaz de visualizar objetos 3D mediante la aplicación de texturas realistas. La aplicación simula elementos gráficos utilizando la biblioteca OpenGL con soporte de Pygame para la gestión de ventanas y eventos. El proyecto se desarrolló como parte de la evaluación del curso de Gráficos por Computadora y explora la manipulación de mallas, el mapeo de texturas y la interacción con el entorno gráfico 3D',

    p2_title: 'Sistema de Gestión y Búsqueda de Documentos Comprimidos con Índice Dinámico',
    p2_desc: 'Desarrollar un sistema capaz de gestionar, indexar, ordenar y buscar documentos de texto almacenados en disco. El sistema debe permitir la inserción, eliminación, ordenación y compresión de documentos, además de ofrecer búsquedas eficientes por palabras clave. Los documentos deben almacenarse de forma persistente en archivos e indexarse ​​mediante múltiples estructuras de datos, como árboles, tablas hash y estructuras auxiliares para la compresión y la ordenación.',

    p3_title: 'Menú Pokémon',
    p3_desc: 'Con este proyecto, basado en un vídeo del YouTuber DEV EM DOBRO, aprendí conceptos básicos de HTML, JavaScript y, especialmente, CSS.',

    p4_title: 'DevLinks',
    p4_desc: 'Programa exclusivo y gratuito, promovido por Rocketseat, para la enseñanza de tecnología web. DevLinks es un agregador de enlaces que puedes usar como tarjeta de presentación en línea.',

    p5_title: 'Peleas de juego con registro',
    p5_desc: '¡Un juego sencillo y básico creado para probar y aprender JavaScript! ¡Lo creó el profesor Bonieky en su curso B7Web!',

    p6_title: 'Proyecto The Last Of Us',
    p6_desc: 'Basado en el curso Dev em dobro.',
    
    // CERTIFICATES
    university: 'Universidad',
    workload: 'Carga de trabajo',
    
    c1_title: 'Modelos, métodos y técnicas de ingeniería de software',
    c2_title: 'Teoría de la computación y compiladores',
    c3_title: 'Usabilidad, desarrollo web, móvil y de videojuegos',
    c4_title: 'Gráficos por computadora y realidad virtual',
    c5_title: 'Estructuras matemáticas',
    c6_title: 'Estructuras de datos y análisis de algoritmos',
    c7_title: 'Gestión y calidad del software',
    c8_title: 'Inteligencia artificial',
    c9_title: 'Análisis de datos y big data',
    c10_title: 'Innovación, sostenibilidad y competitividad empresarial',
    c11_title: 'Sistemas distribuidos y móviles',
    c12_title: 'DevLink',
    c13_title: 'Git y GitHub: Trabaja en colaboración y demuestra todo tu potencial como Desarrollador',
    c14_title: 'Introducción a la programación en Javascript',
    c15_title: 'Lógica, algoritmos y programación orientada a objetos',
    c16_title: 'MySQL',
    c17_title: 'PHP básico',
    c18_title: 'PHP básico'
  }
};