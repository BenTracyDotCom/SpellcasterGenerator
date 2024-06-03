import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrepared, changePrepared} from "../npcs/NpcSlice"

export default function CantripsTile() {

  const dispatch = useDispatch();

  const allCantrips = useSelector(state => state.npc.spells[0])
  const knownCantrips = useSelector(state => state.npc.prepared[0])
  const totalCantrips = useSelector(state => state.npc.slots[0])

  const [ remaining, setRemaining ] = useState(totalCantrips)

  //TODO: Put this logic in slice. This is horrendous.
  const addRandomCantrip = () => {
    const selectFrom = allCantrips.filter(cantrip => !knownCantrips.map(known => known.index).includes(cantrip.index))
    const index = Math.floor(Math.random() * selectFrom.length)
    dispatch(addPrepared({ level: 0, spell: selectFrom[index] }))
    //TODO: Decrement remaining cantrips
  }

  return (
    <View>
      <View className="flex flex-row justify-between px-5">
        <Text>{'Cantrips'}</Text>
        <TouchableOpacity className="px-2 py-1 border-2 rounded-lg" style={{ backgroundColor: '#f2ca50' }}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col">
     {knownCantrips ? knownCantrips.map(cantrip => <Text>{cantrip.name}</Text>) : null}
      </View>
    </View>
  )
}