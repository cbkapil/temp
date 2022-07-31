import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useState ,useEffect} from 'react';


const Tab1 = () => {




  const[response,setResponse]=useState('')

  useEffect(() => {
    getData()
  });

  const getData = async () => {
    let result = await fetch(
      'http://10.0.2.2:8000/api/getdata/62df9f64dfef3123f1542ff6',
      {
        method: 'GET',
  
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    
    setResponse(result.tasks)
    console.log(response)
    
  };
  


  const Item = ({id,title ,project,description}) => (
    <TouchableOpacity>
      <View style={styles.ItemContainer}>
      <View style={styles.ItemList}>
          <Text>{_id}</Text>
        </View>
        <View style={styles.ItemList}>
          
        </View>
        <View style={styles.ItemList}>
          <Text>Project:</Text>
          <Text>{title}</Text>
        </View>
        <View style={styles.ItemList}>
          <Text>Task:</Text>
          <Text>{project}</Text>
        </View>
        <View style={styles.ItemList}>
          <Text>Status:</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderItem = ({item,index}) => {
   return(

    <TouchableOpacity>
    <View style={styles.ItemContainer}>
    <View style={styles.ItemList}>
        <Text></Text>
      </View>
      <View style={styles.ItemList}>
        
      </View>
      <View style={styles.ItemList}>
        <Text>Title:</Text>
        <Text>{item.title}</Text>
      </View>
      <View style={styles.ItemList}>
        <Text>Project:</Text>
        <Text>{item.project}</Text>
      </View>
      <View style={styles.ItemList}>
        <Text>Description:</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  </TouchableOpacity>
   )
   };

  return (
    <SafeAreaView style={styles.container}>




       <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor:'#d9dbda'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 9,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  ItemContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 30,
    marginHorizontal: 20,
    height: 120,
    paddingVertical: 15,
    elevation: 9,
    marginTop:30
  },
  ItemList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 60,
  },
});

export default Tab1;
