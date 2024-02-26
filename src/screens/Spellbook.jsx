import { View, Text, TouchableOpacity } from "react-native";
import SpellByLevel from "../features/spellbook/SpellByLevel";

export default function Spellbook({ route, navigation }) {

  const { spells, spellSlots } = route.params

  return (

    <View>
      <Text>{JSON.stringify(spells[1])}</Text>
      <SpellByLevel />
    </View>
  )

}