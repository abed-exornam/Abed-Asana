import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthenticationLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{headerShown:false}} />
        <Stack.Screen name="sign-up" options={{headerShown:false}} />
      </Stack>
      <StatusBar style="auto" /> 
    </>
  )
}

export default AuthenticationLayout