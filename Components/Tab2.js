import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
  {
    id: '1',
    schedule: 'haha',
    project:'AICRP',
    Task:'Need to change result for API',
    Status:'To do'
  },
  {
    id: '2',
    schedule: 'heloo',
    project:'AICRP',
    Task:'Need to setup load balance',
    Status:'To do'
  },
  {
    id: '3',
    schedule: 'haha',
    project:'AICRP',
    Task:'Need to create DataBase',
    Status:'To do'
  },
];

const Item = ({id,schedule,project,Task,Status }) => (
 
     <View style={styles.ItemContainer}>
<View style={styles.ItemList}>
    <Text>ID:</Text>
    <Text>{id}</Text>



</View>
<View style={styles.ItemList}>
    <Text>Project:</Text>
    <Text>{project}</Text>
</View>
<View style={styles.ItemList}>
    <Text>Task:</Text>
    <Text>{Task}</Text>



</View>
<View style={styles.ItemList}>
    <Text>Status:</Text>
    <Text>{Status}</Text>



</View>
     </View>
 
);

const Tab2 = () => {



  useEffect(() => {
    getData()
  });

  const getData = async () => {
    let result = await fetch(
      'http://10.0.2.2:8000/api/getExpense/62df9f64dfef3123f1542ff6',
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
  const renderItem = ({ item }) => (
    <Item schedule_on={item.schedule}
     project={item.project}
      Task={item.Task}
       Status={item.Status} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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

  ItemContainer:{
      backgroundColor:'#fff',
      marginBottom:40,
      borderRadius:30,
      marginHorizontal:20,
      height:120,
      paddingVertical:19,
      elevation:9

      
  },
  ItemList:{
      justifyContent:'space-between',
      flexDirection:'row',
      paddingHorizontal:60,
      
  }
});

export default Tab2;