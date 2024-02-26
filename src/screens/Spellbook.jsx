import { View, Text, TouchableOpacity } from "react-native";
import SpellByLevel from "../features/spellbook/SpellByLevel";

export default function Spellbook({ route, navigation }) {

  const { spells, spellSlots } = route.params

  return (

    <View>
      {spells.map((spell, i) => (<SpellByLevel spells={spells} level={i} key={i} />))}
    </View>
  )

}