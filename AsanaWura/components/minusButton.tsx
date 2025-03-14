import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

import {icons} from '@/constants'

const MinusButton = ({ onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}
        activeOpacity={0.7}>
            <Image source={icons.minus} style={styles.image} />           
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
    image: {
        width: 20,
        height: 20,
    },
});

export default MinusButton;
