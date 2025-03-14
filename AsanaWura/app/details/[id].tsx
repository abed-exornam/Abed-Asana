import { useLocalSearchParams, router, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { images } from "@/constants";
import { BackButtonDisplayMode } from "react-native-screens";
import { StatusBar } from 'expo-status-bar'
import { Text, View, StyleSheet, ActivityIndicator,Image, ImageBackground } from "react-native";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { fetchMenuItemById, getCurrentUser, addToCart } from "@/lib/appwrite"; // Fetch function for Appwrite
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


import { icons } from "@/constants";
import AddButton from "@/components/back-button";

const Details = () => {
    const { id } = useLocalSearchParams(); // Extract dynamic id from the route
    const [menuItem, setMenuItem] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const details = await fetchMenuItemById(id); // Fetch details by ID
                setMenuItem(details);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) loadDetails();
    }, [id]);


    const handleAddToCart = async () => {
        try {
            const currentUser = await getCurrentUser(); // Get the current user
    
            // Prepare item data to be added to the cart
            const cartItem = {
                itemName:menuItem.itemName,
                userId: currentUser.userId, // Ensure this is from the logged-in user
                itemsId: menuItem.itemsId, // Use itemId from menuItem
                price: menuItem.price,
                orderId: menuItem.orderId,
                imageurl: menuItem.imageurl,
                
            };
    
            // Add item to the cart
            await addToCart(cartItem);
    
            // Navigate to cart screen after adding
            router.push("/cart");
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };
    

    if (loading) {
        return <ActivityIndicator size="large" color="#FE8A35" />;
    }

    
    

    return (
        
        <GestureHandlerRootView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <ImageBackground
                source={{ uri: menuItem.imageurl || 'https://via.placeholder.com/200' }}
                style={styles.image}
                resizeMode="cover"
                >
                    <SafeAreaView>
                        <View style={{ alignItems:'flex-start',padding:10}}>
                            <View /*style={{flex:1,flexDirection:'row',alignItems:'center',
                            
                            }}*/>
                            <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButtonContainer}>
                                <Image source={icons.leftArrow} style={styles.backButton}
                                resizeMode="contain" />
                            </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
                
            </View>  
            <View style={styles.container}>
                <Text style={styles.title}>{menuItem.itemName}</Text>
                <Text style={styles.description}>{menuItem.Description}</Text>
                <Text style={styles.price}>GHS {menuItem.price}</Text>
                 
            </View>
            <View style={{flex:1}}>
                <AddButton 
                
                    handlePress={handleAddToCart}
                    />   
            </View>
            <StatusBar style="light" />
        </ScrollView>  
        </GestureHandlerRootView>
        
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //backgroundColor: "#fff",
        //borderWidth:2,
        //borderColor:'red',
    },
    arrow:{

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    backButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 25, // Circular background
        padding: 15, // Size of the circle
        elevation: 5, // Optional: shadow effect for elevation
        width:50,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
        
    },
      backButton: {
        width: 20, // Size of the left arrow
        height: 20, // Size of the left arrow
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    image: {
        width: 375,
        height: 350,
        //borderBottomEndRadius:25,
        
    },    
    price: {
        fontSize: 20,
        color: '#0D0D0D',
    },
});