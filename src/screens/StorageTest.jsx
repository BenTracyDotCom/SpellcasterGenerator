import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import AsyncStorage from"@react-native-async-storage/async-storage";

export default function StorageTest() {

  const [displayed, setDisplayed] = useState('')
  const [error, setError] = useState('')

  const handleSave = () => {
    AsyncStorage.setItem('testData', 'Rabbit')
    .then(() => {
      setDisplayed('saved "Rabbit"')
    })
    .catch((err) => {
      setError(err)
    })
  }

  const handleFetch = () => {
    AsyncStorage.getItem('testData')
    .then((data) => {
      setDisplayed(`Fetched ${data ? data : 'nothing'} from storage.`)
    })
    .catch((err) => {
      setError(err)
    })
  }

  const handleDelete = () => {
    AsyncStorage.removeItem('testData')
    .then(() => {
      setDisplayed('Deleted')
    })
    .catch((err) => {
      setError(err)
    })
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
    </View>
  )
}