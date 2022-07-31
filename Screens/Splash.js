import { View,Image ,Text,StyleSheet,ActivityIndicator} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

export default function Splash({navigation}) {
    // const [animating, setAnimating] = useState(true);
 

    
        setTimeout(() => {
        
         navigation.replace('Login')
        
        }, 5000);
      
  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/logo6.png')}
        style={{width: '90%',height:'30%' ,resizeMode: 'contain', margin: 30,marginBottom:100}}
      />
      <ActivityIndicator
        // animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  )
}const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#307ecc',
    },
    activityIndicator: {
    
      alignItems: 'center',
      height: 80,
    },
  });