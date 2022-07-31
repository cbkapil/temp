import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  TextInput,
} from 'react-native';

import UserDetailsCard from '../Components/userDetailsCard';
import Geolocation from '@react-native-community/geolocation';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {windowHeight, windowWidth} from '../utils/utils';
import moment from 'moment';
import GetLocation from 'react-native-get-location'


const VisitLocation = ({navigation}) => {
  const [longitude, setLongitude] = useState('...');
  const [latitude, setLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [result, setResult] = useState([]);
  const [geofencelatitude, setGeofencelatitude] = useState('');
  const [geofencelongitude, setGeofencelongitude] = useState('');
  const [addressin, setAddresin] = useState('');
  const [timein, setTimein] = useState('');
  const [username, setUsername] = useState('');
  const [mainaddress, setmainAddress] = useState('');
  const [designation, setDesignation] = useState('');
  const [mycity, setMycity] = useState('');
  const [clicked, setclicked] = useState('N');
  const [infence, setInfence] = useState('N');
  const [signin, setsign] = useState('Y');
  const [loggedin, setLoggedin] = useState('Y');
  const [today, setToday] = useState('Y');
  const [timeout, setTimeOut] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
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
            //To Check, If Permission is granted
            setLocationStatus('Permission Granted')
            
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();

  
  }, []);



  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
})
.then(location => {
  setLatitude(location.latitude);
    setLongitude(location.longitude)
    console.log(location.latitude);
    console.log(location.longitude)
    console.log(locationStatus)
})
.catch(error => {
    const { code, message } = error;
    console.warn(code, message);
})


  
  const GetDistance = async () => {
    console.log('====DDD ', latitude);
    console.log('====DDD', longitude);
    var getResponse = '';
    const LoginAPI = `https://api.radar.io/v1/route/distance?origin=${latitude},${longitude}&destination=23.1858865,79.9113275&modes=foot,car&units=imperial`;
    try {
      let response = await fetch(LoginAPI, {
        method: 'GET',

        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',

          Authorization: 'prj_live_sk_0b92774c181f4d9b0cf000d9462bf6a6399babfe',
        },
      });
      let json = await response.json();
      getResponse = json;
      console.log(json);
      setResult(JSON.stringify(getResponse.routes.geodesic.distance.text));
      console.log(result);
      var myArray = [result];
      myArray = result.split(/([0-9]+)/);
      if (myArray[1] < 1000 && result.includes('ft')) {
        setInfence('Y');
        console.log('user is inside fenced area');
      } else {
        setInfence('N');
        console.log('user is out of fence area');
      }
    } catch (error) {
      console.log('\n\n GETDISTANCE FAILED : ');
    }
  };

  GetDistance();


  async function getAddress() {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=f28db40a5d3044b0b5f738bd27443d45`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('failed to fetch address');
    } else {
      const data = await response.json();
  
     
      
      console.log(data.features);
    }
  }
  
  getAddress();



  async function getAddresss() {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?country=in&limit=1&types=place%2Cpostcode%2Caddress%2Cdistrict%2Cneighborhood%2Clocality%2Ccountry%2Cpoi%2Cregion&language=en&access_token=pk.eyJ1IjoiZGV2YW5qYW5uIiwiYSI6ImNsNW56aTJzMTE4cmszam5tNHpmYzg3am8ifQ.X9JfJ2fIjZO77KkY9AWmIg`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('failed to fetch address');
    } else {
      const data = await response.json();
  
      const address = data.features[0].place_name;
      
      console.log('====>',address);
    }
  }

  const sigin = async () => {
    const time = moment().format('hh:mm a');
    console.log(time);
    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/search/62e3614ff51a7aa87be4548c',
      {
        method: 'post',
        body: JSON.stringify({mycity, time}),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    console.warn(result);
    
  };

  const getData = async () => {
    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/getdata/62e3614ff51a7aa87be4548c',
      {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    setToday(result.dates[0].date);
    setAddresin(result.dates[0].addressin);
    setTimein(result.dates[0].timein);
    setUsername(result.username);
    setDesignation(result.designation);
    setmainAddress(result.address);
    setTimeOut(result.dates[0].timeout);
  };
  getData();
  

  const SignOut = async () => {
    const time = moment().format('hh:mm a');
    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/signout/62e3614ff51a7aa87be4548c',
      {
        method: 'post',
        body: JSON.stringify({
          mycity,
          time,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    console.warn(result);
    alert('Signing Out');
    navigation.navigate('MyAttendance');
  };

  

  async function getAddress(longitude, latitude) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?country=in&limit=1&types=place%2Cpostcode%2Caddress%2Cdistrict%2Cneighborhood%2Clocality%2Ccountry%2Cpoi%2Cregion&language=en&access_token=pk.eyJ1IjoiZGV2YW5qYW5uIiwiYSI6ImNsNW56aTJzMTE4cmszam5tNHpmYzg3am8ifQ.X9JfJ2fIjZO77KkY9AWmIg`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('failed to fetch address');
    } else {
      const data = await response.json();

      const address = data.features[0].place_name;
      setMycity(address);
      console.log(address);
    }
  }

  getAddress();

  const submit = () => {
    if (infence === 'Y') {
      setclicked('Y')
      sigin();
      
    } else alert('Please Try Again');
  };

  return (
    <ScrollView>
      <View>
        <UserDetailsCard
          Name={username}
          Designation={designation}
          Address={mainaddress}></UserDetailsCard>
      </View>

      <View style={styles.container}>
        <View style={styles.DateDetailsBox}>
          <View style={styles.Details}>
            <Text style={{fontWeight: '600', color: 'red', fontSize: 16}}>
              Details
            </Text>
          </View>
          <View style={styles.Date}>
            <Text
              style={{
                fontWeight: '600',
                color: 'blue',
                fontSize: 16,
                marginLeft: 35,
              }}>
              {today}
            </Text>
          </View>
        </View>
        <View style={styles.AttendanceCard}>
          <View style={styles.AttendanceImage}>
            <Image
              source={require('../Assets/user.png')}
              style={{
                width: '80%',
                height: 90,
                resizeMode: 'contain',
                margin: 10,
                marginRight: 90,
                marginBottom: 10,
                marginTop: 20,
              }}
            />
          </View>
          <View style={styles.AttendanceTextContainer}>
            <View style={styles.AttendanceText}>
              <Text style={{fontWeight: '600', color: 'green', fontSize: 16}}>
                TimeIn:
              </Text>

              <Text style={{fontSize: 18, fontWeight: '400', color: 'black'}}>
                {timein}
              </Text>
            </View>
            <View style={styles.AttendanceText2}>
              <Text style={{fontWeight: '600', color: 'green', fontSize: 16}}>
                Address
              </Text>
              <Text style ={{fontSize:18,fontWeight:'400',color:'black'}}>{addressin}</Text>
              <Text style={{fontWeight: '600', color: 'green', fontSize: 16}}>
                TimeOut:
              </Text>
              <Text style={{fontSize: 18, fontWeight: '400', color: 'black'}}>
                {timeout}
              </Text>
            </View>
          </View>
        </View>

        {clicked === 'N' ? (
          <View>
            <TouchableOpacity onPress={submit}>
              <View style={styles.TimeOutButton2}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 15,
                  }}>
                  Signin
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={SignOut}>
              <View style={styles.TimeOutButton}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 15,
                  }}>
                  SignOut
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  LogButtonouter: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#ebecf0',
    height: windowHeight,
    width: windowHeight,
  },

  LogButton: {
    height: windowHeight / 13,
    width: 150,
    backgroundColor: 'darkblue',
    marginTop: 180,
    marginLeft: 120,
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 15,
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
    marginLeft: 130,
    marginTop: 40,
    elevation: 9,
  },

  TimeOutButton: {
    width: windowWidth / 3,
    backgroundColor: 'grey',
    height: windowHeight / 14,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 130,
    marginRight: 20,
    marginTop: 70,
  },

  TimeOutButton2: {
    width: windowWidth / 3,
    backgroundColor: 'skyblue',
    height: windowHeight / 14,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 130,
    marginRight: 20,
    marginTop: 70,
  },

  AttendanceCard: {
    flexDirection: 'row',
    width: windowWidth - 20,
    height: windowHeight / 4,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 30,
    marginLeft: 10,

    elevation: 9,
  },
  //   AttendanceDetails: {

  //     backgroundColor: 'purple',
  //     marginTop: 12,
  //     marginLeft: 20,
  //     height:windowHeight/3,
  //     width:windowWidth/3,

  //     flexDirection: 'row',
  //   },

  container: {
    flex: 1,
    flexDirection: 'column',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#d9dbda',
  },
  AttendanceImage: {
    marginLeft: 20,
    marginTop: 20,
  },

  AttendanceTextContainer: {
    marginTop: 35,
    flexDirection: 'column',
  },

  DateDetailsBox: {
    width: windowHeight,
    backgroundColor: '#d9dnda',
    flexDirection: 'row',
  },
  Date: {
    marginLeft: 100,
  },
  WorkInfo: {
    width: windowWidth - 20,
    height: windowHeight / 8,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 30,
    elevation: 9,
  },
  WorkHours: {
    paddingHorizontal: 40,
    height: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },

  BreakHours: {
    paddingHorizontal: 40,
    flexDirection: 'row',
    height: 25,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
  },
  AttendanceText: {
    flexDirection: 'row',
  },
  AttendanceText2: {
    flexDirection: 'column',
    marginTop: 10,
  },
  Details: {
    marginRight: 25,
    marginLeft: 50,
  },
});

export default VisitLocation;
