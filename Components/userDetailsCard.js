import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { windowWidth,windowHeight } from '../utils/utils';


export default function userDetailsCard({Name, Designation, Address}) {
  return (
    <SafeAreaView>
      <View style={styles.EmpDetailsOuterBox}>
        <View style={styles.EmpImageBox}>
          <Image
            source={require('../Assets/user.png')}
            style={{
              width: '80%',
              height: 90,
              resizeMode: 'contain',
              margin: 10,
              marginRight: 90,
              marginBottom: 10,
              marginTop:20
            }}
          />
        </View>
        <View style={styles.EmpTextOuterBox}>
          <View style={styles.EmpTextInnerBox}>
            <Text style={{color: 'white', fontSize: 18}}>Name:{Name}</Text>
          </View>
          <View style={styles.EmpTextInnerBox}>
            <Text style={{color: 'white', fontSize: 18}}>
              Designation:{Designation}
            </Text>
          </View>
          <View style={styles.EmpTextInnerBox}>
            <Text style={{color: 'white', fontSize: 18}}>
              Address:{Address}
            </Text>
          </View>
        </View>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
//   infobox: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#307ecc',
//     width: '100%',
//     height:'10%'


//   },
//   imagebox: {
//     flex: 1,
//     flexDirection: 'column',
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor:'red'
//   },
//   infotext: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'white,',
//     alignItems: 'flex-start',
    
//     backgroundColor:'green'
//   },
//   infotextbox: {
//     width: '100%',
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     marginTop: 10,
//     backgroundColor:'pink'
//   },

EmpDetailsOuterBox:{


    flexDirection:'row',
    backgroundColor:'#307ecc',
    width:windowWidth,
    height:windowHeight/5
},
EmpImageBox:{
    width:windowWidth/3,
 flexDirection:'row',
    backgroundColor:'#307ecc'
},
EmpTextOuterBox:{
    
    backgroundColor:'#307ecc',
    width:windowWidth,

},
EmpTextInnerBox:{
marginTop:10,
    backgroundColor:'#307ecc',
    height:windowHeight/24,
    alignContent:'center'
}

});
