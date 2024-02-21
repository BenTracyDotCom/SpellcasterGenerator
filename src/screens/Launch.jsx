import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import NpcList from "../features/npcs/NpcList";


export default function Launch({ navigation }) {

  const [npcsLoaded, setNpcsLoaded] = useState(false)
  const [npcs, setNPCs] = useState([])

  useEffect(() => {
    
  })


  const handleStorageTest = () => {
    navigation.navigate('Storage Test')
  }
  const handleAddNpc = () => {
    navigation.navigate('Add NPC')
  }

  return(
    <View>
      <TouchableOpacity className="bg-blue-500 p-3 rounded-full mx-5 my-2 items-center" onPress={handleStorageTest}>
        <Text className="text-white font-bold">
          Storage Test Screen
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-blue-500 p-3 rounded-full mx-5 my-2 items-center" onPress={handleAddNpc}>
        <Text className="text-white font-bold">
          Add NPC
        </Text>
      </TouchableOpacity>
      <NpcList npcs={["Jim", "Bim", "Jimself"]} />
    </View>
  )
}