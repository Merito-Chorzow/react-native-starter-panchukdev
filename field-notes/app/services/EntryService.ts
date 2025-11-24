import { Entry } from '../models/Entry';

const baseUrl = 'http://192.168.0.238:50764/api/entries';

export async function getEntries(): Promise<Entry[]> {
  try {
    const res = await fetch(`${baseUrl}/get`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function addEntry(entry: Entry): Promise<string> {
  try {
    const res = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (!res.ok) {
      const errData = await res.json();
      return `Error: ${JSON.stringify(errData)}`;
    }
    return 'Data Added';
  } catch (err) {
    console.log(err);
    return `Error: ${err}`;
  }
}