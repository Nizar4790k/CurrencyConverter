/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Picker, Share } from 'react-native';
import ActionBar from 'react-native-action-bar';



const App: () => Node = () => {

  const API_KEY = "61005f8b63dafdb85ded4930";

  [currencies, setCurrencies] = useState([]);
  [baseValue, setBaseValue] = useState(0);
  [baseCurrency, setBaseCurrency] = useState("");
  [targetCurrency, setTargetCurrency] = useState("DOP");
  [targetValue, setTargetValue] = useState(0);
  
  [isCorrect,setCorrect]=useState(true);

  useEffect(() => {

    try {
      fetchCodes();
    } catch (err) {
      console.log(err);
    }



  }, [])

  useEffect(() => {

    if(baseValue==="" || baseValue===undefined){
      setTargetValue(0)
      return;
    }

    try {
      fetch('https://v6.exchangerate-api.com/v6/' + API_KEY + '/pair/' + baseCurrency + '/' + targetCurrency + '/' + baseValue.toString())
        .then(response => response.json())
        .then(result => setTargetValue(result.conversion_result));
    } catch (err) {
      console.log(err);
    }

  }, [baseValue, baseCurrency])

  async function fetchCodes() {

    const response = await fetch('https://v6.exchangerate-api.com/v6/' + API_KEY + '/codes');
    const result = await response.json();
    const coins = [];
    supported_codes = result.supported_codes;
    setBaseCurrency(supported_codes[0][0]);


    for (var i = 0; i < 9; i++) {
      coins.push({ "code": supported_codes[i][0], "name": supported_codes[i][1] })
    }



    setCurrencies(coins)



  }

  const onShare = async () => {
    try {

      const result = await Share.share({
        message: baseValue.toString() + " " + baseCurrency + "=" + targetCurrency + " " + targetValue.toString()
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {

        } else {

        }
      } else if (result.action === Share.sharedAction) {

      }

    } catch (err) {
      console.log(err);
    }
  }

  const onChangeText = (value) => {

        
    var regex = /^(\d*\.)?\d+$/

    if(regex.test(value)){
      setCorrect(true)
    }else{
      setCorrect(false);
    }
      

    setBaseValue(value);


  }

  return (



    <View>

      <ActionBar
        containerStyle={styles.bar}
        title={'Currency Converter'}





        rightIcons={[
          {
            image: require('./res/share.png'), // To use a custom image

            onPress: () => {onShare()},
          }
        ]}
      />

      <Picker onValueChange={(itemValue) => {

        setBaseCurrency(itemValue)

      }}>

        {
          currencies.map((currency, i) => {
            return (<Picker.Item key={i} label={currency.name} value={currency.code} />)
          })
        }

      </Picker>

      <View>
        
        {isCorrect ? 
        <TextInput keyboardType='numeric' style={styles.inputBaseCorrect} value={baseValue.toString()} onChangeText={onChangeText} ></TextInput>
         :
         <TextInput keyboardType='numeric' style={styles.inputBaseIncorrect} value={baseValue.toString()} onChangeText={onChangeText} ></TextInput>
        }
        
        
      </View>

      <View>

        <Picker enabled={false}>
          <Picker.Item label="Dominican Pesos" value={targetCurrency} />


        </Picker>

        {targetValue ?
          <TextInput style={styles.inputTarget} value={targetValue.toString()} enabled={false} ></TextInput>
          :
          <TextInput style={styles.inputTarget} value={(0).toString()} editable={false} ></TextInput>}





      </View>


    </View>



  )


};

var styles = StyleSheet.create({
  inputTarget: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  inputBaseCorrect: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor:"#000000"
  },
  inputBaseIncorrect: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor:"#ff0000"
  }
});



export default App;
