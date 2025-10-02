import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { TabActions } from "@react-navigation/native";
import MyInfo from "../screens/MyInfo";
import { BottomTabsStackPage } from "./stack.d/BottomTab.d";

// BottomTab 사용하기 위한 네비게이션 생성
const Tabs = createBottomTabNavigator<BottomTabsStackPage>();

// BottomTab의 각 페이지의 Header 이름 가져오기
const getHeaderName = (screenName: keyof BottomTabsStackPage) => {
  switch (screenName) {
    case "Home":
      return "메인";
    case "MyInfo":
      return "나의 정보";
  }
};

const BottomTab = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerTitle: getHeaderName(route.name),
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="MyInfo" component={MyInfo} />
    </Tabs.Navigator>
  );
};

export default BottomTab;
