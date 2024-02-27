import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function TileHeader({ level, max, setMax, reShuffle, spellSlots }) {

  const levelInfo = level > 0 ? ` Level ${level} Spells ${spellSlots ? `(${spellSlots} slots)` : ''}` : 'Cantrips'

  const handleShuffle = () => {
    reShuffle()
  }

  return (
    <View className="flex flex-row">
      <Text className="text-primary font-bold p-2">{levelInfo}</Text>
      <TouchableOpacity  className="p-2 bg-primary rounded-full" onPress={handleShuffle}>
        <Text style={{ "color": "white"}}>Reshuffle</Text>
      </TouchableOpacity>
    </View>
  )
}