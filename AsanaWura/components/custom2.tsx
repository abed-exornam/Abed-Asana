import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButtonT = ({handlePress}) => {
  return (
    <TouchableOpacity  
    onPress={handlePress}
    activeOpacity={0.7}
    style={styles.button }
    >
        <Text style={{color: 'white', fontSize: 16, alignItems:'center'}}>Sign In</Text>
    </TouchableOpacity>
  )
}

export default CustomButtonT

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0D0D0D',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    }
})