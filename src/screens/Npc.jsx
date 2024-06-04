import { View, ScrollView, TouchableOpacity, Text } from "react-native";
//SlotInfo gets Level, MaxSlots
import SlotInfo from "../features/spells/SlotInfo";
import ClickableSpell from "../components/ClickableSpell";


export default function Npc({ route, navigation }) {


  const { npc } = route.params
  let highest = 0
  if (npc.clas === "Warlock") {
    for (let i = npc.slots.length; i >= 0; i--) {
      if (npc.slots[i]) {
        highest = i
        break
      }
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "white"}}>
      {npc.prepared[0] ?
        <Text className="text-xl font-bold border-b-2">Cantrips</Text>
        : null}
      {npc.slots ? npc.prepared[0].map(cantrip => (
        <ClickableSpell navigation={navigation} spell={cantrip} />
      )) : null}
      {npc.slots ? npc.slots.map((slot, i) => {
        if ((slot && i > 0) || (npc.clas === "Warlock" && i <= highest && i > 0)) {
          return (
            <View className="border-t-2">
              <Text className="text-xl font-bold">{`Level ${i} Spells`}</Text>
              {slot ? <SlotInfo level={i} maxSlots={slot} key={i} /> : null}
              {npc.prepared[i] ? npc.prepared[i].map((spell, i) => (
                <ClickableSpell navigation={navigation} spell={spell} />
                // <Text key={i}>{spell.name}</Text>
              )) : null}
            </View>

          )
        }
      }

      ) : null}
    </ScrollView>
  )
}