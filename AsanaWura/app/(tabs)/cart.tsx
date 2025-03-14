import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Image } from "react-native";
import { fetchCartItems, updateCartItem,getCurrentUser, removeCartItem, createOrder } from "@/lib/appwrite"; // Add functions for update and remove
import { SafeAreaView } from "react-native-safe-area-context";
import {GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

import { StatusBar } from 'expo-status-bar';
import PlusButton from "@/components/plusbutton";
import MinusButton from "@/components/minusButton";
import RemoveButton from "@/components/remove";
import CheckOut from "@/components/checkOut";


const Cart = () => {
    interface CartItem {
        $id: string;
        itemsId: string;
        itemName: string;
        quantity: number;
        price: number;
        imageurl: string;
        orderId: string;
    }
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const user = await getCurrentUser(); // Get the current user
                const items = await fetchCartItems(user.userId); // Fetch cart items for the current user
                setCartItems(items);
            } catch (error) {
                console.error("Error loading cart items:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCartItems();
    }, []);

    const handleIncreaseQuantity = async (itemsId, quantity) => {
        try {
            const updatedItem = await updateCartItem(itemsId, quantity + 1); // Increase quantity by 1
            setCartItems(prevItems => prevItems.map(item => 
                item.$id === itemsId ? { ...item, quantity: updatedItem.quantity } : item
            ));
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const handleDecreaseQuantity = async (itemsId, quantity) => {
        try {
            if (quantity > 1) {
                const updatedItem = await updateCartItem(itemsId, quantity - 1); // Decrease quantity by 1
                setCartItems(prevItems => prevItems.map(item => 
                    item.$id === itemsId ? { ...item, quantity: updatedItem.quantity } : item
                ));
            } else {
                handleRemoveItem(itemsId); // If quantity is 1, remove the item
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    const handleRemoveItem = async (itemsId) => {
        try {
            await removeCartItem(itemsId); // Remove item from cart collection
            setCartItems(prevItems => prevItems.filter(item => item.$id !== itemsId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    //new
    const router = useRouter();
    const handleCheckout = async () => {
        try {
            const user = await getCurrentUser();
            const totalPrice = getTotalPrice();
    
            // Prepare the orders data
            const orders = cartItems.map(item => ({
                itemsId: item.itemsId,
                itemName: item.itemName,
                quantity: item.quantity,
                price: item.price,
                imageurl: item.imageurl,
                orderId:item.orderId,
                userId: user.userId,
            }));
    
            // Create the order
            const newOrder = await createOrder(user.userId, orders, totalPrice);
            console.log("Order created successfully:", newOrder);
    
            // Clear the cart after successful checkout
            for (const item of cartItems) {
                await removeCartItem(item.$id);
            }
    
            setCartItems([]); // Clear the cart UI
    
            // Navigate to the orderdetails tab
            
            router.push("/orders");
    
            // Optional: Pass a flag to indicate a new order has been placed
            Alert.alert("Success", "Your order has been placed!");
        } catch (error) {
            console.error("Error during checkout:", error.message);
            Alert.alert("Error", "Could not complete checkout.");
        }
    };
    
    

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
      <GestureHandlerRootView>
      <SafeAreaView style={{flex:1}} >
          <View style={styles.container}>
              <Text style={styles.title}>Your Cart</Text>
              {cartItems.length === 0 ? (
                  <Text>Your cart is empty!</Text>
              ) : (
                  <FlatList
                      data={cartItems}
                      keyExtractor={(item) => item.$id}
                      renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <View style={{flexDirection:'row'}}>
                                    <Image 
                                        source={{ uri: item.imageurl }} 
                                        style={styles.itemImage} 
                                    />
                                    <View style={{paddingLeft:20, justifyContent:'center'}}>
                                        <Text style={{fontSize:20}}>{item.itemName}</Text>
                                        <Text style={{fontSize:15}}>Price: GHS {item.price}</Text>
                                        <Text style={{fontSize:15}}>Quantity: {item.quantity}</Text>
                                    </View>
                               </View>
                                <View style={styles.quantityControls}>
                                    <MinusButton  
                                      onPress={() => handleDecreaseQuantity(item.$id, item.quantity)} 
                                    />
                                    <PlusButton  
                                        onPress={() => handleIncreaseQuantity(item.$id, item.quantity)} 
                                    />
                                </View>
                              <RemoveButton  onPress={() => handleRemoveItem(item.$id)} />
                            </View>
                      )}
                  />
              )}
              <Text style={styles.total}>Total Price: GHS {getTotalPrice()}</Text>
              {cartItems.length > 0 && (
                  <CheckOut
                   disabled={cartItems.length === 0}
                   onPress={handleCheckout} />
              )}
          </View>
          <StatusBar style='dark'/>
      </SafeAreaView>
      </GestureHandlerRootView>  
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    cartItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginBottom: 10,
        //flexDirection:'row',
    },
    quantityControls: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    total: {
        fontSize: 18,
        padding: 20,
        fontWeight: "bold",
        marginTop: 20,
        alignSelf:'center'
    },
    itemImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
        borderRadius: 5,
        //paddingRight: 20,
    },
});

export default Cart;
