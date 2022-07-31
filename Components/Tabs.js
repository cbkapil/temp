import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Tab1 from './Tab1';
import Tab2 from './Tab2';







const Tab = createMaterialTopTabNavigator();

export default function Tabs({navigation}) {
  return (
  
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}>
        <Tab.Screen name="Assigned" component={Tab1} />
        <Tab.Screen name="ONGOING" component={Tab2} />
      </Tab.Navigator>
    
  );
}
