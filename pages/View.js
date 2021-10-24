import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import MyButton from './components/MyButton';
import MyTextInput from './components/MyTextInput';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'RentalDatabase.db'});

const ViewOne = () => {
  let [inputRentalId, setInputRentalId] = useState('');
  let [rentalData, setRentalData] = useState({});

  let searchRental = () => {
    console.log(inputRentalId);
    setRentalData({});
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_rental where rental_id = ?',
        [inputRentalId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setRentalData(results.rows.item(0));
          } else {
            alert('No rental found');
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
          <MyButton title="Search Rental" customClick={searchRental} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
            }}>
            <Text>Rental Id: {rentalData.rental_id}</Text>
            <Text>Rental Property: {rentalData.rental_property}</Text>
            <Text>Rental Bedrooms: {rentalData.rental_bedrooms}</Text>
            <Text>Rental DateTime: {rentalData.rental_dateTime}</Text>
            <Text>Rental RentPrice: {rentalData.rental_rentPrice}</Text>
            <Text>Rental Furniture: {rentalData.rental_furniture}</Text>
            <Text>Rental Notes: {rentalData.rental_notes}</Text>
            <Text>Rental Reporter: {rentalData.rental_reporter}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewOne;
