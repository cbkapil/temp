import React, { useState,useEffect } from 'react';
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


const DATA = [
  {
    id: '1',
    Project:'GeoAttendance App',
    Expense:'Travel',
    Persons:'2',
    From_Date:'16/07/2022',
    To_Date:'16/08.2022',
    Advance:'44444',
    Amount:'5555'
  },
  {
    id: '2',
    Project:'SrvMe App',
    Expense:'Travel',
    Persons:'2',
    From_Date:'16/07/2022',
    To_Date:'16/08.2022',
    Advance:'44444',
    Amount:'5555'
  }
  
];

const Item = ({id, Project,Expense, Persons, From_Date, To_Date,Advance,Amount}) => (
 <View style={styles.TopContainer}>
<View style={styles.FirstColumn}>


<View style={styles.SecondColumn}>

  <View style={styles.FifthColumn}>

<Text style= {{fontSize:18,fontWeight:'400',color:'black'}}>
      ID:
</Text>
    <Text style= {{fontSize:18,fontWeight:'400',color:'black'}}>
      Project:
    </Text><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Expense:
    </Text>
    <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Persons:
</Text>
<Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      From Date:
</Text>
<Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      To Date:
</Text>
<Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Advance:
</Text>
<Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Amount:
</Text>
  </View>
</View>
<View style={styles.ThirdColumn}>
  <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>{id}</Text>
  <Text style ={{fontSize:18,fontWeight:'400',color:'black'}}>{Project}</Text>
  <Text style = {{fontSize:18,fontWeight:'400',color:'black'}}>{Expense}</Text>
  <Text style ={{fontSize:18,fontWeight:'400',color:'black'}}>
      {Persons}
</Text>
<Text style ={{fontSize:18,fontWeight:'400',color:'black'}}>
      {From_Date}
</Text>
<Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {To_Date}
</Text>
<Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {Advance}
</Text>
<Text style= {{fontSize:18,fontWeight:'400',color:'black'}}>
      {Amount}
</Text>
  </View>
<View styles={styles.FourthColumn}>
  <View style={styles.Seventh}>
<TouchableOpacity>
<Image
                source={require('../Assets/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight:40,
                  marginTop: 70,
                }}
              />
</TouchableOpacity>
</View>
<View style={styles.Eight}>
<BouncyCheckbox
  size={20}
  fillColor="blue"
  unfillColor="#fff"
  text=""
  iconStyle={{ borderColor: "red" }}
  textStyle={{ fontFamily: "JosefinSans-Regular" }}
  onPress={console.log('i m bouncy checkbox')}
/>
</View>
  
</View>
</View>


 </View>
);

const AddExpense = ({navigation}) => {

const [response,setResponse]=useState('')

  useEffect(() => {
    getData()
  });

  const getData = async () => {
    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/getExpense/62e3614ff51a7aa87be4548c',
      {
        method: 'GET',
  
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    
    setResponse(result.exp)
    console.log(response)
    
  };
  const renderItem = ({item,index}) => {
    
return(
<View style={styles.TopContainer}>
<View style={styles.FirstColumn}>


<View style={styles.SecondColumn}>

  <View style={styles.FifthColumn}>

<Text style={{fontSize:18,fontWeight:'400',color:'black'}}>
      ID:
</Text >
    <Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Project:
    </Text><Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Expense:
    </Text>
    <Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Persons:
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      From Date:
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      To Date:
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Advance:
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      Amount:
</Text>
  </View>
</View>
<View style={styles.ThirdColumn}>
  <Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>{item._id}</Text>
  <Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>{item.project}</Text>
  <Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>{item.expense}</Text>
  <Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {item.person}
</Text >
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {item.from}
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {item.to}
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {item.advance}
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {item.amount}
</Text>
<Text  style={{fontSize:18,fontWeight:'400',color:'black'}}>
      {item.remarks}
</Text>
  </View>
<View styles={styles.FourthColumn}>
  <View style={styles.Seventh}>
<TouchableOpacity>
<Image
                source={require('../Assets/delete.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight:40,
                  marginTop: 70,
                }}
              />
</TouchableOpacity>
</View>
<View style={styles.Eight}>
<BouncyCheckbox
  size={20}
  fillColor="blue"
  unfillColor="#fff"
  text=""
  iconStyle={{ borderColor: "red" }}
  textStyle={{ fontFamily: "JosefinSans-Regular" }}
  onPress={console.log('i m bouncy checkbox')}
/>
</View>
  
</View>
</View>


 </View>
  
)

    
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({



TopContainer:{

    flex:3,
    marginVertical:15,
    elevation:10

},
  container: {
    flex: 1,
  
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  ItemContainer: {
    backgroundColor: '#fff',
    marginBottom: 40,
    borderRadius: 30,
    marginHorizontal: 20,
    height: 120,
    paddingVertical: 19,
    elevation: 9,
  },
  ItemList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 60,
  },
  FirstColumn:{
    flexDirection:'row' ,
    justifyContent:'space-between',
    backgroundColor:'#fff'
  },
  FourthColumn:{
    
    justifyContent:'space-between'
  }
  ,ThirdColumn:{
    backgroundColor:'#fff'
  },
  FifthColumn:{
    backgroundColor:'#fff'
  }
});

export default AddExpense;
