import { SafeAreaViewView, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { default as db } from "../utilities/db.mjs";

export default function Spell({ route }) {

  const { spell } = route.params

  const [loadedSpell, setLoadedSpell] = useState(null)

  useEffect(() => {
    if (loadedSpell) {
      setLoadedSpell(null)
    }
    const fetchSpell = async () => {
      const fullSpell = await db.getSpell(spell.index)
      setLoadedSpell(fullSpell)
      console.log(fullSpell)
    }
    fetchSpell()
  }, [])

  if (!loadedSpell) {
    return null
  } else {
    return (
      <View className="my-2 px-3">
        {loadedSpell && loadedSpell.concentration ? <Text className="font-bold">Concentration</Text> : null}
        <Text className="py-2">{`${
          loadedSpell.level ? `Level ${loadedSpell.level}` : ""
        } ${loadedSpell.school ? loadedSpell.school.name : ""} ${!loadedSpell.level ? "Cantrip" : ""}`}
        </Text>
        <Text>{`Casting time: ${loadedSpell.casting_time || ""}`}</Text>
        <View className="flex flex-row">
          <Text>{`Range${loadedSpell.area_of_effect ? " (area)" : ""}: ${loadedSpell.range || ""}`}</Text>
          {loadedSpell.area_of_effect ? (
            <Text>{`(${loadedSpell.area_of_effect.size} foot ${loadedSpell.area_of_effect.type})`}</Text>
          ) : null}
        </View>
        <Text>{`Druation: ${loadedSpell.duration || ""}`}</Text>
        <ScrollView>
          {loadedSpell.desc &&
            loadedSpell.desc.map((para, i) => (
              <Text key={i} className="py-2">
                {para}
              </Text>
            ))}
        </ScrollView>
      </View>
    );
  }
}