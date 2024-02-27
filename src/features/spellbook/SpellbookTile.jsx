import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { default as p } from "../../utilities/parsers.mjs"
import TileHeader from "./TileHeader";
import SpellRow from "../spells/SpellRow";

export default function SpellbookTile({ level, spells }) {

  const [max, setMax] = useState(level === 0 ? spells.length : 2)
  //console.log(max, ' new max in spellbook tile')

  useState(() => {
    p.distributeSpells(spells, max)
    //Here I want to pick max random spells.
  }, [max])

  return (
    <View>
      <TileHeader level={level} max={max} setMax={setMax} />

    </View>

  )
}