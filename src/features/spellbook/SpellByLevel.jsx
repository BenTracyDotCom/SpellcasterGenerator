import { View, Text, TouchableOpacity } from "react-native";

export default function SpellByLevel({ level, spells }) {

  const levelInfo = level > 0 ? ` Level ${level} Spells` : 'Cantrips'
  return (
    <View>
      <Text>
        {levelInfo}
      </Text>
      {spells.map((spell, i) => (<Text key={i}>{JSON.stringify(spell)}</Text>))}
    </View>
  )
}