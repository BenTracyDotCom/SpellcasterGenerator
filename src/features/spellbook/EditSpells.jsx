import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as p } from "../../utilities/parsers.mjs"
import { default as db } from "../../utilities/db.mjs"
import SpellbookTile from "./SpellbookTile";
import Button from "../../components/Button";
import SpellModal from "./SpellModal";
import { toggleModal } from "./spellbookSlice";
import { updateSpells } from "../npcs/NpcSlice";
import { updateSpellsKnown } from "../npcs/NpcSlice";

export default function EditSpells({ route, navigation }) {

  const dispatch = useDispatch()
  // const showModal = useSelector(state => state.spellbook.showModal)
  // const setShowModal = dispatch(toggleModal())
  


  const { spellSlots, spellsKnown, npc } = route.params
  const { slots, spells } = useSelector(state => state.npc)


  useEffect(() => {
    const fetchSpells = async () => {
      const spells = await db.getSimpleSpells()
      const npcSpells = {}
      for(let i = 0; i < slots.length; i ++){
        if(npc.clas.toUpperCase === "WARLOCK" || slots[i]){
          npcSpells[i] = spells.filter(spell => (parseInt(spell.level) === i) && spell.classes.some(classs => classs.name === npc.clas))
        } else {
          break
        }
      }
      dispatch(updateSpells(npcSpells))
    }
    fetchSpells()
  }, (dispatch))
  // const [ remaining, setRemaining ] = useState(spellsKnown.spells_known)
  // const [ npcSpells, setNpcSpells ] = useState([])
  // const [ filter, setFilter ] = useState(() => (spell) => (spell?.concentration))
  // const [ modalOnPress, setModalOnPress ] = useState(() => {})
  // const [ modalSpells, setModalSpells ] = useState([])
  // const [ modalClass, setModalClass ] = useState(npc.clas)

  const relevantLevels = slots.slice(0, spellSlots.indexOf(0))

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
      <SpellModal 
      // showModal={showModal} setShowModal={setShowModal} onPress={modalOnPress} navigation={navigation} filter={filter} setFilter={setFilter} spells={modalSpells} modalClass={modalClass} setModalClass={setModalClass}
      />
      <Text>{`Total prepared: ${spellsKnown.spells_known}`}</Text>
      <ScrollView className="my-4">
        {relevantLevels.length ? relevantLevels.map((slots, i) => (<SpellbookTile spells={spells} spellsKnown={spellsKnown} level={i} key={i} navigation={navigation} relevantLevels={relevantLevels} spellSlots={spellSlots} />)) : null}
        <Button text="Save" onPress={handleSave} clas={npc.clas} />
      </ScrollView>
    </SafeAreaView>
  )

}