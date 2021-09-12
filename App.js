import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import {readNdef, initNfc} from './utils/read-nfc'
import {writeNdef} from './utils/write-nfc'
import axios from 'axios'
import { View, Text } from 'react-native-ui-lib'
import { Item } from './utils/components/Item';

export default function App() {

  const [links, setLinks] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  const getData = async () => {
    await axios
    .get("https://dealership-nfc-poc-api.herokuapp.com/")
    .then((data) => {
      console.log(data.data)
      setLinks(data.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    wait(2000).then(() => {
      getData()
      setRefreshing(false)
    });
  }, []);


  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView style={styles.container} >
      <Text text70BO style={styles.heading}>Dealership Tags NFC Proof Of Concept</Text>
      <ScrollView
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      }
      >
        {links.map(({label, url, scanned, id}) => <Item key={id} label={label} scanned={scanned} url={url} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20
  }
});
