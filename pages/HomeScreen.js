import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import MyButton from './components/MyButton';
import MyText from './components/MyText';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'RentalDatabase.db'});

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_rental'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_rental', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_rental(rental_id INTEGER PRIMARY KEY AUTOINCREMENT, rental_property VARCHAR(20),rental_bedrooms VARCHAR(20),rental_dateTime VARCHAR(20), rental_rentPrice INT(10),rental_furniture VARCHAR(20), rental_notes VARCHAR(255),rental_reporter VARCHAR(100))',
              [],
            );
          }
        },
      );
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <MyText text="RentalZ" />
          <MyButton
            title="Register"
            customClick={() => navigation.navigate('Register')}
          />
          <MyButton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <MyButton
            title="View One"
            customClick={() => navigation.navigate('View')}
          />
          <MyButton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <MyButton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
