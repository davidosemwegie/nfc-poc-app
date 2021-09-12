import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, SafeAreaView } from 'react-native';
import {readNdef, initNfc} from './utils/read-nfc'
import {writeNdef} from './utils/write-nfc'
import axios from 'axios'
import { View, Text } from 'react-native-ui-lib'
import { Item } from './utils/components/Item';

export default function App() {

  const [links, setLinks] = useState([])

  useEffect(() => {
    axios
      .get("https://dealership-nfc-poc-api.herokuapp.com/")
      .then((data) => {
        console.log(data.data)
        setLinks(data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text text70BO style={styles.heading}>Dealership Tags NFC Proof Of Concept</Text>
      {links.map(({label, url, scanned, id}) => <Item key={id} label={label} scanned={scanned} url={url} />)}
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
