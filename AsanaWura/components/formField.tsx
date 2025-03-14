import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import {  GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'



import{icons} from '../constants'

const FormField = ({title, value, placeHolder, handleChangeText, ...props}) => {

  const [showPassword, setShowPassword] = useState(false)  
    
  return (
    <GestureHandlerRootView style={styles.text}>
        <View style={styles.text}>
            <Text style={styles.text}>{title}</Text>
                <View style={styles.field} >
                    <TextInput style={{ padding: 13,justifyContent: 'center', fontSize: 20, color: 'black'}}
                    value={value}
                    onChangeText={handleChangeText}
                    placeholderTextColor={'grey'}
                    placeholder={placeHolder}
                    secureTextEntry={title === 'Password' && !showPassword }
                    />
                    {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image source={!showPassword ?
                     icons.eye : icons.eyeHide} style={{ paddingTop: 5 ,margin:10, width: 25, height: 25}} resizeMode='contain' />
                    </TouchableOpacity>
                    
                    )}
                </View>
                
        </View>
    </GestureHandlerRootView>
  )
}

export default FormField


const styles = StyleSheet.create({
    text:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        width: '100%',
    },
    field:{
        //focus:borderColor='#5B4CCC',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:'space-between',
        height: 50,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingRight: 40,
        borderWidth: 1,
        borderColor: '#0D0D0D',
        marginTop: 10,
        width: '100%',
    }
})