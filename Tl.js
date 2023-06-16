




import React, { useState, useEffect } from 'react';
import { Button, FlatList,Text,Image,View,ScrollView ,Modal} from 'react-native';
import Flatlist from './Flatlist'
import { useNavigation } from '@react-navigation/native';
import AsyncPaginateDropdown from './AsyncPaginateDropdown'
import { useDispatch } from 'react-redux';
import { updateData } from './dataSlice';
import FilterForm from './FilterForm';

const Tl = ({email}) => {
   const [modalVisible, setModalVisible] = useState(false);
  const navigation=useNavigation()
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isDataSet, setIsDataSet]=useState(false)
  const [data2,setData2]=useState([])
  const [isData2Set, setIsData2Set] = useState(false);
    const updateData = (updatedData) => {
    setData(updatedData);
    setData2(updatedData)
       //dispatch(updateData(updatedData))
     }

   
  const fetchData = async () => {
 
    try {
      const response = await fetch(`https://tradeacar.ng/cars?page=${page}`,{method: 'GET'});
      const newData = await response.json();
      let combinedData = [...data, ...newData];

      // Remove duplicates based on the _id property
      let uniqueData = Array.from(new Set(combinedData.map(a => a._id)))
                           .map(_id => {
                             return combinedData.find(a => a._id === _id)
                           });
  
      setData(uniqueData);
     
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    


  };
   
  useEffect(() => {
   
    fetchData();
  }, [page]);
 
const handleSelect=(details)=>{
 
  navigation.navigate('Cardetails', { details: details,data2:data2 });

}
  const loadMore = () => {
    setPage(oldPage => oldPage + 1);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  }


  const hsbmt = async (value) => {
    try {
      const response = await fetch(`https://tradeacar.ng/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
   // Filtered cars
   navigation.navigate('Cardetails', { details: data});
 
   setModalVisible(false)
    } catch (error) {
      console.error('Error:', error);
    }
   
  }
  
  
  return (
    <>
   
          <AsyncPaginateDropdown items={data} onSelect={handleSelect}/>
          <Button title="filter" onPress={openModal} />
         
      <Modal visible={modalVisible} animationType="slide">
  <FilterForm closeModal={closeModal} onSubmit={hsbmt}/>
      </Modal>
  <Text>{email}</Text>

          <Flatlist data={data} updateData={updateData} email={email}/>
               <Button title="Load more" onPress={loadMore} />
    </>
  );
};
export default Tl