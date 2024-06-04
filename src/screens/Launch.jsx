import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import NpcList from "../features/npcs/NpcList";
import Button from "../components/Button";
import SpellTile from "../features/spells/SpellTile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadNpcs } from "../features/npcs/NpcsSlice";


export default function Launch({ navigation, route }) {
  const dispatch = useDispatch()

  const { npcs } = useSelector(state => state.npcs)

  useEffect(() => {
    dispatch(loadNpcs())
  }, [])


  const handleStorageTest = () => {
    navigation.navigate('Storage Test')
  }
  const handleAddNpc = () => {
    navigation.navigate('Add NPC')
  }

  //TODO: Handle deleting NPCs

  return(
    <View>
   {npcs ? <NpcList npcs={npcs} navigation={navigation} route={route}/> : null}
      <Button text={"Add NPC"} onPress={handleAddNpc} color={"#eab308"} />
      <Button text={"Storage Test Screen"} onPress={handleStorageTest} color={"#0d9488"}/>
    </View>
  )
}