import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import races from '../utilities/races.mjs';
import classNames from '../utilities/classNames.mjs';
import Button from '../components/Button';
import db from '../utilities/db.mjs';
import { default as p } from '../utilities/parsers.mjs';

export default function AddNpc({ navigation }) {

  const [name, setName] = useState('New NPC')
  const [classes, setClasses] = useState([])
  const [clas, setClas] = useState({})
  const [race, setRace] = useState(races[0])
  const [subrace, setSubrace] = useState(races[0].subraces[0])
  const [subraces, setSubraces] = useState(races[0].subraces)
  const [hasSubraces, setHasSubraces] = useState(true)
  const [spells, setSpells] = useState({})
  const [spellSlots, setSpellSlots] = useState([])
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    race: race.name,
    subrace: subrace.name,
    clas: 'Cleric',
    level: '1',
    spellcastingAbility: 'wis',
    modifiers: {},
    spells: {}
  })


  useEffect(() => {

    //TODO: set spells and cantrips known. It'll help for later.

    AsyncStorage.multiGet(classNames)
      .then(data => {
        const loadedClasses = data.map(store => (JSON.parse(store[1])))
        setClasses(loadedClasses)
        setClas(loadedClasses[0])
        db.getSpells(loadedClasses[0])
          .then(setSpells)
        db.getSpellcastingInfo(loadedClasses[0].index, 1)
          .then(spellcastingInfo => {
            p.parseSlots(spellcastingInfo, setSpellSlots)
          })
          .catch(setError)
        setForm({ ...form, clas: loadedClasses[0].name })
      })
  }, [])

  const updateModifiers = (clas, race, subrace) => {
    clas = clas || form.clas
    race = race || form.race
    subrace = subrace || form.subrace

    const expandedClass = classes.find(entry => (entry.name === clas))
    const castingAbility = expandedClass.spellcasting.spellcasting_ability.index
    const expandedSubrace = races.find(raceObj => (raceObj.name === race))
      .subraces.find(subraceObj => (subraceObj.name === subrace))
    const parsedModifiers = p.parseModifiers(castingAbility, expandedSubrace)
    setForm({ ...form, modifiers: parsedModifiers })
  }

  const handleName = (e) => {
    if (e) {
      setName(e)
    } else {
      setName('New NPC')
    }
    setForm({ ...form, name: e })
  }

  const handleRace = (e) => {

    const race = races.filter(race => (race.name === e))[0]
    updateModifiers(null, e, race.subraces[0].name)
    if (race.subraces.length > 1) {
      setSubraces(race.subraces)
      setHasSubraces(true);
      setForm({ ...form, race: e, subrace: race.subraces[0].name })
    } else {
      setHasSubraces(false)
      setSubraces(race.subraces)
      setForm({ ...form, race: e, subrace: 'Normal' })
    }
  }

  const handleSubrace = (e) => {
    updateModifiers(null, form.race, e)
    setForm({ ...form, subrace: e })
  }

  const handleClass = (e) => {
    db.getSpellcastingInfo(p.toIndex(e), parseInt(form.level))
      .then(spellcastingInfo => {
        p.parseSlots(spellcastingInfo, setSpellSlots)
      })
    updateModifiers(e, null, null)
    db.getSpells(p.toIndex(e))
      .then((data) => {
        //console.log(p.parseSpellsIntoSlots(data), " s/b array of spells in order of level")
        setSpells(p.parseSpellsIntoSlots(data))
      })
    setForm({ ...form, clas: e })
  }

  const handleLevel = (e) => {
    db.getSpellcastingInfo(p.toIndex(form.clas), parseInt(e))
      .then(spellcastingInfo => {
        p.parseSlots(spellcastingInfo, setSpellSlots)
      })
    setForm({ ...form, level: e })
  }

  const handleSpells = (e) => {
    navigation.navigate("Spells")
  }

  //TODO: Display pertinent stat blocks once race & class are selected

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
    <View className="">

      <Text>{name}</Text>
      <Text>{`${form.race}${form.subrace !== 'Normal' ? `(${form.subrace})` : ''} ${form.clas} ${form.level}`}</Text>

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

      {classes && <Picker selectedValue={form.clas} onValueChange={handleClass}>
        {classes.map((clas, i) => (
          <Picker.Item label={clas.name} value={clas.name} key={i} />
        ))}
      </Picker>}

      <Picker selectedValue={form.level} onValueChange={handleLevel}>
        {Array(20).fill(1).map((val, i) => (
          <Picker.Item label={i + 1} value={i + 1} key={val} />
        ))}
      </Picker>

      {spellSlots && spellSlots.map((slot, i) => (
        <View key={i}>
          <Text>{`Level ${i + 1} slots: ${slot}`}</Text>
        </View>
      ))}
      <Button text="Spells" onPress={handleSpells}/>

      <Button text="Submit" onPress={handleSubmit} />


    </View>
  )
}