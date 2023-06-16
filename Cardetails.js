import React from 'react'
import {View,Text} from 'react-native'
import Flatlist from './Flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from './dataSlice';
const Cardetails=({route})=>{
    const { details,data2 } = route.params;
    const dispatch = useDispatch();
    
    const updateData= (data2) => {
     console.log(data2)
        
      }
      
      
return(<View>
      <Flatlist data={details} updateData={updateData}/>
   
    </View>)
}
export default Cardetails