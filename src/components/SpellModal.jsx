import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";

export default function SpellModal({ spells, showModal, setShowModal, onPress }) {

  onPress = onPress || (() => {})

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={showModal}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setShowModal(!showModal);
    }}>
    <View className="centeredView flex justify-center items-center w-11/12 border-2 border-primary h-full mx-auto rounded-2xl bg-primary">
      <View className="modalView m-20 bg-primary rounded-md p-35 items-center">
        <Text className="modalText text center mb-15">Hello World!</Text>
        <Pressable className="button, buttonClose rounded-lg p-10 bg-[#2196f3]" onPress={() => setShowModal(!showModal)}>
          <Text className="textStyle color-white font-bold text-center">Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  )
}