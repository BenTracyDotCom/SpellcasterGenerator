import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import db from "../../utilities/db.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpellbookTile from "./SpellbookTile";

export default function SpellByLevel({ level, spells }) {

  const[levelXspells, setLevelXspells] = useState([])
  
  useState(() => {
    const promises = spells[level].map(spell => (
      db.getSpell(spell.index)
    ))
    Promise.all(promises)
    .then(setLevelXspells)
  }, [])

  const levelInfo = level > 0 ? ` Level ${level} Spells` : 'Cantrips'
  return (
    <View>
<SpellbookTile level={level} spells={spells} />
      {/* {levelXspells && levelXspells.map((spell, i) => (<Text key={i}>{spell.name}</Text>))} */}
    </View>
  )
}