import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchOrdersByUserId,getCurrentUser, deleteOrderById } from '@/lib/appwrite'; // The updated fetch and delete function
//import { useGlobalContext } from '@/context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrdersScreen = () => {
    interface orders {
        $id: string;
        itemsId: string;
        itemName: string;
        quantity: number;
        price: number;
        imageurl: string;
        orderId: string;
    }

    //const { user } = useGlobalContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const loadOrders = async () => {
                try {
                    const user = await getCurrentUser(); // Get the current user
                    const items = await fetchOrdersByUserId(user.userId); // Fetch cart items for the current user
                    setOrders(items);
                } catch (error) {
                    console.error("Error loading cart items:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            loadOrders();
        }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrderById(orderId); // Delete the order by ID
            setOrders((prevOrders) => prevOrders.filter((order) => order.$id !== orderId)); // Remove order from state
            alert('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error.message);
            alert('Failed to delete order');
        }
    };

    const handleConfirmOrder = () => {
        // Placeholder action for confirm button
        console.log('Confirm button pressed');
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0D0D0D" />
                <Text>Loading orders...</Text>
            </View>
        );
    }

    if (!orders.length) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No orders found.</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text>Order ID: {item.$id}</Text>
            <Text>Total Price: GHS {item.totalPrice}</Text>
            <Text>Order Date: {new Date(item.timestamp).toLocaleString()}</Text>
            <Text>Status: {item.status || 'Pending'}</Text>

            {/* Confirm Button */}
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmOrder} // Placeholder action for the confirm button
            >
                <Text style={styles.confirmText}>Confirm Order</Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteOrder(item.$id)} // Call the delete function
            >
                <Text style={styles.deleteText}>Delete Order</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.title}>Your Orders</Text>
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.$id}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
    confirmButton: {
        backgroundColor: '#000', // Black background color
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default OrdersScreen;
