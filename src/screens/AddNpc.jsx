import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AddNpc() {

  const [clas, setClas] = useState("cleric")
  const [level, setLevel] = useState("1")

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