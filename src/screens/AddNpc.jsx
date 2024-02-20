import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import races from '../features/npcs/races.mjs';

export default function AddNpc() {



  //At this point, all classes are loaded
  const [race, setRace] = useState("human")
  const [clas, setClas] = useState("cleric")
  const [level, setLevel] = useState("1")
  const [classes, setClasses] = useState([])
  const classNames = ["bard", "cleric", "druid", "sorcerer", "warlock", "paladin", "ranger"]

  useEffect(() => {
    AsyncStorage.multiGet(classNames)
    .then(data => {
      setClasses(data)
    })
  }, [])

  return(
    <View>
      <TextInput
      placeholder="Name"
      />
      <Picker selectedValue={clas} onValueChange={setClas}>
        <Picker.Item label="Bard" value="bard" />
        <Picker.Item label="Cleric" value="cleric" />
        <Picker.Item label="Druid" value="druid" />
        <Picker.Item label="Sorcerer" value="sorcerer" />
        <Picker.Item label="Warlock" value="warlock" />
      </Picker>
      <Picker selectedValue={level} onValueChange={setLevel}>
        {Array(20).fill(1).map((val, i) => (
          <Picker.Item label={i + 1} value={i + 1} key={i + 1}/>
        ))}
      </Picker>

    </View>
  )
}