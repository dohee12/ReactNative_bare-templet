import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import MainStack from "./stack/MainStack";
import { ThemeProvider } from "./context/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
