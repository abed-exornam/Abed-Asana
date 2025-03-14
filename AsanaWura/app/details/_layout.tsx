import { Stack } from "expo-router";

export default function DetailsLayout() {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{title:'description', headerShown: false}} />
        </Stack>
    );
}
