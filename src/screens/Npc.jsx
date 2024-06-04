import { View, TouchableOpacity, Text } from "react-native";
//SlotInfo gets Level, MaxSlots
import SlotInfo from "../features/spells/SlotInfo";
import ClickableSpell from "../components/ClickableSpell";


export default function Npc({ route, navigation }) {

  
  const { npc } = route.params

  return (
    <View>
      {npc.slots ? npc.slots.map((slot, i) => {
        if(slot && i > 0){
          return(
            <View>
              <SlotInfo level={i} maxSlots={slot} key={i}/>
              {npc.prepared[i] ? npc.prepared[i].map((spell, i) => (
                <ClickableSpell navigation={navigation} spell={spell}/>
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