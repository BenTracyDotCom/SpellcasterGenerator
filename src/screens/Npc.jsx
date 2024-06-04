import { View, TouchableOpacity, Text } from "react-native";
//SlotInfo gets Level, MaxSlots
import SlotInfo from "../features/spells/SlotInfo";
import ClickableSpell from "../components/ClickableSpell";


export default function Npc({ route, navigation }) {


  const { npc } = route.params

  return (
    <View>
      {npc.prepared[0] ? 
      <Text className="text-xl font-bold border-b-2">Cantrips</Text>
    : null}
      {npc.slots ? npc.prepared[0].map(cantrip => (
        <ClickableSpell navigation={navigation} spell={cantrip} />
      )) : null}
      {npc.slots ? npc.slots.map((slot, i) => {
        if (slot && i > 0) {
          return (
            <View>
                    <Text className="text-xl font-bold border-y-2">{`Level ${i} Spells`}</Text>
              <SlotInfo level={i} maxSlots={slot} key={i} />
              {npc.prepared[i] ? npc.prepared[i].map((spell, i) => (
                <ClickableSpell navigation={navigation} spell={spell} />
                // <Text key={i}>{spell.name}</Text>
              )) : null}
            </View>

          )
        }
      }

      ) : null}
    </View>
  )
}