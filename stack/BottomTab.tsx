import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import MyInfo from "../screens/MyInfo";
import { BottomTabStackList } from "./stack.d/BottomTab.d";
import HomeStack from "./HomeStack";

// Bottom Tab 사용하기 위한 네비게이터 생성
const Tabs = createBottomTabNavigator<BottomTabStackList>();

// Bottom Tab의 각 페이지의 커스텀 Header 이름 가져오기
const getHeaderName = (screenName: keyof BottomTabStackList) => {
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
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="MyInfo" component={MyInfo} />
    </Tabs.Navigator>
  );
};

export default BottomTab;
