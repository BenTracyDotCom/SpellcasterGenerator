import { View, Text, TouchableOpacity } from "react-native";

export default function ClickableSpell({ navigation, spell}) {

  const handlePress = () => {
    navigation.navigate("Spell", {
      title: spell.name,
      spell: spell
    })
  }

  return(
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>{spell.name}</Text>
      </TouchableOpacity>
    </View>
  )
}