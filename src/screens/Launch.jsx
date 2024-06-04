import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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

  const [deletable, setDeletable] = useState(false)


  const handleStorageTest = () => {
    navigation.navigate('Storage Test')
  }
  const handleAddNpc = () => {
    navigation.navigate('Add NPC')
  }

  return(
    <ScrollView>
   {npcs ? <NpcList npcs={npcs} navigation={navigation} route={route} deletable={deletable}/> : null}
        <Button text={"+  Add Spellcaster  +"} onPress={handleAddNpc} color={"#eab308"} />
{ deletable ? <Button text="Finish Deleting" onPress={() => setDeletable(false)}/> : <Button text={"-  Remove Spellcaster  -"} onPress={() => {setDeletable(true)}}/>}
      {/* <Button text={"Storage Test Screen"} onPress={handleStorageTest} color={"#0d9488"}/> */}
    </ScrollView>
  )
}