import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../Components/Permission';

export default function Register(navigation) {
  const [username, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [age, setUserAge] = useState('');
  const [address, setUserAddress] = useState('');
  const [password, setUserPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [project, setProject] = useState([
    'Geofencing',
    'STC',
    'Pick',
    'Radar',
  ]);
  const [leaves, setleave] = useState([]);
  const [leavetype, setLeavetype] = useState(['Casual', 'Sick', 'Paid']);
  const [head, setHead] = useState(['Kapil', 'Dev', 'ravi', 'Vaibhav']);
  const [expense, setExpense] = useState(['Travel', 'Snacks', 'Stay']);
  const [apply, setApply] = useState(['kp', 'dv', 'ff']);
  const [dates, setDates] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [imageUri, setimageUri] = useState('');

  const handleSubmitButton = async (navigation) => {
    if (!username) {
      alert('Please fill Name');
      return;
    }
    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!age) {
      alert('Please fill Age');
      return;
    }
    if (!address) {
      alert('Please fill Address');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    if (!designation) {
      alert('Please fill Designation');
      return;
    }

    if (!address) {
      alert('Please fill Address');
      return;
    }
    //Show Loader
    try {
      let result = await fetch('https://chaljabhai.herokuapp.com/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          email,
          age,
          address,
          designation,
          project,
          head,
          expense,
          apply,
          leavetype,
          leaves,
          dates,
          expenses,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let res = await result.json();
      if (res.status ) {
        alert('User Added.');
        navigation.navigate('Login');
        
      } else {
       alert ('User Already Exist.')
       
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectImage = async () => {
    const permissionstatus = await androidCameraPermission();
    if (permissionstatus || Platform.OS == 'android') {
      Alert.alert(
        'Profile Picture',
        'Choose an Option',

        [
          {text: 'Camera', onPress: onCamera},
          {text: 'Gallery', onPress: onGallery},
          {text: 'Cancel', onPress: () => {}},
        ],
      );
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      console.log('SELECTED IMAGE',image);
      imageUpload(image.path)
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('SELECTED IMAGE',image);
      imageUpload(image.path)
    });
  };

  const imageUpload=(imagePath)=>{
    const imageData=new FormData()
    imageData.append("file",{

      uri:imagePath,
      name:'image.png',
      fileName:'image',
      type:'image/png'
    })


   

 console.log('form data',imageData)
  }

  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../Assets/Register.png')}
            style={{
              width: '100%',
              height: 100,
              resizeMode: 'contain',

              marginRight: 16,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={username => setUserName(username)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="white"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={email => setUserEmail(email)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="white"
              keyboardType="email-address"
              // ref={emailInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={password => setUserPassword(password)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="white"
              // ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={age => setUserAge(age)}
              underlineColorAndroid="#f000"
              placeholder="Enter Age"
              placeholderTextColor="white"
              keyboardType="numeric"
              // ref={ageInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={designation => setDesignation(designation)}
              underlineColorAndroid="#f000"
              placeholder="Enter Designation"
              placeholderTextColor="white"
              autoCapitalize="sentences"
              // ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={address => setUserAddress(address)}
              underlineColorAndroid="#f000"
              placeholder="Enter Address"
              placeholderTextColor="white"
              autoCapitalize="sentences"
              // ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          {/* <View style={styles.CameraStyle}>
            <TouchableOpacity onPress={onSelectImage}>
              <Text>open camera</Text>
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  CameraStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,

    marginRight: 40,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 40,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
  },
  inputStyle: {
    flex: 1,
    height: 50,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 3,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
