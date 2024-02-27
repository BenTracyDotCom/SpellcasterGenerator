import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { default as p } from "../utilities/parsers.mjs"
import { default as db } from "../utilities/db.mjs"
import SpellbookTile from "../features/spellbook/SpellbookTile";
import Button from "../components/Button";

export default function Spellbook({ route, navigation }) {

  const { spells, spellSlots, spellsKnown, npc } = route.params
  const [remaining, setRemaining] = useState(spellsKnown.spells_known)
  const [npcSpells, setNpcSpells] = useState([])

  const relevantLevels = spells.slice(0, spellSlots.length)

  /*
  npc: {
    name: '',
    race: race.name,
    subrace: subrace.name,
    clas: 'Cleric',
    level: '1',
    spellcastingAbility: 'wis',
    modifiers: {cha: num, wis: num, ...},
    spellsKnown: {},
    spells: [],
    prepared: 4
  }
  */

  const handleSave = () => {

  }

  return (

    <SafeAreaView>
      <Text>{`Total prepared: ${spellsKnown.spells_known}`}</Text>
      <ScrollView className="my-4">
      {relevantLevels.length ? relevantLevels.map((spells, i) => (<SpellbookTile npcSpells={npcSpells} setNpcSpells={setNpcSpells} spells={spells} spellsKnown={spellsKnown} level={i} key={i} navigation={navigation} remaining={remaining} setRemaining={setRemaining} relevantLevels={relevantLevels} spellSlots={spellSlots}/>)) : null}
      <Button text="Save" onPress={handleSave} />
      </ScrollView>
    </SafeAreaView>
  )

}