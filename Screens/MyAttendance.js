import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
 
// const DATA = [
//   {
//     id: '1',
//    date:'16/04/1994',
//    timein:'10:10',
//    address:'vikas nagar',
//    timeout:'10:10',
//    address2:'DAMOH NAKA'
//   }, {
//     id: '2',
//    date:'16/04/1994',
//    timein:'10:10',
//    address:'vikas nagar',
//    timeout:'10:10',
//    address2:'DAMOH NAKA'
//   }
  
  
// ];







const MyAttendance = () => {


  useEffect(
    ()=>{
      getData()
    }
  )

  const[timein,setTimein]=useState('')
 const[date,SetGetToday]=useState('')
 const[address,setAddress]=useState('')
 const[getresult,setRes]=useState('')
  const renderItem = ({item,index}) => {


    return(
<View style={styles.AttendanceMainContainer}>
     <View style={styles.DateContainer}>
         <Text>{item.date}</Text>
         </View>
   <View style={styles.AttendanceTimeInContainer}>
       <View style={styles.TimeIn}>
           <Text>Time In:</Text>
           <Text>{item.timein}</Text>
           </View>
       <View style={styles.PhotoAddress}>
       <Image
                source={require('../Assets/user.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginLeft:5,
                  marginTop: 10,
                }}
              />

              <View style={styles.AdressFence}>
                  <View style={{backgroundColor:'green',color:'white'}}><Text>INSIDE FENCED AREA</Text></View>
                <Text>{item.address}</Text>
              </View>
       </View>
       


   </View>

   <View style={styles.AttendanceTimeOutContainer}>
       
   <View style={styles.TimeOut}>
           <Text>Time Out:</Text>
           <Text>{item.timeout}</Text>
           </View>
       <View style={styles.OutPhotoAddress}>
      
             <View style={styles.AdressFence2}>
                  <View style={{backgroundColor:'green',color:'white'}}><Text>INSIDE FENCED AREA</Text></View>
                <Text>{item.addressout}</Text>
              </View>
              <Image
                source={require('../Assets/user.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 80,
                  marginTop: 10,
                }}
              />
       </View>
       

       
</View>


 </View>

    )
  }
   


  const getData = async () => {
    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/getattendance/62e3614ff51a7aa87be4548c',
      {
        method: 'GET',
  
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    
   setRes (result.dates)
   console.log(getresult)
    
    
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={getresult}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

AttendanceMainContainer:{
    backgroundColor:'#fff',
    marginTop:10,
    elevation:9

},
PhotoAddress:{
    flexDirection:'row'
},
DateContainer:
{
    backgroundColor:'#f2f4f3',
    justifyContent:'center',

    alignItems:'center'
},
TimeIn:{
    backgroundColor:'yellow',
    flexDirection:'row'
},
date:{
    backgroundColor:'yellow'
},
OutPhotoAddress:{
    flexDirection:'row'
},


TimeOut:{
    backgroundColor:'yellow',
    flexDirection:'row',
    alignItems:'baseline',
    
    
    
},
AdressFence:{
    marginLeft:30
},
AdressFence2:{
    marginLeft:90,
    paddingRight:20
}

});

export default MyAttendance;
