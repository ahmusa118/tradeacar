import React, { useEffect, useState,useRef } from 'react';
import { View, Text, TextInput, Button,StyleSheet,ScrollView,KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client';
import {MessageSchema} from './Schemas';
import { RoomSchema } from './Schemas';
import Realm from 'realm'
import { realmContext } from './RealmContext';

const {useRealm, useQuery} = realmContext;
const ChatScreen = ({ route }) => {
  const realm=useRealm()
  // const data=await fetch(`https://tradeacar.ng/room/${sellemail}/${x}`,{method:'PUT'}).then(res=>res.json())
  //const data2=await fetch(`https://tradeacar.ng/room/${myemail}/${x}`,{method:'PUT'}).then(res=>res.json())
const [profileAdded,setProfilesAdded]=useState(0)
  const { sellemail, myemail, details } = route.params;
  const [messageReceived, setMessageReceived] = useState([]);
  const [input, setInput] = useState('');

  const idRef = useRef(Math.floor(Math.random() * 100000) + 1);
  const x=myemail+details[0].vin

 

  const sendMessage = async () => {
    try {


      realm.write(() => {
        // Create a new message
        const newMessage = realm.create('Message', {
          _id: new Realm.BSON.ObjectId(),
          senderEmail: myemail,
          receiverEmail:sellemail,
          text: input.trim(),
          room: x,
          id: idRef.current.toString(),
          timestamp: new Date(),
        });
        
        // Find the room with the specified name, or create a new one if it doesn't exist
        let sroom = realm.objects('Room').filtered(`name == "${x}"`)[0];
        if (!sroom) {
         
          return new RoomSchema(realm, {
            _id: new Realm.BSON.ObjectId(),
            name: x,
            messages: [newMessage]
          });

      } else {
        // Add the new message to the existing room
        sroom.messages.push(newMessage);
      }
       
    
      
     
      })


      /*realm.write(() => {
        // Create a new message
        const newMessage = realm.create('Message', {
          _id: new Realm.BSON.ObjectId(),
          senderEmail: myemail,
          receiverEmail: sellemail,
          text: input.trim(),
          room: x,
          id: idRef.current.toString(),
          timestamp: new Date(),
        });
  
        // Find the room with the specified name, or create a new one if it doesn't exist
       let rooma = realm.objects('Room').filtered(`name == "${x}"`)[0];
        if (!rooma) {
          
          // Create a new room
          return new RoomSchema(realm, {
            _id: new Realm.BSON.ObjectId(),
            name: x,
            messages: [newMessage]  // Initialize with the new message
          });


          
        } else {
          // Add the new message to the existing room
          rooma.messages.push(newMessage);
        }
      });*/
  
      setInput('');
   
      const data=await fetch(`https://tradeacar.ng/room/${sellemail}/${x}`,{method:'PUT'}).then(res=>res.json())
      const data2=await fetch(`https://tradeacar.ng/room/${myemail}/${x}`,{method:'PUT'}).then(res=>res.json())
      

  
      // Perform network requests after successful write to Realm
 
  
    } catch (error) {
      console.error('An error occurred while sending the message:', error);
    }
  };
  useEffect(() => {
    // Get all messages
    const data = realm.objects('Message');
    const allMessages = data.filtered(`room == "${x}"`);
    setMessageReceived([...allMessages]);
  
    // Set up the listener for new messages
    const listener = (messages, changes) => {
      // Check if there were insertions
      if (changes.insertions.length) {
        // Get the latest inserted message
        const latestMessage = messages[changes.insertions[0]];
        // Check if the latest message belongs to the current room
        if (latestMessage.room === x) {
          // If it does, add it to the received messages
          setMessageReceived((prevMessages) => [...prevMessages, latestMessage]);
        }
      }
    };
  
    // Add the listener
    data.addListener(listener);
  
    // Cleanup function
    return function cleanup() {
      data.removeListener(listener);
    }
  }, []);
  /*useEffect(() => {
    // Get all messages
    const data = realm.objects('Message');
    const allMessages = data.filtered(`room == "${x}"`);
    setMessageReceived([...allMessages]);
  
    // Set up the listener for new messages
    const listener = (messages, changes) => {
      // Check if there were insertions
      if (changes.insertions.length) {
        // Get the latest inserted message
        const latestMessage = messages[changes.insertions[0]];
        // Check if the latest message belongs to the current room
        if (latestMessage.room === room) {
          // If it does, add it to the received messages
          setMessageReceived((prevMessages) => [...prevMessages, latestMessage]);
        }
      }
    };
  
    // Add the listener
    data.addListener(listener);
  
    // Cleanup function
    return function cleanup() {
      data.removeListener(listener);
    }
  }, []);*/

 
 

  return (
    <View>
  <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
    
  {messageReceived.map((i, index) => (
    <View key={`${i.id}-${index}`}>
      <Text style={i.senderEmail !== myemail ? styles.right : styles.left}>{i.senderEmail} {i.text}</Text>
    </View>
  ))}

<KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
    >
      <View style={{flexDirection:''}}>
      <TextInput value={input} onChangeText={text => setInput(text)} />
      <Button title="Send" style={{flex:1}} onPress={sendMessage} />
      </View>
      </KeyboardAvoidingView>
      
   </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  left: {
    textAlign: 'left',
    // Add other styles as needed
  },
  right: {
    textAlign: 'right',
    // Add other styles as needed
  },
})
export default ChatScreen;
