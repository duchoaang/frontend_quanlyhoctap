import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import screens from "../navigations";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from "react-native-paper";

const BottomTab = () => {
  const [initalScreens, setInitalScreens] = useState(() => {
    AsyncStorage.getItem("user")
    .then((userData) => {
      if (userData) {
        setInitalScreens("HomeScreen");
      }
    })
    .catch((error) => {
      setInitalScreens("LoginScreen");
    });
})

 
  return (
    <Tab.Navigator
      initialRouteName= {initalScreens}
      backBehavior="history"
     
    >
      {screens.map((screen, index) => {
        return (
          <Tab.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={({ color, size, focused }) => ({
              tabBarHideOnKeyboard: true,
              tabBarItemStyle: {
                  display: screen.isHideTabItem === true ? 'none' : 'flex',
                  borderRadius: 10,
              },
              tabBarIcon: ({ color }) => (
                <AntDesign
                    name={screen.tabIconName}
                    size={screen.tabIconSize}
                    color={color}
                />
              
            ),
            
          })}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTab;
