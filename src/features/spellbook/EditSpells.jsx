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
      for (let i = 0; i < slots.length; i++) {
        if (clas.toUpperCase === "WARLOCK" || slots[i]) {
          npcSpells[i] = spells.filter(spell => (parseInt(spell.level) === i) && spell.classes.some(classs => classs.name === clas))
        } else {
          break
        }
      }
      /*Right now, this stores aaalll available spells on the NPC. This is OK because there are two separate state items on NPC: spells (all available spells for this npc) and spellsKnown(currently prepared). 
      What we want to do is map slots and add spells per available slot and decrease remaining for each spell.
      */
      dispatch(updateSpells(npcSpells))
    }
    //TODO: only set this to max if the spellbook is empty
    // dispatch(setRemaining(spellsKnown.spells_known))
    fetchSpells()
  }, [dispatch])

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
    console.log(npc, "what we passing to save")
    dispatch(saveNpc(npc))
    navigation.navigate('Launch')
    //We've finally got all our data consolidated. Make a db function to save the NPC!
  }

  return (

    <SafeAreaView>
      <SpellModal
      // showModal={showModal} setShowModal={setShowModal} onPress={modalOnPress} navigation={navigation} filter={filter} setFilter={setFilter} spells={modalSpells} modalClass={modalClass} setModalClass={setModalClass}
      />
      <Text className="mx-auto">{`Total prepared: ${spellsKnown.spells_known}`}</Text>
      <Text className="mx-auto">{`Remaining: ${remaining}`}</Text>
      <ScrollView className="my-4">
        {/* {relevantLevels.length ? relevantLevels.map((slots, i) => (<SpellbookTile spells={spells} spellsKnown={spellsKnown} level={i} key={i} navigation={navigation} relevantLevels={relevantLevels} spellSlots={spellSlots} />)) : null} */}
        {slots.length ? slots.map((slot, i) => {
          if (i === 0) {
            return <CantripsTile key="caintrips"/>
          }
          if (slots[i]) {
            return (
              <SpellsByLevel level={i} slots={slot} remaining={remaining} setRemaining={setRemaining}/>
              // <View className="flex flex-row justify-between px-5" key={i}>
              //   <Text>{`Level ${i} spells (${slot} slots)`}</Text>
              //   <TouchableOpacity className="px-2 py-1 border-2 rounded-lg" style={{ backgroundColor: '#f2ca50' }}>
              //     <Text>+</Text>
              //   </TouchableOpacity>
              // </View>
            )
          }
        }) : null}

        {/* <Text>{JSON.stringify(spells)}</Text> */}
        <Button text="Save" onPress={handleSave} />
      </ScrollView>
    </SafeAreaView>
  )

}