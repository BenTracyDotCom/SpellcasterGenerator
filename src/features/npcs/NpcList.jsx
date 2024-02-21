import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import NpcTile from "./NpcTile";

export default function NpcList({ npcs }) {

  return (
    <View>
{npcs && npcs.map((npc) => (
  <NpcTile npc={npc} />
))}
    </View>
  )
}