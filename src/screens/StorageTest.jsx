import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchSpells } from "../utilities/api.mjs";

export default function StorageTest() {

  const [displayed, setDisplayed] = useState('')
  const [spells, setSpells] = useState([])
  const [error, setError] = useState('')

  const handleSave = () => {
    AsyncStorage.setItem('testData', 'Rabbit')
      .then(() => {
        setDisplayed('saved "Rabbit"')
      })
      .catch(setError)
  }

  const handleFetch = () => {
    AsyncStorage.getItem('testData')
      .then((data) => {
        setDisplayed(`Fetched ${data ? data : 'nothing'} from storage.`)
      })
      .catch(setError)
  }

  const handleDelete = () => {
    AsyncStorage.removeItem('testData')
      .then(() => {
        AsyncStorage.setItem("spellsLoaded", "false")
          .then(() => {
            setDisplayed('Deleted')
          })
      })
      .catch(setError)
  }

  const handleCleric2Spells = () => {
    AsyncStorage.getItem('cleric')
      .then((data) => {
        if (data) {
          setSpells(JSON.parse(data)["2"])
        } else {
          setSpells([])
        }
      })
      .catch(setError)
  }

  const deleteSpells = async () => {
    fetchSpells()
      .then((data) => {
        const allSpells = data.results.map(spell => (spell.index))
        AsyncStorage.multiRemove([...allSpells, 'paladin', 'cleric', 'ranger', 'bard', 'sorcerer', 'warlock', 'wizard', 'druid', 'spells'])
          .then(() => {
            setDisplayed('Deleted')
            AsyncStorage.setItem('spellsLoaded', 'false')
          })
      })
      .catch(console.log)
  }

  return (
    <View className="items-center">
      <Text>
        Info:
      </Text>
      <Text>
        {displayed}
      </Text>
      <Text className="text-red-500">
        {error}
      </Text>
      <TouchableOpacity onPress={handleSave} className="bg-slate-200 py-2 px-5 rounded-xl my-3">
        <Text>Save "Rabbit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFetch} className="bg-slate-200 py-2 px-5 rounded-xl my-3">
        <Text>Fetch "Rabbit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} className="bg-slate-200 py-2 px-5 rounded-xl my-3">
        <Text>Delete "Rabbit</Text>
      </TouchableOpacity>
      <View className="flex flex-col">
        <TouchableOpacity onPress={handleCleric2Spells} className="bg-green-200 py-2 px-5 rounded-xl my-3">
          <Text>Fetch Level 2 Cleric Spells</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteSpells} className="bg-red-200 py-2 px-5 rounded-xl my-3">
          <Text>Delete Spells</Text>
        </TouchableOpacity>
      </View>
      {spells && spells.map(spell => (
        <View key={spell.index}>
          <TouchableOpacity onPress={() => { }}>
            <Text>{spell}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}