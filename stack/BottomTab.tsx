import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { TabActions } from "@react-navigation/native";
import MyInfo from "../screens/MyInfo";

const Tabs = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="MyInfo" component={MyInfo} />
    </Tabs.Navigator>
  );
};
