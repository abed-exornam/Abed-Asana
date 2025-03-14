import { Stack } from "expo-router";

import  GlobalProvider  from "../context/GlobalProvider";

export default function RootLayout() {
  return(
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{title:'Index', headerShown: false}} />
        <Stack.Screen name="(authentication)" options={{title:'Authentication', headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{title:'tabs', headerShown: false}} />
        <Stack.Screen name="details" options={{title:'details', headerShown: false}} />
        
      </Stack>
    </GlobalProvider>
  );
}
