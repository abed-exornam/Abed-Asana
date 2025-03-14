import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { fetchMenu } from '@/lib/appwrite'; // Import the fetchMenu function
import { useGlobalContext } from '@/context/GlobalProvider';
import images from '../../constants/images';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
    const { user } = useGlobalContext();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Initialize the router for navigation

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const menuData = await fetchMenu(); // Call fetchMenu to get menu items
                setMenu(menuData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadMenu();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0D0D0D" style={{ flex: 1 }} />;
    }

    // Render each menu item
    const renderItem = ({ item }: { item: { $id: string; imageurl: string; itemName: string; price: number } }) => (
        <TouchableOpacity
            onPress={() => router.push(`/details/${item.$id}`)} // Navigate to the details screen with the item's id
            style={styles.item}
        >
            <Image
                source={{ uri: item.imageurl || 'https://via.placeholder.com/200' }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.details}>
                <Text style={styles.title}>{item.itemName}</Text>
                <Text style={styles.price}>GHS {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginTop: 0 }}>
                        <Image style={{ height: 80, width: 80 }} source={images.wave} />
                    </View>
                    <View>
                        <Text style={styles.welcomeText}>Welcome Back, </Text>
                        <Text style={styles.subtitle}>{user?.username}!</Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={{ padding: 10 }}
                data={menu}
                keyExtractor={(item) => item.$id} // Use Appwrite's unique ID as the key
                renderItem={renderItem}
                showsVerticalScrollIndicator={false} // Disable scroll indicator
                ListHeaderComponent={() => (
                    <View style={styles.shadow}>
                        <Text style={styles.menuHearderText}>Morning Menu.</Text>
                    </View>
                )}
            />
        </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default Home;

const styles = StyleSheet.create({
    item: {
        padding: 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    shadow: {
        padding: 3,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: 295,
        height: 170,
        borderRadius: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 12,
        color: '#0D0D0D',
    },
    welcomeText: {
        paddingTop: 13,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    menuHearderText: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D0D0D',
    },
    subtitle: {
        fontSize: 30,
        color: '#FE8A35',
        marginTop: 0,
        fontWeight: 'bold',
    },
});
