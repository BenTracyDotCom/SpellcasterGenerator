import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, TouchableOpacity, Text } from "react-native";
import NpcTile from "./NpcTile";
import Button from "../../components/Button";
import { deleteNpc } from "./NpcsSlice";

export default function NpcList({ npcs, navigation, deletable }) {

  const dispatch = useDispatch()

  const handleDelete = (npc) => {
    dispatch(deleteNpc(npc))
  }

  return (
    <View className="text-slate-500">
      {npcs ? npcs.map((npc, i) => (
        <View className="">
          <Button text={npc.name} key={i} onPress={() => navigation.navigate('Npc', {
            title: npc.name,
            npc: npc
          })} color={'#4068f7'}/>
          { deletable ? 
          <TouchableOpacity className="text-center" onPress={() => {handleDelete(npc)}}>
            <Text className="mx-auto text-primary">{`Remove ${npc.name}`}</Text>
          </TouchableOpacity>
           : null}
        </View>
      )) : null }
    </View>
  )
}