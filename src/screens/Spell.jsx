import { SafeAreaViewView, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Spell({ route }) {

  const { spell } = route.params

  return (
    <View className="my-2 px-3">
      {spell.concentration ? <Text className="font-bold">Concentration</Text> : null}
      <Text>{`${spell.level ? `Level ${spell.level}` : "Cantrip"} ${spell.school.index}`}</Text>
      <Text>{`Casting time: ${spell.casting_time}`}</Text>
      <View className="flex flex-row">
        <Text>{`Range${spell.area_of_effect ? ' (area)' : ''}: ${spell.range}`}</Text>
        {spell.area_of_effect ? <Text>{`(${spell.area_of_effect.size} foot ${spell.area_of_effect.type})`}
        </Text> : null}
      </View>
      <Text>{`Druation: ${spell.duration}`}</Text>
      <ScrollView>
        {spell.desc.map((para, i) => (
          <Text key={i} className="py-2">{para}</Text>
        ))}
      </ScrollView>
    </View>
  )
}