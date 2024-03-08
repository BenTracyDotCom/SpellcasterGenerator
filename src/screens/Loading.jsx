import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSpellbook } from "../features/spellbook/spellbookSlice"
import { View, Text, TouchableOpacity } from "react-native";
import { loadSpells, fetchSpellcastingClasses } from "../utilities/api.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../utilities/db.mjs";
import sortSpells from "../utilities/sortByClassAndLevel.mjs";
import Button from "../components/Button";

import * as Progress from 'react-native-progress'

//TODO: Make separate lines for the types of loading so they don't overwrite themselves

export default function Loading({ navigation }) {

  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('dataLoaded')
      .then(data => {
        if (data === 'true') {
          navigation.navigate('Launch')
        } else {

          db.storeRaces()
            .then(db.storeClasses(setMessage))
            .then(db.storeSpells(setMessage))
            .then(db.storeSimpleSpells(setMessage))
            .then(db.setLoaded)
            .then(() => navigation.navigate('Launch'))
            .catch(setError)
        }
      })
  }, [])

  return (
    <View className="items-center h-full">
      <Text>{JSON.stringify(message)}</Text>
      <Text className="text-error">{JSON.stringify(error)}</Text>
      <View className="my-auto">
        <Progress.Circle size={300} indeterminate={true} />
      </View>
      <Button onPress={() => navigation.navigate("Launch")} text="navigate to launch" />
    </View>
  )
}