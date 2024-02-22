import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { loadSpells, fetchSpellcastingClasses } from "../utilities/api.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../utilities/db.mjs";
import sortSpells from "../utilities/sortByClassAndLevel.mjs";
import Button from "../components/Button";

import * as Progress from 'react-native-progress'

//TODO: Make separate lines for the types of loading so they don't overwrite themselves

export default function Loading({ navigation }) {

  const [message, setMessage] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('dataLoaded')
      .then(data => {
        if (data === 'true') {
          navigation.navigate('Launch')
        } else {
          db.storeRaces()
            .then(db.storeClasses(setMessage))
            .then(db.storeSpells(setMessage))
            .then(db.setLoaded)
            .then(() => navigation.navigate('Launch'))
            .catch(setMessage)
        }
      })
  }, [])

  return (
    <View className="items-center h-full">
      <Text>{message}</Text>
      <View className="my-auto">
        <Progress.Circle size={300} indeterminate={true} />
      </View>
    </View>
  )
}