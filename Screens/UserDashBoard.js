import {View, Text, StyleSheet, Image} from 'react-native';
import React ,{useState}from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserDetailsCard from '../Components/userDetailsCard';
import ManageAttendance from './ManageAttendance';

export default function UserDashBoard({route,navigation}) {
  
  const [username,setUsername]=useState('')
  const [mainaddress,setmainAddress]=useState('')
  const[designation,setDesignation]=useState('')
  const getData=async()=>{
    

    let result = await fetch('https://chaljabhai.herokuapp.com/api/getdata/62e3614ff51a7aa87be4548c', {
      method: 'GET',
     
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    setUsername(result.username)
    setDesignation(result.designation)
    setmainAddress(result.address)
   
  }

getData()
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <UserDetailsCard Name={username} Designation={designation} Address={mainaddress}>
          
        </UserDetailsCard>

        <View style={styles.outerinfobox}>
          <TouchableOpacity style={styles.touchbox} onPress={()=>{navigation.navigate('VisitLocation')}} >
            <View style={styles.imagetextbox}>
              <Image
                source={require('../Assets/loc.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              />
            </View>
            <View style={styles.optiontextbox}>
            
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
                Mark Attendance
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.outerinfobox}>
          <TouchableOpacity style={styles.touchbox}onPress={()=>navigation.navigate('ApplyLeave')}>
            <View style={styles.imagetextbox}>
              <Image
                source={require('../Assets/apply.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              />
            </View>
            <View style={styles.optiontextbox}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Apply Leave</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.outerinfobox}>
          <TouchableOpacity style={styles.touchbox}onPress={()=>navigation.navigate('ManageAttendance')}>
            <View style={styles.imagetextbox}>
              <Image
                source={require('../Assets/last.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              />
            </View>
            <View style={styles.optiontextbox}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
                Visit Location
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.outerinfobox}>
          <TouchableOpacity style={styles.touchbox}onPress={()=>navigation.navigate('AddTask')}>
            <View style={styles.imagetextbox}>
              <Image
                source={require('../Assets/2do.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              />
            </View>
            <View style={styles.optiontextbox}>
              <Text
               style={{fontSize:18,fontWeight:'400',color:'black'}}>
                Task
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.outerinfobox}>
          <TouchableOpacity style={styles.touchbox}onPress={()=>navigation.navigate('Expenses')}>
            <View style={styles.imagetextbox}>
              <Image
                source={require('../Assets/dollar.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              />
            </View>
            <View style={styles.optiontextbox}>
              <Text
               style={{fontSize:18,fontWeight:'400',color:'black'}}>
                Expenses
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.outerinfobox}>
          <TouchableOpacity style={styles.touchbox}onPress={()=>navigation.navigate('AddExpense')}>
            <View style={styles.imagetextbox}>
              <Image
                source={require('../Assets/report.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              />
            </View>
            <View style={styles.optiontextbox}>
              <Text
                style={{fontSize:18,fontWeight:'400',color:'black'}}>
                Reports
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#f2f4f3',
    alignItems: 'center',
  },
  // box: {
  //   marginTop: 10,
  //   flex: 1,
  //   height: 50,
  //   width: '100%',
  //   flexDirection: 'row',
  //   backgroundColor: '#fff',
  //   borderWidth: 5,
  //   borderColor: '#f2f4f3',
  //   alignItems: 'center',

  //   borderRadius: 30,
  // },
  infobox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#307ecc',
    width: '100%',
  },
  imagebox: {
    flex: 1,
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  infotext: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white,',
    alignItems: 'flex-start',
    marginRight: 40,
  },

  infotextbox: {
    width: '70%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },

  outerinfobox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#red',
    width: '95%',
    marginTop: 10,
    borderRadius: 40,
    borderWidth: 3,
    elevation:9,

    borderColor: '#f2f4f3'
  },
  imagetextbox: {
    flex: 1,
    flexDirection: 'row',
    width: 50,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#fff',
  },

  optiontextbox: {
    flex: 3,
    flexDirection: 'row',
    height: 70,
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#fff',

    borderRadius: 40,
  },
  touchbox: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',

    borderRadius: 40,
  },
});
