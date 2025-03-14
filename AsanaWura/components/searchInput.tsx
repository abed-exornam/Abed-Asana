import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import {  GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'



import{icons} from '../constants'

const SearchInput = ({title, value, placeHolder, handleChangeText, ...props}) => {

const [showPassword, setShowPassword] = useState(false)  
    
  return (
    <GestureHandlerRootView style={styles.text}>
        <View style={styles.text}>
            <Text style={styles.text}>{title}</Text>
                <View style={styles.field} >
                    <TextInput style={{ padding: 15,justifyContent: 'center', fontSize: 20, color: 'black'}}
                    value={value}
                    onChangeText={handleChangeText}
                    placeholderTextColor={'grey'}
                    placeholder="Let's find your food fix"
                    secureTextEntry={title === 'Password' && !showPassword }
                    />
                    <TouchableOpacity>
                        <Image
                        source={icons.search}
                        style={{resizeMode:'contain',width: 50, height: 50}}
                        />
                    </TouchableOpacity>
                </View>
                
        </View>
    </GestureHandlerRootView>
  )
}

export default SearchInput


const styles = StyleSheet.create({
    text:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        width: '100%',
    },
    field:{
        //focus:borderColor='#5B4CCC',
        flexDirection: 'row',
        height: 50,
        alignItems: 'flex-start',
        justifyContent:'space-between',
        borderRadius: 25,
        backgroundColor: 'white',
        paddingRight: 40,
        borderWidth: 0,
        //borderColor: '#0D0D0D',
        marginTop: 10,
        width: '100%',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 5,
    }
})