import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import NpcTile from "./NpcTile";
import Button from "../../components/Button";

export default function NpcList({ npcs, navigation }) {

  return (
    <View className="text-slate-500">
      {npcs ? npcs.map((npc, i) => (
        <Button text={npc} key={i} />
      )) : null }
    </View>
  )
}