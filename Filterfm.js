import React, { useState , memo} from 'react';
import { View, Text, TextInput, Button, Pressable,StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
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
  const [values, setValues] = useState([20, 80]);
  const [values2, setValues2] = useState([20, 80]);

  const handleInputChange = (name, value) => {
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };
const handlepress=()=>{

  onSubmit(formValues)
}

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
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
      <MultiSlider
        values={values}
        onValuesChange={(value) =>{ handleInputChange('mileage', value)
      setValues(value)
      }}
        min={0}
        max={1000000}
        step={1}
      />
       <Text>Mileage Range: {values[0]} - {values[1]}</Text>
      <TextInput placeholder="VIN" onChangeText={value => handleInputChange('vin', value)} />
      
      <TextInput placeholder="Description" onChangeText={value => handleInputChange('description', value)} />
      <Text>Price</Text>
      <MultiSlider
        values={values2}
        onValuesChange={(value) => {handleInputChange('price', value)
      setValues2(value)
      }}
        min={0}
        max={100000000}
        step={1}
      />
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
    fontSize: 20,}
})
export default React.memo(Filterfm);
