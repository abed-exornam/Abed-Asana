import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import {icons}  from '../../constants';

const TabIcon = ({icon, color, name, focused}:
   {icon: any, color: string, name: string, focused: boolean}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image 
      source={icon} 
      resizeMode='contain'
      tintColor={color}
      style={{
        width: 25,
        height: 25,
        tintColor: focused ? '#0D0D0D' : '#cccccc',
      }}
      />
      <Text style={{color: focused ? '#0D0D0D' : 'grey',
        fontWeight: focused ? 'bold': 'regular' ,fontSize: 10 }}>{name}</Text>
    </View>
  )
}


const TabsLayout = () => {
  return (
    <>
     <Tabs  screenOptions={{tabBarShowLabel: false, tabBarStyle:{backgroundColor:'white'
      ,position:'absolute', height:70, borderTopWidth:1,borderTopColor:'#cccccc', minHeight:70}}}>
        <Tabs.Screen name="home" 
        options={{title: 'Home', 
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon
           icon={icons.home}
           color={color}
           name={'Home'}
           focused={focused}
          />
        )
         }}/>
        <Tabs.Screen name="cart"
        options={{title:'Cart', 
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon
           icon={icons.cart}
           color={color}
           name={'Cart'}
           focused={focused}
          />
        ) 
        }}/>
        <Tabs.Screen name="orders"
        options={{title:'Orders', 
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon
           icon={icons.help}
           color={color}
           name={'Orders'}
           focused={focused}
          />
        ) 
        }}/>
        <Tabs.Screen name="profile"
        options={{title:'Profile',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
          <TabIcon
           icon={icons.profile}
           color={color}
           name={'Profile'}
           focused={focused}
          />
        )  
        }}/>
     </Tabs>             
    </>
  )
}

export default TabsLayout