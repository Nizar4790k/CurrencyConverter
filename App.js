/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Picker } from 'react-native';



const App: () => Node = () => {



  return (


    <View>
      <Picker>

        <Picker.Item label="American Dollar" value="USD" />
        <Picker.Item label="Euro" value="EUR" />
      </Picker>
      
      <View>
        <TextInput style={styles.input}></TextInput>
      </View>

      <View>

        <Picker enabled={false}>
          <Picker.Item label="Dominican Pesos" value="DOP"  />
          

        </Picker>

        <TextInput style={styles.input}></TextInput>



      </View>


    </View>



  )


};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});



export default App;
