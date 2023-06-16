import React, { useState } from 'react';
import { View, Button, Image, StyleSheet,ScrollView,TextInput,Text,Linking  } from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UserDet = ({email}) => {
  const [imageUri, setImageUri] = useState([]);
    const [region, setRegion] = useState('');
    const [make, setMake] = useState('');
    const [color, setColor] = useState('');
    const [condition, setCondition] = useState('');
    const [transmission, setTransmission] = useState('');
    const [mileage, setMileage] = useState(0);
    const [vin, setVin] = useState('');
    const [registered, setRegistered] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [negotiable, setNegotiable] = useState('');
    const [sellerPhoneNumber, setSellerPhoneNumber] = useState('');
const [pay,setPay]=useState(false)

  const del=()=>{
setImageUri([])
  }
    const handlePress = () => {
      let data = new FormData();

      data.append('region', region);
      data.append('make', make);
      data.append('color', color);
      data.append('condition', condition);
      data.append('transmission', transmission);
      data.append('mileage', mileage);
      data.append('vin', vin);
      data.append('registered', registered);
      data.append('description', description);
      data.append('price', price);
      data.append('negotiable', negotiable);
      data.append('sellerPhoneNumber', sellerPhoneNumber);
      data.append('email', email);

      const images = imageUri;  // Convert imageUri into images

      images.forEach((uri, index) => {
        let localUri = uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Add the image to the form data
        data.append('images', { uri: localUri, name: filename, type });
      });

      fetch('https://tradeacar.ng/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
            setPay(true)
            setRegion('');
               setMake('');
               setColor('');
               setCondition('');
               setTransmission('');
               setMileage(0);
              
               setRegistered('');
               setDescription('');
               setPrice(0);
               setNegotiable('');
               setSellerPhoneNumber('');
              
               setImageUri([]);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
    const paysub = () => {
      const url = `https://tradeacar.ng/chg/${email}/${vin}`;

      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log("Can't handle url: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    };

  const takePhoto = async () => {
    /*if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      setImageUri(data.uri);
    }*/

    launchCamera({ mediaType: 'photo',cameraType:'back',saveToPhotos:true}, (response) => {
        if (!response.didCancel && !response.errorCode) {
          setImageUri(oldUris => [...oldUris, response.assets[0].uri])
        }
      })
  };

  const selectPhotoFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (!response.didCancel && !response.error) {
        const newUris = response.assets.map(asset => asset.uri); // Get an array of URIs
        setImageUri(oldUris => [...oldUris, ...newUris]); // Add the new URIs into the array
      }
    });
  }

  return (
          <ScrollView>
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takePhoto} />
      <Button title="Choose from Gallery" onPress={selectPhotoFromGallery } />
      <Button title="delete" onPress={del} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container2}>
      {imageUri.map((uri, index) => (
  <Image key={index} source={{ uri }} style={{ width: 100, height: 100 }} />
))}</View>
      </ScrollView>
          

          <TextInput
            placeholder="Region"
            value={region}
            onChangeText={(text) => setRegion(text)}
          />

          <TextInput
            placeholder="Make"
            value={make}
            onChangeText={(text) => setMake(text)}
          />

          <TextInput
            placeholder="Color"
            value={color}
            onChangeText={(text) => setColor(text)}
          />

          <TextInput
            placeholder="Condition"
            value={condition}
            onChangeText={(text) => setCondition(text)}
          />

          <TextInput
            placeholder="Transmission"
            value={transmission}
            onChangeText={(text) => setTransmission(text)}
          />

          <TextInput
            placeholder="Mileage"
            value={mileage.toString()} // Convert number to string for TextInput
            onChangeText={(text) => setMileage(parseInt(text))} // Convert string to number for state
          />

          <TextInput
            placeholder="VIN"
            value={vin}
            onChangeText={(text) => setVin(text)}
          />

          <TextInput
            placeholder="Registered"
            value={registered}
            onChangeText={(text) => setRegistered(text)}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />

          <TextInput
            placeholder="Price"
            value={price.toString()} // Convert number to string for TextInput
            onChangeText={(text) => setPrice(parseFloat(text))} // Convert string to number for state
          />

          <TextInput
            placeholder="Negotiable"
            value={negotiable}
            onChangeText={(text) => setNegotiable(text)}
          />

          <TextInput
            placeholder="Seller Phone Number"
            value={sellerPhoneNumber}
            onChangeText={(text) => setSellerPhoneNumber(text)}
          />

          <Text>{email}</Text>
          <Button title='submit' onPress={handlePress} />
          {pay?<Button title='pay now' onPress={paysub} />:''}
    </View>
          </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
   flex:1
  },
  container2: {
    
    flexDirection: 'row',  // Add this line
   
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  previewImage: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default UserDet;
