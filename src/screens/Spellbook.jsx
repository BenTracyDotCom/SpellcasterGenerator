import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import SpellbookTile from "../features/spellbook/SpellbookTile";
import { default as p } from "../utilities/parsers.mjs"
import { default as db } from "../utilities/db.mjs"

export default function Spellbook({ route, navigation }) {

  const { spells, spellSlots, spellsKnown } = route.params

  return (

    <View>
      {spells.length ? spells.map((spells, i) => (<SpellbookTile spells={spells} spellsKnown={spellsKnown} level={i} key={i} navigation={navigation}/>)) : null}
    </View>
  )

}