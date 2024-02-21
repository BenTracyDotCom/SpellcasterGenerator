import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import races from '../features/npcs/races.mjs';
import toIndex from '../utilities/toIndex.mjs';
import classNames from '../utilities/classNames.mjs';
import Button from '../components/Button';

export default function AddNpc() {



  //At this point, all classes are loaded
  const [name, setName] = useState('New NPC')
  const [clas, setClas] = useState('')

  const [form, setForm] = useState({
    name: '',
    race: 'Dwarf',
    subrace: 'Hill',
    clas: 'cleric',
    level: '1',
    spells: {}
  })

  const [classes, setClasses] = useState([])
  const [subraces, setSubraces] = useState(races[0].subraces)
  const [hasSubraces, setHasSubraces] = useState(true)

  useEffect(() => {
    AsyncStorage.multiGet(classNames)
      .then(data => {
        setClasses(data.map(store => JSON.parse(store[1])))
      })
  }, [])

  const handleName = (e) => {
    if(e){
      setName(e)
    } else {
      setName('New NPC')
    }
    setForm({ ...form, name: e })
  }
  const handleRace = (e) => {
    const race = races.filter(race => (race.name === e))[0]
    if (race.subraces.length > 1) {
      setSubraces(race.subraces)
      setHasSubraces(true);
      setForm({ ...form, race: e, subrace: race.subraces[0].name })
    } else {
      setHasSubraces(false)
      setForm({ ...form, race: e, subrace: null })
    }
  }
  const handleSubrace = (e) => {
    setForm({ ...form, subrace: e })
  }
  const handleClass = (e) => {
    const indexed = e.toLowerCase()
    setForm({ ...form, clas:indexed })
    setClas(e)
  }
  const handleLevel = (e) => {
    setForm({ ...form, level: e })
  }

  //TODO: Display pertinent stat blocks once race & class are selected

  //TODO: Parse and display spell slots and prepared spells per level

  const handleSubmit = () => {
    //TODO:
    //Expand all of the spells into their full forms
    //check for an array of npc's
      //if there is one,
        //parse it, push the new NPC into it, stringify & store it
      //if not,
        //create a new array with this NPC as the first entry
        //stringify the array, then store it
  }

  return (
    <View>

      <Text>{name}</Text>
      <Text>{`${form.race}${form.subrace ? `(${form.subrace})` : ''} ${clas} ${form.level}`}</Text>

      <TextInput placeholder="Name" onChangeText={handleName} />

      <Picker selectedValue={form.race} onValueChange={handleRace}>
        {races.map((race, i) => (
          <Picker.Item label={race.name} value={race.name} key={i} />
        ))}
      </Picker>

      {hasSubraces && <Picker selectedValue={form.subrace} onValueChange={handleSubrace}>
        {subraces.map(subrace => (
          <Picker.Item label={subrace.name} value={subrace.name} key={subrace.name} />
        ))}
      </Picker>}

      {classes && <Picker selectedValue={clas} onValueChange={handleClass}>
        {classes.map((clas, i) => (
          <Picker.Item label={clas.name} value={clas.name} key={i} />
        ))}
      </Picker>}


      <Picker selectedValue={form.level} onValueChange={handleLevel}>
        {Array(20).fill(1).map((val, i) => (
          <Picker.Item label={i + 1} value={i + 1} key={val} />
        ))}
      </Picker>

      <Button text="Submit" onPress={handleSubmit} />

    </View>
  )
}