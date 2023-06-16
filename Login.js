
import Signin from './Signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Tl from './Tl'
import Cardetails from './Cardetails'
const Login=()=>{
  const Stack = createBottomTabNavigator()
  return(
    <Stack.Navigator
        screenOptions={{ headerShown:false }}>
<Stack.Screen
                 name="Tl"
                 style={{fontSize:20}}
                 component={Tl}
               />
                    <Stack.Screen
                 name="Sign in"
                 style={{fontSize:20}}
                 component={Signin}
               />
              
           </Stack.Navigator>
  )
  }



  export default Login;

