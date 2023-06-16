import React,{useState,useEffect} from "react";
import {View,Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Chatsnav=({email})=>{
    const navigaation=useNavigation()
    const [dt,setDt]=useState([])
    const tl = async () => {
        try {
          const response = await fetch(`https://tradeacar.ng/chats/${email}`, { method: 'POST' });
          if (response.ok) {
            const data = await response.json();
            setDt(data)
          } else {
            throw new Error('Request failed with status ' + response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
      const hpress=(key)=>{
        navigaation.navigate('Sellchat',{room:key,email:email})
      }
useEffect(()=>{
    tl()
},[])
return(
<View>
<Text>
{dt.map((i)=>{
    return <View key={i._id}><Text onPress={()=>hpress(i.name)}>{i.name}</Text></View>
})}

</Text>


</View>
)
}
export default Chatsnav