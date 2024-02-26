import { View, Text, TouchableOpacity } from "react-native";
import SpellRow from "./SpellRow";

export default function spellList({ spells, navigation }) {

  return (
    <View>
      {spells.map((spell, i) => (
        <SpellRow spell={spell} key={i} />
      )
      )}
    </View>
  )
}