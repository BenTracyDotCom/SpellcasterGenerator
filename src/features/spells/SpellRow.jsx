import { View, Text, TouchableOpacity } from "react-native";

export default function SpellRow({ spell, navigation }){

  //TODO: navigate to "spell" screen, passing spell name as title and spell info as data

  const handleSpell = () => {
    () => {}
  }

  return(
    <View className="w-full border-2">
      <TouchableOpacity className="pl-2">
        <Text>{spell}</Text>
      </TouchableOpacity>
    </View>
  )

}