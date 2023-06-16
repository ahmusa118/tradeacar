import React from 'react'
import Tl from './Tl'
import Chatsnav from './Chatsnav'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UploadDet from './UploadDet'
import { Provider } from 'react-redux';
const Stack = createBottomTabNavigator()
function Main({ route }){
    return(
        
        <Stack.Navigator
        screenOptions={{ headerShown:false }}>
           
           <Stack.Screen
                 name="Home"
                 style={{fontSize:20}}
                 children={(props) => <UploadDet {...props} email={route.params.email} />}
               />
                <Stack.Screen
                 name="Tl"
                 style={{fontSize:20}}
           children={(props) => <Tl {...props} email={route.params.email} />}
               />
               <Stack.Screen
                 name="Chat"
                 style={{fontSize:20}}
           children={(props) => <Chatsnav {...props} email={route.params.email} />}
               />
        </Stack.Navigator>

    )
}
export default Main
