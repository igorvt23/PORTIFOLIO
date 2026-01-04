import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
    theme: ThemeType;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemScheme = useColorScheme();
    // Inicia com o tema do sistema ou light por padrão
    const [theme, setTheme] = useState<ThemeType>(systemScheme === 'dark' ? 'dark' : 'light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const isDarkMode = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);