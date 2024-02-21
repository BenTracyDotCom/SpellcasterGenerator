import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import NpcTile from "./NpcTile";

export default function NpcList({ npcs }) {

  return (
    <View className="text-slate-500">
      {npcs && npcs.map((npc, i) => (
        <NpcTile npc={npc} key={i} />
      ))}
    </View>
  )
}