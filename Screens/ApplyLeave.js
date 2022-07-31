import {View, Text, StyleSheet, TextInput, Image, Button} from 'react-native';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight, windowWidth} from '../utils/utils';
import {useState, useEffect} from 'react';
import SelectList from 'react-native-dropdown-select-list';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export default function ApplyLeave() {
  const [reason, setReason] = useState('');
  const [selectedApply, setSelectedApply] = useState('');
  const [selectedHead, setSelectedHead] = useState('');
  const [selectedLeave, setSelectedLeave] = useState('');
  const [openn, setOpenn] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateFrom, setDateFroM] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [head, setHead] = useState([]);
  const [leave, setLeave] = useState([]);

  const submit = async () => {


     
    if (! selectedLeave) {
      alert('Please Select Leave Type');
      return;
    }
    if (!selectedHead) {
      alert('Please Select Head');
      return;
    }
    if (!selectedApply) {
      alert('Please Select Apply To');
      return;
    }
    if (!dateFrom) {
      alert('Please Select Date from');
      return;
    }
    if (!dateTo) {
      alert('Please Select Date To ');
      return;
    }
    if (!reason) {
      alert('Please Fill Reason For Leave');
      return;
    }
     const first= dateFrom.toISOString().split('T')[0].replace(/-/g,'/')
     const second= dateTo.toISOString().split('T')[0].replace(/-/g,'/')
     if(first > second){
       alert('From Date is Greater than To Date')
       return;
     }
     if(first === second){
      alert('From Date is Same as To Date')
      return;
    }

    
              
   
    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/applyleave/62e3614ff51a7aa87be4548c',
      {
        method: 'post',
        body: JSON.stringify({
          selectedLeave,
          selectedHead,
          selectedApply,
          dateFrom,
          dateTo,
          reason,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    console.warn(result);
    alert('Form Submitted Successfully..')
  };

  //   useEffect(() => {

  //   },[head,leave]);

  //   const getHead=async()=>{

  //     let result = await fetch('http://10.0.2.2:8000/api/fetchdata/62dd3234a827c2de12106cb9', {
  //       method: 'GET',

  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     result = await result.json();
  //    setHead(result.selecthead[0].head)
  //   }
  // getHead()

  //   const getLeave=async()=>{

  //     let result = await fetch('http://10.0.2.2:8000/api/fetchleave/62dd3234a827c2de12106cb9', {
  //       method: 'GET',

  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     result = await result.json();
  //    setLeave(result.leavetype[0].leave)
  //   }
  // getLeave()

  const Head = [{value: 'Dev'}, {value: 'Vaibhav'}, {value: 'Ravi'}];
  const Leave = [
    {value: 'Sick Leave'},
    {value: 'Casual Leave'},
    {value: 'Paid Levaes'},
  ];

  const Apply = [{value: 'Manager'}, {value: 'HR'}, {value: 'Project Head'}];
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={style.LeaveFormContainer}>
          <View style={style.TypeOfLeaveBox}>
            <View style={style.TypeOfLeaveText}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}} >Type Of Leave:</Text>
            </View>
            <View style={style.TypeOfLeaveDropDown}>
              <SelectList
                onSelect={() => console.log(selectedLeave)}
                setSelected={setSelectedLeave}
                data={Leave}
                arrowicon={
                  <Image
                    source={require('../Assets/d3.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                }
                // searchicon={}
                search={false}
                boxStyles={{borderRadius: 0}} //override default styles
              />
            </View>
          </View>
          <View style={style.TypeOfLeaveBox}>
            <View style={style.TypeOfLeaveText}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Select Head:</Text>
            </View>
            <View style={style.TypeOfLeaveDropDown}>
              <SelectList
                onSelect={() => console.log(selectedHead)}
                setSelected={setSelectedHead}
                data={Head}
                arrowicon={
                  <Image
                    source={require('../Assets/d3.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                }
                // searchicon={}
                search={false}
                boxStyles={{borderRadius: 0}} //override default styles
              />
            </View>
          </View>

          <View style={style.TypeOfLeaveBox}>
            <View style={style.TypeOfLeaveText}>
              <View style={style.ProjectDropDown}>
                <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Apply To</Text>
              </View>
            </View>
            <View style={style.TypeOfLeaveDropDown}>
              <SelectList
                onSelect={() => console.log(selectedApply)}
                setSelected={setSelectedApply}
                data={Apply}
                arrowicon={
                  <Image
                    source={require('../Assets/d3.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                }
                // searchicon={}
                search={false}
                boxStyles={{borderRadius: 0}} //override default styles
              />
            </View>
          </View>

          <View style={style.DropDownBox}>
            <View style={style.DropDownText}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>From Date:</Text>
            </View>
            <View style={style.DropDownList}>
              <TouchableOpacity
                onPress={() => setOpenn(true)}
                style={style.calendar}>
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
                open={openn}
                date={dateFrom}
                is24hourSource="locale"
                onConfirm={date => {
                  setOpenn(false);
                  setDateFroM(date);
                  console.log(dateFrom)
                }}
                onCancel={() => {
                  setOpenn(false);
                }}
              />
              <Text>{` ${moment(dateFrom).format('DD/MMMM/YYYY')}`}</Text>
            </View>
          </View>

          <View style={style.DropDownBox}>
            <View style={style.DropDownText}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>To Date:</Text>
            </View>
            <View style={style.DropDownList}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={style.calendar}>
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
                open={open}
                date={dateTo}
                onConfirm={date => {
                  setOpen(false);
                  setDateTo(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <Text>{` ${moment(dateTo).format('DD/MMMM/YYYY')}`}</Text>
            </View>
          </View>

          <View style={style.ReasonBox}>
            <View style={style.ReasonBoxText}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Reason For Leave:</Text>
            </View>
            <View style={style.ReasonBoxInput}>
              <TextInput
                style={style.input}
                onChangeText={reason => {
                  setReason(reason);
                }}
                placeholder="Reason"
                keyboardType="ascii-capable"
              />
            </View>
            
          </View>
          <View style={style.ButtonBoxOuter}>
            
            <TouchableOpacity onPress={submit}>
              <View style={style.TimeOutButton}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: 15,
                  }}>
                  Apply
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  },
  LeaveFormContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: windowHeight,
  },
  TypeOfLeaveBox: {
    windowHeight: windowHeight / 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  TypeOfLeaveText: {},
  TypeOfLeaveDropDown: {
    backgroundColor: '#f2f4f3',
  },

  DropDownBox: {
    backgroundColor: '#fff',
  },

  DropDownText: {
    marginTop: 15,
  },
  DropDownList: {
    marginTop: 10,
  },
  ReasonBox: {
    flexDirection: 'column',
    marginTop: 15,
  },
  ReasonBoxInput: {
    marginTop: 10,
  },

  ButtonBoxOuter: {
    width: windowWidth / 2,
    flexDirection: 'row',
    marginTop: 40,
  },
  HoursButton: {
    backgroundColor: 'grey',
    width: windowWidth / 3,
    height: windowHeight / 14,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 20,
  },
  TimeOutButton: {
    width: windowWidth / 3,
    backgroundColor: 'skyblue',
    height: windowHeight / 14,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 120,
    marginRight: 20,
  },
});
