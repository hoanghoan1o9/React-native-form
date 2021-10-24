import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'RentalDatabase.db'});

const ViewAll = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_rental', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };

  let listItemView = item => {
    return (
      <View
        key={item.rental_id}
        style={{backgroundColor: 'white', padding: 20}}>
        <Text>Id: {item.rental_id}</Text>
        <Text>Property: {item.rental_property}</Text>
        <Text>Bedrooms: {item.rental_bedrooms}</Text>
        <Text>DateTime: {item.rental_dateTime}</Text>
        <Text>RentPrice: {item.rental_rentPrice}</Text>
        <Text>Furniture: {item.rental_furniture}</Text>
        <Text>Notes: {item.rental_notes}</Text>
        <Text>Reporter: {item.rental_reporter}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAll;
