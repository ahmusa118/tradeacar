
import React, { useEffect, useState,useRef } from 'react';
import { View, Text, TextInput, Button,StyleSheet, ScrollView ,KeyboardAvoidingView} from 'react-native';
import {MessageSchema} from './Schemas';
import { RoomSchema } from './Schemas';
import Realm from 'realm'
import { realmContext } from './RealmContext';
const {useRealm, useQuery} = realmContext;

const Sellchat=({route})=>{
  const realm=useRealm()


 
    const [messageReceived, setMessageReceived] = useState([]);
    const [input, setInput] = useState('');
  
    const idRef = useRef(Math.floor(Math.random() * 100000) + 1);
    const {email,room}=route.params
   


    const sendMessage = async () => {
  
      const regex = room.split(/(?<=@.*\.com).*/)[0];
     
      try {
        realm.write(() => {
          // Create a new message
          const newMessage = realm.create('Message', {
            _id: new Realm.BSON.ObjectId(),
            senderEmail: email,
            receiverEmail: regex,
            text: input.trim(),
            room: room,
            id: idRef.current.toString(),
            timestamp: new Date(),
          });
          
          // Find the room with the specified name, or create a new one if it doesn't exist
          let sroom = realm.objects('Room').filtered(`name == "${room}"`)[0];
          if (!sroom) {
           
            return new RoomSchema(realm, {
              _id: new Realm.BSON.ObjectId(),
              name: room,
              messages: [newMessage]
            });
   
        } else {
          // Add the new message to the existing room
          sroom.messages.push(newMessage);
        }
         
      
        
       
        });
        
    
        setInput('')
  
      } catch (error) {
        console.error('An error occurred while adding the message:', error);
      } 
   }

    useEffect(() => {
      // Get all messages
      const data = realm.objects('Message');
      const allMessages = data.filtered(`room == "${room}"`);
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
    }, []);
    
    




return(
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
    
      {messageReceived.map((i, index) => (
        <View key={`${i.id}-${index}`}>
          <Text style={i.senderEmail !== email ? styles.right : styles.left}>{i.senderEmail} {i.text}</Text>
        </View>
      ))}
      
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
    >
      <TextInput value={input} onChangeText={text => setInput(text)} />
      <Button title="Send" style={{flex:1}} onPress={sendMessage} />
      </KeyboardAvoidingView>
      </ScrollView>
      </View>
)
}

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
export default Sellchat