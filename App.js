import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { StyleSheet,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../AwesomeProject/Screens/Login'
import Splash from '../AwesomeProject/Screens/Splash'
import Register from '../AwesomeProject/Screens/Register'
import UserDashBoard from './Screens/UserDashBoard';
import ManageAttendance from './Screens/ManageAttendance';
import userDetailsCard from './Components/userDetailsCard';
import ApplyLeave from './Screens/ApplyLeave';
import VisitLocation from './Screens/VisitLocation';
import AddTask from './Screens/AddTask';
import Expenses from './Screens/Expenses';
import Reports from './Screens/Reports';
import TaskManagement from './Screens/TaskManagement';
import Tab1 from './Components/Tab1';
import Tab2 from './Components/Tab2';
import Tabs from './Components/Tabs';
import AddExpense from './Screens/AddExpense';
import MyAttendance from './Screens/MyAttendance'
import DropDown from './Components/DropDown'

const Stack = createStackNavigator();

export default  App=({navigation})=> {
  return (
    <NavigationContainer>
      
        <Stack.Navigator initialRouteName={Splash}   screenOptions={{
        headerStyle: {
          backgroundColor: '#307ecc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
          <Stack.Screen
          
            name="Splash"
            component={Splash}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="Register"
            component={Register}
          /> 

           <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="UserDashBoard"
            component={UserDashBoard}
          />
         
           <Stack.Screen
            name="ManageAttendance"
            component={ManageAttendance}
          />

          <Stack.Screen
            name="userDetailsCard"
            component={userDetailsCard}
          />
           <Stack.Screen
            name="ApplyLeave"
            component={ApplyLeave}
          />
           <Stack.Screen
            name="VisitLocation"
            component={VisitLocation}
          />
           <Stack.Screen
            name="AddTask"
            component={AddTask}
          />
           <Stack.Screen
            name="Expenses"
            component={Expenses}
            
          />
          <Stack.Screen
            name="Reports"
            component={Reports}
          />
          <Stack.Screen
            name="TaskManagement"
            component={TaskManagement}
          />
 
         <Stack.Screen
            name="Tab1"  
            component={Tab1}
          />
             <Stack.Screen
            name="Tab2"  
            component={Tab2}
          />
             <Stack.Screen
            name="Tabs"  
            component={Tabs}
          />
           <Stack.Screen
            name="AddExpense"  
            component={AddExpense}
            
            
          />
           <Stack.Screen
            name="MyAttendance"  
            component={MyAttendance}
          />
          <Stack.Screen
            name="DropDown"
            component={DropDown}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
  )
}