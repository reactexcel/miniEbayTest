import React from 'react';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import CreatePost from '../screens/CreatePost';
import Home from '../screens/Home';
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitle: 'Test', headerShown: false }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
      <Stack.Screen name="tabs" component={TabNavigation} />
    </Stack.Navigator>
  )
}

export default Routes

export const TabNavigation = () => {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#1a73e8',
      inactiveTintColor: '#fff',
      activeBackgroundColor: '#fff',
      inactiveBackgroundColor: '#1a73e8',
    }}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: '#1a73e8',
        headerTitleStyle: {
          fontSize: 17
        }
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            const color = focused ? "#1a73e8" : "#fff"
            return (
              <Icon name="home" color={color} size={25} />
            )
          },
        }} />

      <Tab.Screen name="CreatePost" component={CreatePost} options={{
        tabBarLabel: 'Create Posts',
        tabBarIcon: ({ focused }) => {
          const color = focused ? "#1a73e8" : "#fff"
          return (
            <Icon name="plus" color={color} size={25} />
          )
        },
      }} />

      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ focused }) => {
          const color = focused ? "#1a73e8" : "#fff"
          return (
            <Icon name="users" color={color} size={25} />
          )
        },
      }} />
    </Tab.Navigator>
  )
}