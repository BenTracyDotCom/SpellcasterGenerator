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

export default function SpellbookTile({ level, spells, spellsKnown, remaining, setRemaining, navigation, relevantLevels, spellSlots, npcSpells, setNpcSpells, showModal, setShowModal, modalSpells, setModalSpells, modalOnPress, setModalOnPress, setFilter, setModalClass, modalClass, clas }) {

  const dispatch = useDispatch()

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
      {/* <TouchableOpacity onClick={() => {dispatch(toggleModal())}}>
        <Text>Spell Tile Here</Text>
      </TouchableOpacity> */}
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