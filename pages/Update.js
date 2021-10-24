import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import MyButton from './components/MyButton';
import MyTextInput from './components/MyTextInput';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'RentalDatabase.db'});

const UpdateOne = ({navigation}) => {
  let [inputRentalId, setInputRentalId] = useState('');
  let [property, setProperty] = useState('');
  let [bedrooms, setBedrooms] = useState('');
  let [dateTime, setDateTime] = useState('');
  let [rentPrice, setRentPrice] = useState('');
  let [furniture, setFurniture] = useState('');
  let [notes, setNotes] = useState('');
  let [reporter, setReporter] = useState('');

  let updateAllStates = (
    property,
    bedrooms,
    dateTime,
    rentPrice,
    furniture,
    notes,
    reporter,
  ) => {
    setProperty(property);
    setBedrooms(bedrooms);
    setDateTime(dateTime);
    setRentPrice(rentPrice);
    setFurniture(furniture);
    setNotes(notes);
    setReporter(reporter);
  };

  let searchRental = () => {
    console.log(inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_rental where rental_id = ?',
        [inputRentalId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.rental_property,
              res.rental_bedrooms,
              res.rental_dateTime,
              res.rental_rentPrice,
              res.rental_furniture,
              res.rental_notes,
              res.rental_reporter,
            );
          } else {
            alert('No rental found');
            updateAllStates('', '', '', '', '', '', '');
          }
        },
      );
    });
  };
  let updateRental = () => {
    console.log(
      inputRentalId,
      property,
      bedrooms,
      dateTime,
      rentPrice,
      furniture,
      notes,
      reporter,
    );

    if (!inputRentalId) {
      alert('Please fill User id');
      return;
    }
    if (!property) {
      alert('Please fill property');
      return;
    }
    if (!bedrooms) {
      alert('Please fill bedrooms');
      return;
    }
    if (!dateTime) {
      alert('Please choose dateTime');
      return;
    }
    if (!rentPrice) {
      alert('Please fill rentPrice');
      return;
    }
    if (!furniture) {
      alert('Please choose furniture');
      return;
    }
    if (!notes) {
      alert('Please fill notes');
      return;
    }
    if (!reporter) {
      alert('Please fill name of the reporter');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_rental set rental_property=?, rental_bedrooms=? , rental_dateTime=? , rental_rentPrice=? , rental_furniture=? , rental_notes=? , rental_reporter=? , where rental_id=?',
        [property, bedrooms, dateTime, rentPrice, furniture, notes, reporter],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Rental updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Update Failed');
        },
      );
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <MyTextInput
                placeholder="Enter Rental Id"
                style={{padding: 10}}
                onChangeText={inputRentalId => setInputRentalId(inputRentalId)}
              />
              <MyButton title="Search Rental" customClick={searchRental} />
              <MyTextInput
                placeholder="Enter property"
                value={property}
                style={{padding: 10}}
                onChangeText={property => setProperty(property)}
              />
              <MyTextInput
                placeholder="Enter bedrooms"
                value={'' + bedrooms}
                onChangeText={bedrooms => setBedrooms(bedrooms)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />
              <MyTextInput
                value={dateTime}
                placeholder="Enter dateTime"
                onChangeText={dateTime => setDateTime(dateTime)}
                maxLength={10}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <MyTextInput
                placeholder="Enter rentPrice"
                value={rentPrice}
                onChangeText={rentPrice => setRentPrice(rentPrice)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />
              <MyTextInput
                placeholder="Enter furniture"
                value={furniture}
                onChangeText={furniture => setFurniture(furniture)}
                maxLength={255}
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Enter notes"
                value={'' + notes}
                onChangeText={notes => setNotes(notes)}
                maxLength={10}
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Enter name of the reporter"
                value={'' + reporter}
                onChangeText={reporter => setReporter(reporter)}
                maxLength={10}
                style={{padding: 10}}
              />
              <MyButton title="Update Rental" customClick={updateRental} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateOne;
