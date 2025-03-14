import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

const AddButton = ({handlePress}) => {
  return (
    <TouchableOpacity  
    onPress={handlePress}
    activeOpacity={0.7}
    style={styles.button }
    >
        <Text style={{fontWeight:'bold', fontSize:30,padding:10,alignItems:'center'}}>
          Add To Cart
        </Text>
        <Image
        source={icons.cart}
        resizeMode='contain'
        style={{height:30,width:30}}
        />
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
    button: {
      flex:1,
      padding: 10,
      margin: 10,
      borderRadius: 20,
      backgroundColor: '#f9f9f9',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row'
    }
})