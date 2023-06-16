import React from 'react'
import {View,Text,Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
function HomeScreen() {
   
    const navigation=useNavigation()
    const hp=()=>{
        navigation.navigate('Main')
    }
  return (
          <View style={{alignItems:'center', paddingTop:150}}>
       
       <Button title='button' onPress={hp}></Button>
          </View>
  );
}
export default HomeScreen
