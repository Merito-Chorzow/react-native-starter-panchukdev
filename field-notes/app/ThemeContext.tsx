import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

type ThemeContextType = {
  theme: typeof DarkTheme | typeof DefaultTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: DefaultTheme,
  toggleTheme: () => {},
});

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(DefaultTheme);

  const toggleTheme = () => {
    setTheme(theme === DefaultTheme ? DarkTheme : DefaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);