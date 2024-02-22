import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import NpcList from "../features/npcs/NpcList";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Launch({ navigation }) {

  const [npcsLoaded, setNpcsLoaded] = useState(false)
  const [npcs, setNPCs] = useState([])

  useEffect(() => {
    // AsyncStorage.getItem(npcs)
    // .then(data => {
    //   console.log(data, "npcs in storage")
    // })
  })


  const handleStorageTest = () => {
    navigation.navigate('Storage Test')
  }
  const handleAddNpc = () => {
    navigation.navigate('Add NPC')
  }

  //TODO: Handle deleting NPCs

  return(
    <View>
      <Button text={"Storage Test Screen"} onPress={handleStorageTest} color={"#0d9488"}/>
      <Button text={"Add NPC"} onPress={handleAddNpc} color={"#eab308"} />
      <NpcList npcs={["Jim", "Bim", "Jimself"]} />
    </View>
  )
}