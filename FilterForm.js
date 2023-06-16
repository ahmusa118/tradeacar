import React, { useState , memo} from 'react';
import { View, Text, TextInput, Button, Pressable,StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Filterfm = memo(({ closeModal,onSubmit }) => {
  const [vlu,setVlu]=useState('')
  const [formValues, setFormValues] = useState({
    region: '',
    make: '',
    color: '',
    condition: vlu,
    transmission: '',
    mileage: [],
    vin: '',
    registered: '',
    description: '',
    price: [],
    negotiable: '',
  });
  const hc = (value) => {
    setVlu(value);
    console.log(value)
    setFormValues(prevValues => ({ ...prevValues, condition: value }));
  };

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Nigerian Used', value: 'Nigerian Used' },
    { label: 'Foreign Used', value: 'Foreign Used' }
  ]);
  const [values, setValues] = useState([0, 0]);
  const [values2, setValues2] = useState([0, 0]);

  const handleInputChange = (name, value) => {
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };
const handlepress=()=>{

  onSubmit(formValues)
}

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View >
        <Text>Filter Form</Text>
        <Pressable onPress={closeModal}>
        <Text style={styles.closeButton}>X</Text>
        </Pressable>
      </View>
      <TextInput placeholder="Region" onChangeText={value => handleInputChange('region', value)} />
      <TextInput placeholder="Make" onChangeText={value => handleInputChange('make', value)} />
      <TextInput placeholder="Color" onChangeText={value => handleInputChange('color', value)} />
      
      <TextInput placeholder="Transmission" onChangeText={value => handleInputChange('transmission', value)} />
      <Text>mileage</Text>
      <View style={{flexDirection:'row'}}>
    <Text>Min Value</Text>
    <TextInput
     
      keyboardType='numeric'
      value={values[0].toString()}
      onChangeText={value => {
        let updatedValues = [+value, values[1]];
        setValues(updatedValues);
        handleInputChange('mileage', updatedValues);
      }}
    />
 
 
    <Text>Max Value</Text>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      keyboardType='numeric'
      value={values[1].toString()}
      onChangeText={value => {
        let updatedValues = [values[0], +value];
        setValues(updatedValues);
        handleInputChange('mileage', updatedValues);
      }}
    />
    </View>
       <Text>Mileage Range: {values[0]} - {values[1]}</Text>
      <TextInput placeholder="VIN" onChangeText={value => handleInputChange('vin', value)} />
      
      <TextInput placeholder="Description" onChangeText={value => handleInputChange('description', value)} />
      <Text>Price</Text>

 <View style={{flexDirection:'row'}}>
      <Text>Min Value</Text>
      <TextInput
     
     keyboardType='numeric'
     value={values2[0].toString()}
     onChangeText={value => {
       let updatedValues = [+value, values2[1]];
       setValues2(updatedValues);
       handleInputChange('price', updatedValues);
     }}
   />
 
    <Text>Max Value</Text>

    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      keyboardType='numeric'
      value={values2[1].toString()}
      onChangeText={value => {
        let updatedValues = [values2[0], +value];
        setValues2(updatedValues);
        handleInputChange('price', updatedValues);
      }}
    />
    </View>
        <Text>Price Range: {values2[0]} - {values2[1]}</Text>
      <TextInput placeholder="Negotiable" onChangeText={value => handleInputChange('negotiable', value)} />
      
      <DropDownPicker
  open={open}
  value={vlu}
  items={items}
  setOpen={setOpen}
  onSelectItem={(item) =>{ handleInputChange('condition', item.value) 
  setVlu(item.value)
  }
}
  setItems={setItems}
/>
<Button onPress={handlepress} title='submit' />
    
    </View>
  );
  
})
const styles=StyleSheet.create({
  closeButton: {
    color: "red", // This makes the "X" red
    fontWeight: "bold",
    fontSize: 20}
})
export default React.memo(Filterfm);



