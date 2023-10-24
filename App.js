import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { createContext, useEffect, useReducer, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
import BottomTab from "./components/BottomTab";



export default function App() {
  const [isLogin, setIsLogin] = useState(false);
 
  return (
    <PaperProvider theme={DefaultTheme}>
  
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
