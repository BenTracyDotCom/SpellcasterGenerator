import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function TileHeader({ level, max, setMax }) {

  const levelInfo = level > 0 ? ` Level ${level} Spells` : 'Cantrips'

  return (
    <View>
      <Text className="text-primary font-bold">{levelInfo}</Text>
    </View>
  )
}