import React from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchSpells, loadSpells } from "../utilities/api.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sortSpells from "../utilities/sortByClassAndLevel.mjs";

import * as Progress from 'react-native-progress'

export default function Loading({ navigation }) {

  const [progress, setProgress] = useState(0)
  const [max, setMax] = useState(100)

  const incrementer = () => {
    if (progress < max) {
      setProgress(progress + 1)
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('spellsLoaded')
      .then(data => {
        if (data === 'true') {
          navigation.navigate('Launch')
        } else {
          fetchSpells()
            .then((spells) => {
              //Add spell index to local storage
              AsyncStorage.setItem('spells', JSON.stringify(spells))
              setMax(spells.length)

              //Request extended version of each of the spells
              loadSpells(spells.results, incrementer)
                .then(extendedSpells => {
                  //Sort spell names into class-based lists
                  const sorted = sortSpells(extendedSpells)
                  Object.keys(sorted).forEach(clas => {
                    AsyncStorage.setItem(clas, JSON.stringify(sorted[clas]))
                  })
                  //Store full spells under their name in local storage
                  const promises = extendedSpells.map(async (spell) => {
                    const result = await AsyncStorage.setItem(spell.index, JSON.stringify(spell));
                    // Increment loading bar here
                    return result
                  })
                  Promise.all(promises)
                    .then(
                      AsyncStorage.setItem('spellsLoaded', 'true')
                      .then(() => navigation.navigate('Launch'))
                    )
                    .catch(console.log)
                })
                .catch(console.log)
            })
            .catch(console.log)
        }
      })
  }, [])

  return (
    <View className="items-center h-full">
      <Text>Loading spells...</Text>
      <View className="my-auto">
        <Progress.Circle size={300} progress={0.5} showsText={true} />
      </View>
    </View>
  )
}