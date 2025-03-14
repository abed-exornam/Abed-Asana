import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({handlePress}) => {
  return (
    <TouchableOpacity  
    onPress={handlePress}
    activeOpacity={0.7}
    style={styles.button }
    >
        <Text style={{color: 'white', fontSize: 16, alignItems:'center'}}>Get Started</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0D0D0D',
        padding: 15,
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        marginTop: 20,
    }
})