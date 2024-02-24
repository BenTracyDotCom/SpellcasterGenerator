import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";

export default function StorageTest({ navigation }) {

  const [displayed, setDisplayed] = useState('')
  const [spells, setSpells] = useState([])
  const [error, setError] = useState('')

  const handleSave = () => {
    AsyncStorage.setItem('testData', 'Rabbit')
      .then(() => {
        setDisplayed('saved "Rabbit"')
      })
      .catch(err => setError(JSON.stringify(err)))
  }

  const handleFetch = () => {
    AsyncStorage.getItem('testData')
      .then((data) => {
        setDisplayed(`Fetched ${data ? data : 'nothing'} from storage.`)
      })
      .catch(err => setError(JSON.stringify(err)))
  }

  const handleDelete = () => {
    AsyncStorage.clear()
      .then(setDisplayed('Storage cleared.'))
      .catch(err => setError(JSON.stringify(err)))
  }

  const handleClericSpell = () => {
    AsyncStorage.getItem('cleric-spells')
      .then((data) => {
        let toSet = []
        data = JSON.parse(data) || []
        for(let i = 0; i < 10; i ++){
          const lvl = `lvl${i}`
          console.log(data[lvl])
          toSet.push(JSON.stringify(data[`lvl${i}`]))
        }
          setSpells(toSet ? toSet : ["Nothing here, boss"])
      })
      .catch(err => console.log(err))
  }

  const handleCleric3 = () => {
    AsyncStorage.getItem('cleric-levels')
    .then(data => {
      setSpells(data ? [JSON.stringify(data)] : ["Nothing here, boss"])
    })
    .catch(err => setError(JSON.stringify(err)))
  }

  handleSpell = () => {
    //TODO: Navigate to spell screen once built
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
      <Button text="Save 'Rabbit'" onPress={handleSave} />
      <Button text="Fetch 'Rabbit'" onPress={handleFetch} />
      {/* <Button text="Clear Storage" onPress={handleDelete} /> */}
      <Button text="Fetch Cleric Spells" onPress={handleClericSpell} />
      <Button text="Cleric 3 Info" onPress={handleCleric3} />
      <Button text="Loading screen" onPress={() => navigation.navigate("Loading")} />
      {spells && spells.map((spell, i) => (
        <View key={i}>
          <TouchableOpacity onPress={() => { }}>
            <Text>{spell}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}