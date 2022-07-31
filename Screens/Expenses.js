import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Image,
} from 'react-native';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {windowHeight, windowWidth} from '../utils/utils';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import moment from 'moment';
import SelectList from 'react-native-dropdown-select-list';
const projectdata = [
  {value: 'GeoFencing'},
  {value: 'STC'},
  {value: 'SrvMe'},
  {value: 'Pick'},
];

const expensedata = [{value: 'Travel'}, {value: 'Stationary'}];

export default function Expenses({navigation}) {
  const [openn, setOpenn] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateFrom, setDateFroM] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [project, setProject] = useState('');
  const [expense, setExpense] = useState('');
  const [persons, setPersons] = useState('');
  const [advanceamount, setadvanceAmount] = useState('');
  const [actualamount, setActualamount] = useState('');
  const [remarks, setRemarks] = useState('');

  const submit = async () => {
    const first = dateFrom.toISOString().split('T')[0].replace(/-/g, '/');
    const second = dateTo.toISOString().split('T')[0].replace(/-/g, '/');
    if (!project) {
      alert('Please Select Project.');
      return;
    }
    if (!expense) {
      alert('Please Select Expense Type.');
      return;
    }
    if (!persons) {
      alert('Please Add No. of Persons.');
      return;
    }
    if (!advanceamount) {
      alert('Please Add Advance Amount.');
      return;
    }
    if (!actualamount) {
      alert('Please Add Actual Amount.');
      return;
    }
    if (!remarks) {
      alert('Please Add Remarks.');
      return;
    }

    if (first > second) {
      alert('From Date is Greater than To Date.');
      return;
    }
    if (first === second) {
      alert('From Date is Same as To Date.');
      return;
    }

    let result = await fetch(
      'https://chaljabhai.herokuapp.com/api/sendexpenses/62e3614ff51a7aa87be4548c',
      {
        method: 'post',
        body: JSON.stringify({
          project,
          expense,
          persons,
          dateFrom,
          dateTo,
          advanceamount,
          actualamount,
          remarks,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    result = await result.json();
    console.warn(result);
    navigation.navigate('AddExpense');
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.ExpenseMainContainer}>
          <View style={styles.ProjectText}>
            <Text style= {{fontSize:18,fontWeight:'400',color:'black'}}>Project</Text>
          </View>
          <View style={styles.ProjectDropDown}>
            <SelectList
              onSelect={() => console.log(project)}
              setSelected={setProject}
              data={projectdata}
              arrowicon={
                <Image
                  source={require('../Assets/d3.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              }
              search={false}
              boxStyles={{borderRadius: 0, margin: 12}}
            />
          </View>
        </View>

        <View style={styles.ExpenseMainContainer}>
          <View style={styles.ProjectText}>
            <Text style= {{fontSize:18,fontWeight:'400',color:'black'}}>Expense</Text>
          </View>
          <View style={styles.ProjectDropDown}>
            <SelectList
              onSelect={() => console.log(expense)}
              setSelected={setExpense}
              data={expensedata}
              arrowicon={
                <Image
                  source={require('../Assets/d3.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              }
              search={false}
              boxStyles={{borderRadius: 0, margin: 12}}
            />
          </View>
        </View>
        <View style={styles.ExpenseMainContainer}>
          <View style={styles.ProjectText}>
            <Text style = {{fontSize:18,fontWeight:'400',color:'black'}}>No of Persons:</Text>
          </View>
          <View style={styles.ProjectDropDown}>
            <TextInput
              style={styles.input}
              onChangeText={persons => {
                setPersons(persons);
                console.log(persons);
              }}
              placeholder="Enter NO.Of Persons"
              keyboardType="ascii-capable"
            />
          </View>

          <View style={styles.ExpenseMainContainer}>
            <View style={styles.ProjectText}>
              <Text style ={{fontSize:18,fontWeight:'400',color:'black'}}>From Date:</Text>
            </View>
            <View style={styles.ProjectDropDown}>
              <TouchableOpacity
                onPress={() => setOpenn(true)}
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
                open={openn}
                date={dateFrom}
                onConfirm={date => {
                  setOpenn(false);
                  setDateFroM(date);
                  console.log(dateFrom);
                }}
                onCancel={() => {
                  setOpenn(false);
                }}
              />
              <Text>{` ${moment(dateFrom).format('DD/MMMM/YYYY')}`}</Text>
            </View>
          </View>
          <View style={styles.ExpenseMainContainer}>
            <View style={styles.ProjectText}>
              <Text style ={{fontSize:18,fontWeight:'400',color:'black'}}>To Date</Text>
            </View>
            <View style={styles.ProjectDropDown}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
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
                open={open}
                date={dateTo}
                onConfirm={date => {
                  setOpen(false);
                  setDateTo(date);
                  console.log(dateTo);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <Text>{` ${moment(dateTo).format('DD/MMMM/YYYY')}`}</Text>
            </View>
          </View>
          <View style={styles.ExpenseMainContainer}>
            <View style={styles.ProjectText}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Advance Amount</Text>
            </View>
            <View style={styles.ProjectDropDown}>
              <TextInput
                style={styles.input}
                onChangeText={temp => {
                  setadvanceAmount(temp);
                  console.log(advanceamount);
                }}
                placeholder="Advance Amount"
                keyboardType="ascii-capable"
              />
            </View>
          </View>

          <View style={styles.ExpenseMainContainer}>
            <View style={styles.ProjectText}>
              <Text style= {{fontSize:18,fontWeight:'400',color:'black'}}>Actual Amount</Text>
            </View>
            <View style={styles.ProjectDropDown}>
              <TextInput
                style={styles.input}
                onChangeText={temp => {
                  setActualamount(temp);
                  console.log(actualamount);
                }}
                placeholder="Actual Amount"
                keyboardType="ascii-capable"
              />
            </View>
          </View>
          <View style={styles.ExpenseMainContainer}>
            <View style={styles.ProjectText}>
              <Text style={{fontSize:18,fontWeight:'400',color:'black'}}>Remarks</Text>
            </View>
            <View style={styles.ProjectDropDown}>
              <TextInput
                style={styles.input}
                onChangeText={temp => {
                  setRemarks(temp);
                  console.log(remarks);
                }}
                placeholder="Remarks"
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
  );
}
const styles = StyleSheet.create({
  ExpenseMainContainer: {
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  },
  TimeOutButton: {
    width: windowWidth / 3,
    backgroundColor: 'skyblue',
    height: windowHeight / 14,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 120,
    marginRight: 20,
    marginTop: 70,
  },
  ProjectDropDown: {},
});
