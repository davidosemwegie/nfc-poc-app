import React from 'react'
import { StyleSheet, Button } from 'react-native';
import { View, Text } from 'react-native-ui-lib'
import {writeNdef} from '../write-nfc'

const styles = StyleSheet.create({
    container: {
      marginVertical: 8,
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#77DD77',
        color: 'white',
        borderRadius: 10
    }
  });

const Item = ({label, url, scanned}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>{label}</Text>
                <Text>{url}</Text>
            </View>
            {scanned ?
             <Text>Scanned</Text> : 
             <View style={styles.button}>
                <Button color="white" title="Scan" onPress={() => writeNdef(url)}/>
            </View> }
        </View>
    )
}

export { Item }

