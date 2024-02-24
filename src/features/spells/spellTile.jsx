import { View, TouchableOpacity } from "react-native";
import SlotInfo from "./SlotInfo";
import SpellList from "./SpellList";

export default function SpellTile({ navigation, spells, slotIncrementer }) {

  return (
    <View className="flex flex-col">
      <SlotInfo maxSlots={3} />
      <SpellList spells={['acid arrow', 'expelliarmus', 'lumos']} navigation={navigation} slotIncrementer={slotIncrementer} />
    </View>
  )
}