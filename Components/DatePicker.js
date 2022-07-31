import React, { useState } from 'react'
import { Button ,Image,Text, View,StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default ({date,onConfirm,open,}) => {
  
    

  return (
    <>
     <TouchableOpacity onPress={() => setOpen(true)} 
style={styles.calendar}>
<Image
                source={require('../Assets/redd.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              />

     </TouchableOpacity>
      <DatePicker
        modal
    
        date={date}
        // onConfirm={(date) => {
        //   setOpen(false)
        //   setDate(date)
        //   console.log(date)
        //   {date}
        // }}
        onConfirm={onConfirm}
        onCancel={() => {
          setOpen(false)
        }}
      />

      
      <Text>{` ${
                 moment(date).format("DD/MMMM/YYYY")
              }`}</Text>
    </>
  )
}

const styles=StyleSheet.create({
calendar:{
    backgroundColor:'#fff'
},

})