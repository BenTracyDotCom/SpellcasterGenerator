import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrepared, changePrepared } from "../npcs/NpcSlice"

export default function CantripsTile() {

  const dispatch = useDispatch();

  const allCantrips = useSelector(state => state.npc.spells[0])
  const knownCantrips = useSelector(state => state.npc.prepared[0])
  const totalCantrips = useSelector(state => state.npc.slots[0])

  const [remaining, setRemaining] = useState(totalCantrips)

  //TODO: Put this logic in slice. This is horrendous.
  const addRandomCantrip = () => {
    if(knownCantrips){
      const selectFrom = allCantrips.filter(cantrip => !knownCantrips.map(known => known.index).includes(cantrip.index))
      const index = Math.floor(Math.random() * selectFrom.length)
      dispatch(addPrepared({ level: 0, spell: selectFrom[index] }))
    } else {
      const index = Math.floor(Math.random() * allCantrips.length)
      dispatch(addPrepared({ level: 0, spell: allCantrips[index]}))
    }
    setRemaining(remaining - 1)
  }

  const shuffleCantrip = (old) => {
    const selectFrom = allCantrips.filter(cantrip => !knownCantrips.map(known => known.index).includes(cantrip.index))
      const index = Math.floor(Math.random() * selectFrom.length)
    const newSpell = selectFrom[index]
    dispatch(changePrepared({level: 0, old: old, newSpell: newSpell}))
  }

  const deleteCantrip = (old) => {
    dispatch(changePrepared({level: 0, old: old}))
    setRemaining(remaining + 1)
  }

  return (
    <View>
      <View className="flex flex-row justify-between px-5">
        <Text>{`Cantrips (${remaining} remaining)`}</Text>
        {remaining ? <TouchableOpacity className="px-2 py-1 rounded-lg" style={{ backgroundColor: '#50f26e' }} onPress={addRandomCantrip}>
          <Text>+</Text>
        </TouchableOpacity> : null}
      </View>
      <View className="flex flex-col">
        {knownCantrips ? knownCantrips.map(cantrip => <View className="flex flex-row px-2 justify-around">
          <Text>{cantrip.name}</Text>
          <TouchableOpacity className="rounded-lg px-2 py-1" style={{backgroundColor: 'red'}}
          onPress={() => deleteCantrip(cantrip)}
          >
            <Text className="font-bold">{'-'}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          className="rounded-lg px-2 py-1" style={{backgroundColor: '#f2ca50'}}
          onPress={() => shuffleCantrip(cantrip)}
          >
            <Text>{'< >'}</Text>
          </TouchableOpacity>
        </View>) : null}
      </View>
    </View>
  )
}