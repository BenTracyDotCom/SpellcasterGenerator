import { View, TouchableOpacity, Text } from "react-native";

export default function Npc({ route }) {

  const { npc } = route.params

  return (
    <View>
      <Text>NPC goes here!</Text>
      <Text>{JSON.stringify(npc.name)}</Text>
    </View>
  )
}