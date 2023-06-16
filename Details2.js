import React from 'react'
import {View,Text,Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Details2=({route,myemail})=>{
    const { details } = route.params;
    const navigation = useNavigation();

    const handleChatButtonPress = () => {
        if(route.params.myemail){
            if (route.params.myemail.toLowerCase() === details[0]?.email.toLowerCase()) {
                console.log('nothing');
              }
            else{
            
        navigation.navigate('ChatScreen', {sellemail: details[0]?.email, myemail:route.params.myemail,details:details});}}
        else {
            alert('sign in first')
        }
    }
return(<View>
<Text>make: {details[0]?.make}</Text>
    <Text>condition: {details[0]?.condition}</Text>
    <Text>description: {details[0]?.description}</Text>
    <Text>mileage: {details[0]?.mileage}</Text>
    <Text>negotiable: {details[0]?.negotiable}</Text>
    <Text>region: {details[0]?.region}</Text>
    <Text>transmission: {details[0]?.transmission}</Text>
    <Text>vin: {details[0]?.vin}</Text>
    <Text>color: {details[0]?.color}</Text>
    <Text>price: N{details[0]?.price}</Text>
    
    <Button title="Chat with seller" onPress={handleChatButtonPress} />
      
    </View>)
}
export default Details2