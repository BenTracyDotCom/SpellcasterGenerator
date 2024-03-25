import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSpellbook } from '../features/spellbook/spellbookSlice';
import { loadClasses, updateModifiers, updateSlots, updateSpellsKnown, updateSpells, updateNpc, updateClass, updateSpellcasting, resetSpellcasting } from '../features/npcs/NpcSlice'
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
  //const [classes, setClasses] = useState([])
  //const [clas, setClas] = useState({})
  const [race, setRace] = useState(races[0])
  //const [spellsKnown, setSpellsKnown] = useState()
  const [subrace, setSubrace] = useState(races[0].subraces[0])
  const [subraces, setSubraces] = useState(races[0].subraces)
  const [hasSubraces, setHasSubraces] = useState(true)
  const [spells, setSpells] = useState({})
  const [spellSlots, setSpellSlots] = useState([])
  const [error, setError] = useState('')
  const [modifiers, setModifiers] = useState({})

  const dispatch = useDispatch()

  const { classes, clas, spellcastingInfo, level, spellsKnown, slots } = useSelector(state => state.npc)

  const [form, setForm] = useState({
    name: '',
    race: race.name,
    subrace: subrace.name,
    clas: 'Bard',
    level: '1',
    spellcastingAbility: 'cha',
    modifiers: {},
    spellsKnown: {},
    spells: [],
    prepared: 4,
    proficiency: 2,
  })


  //This is a workaround from the loading screen because it wasn't waiting for the prior operation to finish
  useEffect(() => {
    AsyncStorage.getItem('spellsLoaded')
      .then((data) => {
        if (!data) {
          db.getSimpleSpells()
            .then(spells => dispatch(loadSpellbook(spells)))
        }
      })
    AsyncStorage.getItem('classesLoaded')
      .then(data => {
        if (!data) {
          AsyncStorage.multiGet(classNames)
            .then(data => {
              const loadedClasses = data.map(store => (JSON.parse(store[1])))
              dispatch(loadClasses(loadedClasses))
              dispatch(updateClass(loadedClasses[0]))
              //setClasses(loadedClasses)
              //setClas(loadedClasses[0])
              setForm({ ...form, clas: loadedClasses[0].name })
              // updateModifiers(loadedClasses[0].name, form.race, form.subrace, form.level, loadedClasses)
              AsyncStorage.setItem('classesLoaded', 'true')
            })
        } else {

        }
      })
  }, [dispatch])

  // useEffect(() => {
  //   if (spellcastingInfo) {
  //     console.log(slots, 'slots')
  //     dispatch(updateSlots({ spellcastingInfo: spellcastingInfo }))
  //     dispatch(updateSpellsKnown({ spellcastingInfo: spellcastingInfo }))
  //   }
  // }, [spellcastingInfo])


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

    //Updade pertinent info in state ("race" will be updated in state once we upload remaining form data)

    //TODO: do this ONCE at screen change
    dispatch(updateModifiers({ subrace: race.subraces[0] }))

    //Form logic
    let subrace
    if (race.subraces.length > 1) {
      setSubraces(race.subraces)
      setHasSubraces(true);
      subrace = race.subraces[0].name
      setForm({ ...form, race: e, subrace: subrace })

    } else {
      setHasSubraces(false)
      setSubraces(race.subraces)
      subrace = "Normal"
      setForm({ ...form, race: e, subrace: subrace })

      //Spellcaster logic
      //TODO: do this ONCE at screen change
      dispatch(updateModifiers({ subrace: race.subraces[0] }))
    }

    //updateModifiers(null, e, subrace)
  }

  const handleSubrace = (e) => {
    const race = races.filter(race => (race.name === form.race))[0]
    const subrace = race.subraces.find(sub => (sub.name === e))
    dispatch(updateModifiers({ subrace: subrace }))
    setForm({ ...form, subrace: e })
    //updateModifiers(null, form.race, e)
  }

  const handleClass = (e) => {
    //TODO: have this update redux state
    dispatch(updateClass(e))
    dispatch(updateModifiers({ clas: e }))
    // dispatch(resetSpellcasting())
    dispatch(updateSpellcasting({ clas: e, level: form.level }))
    setForm({ ...form, clas: e })
    //updateModifiers(e)
  }

  const handleLevel = (e) => {
    const lvl = parseInt(e)
    const proficiency = lvl < 5 ? 2 :
      lvl >= 5 && lvl < 9 ? 3 :
        lvl >= 9 && lvl < 13 ? 4 :
          lvl >= 13 && lvl < 17 ? 5 : 6
    setForm({ ...form, level: e, proficiency: proficiency })
    dispatch(updateSpellcasting({clas: form.clas, level: e}))
    //dispatch(updateModifiers({ level: e }))
  }

  const handleSpells = (e) => {
    //Update modifiers one last time so that they're not empty
    dispatch(updateModifiers())
    // Navigate to "Spellbook" page, where we'll complete entry
    navigation.navigate("Spellbook", {
      spells: spells,
      spellSlots: spellSlots,
      spellsKnown: spellsKnown,
      npc: { ...form, modifiers: modifiers }
    })
  }

  return (
    <View>
      <Text className="text-3xl text-center font-bold mt-2">{name}</Text>
      <Text className="text-xl text-center font-bold">{`${form.race}${form.subrace !== 'Normal' ? `(${form.subrace})` : ''} ${form.clas} ${form.level}`}</Text>

      <TextInput placeholder="Input Name" onChangeText={handleName} className="ml-4 text-lg" />

      <Picker selectedValue={form.race} onValueChange={handleRace}>
        {races.map((race, i) => (
          <Picker.Item label={race.name} value={race.name} key={i} />
        ))}
      </Picker>

      {hasSubraces ? <Picker selectedValue={form.subrace} onValueChange={handleSubrace}>
        {subraces.map(subrace => (
          <Picker.Item label={subrace.name} value={subrace.name} key={subrace.name} />
        ))}
      </Picker> : null}

      {classes ? <Picker selectedValue={form.clas} onValueChange={handleClass}>
        {classes.map((clas, i) => (
          <Picker.Item label={clas.name} value={clas.name} key={i} />
        ))}
      </Picker> : null}

      <Picker selectedValue={form.level} onValueChange={handleLevel}>
        {Array(20).fill(1).map((val, i) => (
          <Picker.Item label={i + 1} value={i + 1} key={val} />
        ))}
      </Picker>

      {slots ? slots.map((slot, i) => {
        if(i > 0 && slot > 0){
          return (
        <View key={i} className="mx-auto">
          <Text>{`Level ${i} slots: ${slot}`}</Text>
        </View>
          )
        }
}) : null}

      <Button text="Spells" onPress={handleSpells} />


    </View>
  )
}