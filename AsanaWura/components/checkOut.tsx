
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

//import {icons} from '@/constants'

const CheckOut = ({ onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}
        activeOpacity={0.7}>
            <Text style={styles.text}>CheckOut</Text>           
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#eee",
        marginHorizontal: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },    
    image: {
        width: 20,
        height: 20,
    },
});

export default CheckOut;
