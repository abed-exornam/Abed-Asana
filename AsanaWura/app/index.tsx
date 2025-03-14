import { Image, Text, View, StyleSheet, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Link } from 'expo-router'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../constants'
import CustomButton from '@/components/custom-button'
import { useGlobalContext } from '../context/GlobalProvider'




const index = () => {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView style={styles.primaryBackground}>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.shadow}>
            <Image source={images.koko} style={{width: 210, height: 150}}/>
          </View> 
        </View>
        <View style={styles.container}>
          <Text style={{color: '#0D0D0D',  fontSize: 40, fontWeight: 'bold'}}>Koko
          <Text style={{color:'#FE8A35'}}>Wura</Text></Text>
          <Text style={{color: 'white', fontSize: 13}}>Hungry? We've Got You Covered.</Text>
          <CustomButton handlePress={() => router.push('/sign-in')} />
        </View>
        
        
      </ScrollView>
    <StatusBar style="dark" />  
    </SafeAreaView>  
  )
}

export default index 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  primaryBackground: {
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#000', 
    shadowOffset: { width: 10, height: 10 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 10, 
    elevation: 10,
  }
})