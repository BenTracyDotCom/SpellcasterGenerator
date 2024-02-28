import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { default as p } from "../../utilities/parsers.mjs";
import { default as db } from "../../utilities/db.mjs"
import TileHeader from "./TileHeader";
import ClickableSpell from "../../components/ClickableSpell";
import Button from "../../components/Button";
//import SpellRow from "../spells/SpellRow";

export default function SpellbookTile({ level, spells, spellsKnown, remaining, setRemaining, navigation, relevantLevels, spellSlots, npcSpells, setNpcSpells, showModal, setShowModal, modalSpells, setModalSpells, modalOnPress, setModalOnPress }) {

  //TODO: decrement remaining spells once they're assigned

  const [randomSpells, setRandomSpells] = useState([])
  const [allSpells, setAllSpells] = useState([])
  const [max, setMax] = useState(
    level === 0 ? spells.length :
    level === 1 ? remaining - (relevantLevels.length - 1 * 2)
    : 2)
  
    useEffect(() => {
    const promises = spells.map(spell => (
      db.getSpell(spell.index)
    ))
    Promise.all(promises)
      .then(expandedSpells => {
        setRandomSpells(p.distributeSpells(expandedSpells, level === 0 ? spellsKnown.cantrips_known : max))
        setAllSpells(expandedSpells)
      })
  }, [max])

    useEffect(() => {
      const spellsInBag = [...npcSpells]
      spellsInBag[level] = randomSpells
      setNpcSpells(spellsInBag)
    }, [randomSpells])

  const reShuffle = () => {
    setRandomSpells(p.distributeSpells(allSpells, level === 0 ? spellsKnown.cantrips_known : max))
  }

  return (
    <View>
      <TileHeader level={level} max={max} setMax={setMax} spellSlots={spellSlots[level]} reShuffle={reShuffle} />
      {randomSpells.length ? randomSpells.map((spell, i) => (
        <View key={i} className="flex flex-row">
          <ClickableSpell navigation={navigation} spell={spell}/>
          <Button onPress={() => {setShowModal(!showModal)}} text="< >" />
        </View>
      )) : null}

    </View>

  )
}