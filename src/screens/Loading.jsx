import React from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchSpells, loadSpells } from "../utilities/api.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sortSpells from "../utilities/sortByClassAndLevel.mjs";

export default function Loading({ navigation }) {

  useEffect(() => {
    fetchSpells()
    .then((spells) => {
      loadSpells(spells.results)
      .then(extendedSpells => {
        console.log(sortSpells(extendedSpells))
        // extendedSpells.forEach((spell, i) => {
        //   if(i < 1){
        //     console.log(spell)
        //   }
          //AsyncStorage.setItem(spell.index, JSON.stringify(spell))
        //})
      })
      .catch(console.log)
    })
    .catch(console.log)
  }, [])

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}