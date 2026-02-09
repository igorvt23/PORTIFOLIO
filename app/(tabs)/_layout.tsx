// Exemplo básico de como deve ficar o seu _layout.tsx
import { LanguageProvider } from '@/context/LanguageContext'; // Suponho que já tenha esse
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <LanguageProvider>
        <ThemeProvider>
            {/* Seus componentes de navegação aqui (Stack ou Tabs) */}
             <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    </LanguageProvider>
  );
}