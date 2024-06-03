import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  } from "../npcs/NpcSlice";
import { addPrepared, changePrepared } from "../npcs/NpcSlice";

export default function SpellsByLevel({ level, slots, remaining, setRemaining }) {
  
  const dispatch = useDispatch();

  const allSpells = useSelector(state => state.npc.spells[level])
  const knownSpells = useSelector(state => state.npc.prepared[level])

  //TODO: Put this logic in slice. This is horrendous.
  const addRandomSpell = () => {
    if(knownSpells){
      const selectFrom = allSpells.filter(spell => !knownSpells.map(known => known.index).includes(spell.index))
      const index = Math.floor(Math.random() * selectFrom.length)
      dispatch(addPrepared({ level: level, spell: selectFrom[index] }))
    } else {
      const index = Math.floor(Math.random() * allSpells.length)
      dispatch(addPrepared({ level: level, spell: allSpells[index]}))
    }
    setRemaining(remaining - 1)
  }

  const shuffleSpell = (old) => {
    const selectFrom = allSpells.filter(spell => !knownSpells.map(known => known.index).includes(spell.index))
      const index = Math.floor(Math.random() * selectFrom.length)
    const newSpell = selectFrom[index]
    dispatch(changePrepared({level: level, old: old, newSpell: newSpell}))
  }

  const deleteSpell = (old) => {
    dispatch(changePrepared({level: level, old: old}))
    setRemaining(remaining + 1)
  }

  return (
    <View>
      <View className="flex flex-row justify-between px-5">
        <Text>{`Level ${level} Spells (${slots} slots) `}</Text>
        {remaining ? <TouchableOpacity className="px-2 py-1 rounded-lg" style={{ backgroundColor: '#50f26e' }} onPress={addRandomSpell}>
          <Text>+</Text>
        </TouchableOpacity> : null}
      </View>
      <View className="flex flex-col">
        {knownSpells ? knownSpells.map((spell, i) => <View className="flex flex-row px-7 justify-between" key={i}>
          <Text>{spell.name}</Text>
          <View className="flex flex-row space-x-2">
            <TouchableOpacity className="rounded-lg px-3 py-1" style={{backgroundColor: 'red'}}
            onPress={() => deleteSpell(spell)}
            >
              <Text className="font-bold">{'-'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
            className="rounded-lg px-2 py-1" style={{backgroundColor: '#f2ca50'}}
            onPress={() => shuffleSpell(spell)}
            >
              <Text>{'< >'}</Text>
            </TouchableOpacity>
          </View>
        </View>) : null}
      </View>
    </View>
  )

}