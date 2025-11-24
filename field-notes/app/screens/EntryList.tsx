import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Vibration, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EntryDetails from './EntryDetails';
import EntryForm from '../components/EntryForm';
import { Entry } from '../models/Entry';
import * as EntryService from '../services/EntryService';
import { useThemeContext } from '../ThemeContext';

export default function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { theme } = useThemeContext();
  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.text;
  const itemBackground = theme.dark ? '#222' : '#f9f9f9';
  const dateColor = theme.dark ? '#aaa' : '#666';
  const descriptionColor = theme.dark ? '#ccc' : '#333';

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const data = await EntryService.getEntries();
    setEntries(data);
  };

  const handleAddEntry = async (entry: Entry) => {
    const msg = await EntryService.addEntry(entry);
    if (msg.startsWith('Error')) {
      Alert.alert('Error', msg);
      return;
    }
    setEntries([...entries, entry]);
    Vibration.vibrate(100);
  };

  if (selectedEntry) {
    return <EntryDetails entry={selectedEntry} goBack={() => setSelectedEntry(null)} />;
  }

  if (showForm) {
    return <EntryForm addEntry={handleAddEntry} cancel={() => setShowForm(false)} />;
  }

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor }]}>
      <View style={styles.buttonContainer}>
        <Button title="Add Entry" onPress={() => setShowForm(true)} color="#04A991" />
      </View>
      <FlatList
        data={entries}
        keyExtractor={(item) => item._id || item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, { backgroundColor: itemBackground }]}
            onPress={() => {
              Vibration.vibrate(50);
              setSelectedEntry(item);
            }}
          >
            <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
            <Text style={[styles.date, { color: dateColor }]}>{item.date}</Text>
            <Text style={[styles.description, { color: descriptionColor }]} numberOfLines={1}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, paddingTop: 16 },
  buttonContainer: { marginHorizontal: 16, marginBottom: 12 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#ccc', borderRadius: 8, marginHorizontal: 16, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  date: { fontSize: 14, marginBottom: 4 },
  description: { fontSize: 16 },
});