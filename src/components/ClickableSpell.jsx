import { View, Text, TouchableOpacity } from "react-native";

export default function ClickableSpell({ navigation, spell}) {

  //TODO: update to make DB request to expand spell based on spell.index (because this gets a simplified spell now)
  
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