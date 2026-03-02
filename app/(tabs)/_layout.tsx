// Basic _layout.tsx setup
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <LanguageProvider>
        <ThemeProvider>
            {/* Navigation components */}
             <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
    </LanguageProvider>
  );
}
