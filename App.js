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
  [baseValue,setBaseValue]=useState(0);
  [baseCurrency,setBaseCurrency]=useState("");
  [targetCurrency,setTargetCurrency]=useState("DOP");
  [targetValue,setTargetValue]=useState(0)

  useEffect(()=>{

    fetchCodes();


  },[])

useEffect(()=>{
  fetch('https://v6.exchangerate-api.com/v6/'+API_KEY+'/pair/'+baseCurrency+'/'+targetCurrency+'/'+baseValue.toString())
  .then(response=>response.json())
  .then(result=>setTargetValue(result.conversion_result));

},[baseValue,baseCurrency])
 
  async function fetchCodes(){
    
    const response = await fetch('https://v6.exchangerate-api.com/v6/'+API_KEY+'/codes');
    const result= await response.json();
    const coins =[];
    supported_codes= result.supported_codes;
    setBaseCurrency(supported_codes[0][0]);


    for(var i=0;i<9;i++){96652
      coins.push({"code":supported_codes[i][0],"name":supported_codes[i][1]})
    }


    
    setCurrencies(coins)


   
  }

  

  return (


    <View>
      <Picker onValueChange={(itemValue)=>{
          
          setBaseCurrency(itemValue)
          
      }}>

      {
        currencies.map((currency,i)=>{
          return (<Picker.Item key={i} label={currency.name} value={currency.code}   />)
        })
      }
        
      </Picker>
      
      <View>
        <TextInput keyboardType = 'numeric' style={styles.input} value={baseValue.toString()}  onChangeText={(value)=>{
          
          console.log(value)

          if(value==="" || value===undefined){
            setBaseValue(0)
          }
          
          setBaseValue(value)
         
          
          

        }} ></TextInput>
      </View>

      <View>

        <Picker enabled={false}>
          <Picker.Item label="Dominican Pesos"  value={targetCurrency}  />
          

        </Picker>

        {targetValue ?
         <TextInput  style={styles.input} value={targetValue.toString()} enabled={false} ></TextInput>
         :
         <TextInput  style={styles.input} value={(0).toString() } editable={false} ></TextInput>}

        



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
