/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import type { Node} from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Picker } from 'react-native';



const App: () => Node = () => {

const API_KEY="61005f8b63dafdb85ded4930";

  [currencies, setCurrencies] = useState([]);

  useEffect(()=>{

    fetchCodes();


  },[])

  async function fetchCodes(){
    
    const response = await fetch('https://v6.exchangerate-api.com/v6/'+API_KEY+'/codes');
    const result= await response.json();
    const coins =[];
    supported_codes= result.supported_codes;

    for(var i=0;i<9;i++){
      coins.push({"code":supported_codes[i][0],"name":supported_codes[i][1]})
    }

   
    setCurrencies(coins)


    

   
  }

  return (


    <View>
      <Picker>

      {
        currencies.map((currency,i)=>{
          return (<Picker.Item key={i} label={currency.name} value={currency.code}  />)
        })
      }
        
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
