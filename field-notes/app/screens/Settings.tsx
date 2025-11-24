import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../ThemeContext';

export default function Settings() {
const { theme, toggleTheme } = useThemeContext();
const isDarkMode = theme.dark;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={[styles.text, { color: theme.colors.text }]}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { fontSize: 18 },
});