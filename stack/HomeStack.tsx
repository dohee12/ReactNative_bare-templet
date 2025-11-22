// 1. Home
// 2. HomeDetail

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import HomeDetail from "../screens/HomeDetail";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false,
            presentation: Platform.OS === 'ios' ? "containedTransparentModal" : "transparentModal",
            contentStyle: {
                backgroundColor: 'transparent'
            } //ios 인 경우 필수 
            }}
        >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="HomeDetail" component={HomeDetail}/>
    </Stack.Navigator>
    );
}
export default HomeStack;

