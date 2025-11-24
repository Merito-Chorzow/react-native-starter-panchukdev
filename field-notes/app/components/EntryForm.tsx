import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entry } from '../models/Entry';
import { useThemeContext } from '../ThemeContext';

export default function EntryForm({ addEntry, cancel }: { addEntry: (entry: Entry) => void; cancel: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const date = new Date().toISOString();
  const { theme } = useThemeContext();

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert('Validation', 'Please enter title and description');
      return;
    }
    const newEntry: Entry = { title, description, date };
    addEntry(newEntry);
    cancel();
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
        placeholder="Title"
        placeholderTextColor={theme.colors.text + '88'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
        placeholder="Description"
        placeholderTextColor={theme.colors.text + '88'}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add" onPress={handleSubmit} color={theme.colors.primary} />
      <Button title="Cancel" onPress={cancel} color={theme.colors.primary} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 40,
  },
  input: { 
    borderWidth: 1, 
    padding: 8, 
    marginBottom: 10,
    borderRadius: 6,
  },
});