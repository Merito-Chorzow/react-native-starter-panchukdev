import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ThemeProviderWrapper, useThemeContext } from './ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProviderWrapper>
      <InnerLayout />
    </ThemeProviderWrapper>
  );
}

function InnerLayout() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}