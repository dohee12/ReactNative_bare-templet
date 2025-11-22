import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import MainStack from "./stack/MainStack";
import { MyThemeProvider } from "./context/ThemeProvider";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView>
      <MyThemeProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </MyThemeProvider>
    </GestureHandlerRootView>
  );
}
