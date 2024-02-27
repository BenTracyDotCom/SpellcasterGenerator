import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { default as p } from "../utilities/parsers.mjs"
import { default as db } from "../utilities/db.mjs"
import SpellbookTile from "../features/spellbook/SpellbookTile";
import Button from "../components/Button";

export default function Spellbook({ route, navigation }) {

  const { spells, spellSlots, spellsKnown } = route.params
  const [remaining, setRemaining] = useState(spellsKnown.spells_known)
  const [npcSpells, saveNpcSpells] = useState([])

  const relevantLevels = spells.slice(0, spellSlots.length)

  const handleSave = () => {

  }

  return (

    <View>
      <Text>{`Total prepared: ${spellsKnown.spells_known}`}</Text>
      {relevantLevels.length ? relevantLevels.map((spells, i) => (<SpellbookTile spells={spells} spellsKnown={spellsKnown} level={i} key={i} navigation={navigation} remaining={remaining} setRemaining={setRemaining} relevantLevels={relevantLevels}/>)) : null}
      <Button text="Save" onPress={handleSave} />
    </View>
  )

}