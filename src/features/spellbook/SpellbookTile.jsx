import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "./spellbookSlice"
import { default as p } from "../../utilities/parsers.mjs";
import { default as db } from "../../utilities/db.mjs"
import TileHeader from "./TileHeader";
import ClickableSpell from "../../components/ClickableSpell";
import Button from "../../components/Button";
//import SpellRow from "../spells/SpellRow";

export default function SpellbookTile({ level }) {
  //This component should list a certain number of spells of its passed level. By default, each level should start with 2 spells. 

  const dispatch = useDispatch()
  const { spells } = useSelector(state => state.spellbook)
  const { clas } = useSelector(state => state.npc)



  //TODO: decrement remaining spells once they're assigned

  // const [randomSpells, setRandomSpells] = useState([])
  // const [allSpells, setAllSpells] = useState([])
  // const [max, setMax] = useState(
  //   level === 0 ? spells.length :
  //   level === 1 ? remaining - (relevantLevels.length - 1 * 2)
  //   : 2)

  //   useEffect(() => {
  //   const promises = spells.map(spell => (
  //     db.getSpell(spell.index)
  //   ))
  //   Promise.all(promises)
  //     .then(expandedSpells => {
  //       setRandomSpells(p.distributeSpells(expandedSpells, level === 0 ? spellsKnown.cantrips_known : max))
  //       setAllSpells(expandedSpells)
  //       setFilter((spell) => (spell.level === level))
  //     })
  // }, [max])

  // useEffect(() => {
  //   const spellsInBag = [...npcSpells]
  //   spellsInBag[level] = randomSpells
  //   setNpcSpells(spellsInBag)
  // }, [randomSpells])

  // const reShuffle = () => {
  //   setRandomSpells(p.distributeSpells(allSpells, level === 0 ? spellsKnown.cantrips_known : max))
  // }

  // const handleSwap = () => {
  //   setModalSpells(allSpells.filter(spell => (!npcSpells.includes(spell))))
  //   setFilter((spell) => spell.level === level)
  //   setModalClass(clas)
  //   setModalOnPress(() => console.log('For the love of God, just do this in redux. Your states are outta control. You don\'t even have a means to swap these spells but it would be an easy dispatch action. Lord help us.'))
  //   setShowModal(!showModal)
  // }



  return (
    <View>
      <TouchableOpacity onPress={() => {dispatch(toggleModal())}}>
        <Text>{`Level ${level} Spell Tile Here`}</Text>
        <Text>
          {JSON.stringify(spells.filter(spell => (spell.level === level && spell.classes.some(classs => classs.name === clas))).map(spell => spell.name))}
        </Text>
          {/* <Text>{JSON.stringify(spells.filter(spell => spell.index === 'mage-hand'))}</Text> */}
      </TouchableOpacity>
      {/* <TileHeader level={level} max={max} setMax={setMax} spellSlots={spellSlots[level]} reShuffle={reShuffle} />
      {randomSpells.length ? randomSpells.map((spell, i) => (
        <View key={i} className="flex flex-row justify-between px-3">
          <ClickableSpell navigation={navigation} spell={spell}/>
          <TouchableOpacity onPress={handleSwap}>
            <Text>{'<>'}</Text>
          </TouchableOpacity>
        </View>
      )) : null} */}

    </View>

  )
}