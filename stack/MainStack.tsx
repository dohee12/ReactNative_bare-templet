import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "react-native-screens";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      {/* 첫 번째 자동으로 보여지는 화면 = BottomTab */}
      <Stack.Screen name="Tabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
