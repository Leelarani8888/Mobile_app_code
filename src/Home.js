import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import status from "./PatientHealthStatus";
import add from "./AddDescription";
import history from "./History";



const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Health Data" drawerStyle={{
          backgroundColor: 'white',

        }}  >
        <Drawer.Screen name="Health Data" component={status}   />
        <Drawer.Screen name="Save Information" component={add} />
        <Drawer.Screen name="History" component={history} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}