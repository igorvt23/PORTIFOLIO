// assets/styles/index.ts
import { StyleSheet, useColorScheme } from "react-native";

export const useAppStyles = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    // Defining Dynamic Colors
    const colors = {
        headerBackground: isDarkMode ? '#052659' : '#FFFFFF',
        background: isDarkMode ? '#121212' : '#FFFFFF',
        text: isDarkMode ? '#FFFFFF' : '#000000',
        secondBackgroundSelected:'#b7b7b7',
        secondBackground:'#777777ff',
        secondText: isDarkMode ? '#C1E8FF' : '#052659' ,
        borderColor: isDarkMode ? '#333333' : '#E0E0E0',
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%',
            height: "30%",
            maxHeight: 80,
            alignItems: 'center',
            gap: 8,
            paddingTop: 20,
            backgroundColor: colors.headerBackground,
            flex: 1,
        },
        headerButtons: {
            marginTop: 10,
            gap: 10,
            // backgroundColor: colors.secondBackground,
            borderRadius: '10px',
            borderWidth: 2,
            borderColor: '#FFFFFF',
            height: 30,
            width: 100,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18,
            cursor: 'pointer',
        },
        headerButtonsMode: {
            marginTop: 10,
            gap: 10,
            borderRadius: '15px',
            borderWidth: 2,
            borderColor: '#FFFFFF',
            height: 30,
            width: 30,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        },
        textHeaderButtons:{
            color: colors.text,
            fontWeight: 600,
        },
        text: {
            color: colors.text,
            fontSize: 16,
        },
        inicialContainer: {

        },
        photoContainer: {

        }, 
        reactLogo: {

        }, 
        textInicialContainer: {
            
        },
        viewHome:{
            padding: 10,
            margin: 10,
        },
        logoHome: {
            cursor: 'pointer',
            marginTop: 10,
            height: 60,
            width: 200,
        }
    });
};