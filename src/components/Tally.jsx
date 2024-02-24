import { View, Text, TouchableOpacity } from "react-native";

export default function Tally({ count, max }){

  count = count || 0
  max = max || 0

  const mappableArray = []
  for(let i = 0; i < count; i ++){
    mappableArray.push('|')
  }
  const normalStyle = "text-xl font-bold mr-1"
  const fullStyle= "text-xl font-bold mr-1 text-error"

  return(
    <View className="w-full border-2 flex flex-row px-3">
        { mappableArray.map(tick => (
          <Text className={count < max ? normalStyle : fullStyle}>{tick}</Text>
        ))}
    </View>
  )

}