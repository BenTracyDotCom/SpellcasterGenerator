import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as p } from "../../utilities/parsers.mjs"
import { default as db } from "../../utilities/db.mjs"
import SpellbookTile from "./SpellbookTile";
import Button from "../../components/Button";
import SpellModal from "./SpellModal";
import CantripsTile from "./CantripsTile";
import SpellsByLevel from "./SpellsByLevel";
import { toggleModal } from "./spellbookSlice";
import { updateSpells } from "../npcs/NpcSlice";
import { updateSpellsKnown } from "../npcs/NpcSlice";
import { saveNpc } from "../npcs/NpcsSlice";

export default function EditSpells({ route, navigation }) {

  const dispatch = useDispatch()
  // const showModal = useSelector(state => state.spellbook.showModal)
  // const setShowModal = dispatch(toggleModal())



  //const { spellSlots, spellsKnown, npc } = route.params
  const npc = useSelector(state => state.npc)
  const { slots, spells, spellcastingInfo, spellsKnown, clas } = npc

  const [remaining, setRemaining ]= useState(spellsKnown.spells_known)


  useEffect(() => {

    const fetchSpells = async () => {
      const spells = await db.getSimpleSpells()
      const npcSpells = []
      let highest = 0;
      if(clas === "Warlock"){
        for (let i = slots.length; i >= 0; i --){
          if(slots[i]){
            highest = i
            break
          }
        }
      }
      for (let i = 0; i < slots.length; i++) {
        if ((clas === "Warlock" && i <= highest)|| slots[i]) {
          npcSpells[i] = spells.filter(spell => (parseInt(spell.level) === i) && spell.classes.some(classs => classs.name === clas))
        } else {
          break
        }
      }

      dispatch(updateSpells(npcSpells))
    }
    fetchSpells()
  }, [dispatch])



  const handleSave = () => {
    console.log(npc, "what we passing to save")
    dispatch(saveNpc(npc))
    navigation.navigate('Launch')
  }

  return (

    <SafeAreaView>
      <SpellModal
      // showModal={showModal} setShowModal={setShowModal} onPress={modalOnPress} navigation={navigation} filter={filter} setFilter={setFilter} spells={modalSpells} modalClass={modalClass} setModalClass={setModalClass}
      />
      <Text className="mx-auto">{`Total prepared: ${spellsKnown.spells_known}`}</Text>
      <Text className="mx-auto">{`Remaining: ${remaining}`}</Text>
      <ScrollView className="my-4">
        {slots.length ? slots.map((slot, i) => {
          if (i === 0) {
            return <CantripsTile key="caintrips"/>
          }
          if (slots[i] || (npc.clas === "Warlock" 
           && npc.spells[i]
        )) {
            return (
              <SpellsByLevel level={i} slots={slot} remaining={remaining} setRemaining={setRemaining}/>
            )
          }
        }) : null}
        <Button text="Save" onPress={handleSave} />
      </ScrollView>
    </SafeAreaView>
  )

}