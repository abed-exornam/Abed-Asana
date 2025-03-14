import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButtonTT = ({handlePress}) => {
  return (
    <TouchableOpacity  
    onPress={handlePress}
    activeOpacity={0.7}
    style={styles.button }
    >
        <Text style={{color: 'white', fontSize: 16, alignItems:'center'}}>Login</Text>
    </TouchableOpacity>
  )
}

export default CustomButtonTT

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FE8A35',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    }
})