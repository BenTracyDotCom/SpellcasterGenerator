import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fetchSpells, loadSpells } from "../utilities/api.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sortSpells from "../utilities/sortByClassAndLevel.mjs";

import * as Progress from 'react-native-progress'

export default function Loading({ navigation }) {

  //Pulling spells from API: 10%
  const indexPct = 10
  //Loading spells to storage: 5%
  const loadIndexPct = 15
  //Pulling extended info from API: 60%
  const extendedSpellsAPIPct = 75
  //Sorting spells: 15%
  const sortSpellsPct = 90
  //Loading extended, sorted spells to storage: 10%
  const saveExtendedSpellsPct = 100

  const [progress, setProgress] = useState(0)

  const useIncrementer = (divisor, max) => {
    console.log(progress)
    //console.log(divisor, "divisor")
    // console.log(max, "should be 60")
    // console.log((divisor / max) * 100 + " percent pulled from api")
    setProgress(max)
    //  max / divisor)
  }

  useEffect(() => {
    console.log(progress, "in useeffect")
    AsyncStorage.getItem('spellsLoaded')
      .then(data => {
        if (data === 'true') {
          setProgress(100)
          navigation.navigate('Launch')
        } else {
          fetchSpells()
            .then(data => {
              const spells = data
              setProgress(indexPct)
              //Add spell index to local storage
              AsyncStorage.setItem('spells', JSON.stringify(spells.results))
              setProgress(loadIndexPct)
              //Request extended version of each of the spells
              loadSpells(spells.results)
                .then(extendedSpells => {
                  setProgress(extendedSpellsAPIPct)
                  //Sort spell names into class-based lists
                  const sorted = sortSpells(extendedSpells)
                  Object.keys(sorted).forEach(clas => {
                    AsyncStorage.setItem(clas, JSON.stringify(sorted[clas]))
                  })
                  setProgress(sortSpellsPct)
                  //Store full spells under their name in local storage
                  const promises = extendedSpells.map(async (spell) => {
                    const result = await AsyncStorage.setItem(spell.index, JSON.stringify(spell));
                    // Increment loading bar here
                    return result
                  })
                  Promise.all(promises)
                    .then(
                      AsyncStorage.setItem('spellsLoaded', 'true')
                        .then(() => {
                          setProgress(saveExtendedSpellsPct)
                          navigation.navigate('Launch')
                        })
                    )
                })
            })
            .catch(console.log)
        }
      })
  }, [])

  return (
    <View className="items-center h-full">
      <Text>Loading spells...</Text>
      <View className="my-auto">
        <Progress.Circle size={300} progress={Math.ceil(progress) / 100} showsText={true} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Launch")}>
        <Text>launch</Text>
      </TouchableOpacity>
    </View>
  )
}