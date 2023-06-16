import {useState,useEffect} from 'react'
import {View,TextInput,Button}  from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Signin=()=>{
    const navigation = useNavigation();
      const [email,setEmail]=useState('')
      const [password,setPassword]=useState('')
      
      async function fetchData(key) {
    
            const response = await fetch('https://tradeacar.ng/dashboard', {
            method: "GET",
            headers: { Authorization: `Bearer ${key}` }
            }).then(response => response.json())
          navigation.navigate('Main', { email: email.toLowerCase() });
  
            
          
      
        
        
    }
  
      const handleSubmit=async e=>{
        e.preventDefault()
  
           
            const data=  await fetch('https://tradeacar.ng/login',{
              method: "POST",
            headers: {
              "Content-Type" : "application/json"
            }, body: JSON.stringify({
              email,password
            }),
        
            }).then((res)=>res.json()).catch((err)=>console.log(err))
  
  
        if(data.token){
          
            
        
          
           fetchData(data.token)
         
       }
       else if(data.error){alert(data.error)}
            
      }
      return (
       <View style={{alignItems:'center', paddingTop:150}}>
    <TextInput placeholder='email' onChangeText={setEmail}></TextInput>
    <TextInput placeholder='password' onChangeText={setPassword}></TextInput>
    <Button title='button' onPress={handleSubmit}></Button>
       </View>
      )
    }
  
  
  
    export default Signin;
  
  