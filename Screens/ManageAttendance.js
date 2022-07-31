import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ViewBase,
  PermissionsAndroid,
  Button,
  TextInput
  
} from 'react-native';
import React, {useState, useEffect} from 'react';
import UserDetailsCard from '../Components/userDetailsCard';
import {windowHeight, windowWidth} from '../utils/utils';
import {ForceTouchGestureHandler, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import momment from 'moment';


import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManageAttendance({navigation}) {

  const[purpose,setPurpose]=useState('')
  const[place,setPlace]=useState('')
  const [timein, setTimein] = useState('');
  const [timeout, setTimeout] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [mainaddress, setmainAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [getToday, SetGetToday] = useState('');
  const [sendtime, setsendtime] = useState('');
  const [senddate, setsenddate] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [city, setMycity] = useState('');
  const [count, setCount] = useState(0);
  



  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
 
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      
      (position) => {
        setLocationStatus('You are Here');
 
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);
 
      
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
 
        
        setCurrentLongitude(currentLongitude);
        
        
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 3000000000000000000000000000000000000000000000,
        maximumAge: 1000000000000000000000
      },
    );
  };
 
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
      
        
        setLocationStatus('You are Here');
        console.log(position);
 
           
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
 
  
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
 
      
        setCurrentLongitude(currentLongitude);
 
        
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000000000000000000000000
      },
    );
  };

  

  async function getAddress(currentLongitude,currentLatitude){
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${currentLongitude},${currentLatitude}.json?country=in&limit=1&types=place%2Cpostcode%2Caddress%2Cdistrict%2Cneighborhood%2Clocality%2Ccountry%2Cpoi%2Cregion&language=en&access_token=pk.eyJ1IjoiZGV2YW5qYW5uIiwiYSI6ImNsNW56aTJzMTE4cmszam5tNHpmYzg3am8ifQ.X9JfJ2fIjZO77KkY9AWmIg`
 const response = await fetch(url)


 if(!response.ok){
    throw new Error('failed to fetch address')
 }
 else{
 const data = await response.json()
 
 console.log(data.features[0].place_name)
 const address=data.features[0].place_name
 
    setMycity(address)
    
   
 }
}




  getAddress(currentLongitude,currentLatitude)
    
  
      const submit=async()=>
      {
        let result = await fetch(
          'https://chaljabhai.herokuapp.com/api/sendloc/62e3614ff51a7aa87be4548c',
          {
            method: 'post',
            body:JSON.stringify({city,place,purpose}),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        result = await result.json();
        console.warn(result);
        
      }




   


  

  return (
    <ScrollView>
    <SafeAreaView>

<View style={styles.LocationContainer}>
<View style={styles.AddressContainer}>
<View style={styles.AddressText}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Location:</Text>
</View>
<View style={styles.Address}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>{city}
</Text>
</View>


</View>


<View style={styles.PlaceContainer}>

<View style={styles.PlaceText}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Place Of Visit</Text>
</View>
<View style={styles.PlaceInput}>
  <TextInput
              style={styles.input}
              onChangeText={place => {
                setPlace(place);
                console.log(place)
              }}
              
             
              placeholder="Place Of Visit"
              keyboardType="ascii-capable"
            />

</View>


</View>

<View style={styles.PurposeContainer}>

<View style={styles.PurposeText}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Purpose</Text>

</View>
<View style={styles.PurposeInput}>
  <TextInput
              style={styles.input}
              onChangeText={purpose => {
               
                setPurpose(purpose)
                console.log(purpose)
              }}
             
              placeholder="Purpose"
              keyboardType="ascii-capable"
            />

</View>


</View>

<View style={styles.ButtonBoxOuter}>
        <TouchableOpacity >
          <View style={styles.HoursButton}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                marginTop: 15,
              }}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={submit} >
          <View style={styles.TimeOutButton}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                marginTop: 15,
              }}>
              Apply
            </Text>
          </View>
        </TouchableOpacity>
      </View>

</View>
    </SafeAreaView>
  </ScrollView> 
  );
}

const styles = StyleSheet.create({

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  
  LocationContainer:{
    backgroundColor:'#d9dbda',
    width:windowWidth,
    height:windowHeight

  },
 AddressContainer: {
   flexDirection:'column',
   justifyContent:'space-between',
   backgroundColor:'#fff'
   
 },
 AddressText:{
   backgroundColor:'#FFF',
   marginTop:8
   
 },
 Address:{
   backgroundColor:'#FFF',
   marginTop:8

 },
 PlaceContainer:{
  flexDirection:'column',
  justifyContent:'space-between',
  backgroundColor:'#fff'
 },
 PlaceText:{
   marginTop:8,
   backgroundColor:'#fff'
 },
 PlaceInput:{
   backgroundColor:'#fff'
 },
 PurposeContainer:{
  flexDirection:'column',
  justifyContent:'space-between',
  backgroundColor:'#fff'
 },
 PurposeText:{
   marginTop:8,
   backgroundColor:'#fff'
 },
 PurposeInput:{
   backgroundColor:'#fff'
 },
 ButtonBoxOuter: {
  width: windowWidth / 2,
  flexDirection: 'row',
  marginTop: 40,
},
HoursButton: {
  backgroundColor: 'grey',
  width: windowWidth / 3,
  height: windowHeight / 14,
  alignItems: 'center',
  borderRadius: 10,
  marginLeft: 40,
  marginRight: 20,
},
TimeOutButton: {
  width: windowWidth / 3,
  backgroundColor: 'skyblue',
  height: windowHeight / 14,
  alignItems: 'center',
  borderRadius: 10,
  marginLeft: 20,
  marginRight: 20,
}
 
});
