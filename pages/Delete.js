import React, {useState} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';
import MyButton from './components/MyButton';
import MyTextInput from './components/MyTextInput';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'RentalDatabase.db'});

const Delete = ({navigation}) => {
  let [inputRentalId, setInputRentalId] = useState('');

  let deleteRental = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_rental where rental_id=?',
        [inputRentalId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Rental Id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <MyTextInput
            placeholder="Enter Rental Id"
            onChangeText={inputRentalId => setInputRentalId(inputRentalId)}
            style={{padding: 10}}
          />
          <MyButton title="Delete Rental" customClick={deleteRental} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Delete;
