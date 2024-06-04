import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Tally from "../../components/Tally";
import Button from "../../components/Button";

export default function SlotInfo({ level, maxSlots }) {

  level = level || 1

  //By this point we're expecting a number indicating max slots for this level
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    if(count < maxSlots){
      setCount(count + 1)
    }
  }
  const handleDecrement = () => {
    if(count > 0){
      setCount(count - 1)
    }
  }
  const handleReset = () => {
    setCount(0)
  }

  return (
    <View className="flex flex-row items-center justify-start w-full pb-2">
      {/* <View className="border-2 rounded-full px-2">
        <Text>{level}</Text>
      </View> */}
      <Text className="px-2">{`Total: ${maxSlots} Slots`}</Text>
      <Tally count={count} max={maxSlots} />
      <View className="flex flex-row w-min px-3 space-x-5">
        <TouchableOpacity onPress={handleIncrement} className="px-3 py-1 rounded-full" style={{ backgroundColor: "#40f4f7"}}>
        <Text>+</Text>
        </TouchableOpacity>
        {/* <Button text="+" onPress={handleIncrement} /> */}
        <TouchableOpacity onPress={handleReset} className="px-3 py-1 rounded-full" style={{ backgroundColor: "#f7a840"}}>
          <Text>R</Text>
        </TouchableOpacity>
        {/* <Button text="-" onPress={handleDecrement} /> */}

        {/* <Button text="R" onPress={handleReset} /> */}
      </View>
    </View>
  )

}