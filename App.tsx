import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import MainStack from "./stack/MainStack";
import { MyThemeProvider } from "./context/ThemeProvider";

export default function App() {
  return (
    <MyThemeProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </MyThemeProvider>
  );
}
