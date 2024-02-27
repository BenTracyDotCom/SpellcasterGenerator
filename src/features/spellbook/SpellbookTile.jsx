import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { default as p } from "../../utilities/parsers.mjs";
import {default as db } from "../../utilities/db.mjs"
import TileHeader from "./TileHeader";
import SpellRow from "../spells/SpellRow";

export default function SpellbookTile({ level, spells, spellsKnown, navigatoin }) {

  const [randomSpells, setRandomSpells] = useState([])
  const [max, setMax] = useState(level === 0 ? spells.length : 2)

  useEffect(() => {
        const promises = spells.map(spell => (
        db.getSpell(spell.index)
      ))
      Promise.all(promises)
        .then(expandedSpells => {
          setRandomSpells(p.distributeSpells(expandedSpells, max))
        })
  }, [max])

  return (
    <View>
      <TileHeader level={level} max={max} setMax={setMax} />
        {randomSpells.length && randomSpells.map((spell, i) => (
          <Text className="text-black" key={i}>{spell.name}</Text>
        ))}

    </View>

  )
}