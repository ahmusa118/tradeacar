import React, { useState, useEffect } from 'react';
import { Button, FlatList,Text,Image,View,ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Cardetails from './Cardetails'
import { useNavigation } from '@react-navigation/native';
const Flatlist = ({ data, updateData,email }) => {
    const navigation=useNavigation()
    const [page, setPage] = useState(0);
    const [pg,setPg]=useState('')
    const [details,setDetails]=useState([])
    const add = (key) => {
        const updatedData = data.map((item) => {
            if (item._id === key) {
                return { ...item, page: item.page + 1 };
            }
            return item;
        });
        updateData(updatedData);
    };
    const viewitem=(key)=>{
        
        const x=data.filter((i)=>{return i._id===key})
      
        navigation.navigate('Details2',{details:x,myemail:email})
    }

    const sub=(key)=>{
        const updatedData = data.map((item) => {
            if (item._id === key ) {
                return { ...item, page: item.page - 1 };
            }
            return item;
        });
        updateData(updatedData);
    }
    if(pg==='Details'){
        return (
                <View>
                <Button onPress={bck} title='back' />
                <Cardetails details={details} email={email}/>
                </View>
                )
    }
    else{
        return (
                <FlatList
                data={data}
                renderItem={({ item }) => (
                                           <View style={{ flexDirection: 'column',alignItems:'center',borderWidth: 1, borderColor: 'black', borderRadius: 20 }}>
                                           <Text>{item.make}</Text>
                                           
                                           
                                           {item.images.length > 0 && (
                                                                       <FastImage
                                                                       source={{
                                                                       uri: `https://tradeacar.ng/ind/${item.images[item.page].replace(
                                             'uploads/',
                                             ''
                                           )}`,
                                                                       }}
                                                                       style={{ width: 100, height: 100 }}
                                                                       />
                                                                       )}
                                           <View style={{ flexDirection: 'row' }}>
                                           {item.page > 0 && <Button onPress={() => sub(item._id)} title="-" />}
                                           {item.page < 4 && <Button onPress={() => add(item._id)} title="+" />}
                                           </View>
                                           <Button onPress={()=>viewitem(item._id)} title='View details' />
                                           </View>
                                           
                                           )}
                keyExtractor={(item) => item._id}
                />
                );
    };
}
export default Flatlist;
