import Spellbook from "../features/spellbook/Spellbook";
import EditSpells from "../features/spellbook/EditSpells";

import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { default as p } from "../utilities/parsers.mjs"
import { default as db } from "../utilities/db.mjs"
import SpellbookTile from "../features/spellbook/SpellbookTile";
import Button from "../components/Button";
import SpellModal from "../features/spellbook/SpellModal";

export default function SpellbookScreen({ route, navigation }) {

  return (
    // <Spellbook navigation={navigation} route={route}/>
    <EditSpells navigation={navigation} route={route}/>
  )

}