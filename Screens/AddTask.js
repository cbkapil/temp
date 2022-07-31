import { View, Text ,StyleSheet,TextInput,Image} from 'react-native'
import React from 'react'
import { ScrollView ,TouchableOpacity} from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { windowHeight,windowWidth } from '../utils/utils'
import SelectList from 'react-native-dropdown-select-list'


  import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react'




// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];

export default function AddTask({navigation}) {
  // const [value, setValue] = useState();
  // const [isFocus, setIsFocus] = useState(false);

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && { color: 'blue' }]}></Text>
  //     );
  //   }
  //   return null;
  // };

  const data = [
    {value:'GeoFencing'},
    {value:'STC'},
    {value:'SrvMe'},
    {value:'Pick'},
  ];



  const [selected, setSelected] = React.useState("");
 const[title,setTitle]=React.useState('')
 const[description,setDescription]=React.useState('')

  const submit = async () => {


    if (! title) {
      alert('Please Add Title Of Task');
      return;
    }
    if (!selected) {
      alert('Please Select Project');
      return;
    }
    if (!description) {
      alert('Please Add Description');
      return;
    }
    
    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/sendtask/62e3614ff51a7aa87be4548c',
      {
        method: 'post',
        body: JSON.stringify({
          selected,
          title,
          description
         
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    alert(JSON.stringify(result));
    navigation.navigate('Tabs')

  };


  
  return (
    <ScrollView>
      <SafeAreaView>

<View style={styles.TaskContainer}>
      <View style={styles.Task2Container}>
  
  <View style={styles.TaskText}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Title</Text>
  </View>
  <View style={styles.TaskInput}>
    <TextInput
                style={styles.input}
                onChangeText={title => {
                  setTitle(title)
                  console.log(title);
                }}
               
                placeholder="Enter Task Title"
                keyboardType="ascii-capable"
              />

  </View>

  
 </View>
 <View style={styles.ProjectContainer}>
  
  <View style={styles.ProjectText}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Project</Text>
  </View>
  <View style={styles.ProjectInput}>
  <View style={styles.container}>
  <SelectList 
      onSelect={() => alert(selected)}
      setSelected={setSelected} 
      data={data}  
      arrowicon={<Image
        source={require('../Assets/d3.png')}
        style={{
          width: 20,
          height: 20,
          
          
        }}
      />} 
      // searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
      search={false} 
      boxStyles={{borderRadius:0,borderColor:'blue',dropdown:{borderColor:'blue'}}} //override default styles
    />
      </View>
     
  </View>

  
 </View>
 <View style={styles.PriorityContainer}>
  
  <View style={styles.PriorityText}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Priority</Text>
  </View>
  <View style={styles.PriorityInput}>
    <Text>DropDown</Text>

  </View>

  
 </View>

 <View style={styles.DescriptionContainer}>
  
  <View style={styles.DescriptionText}><Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Description</Text>
  </View>
  <View style={styles.DescriptionInput}>
    <TextInput
                style={styles.input}
                onChangeText={description => {
                  setDescription(description)
                  console.log(description);
                }}
               
                placeholder=""
                keyboardType="ascii-capable"
              />

  </View>

  
 </View>
 
 <TouchableOpacity onPress={submit}>
            <View style={styles.TimeOutButton}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                  marginTop: 15,
                }}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
 </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  input: {
    height: 45,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderColor:'blue'
    
  },
  TaskContainer:{
    backgroundColor:'#f2f4f3'
  },
  Task2Container:{
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'#fff'
   },
   TaskText:{
     marginTop:8,
     
   },
   TaskInput:{
     backgroundColor:'#fff'
   },
   ProjectContainer:{
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'#fff'
   },
   ProjectText:{
     marginTop:8,
     
   },
   ProjectInput:{
     backgroundColor:'#fff'
   },
   PriorityContainer:{
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'#fff'
   },
   PriorityText:{
     marginTop:8,
     
   },
   PriorityInput:{
     backgroundColor:'#fff'
   },
   DescriptionContainer:{
     
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:'#fff'
   },
   DescriptionText:{
     marginTop:8,
     
   },
   DescriptionInput:{
     backgroundColor:'#fff',
     marginTop:8
   },
   TimeOutButton: {
    width: windowWidth / 3,
    backgroundColor: 'skyblue',
    height: windowHeight / 14,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 120,
    marginRight: 20,
    marginTop:70
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

})