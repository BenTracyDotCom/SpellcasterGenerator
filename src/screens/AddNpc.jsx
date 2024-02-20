import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import races from '../features/npcs/races.mjs';
import classNames from '../utilities/classNames.mjs';

export default function AddNpc() {



  //At this point, all classes are loaded
  const [race, setRace] = useState("human")
  const [clas, setClas] = useState("cleric")
  const [level, setLevel] = useState("1")
  const [classes, setClasses] = useState([])

  useEffect(() => {
    AsyncStorage.multiGet(classNames)
    .then(data => {
      setClasses(data.map(store => JSON.parse(store[1])))
    })
  }, [])

  return(
    <View>
      <TextInput
      placeholder="Name"
      />
      {/* <Text>{JSON.stringify(classes[0])}</Text> */}
      <Picker selectedValue={clas} onValueChange={setClas}>
        {classes && classes.map(clas => (
          <Picker.Item label={clas.name} value={clas.index} key={clas.index} />
        ))}
      </Picker>
      <Picker selectedValue={level} onValueChange={setLevel}>
        {Array(20).fill(1).map((val, i) => (
          <Picker.Item label={i + 1} value={i + 1} key={i + 1}/>
        ))}
      </Picker>

    </View>
  )
}