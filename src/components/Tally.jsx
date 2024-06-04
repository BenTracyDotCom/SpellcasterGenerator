import { View, Text, TouchableOpacity } from "react-native";

export default function Tally({ count, max }){

  count = count || 0
  max = max || 0

  const mappableArray = []
  for(let i = 0; i < count; i ++){
    mappableArray.push('|')
  }
  
  const normalStyle = "text-s font-bold mr-1"
  const fullStyle= "text-s font-bold mr-1 text-error"

  return(
    <View className="w-32 border-2 flex flex-row px-3 h-8">
        { mappableArray.map((tick, i)=> (
          <Text className={count < max ? normalStyle : fullStyle} key={i}>{tick}</Text>
        ))}
    </View>
  )

}