import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entry } from '../models/Entry';
import { useThemeContext } from '../ThemeContext';

export default function EntryDetails({ entry, goBack }: { entry: Entry; goBack: () => void }) {
  const { theme } = useThemeContext();
  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.text;

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>{entry.title}</Text>
        <Text style={{ color: textColor }}>{entry.date}</Text>
        <Text style={{ color: textColor }}>{entry.description}</Text>
        <Button title="Back" onPress={goBack} color="#04A991" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, paddingTop: 16 },
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});