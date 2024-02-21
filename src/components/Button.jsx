import { View, Text, TouchableOpacity } from "react-native";

export default function Button({ text, onPress, color, textColor }){
  
  text = text || ''
  color = color || '#9f1239'
  textColor = textColor || 'white'
  onPress = onPress || (() => {})

  return (
    <View>
      <TouchableOpacity className="p-3 rounded-full mx-5 my-2 items-center" onPress={onPress} style={{ backgroundColor: color}}>
        <Text className="font-bold" style={{color: textColor}}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}