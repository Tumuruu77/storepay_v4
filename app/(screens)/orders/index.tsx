import { Link } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

const data = [
  { id: '1', title: 'Order #1' },
  { id: '2', title: 'Order #2' },
  { id: '3', title: 'Order #3' },
];

export default function OrdersList() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        renderItem={({ item }) => (
          <Link asChild href={{ pathname: '/orders/[id]', params: { id: item.id } }}>
            <Pressable style={{ padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ fontWeight: '600' }}>{item.title}</Text>
              <Text style={{ color: '#6b7280' }}>Tap to view details</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
