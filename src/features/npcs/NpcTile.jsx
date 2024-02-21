import { View, Text, TouchableOpacity } from "react-native";

export default function NpcTile({ npc }) {

  return (
    <View>
      <Text>{npc}</Text>
    </View>
  )
}