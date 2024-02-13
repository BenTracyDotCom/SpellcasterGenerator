import { View, Text, TouchableOpacity } from "react-native";


export default function Launch({ navigation }) {

  const handleStorageTest = () => {
    navigation.navigate('Storage Test')
  }

  return(
    <View>
      <Text>
        Launch goes here
      </Text>
      <TouchableOpacity className="bg-blue-500 p-3 rounded-full mx-5 my-2 items-center" onPress={handleStorageTest}>
        <Text className="text-white font-bold">
          Storage Test Screen
        </Text>
      </TouchableOpacity>
    </View>
  )
}