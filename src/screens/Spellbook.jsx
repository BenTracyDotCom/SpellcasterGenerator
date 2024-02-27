import { View, Text, TouchableOpacity } from "react-native";
import SpellByLevel from "../features/spellbook/SpellByLevel";
import { default as p } from "../utilities/parsers.mjs"

export default function Spellbook({ route, navigation }) {

  const { spells, spellSlots, spellsKnown } = route.params
  //console.log(spellsKnown, ' what spellbook is getting from addNPC')


  return (

    <View>
      {spells.map((spell, i) => (<SpellByLevel spells={spells} spellsKnown={spellsKnown} level={i} key={i} />))}
    </View>
  )

}