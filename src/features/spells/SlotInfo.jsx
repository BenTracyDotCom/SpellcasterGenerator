import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Tally from "../../components/Tally";
import Button from "../../components/Button";

export default function SlotInfo({ level, maxSlots, slotIncrementer }) {

  level = level || 1

  //By this point we're expecting a number indicating max slots for this level
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    if (count < maxSlots) {
      setCount(count + 1)
    }
  }
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <View className="flex flex-row items-center justify-around w-full border-2 border-primary">
      <View className="border-2 rounded-full px-2">
        <Text>{level}</Text>
      </View>
      {slotIncrementer && <View>
        <Text>{`Total: ${maxSlots}`}</Text>
        <Tally count={count} max={maxSlots} />
        <View className="flex flex-row w-min">
          <Button text="+" onPress={handleIncrement} />
          <Button text="-" onPress={handleDecrement} />
        </View>
      </View>}
    </View>
  )

}