import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import MyTextInput from './components/MyTextInput';
import MyButton from './components/MyButton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'RentalDatabase.db'});

const Register = ({navigation}) => {
  let [property, setProperty] = useState('');
  let [bedrooms, setBedrooms] = useState('');
  let [dateTime, setDateTime] = useState('');
  let [rentPrice, setRentPrice] = useState(0);
  let [furniture, setFurniture] = useState('');
  let [notes, setNotes] = useState('');
  let [reporter, setReporter] = useState('');

  let register = () => {
    console.log(
      property,
      bedrooms,
      dateTime,
      rentPrice,
      furniture,
      notes,
      reporter,
    );

    if (!property) {
      alert('Please fill property');
      return;
    }
    if (!bedrooms) {
      alert('Please choose Contact bedrooms');
      return;
    }
    if (!dateTime) {
      alert('Please choose Address');
      return;
    }
    if (!rentPrice) {
      alert('Please fill rentPrice');
      return;
    }
    if (!furniture) {
      alert('Please fill furniture');
      return;
    }
    // if (!userAddress) {
    //   alert('Please fill Address');
    //   return;
    // }
    if (!reporter) {
      alert('Please fill name of reporter');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_rental (rental_property, rental_bedrooms, rental_dateTime,rental_rentPrice,rental_furniture,rental_notes,rental_reporter) VALUES (?,?,?,?,?,?,?)',
        [property, bedrooms, dateTime, rentPrice, furniture, notes, reporter],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
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
                placeholder="Property"
                onChangeText={property => setProperty(property)}
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Type of bedrooms"
                onChangeText={bedrooms => setBedrooms(bedrooms)}
                maxLength={10}
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Date and time"
                onChangeText={dateTime => setDateTime(dateTime)}
                maxLength={8}
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Monthly rent price"
                onChangeText={rentPrice => setRentPrice(rentPrice)}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Furniture types"
                onChangeText={furniture => setFurniture(furniture)}
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Notes"
                onChangeText={notes => setNotes(notes)}
                maxLength={255}
                style={{padding: 10}}
              />
              <MyTextInput
                placeholder="Name of the reporter"
                onChangeText={reporter => setReporter(reporter)}
                maxLength={50}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <MyButton title="Submit" customClick={register} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
