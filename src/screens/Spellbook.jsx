import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { default as p } from "../utilities/parsers.mjs"
import { default as db } from "../utilities/db.mjs"
import SpellbookTile from "../features/spellbook/SpellbookTile";
import Button from "../components/Button";
import SpellModal from "../components/SpellModal";

export default function Spellbook({ route, navigation }) {

  const { spells, spellSlots, spellsKnown, npc } = route.params
  const [ remaining, setRemaining ] = useState(spellsKnown.spells_known)
  const [ npcSpells, setNpcSpells ] = useState([])
  const [ showModal, setShowModal ] = useState(false)
  const [ modalSpells, setModalSpells ] = useState(['bippity', 'boppity', 'boo'])
  const [ modalOnPress, setModalOnPress ] = useState(() => {})

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
    //We've finally got all our data consolidated. Make a db function to save the NPC!
  }

  return (

    <SafeAreaView>
      <SpellModal spells={['bippity', 'boppity', 'boo']} showModal={showModal} setShowModal={setShowModal} onPress={modalOnPress}/>
      <Text>{`Total prepared: ${spellsKnown.spells_known}`}</Text>
      <ScrollView className="my-4">
        {relevantLevels.length ? relevantLevels.map((spells, i) => (<SpellbookTile npcSpells={npcSpells} setNpcSpells={setNpcSpells} spells={spells} spellsKnown={spellsKnown} level={i} key={i} navigation={navigation} remaining={remaining} setRemaining={setRemaining} relevantLevels={relevantLevels} spellSlots={spellSlots} showModal={showModal} setShowModal={setShowModal} modalOnPress={modalOnPress} setModalOnPress={setModalOnPress} modalSpells={modalSpells} setModalSpells={setModalSpells}/>)) : null}
        <Button text="Save" onPress={handleSave} />
      </ScrollView>
    </SafeAreaView>
  )

}