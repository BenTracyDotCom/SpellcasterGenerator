import { default as db } from "../../utilities/db.mjs";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "./spellbookSlice";
import ClickableSpell from "../../components/ClickableSpell";

export default function SpellModal({ navigation }) {

  const dispatch = useDispatch()

  const { show, spells, swap, filter, clas } = useSelector(state => state.spellbook.modal)


  const classNames = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorceror', 'Warlock', 'Wizard']

  // useEffect(() => {
  //   db.getAllSpells()
  //     .then(spells => {
  //       setAllSpells(spells)
  //       const filtered = spells.filter(filter)
  //       setFilteredSpells(filtered)
  //     })
  // }, [])

  // useEffect(() => {
  //   const filtered = allSpells.filter(filter)
  //   setFilteredSpells[filtered]
  // }, [filter])

  // useEffect(() => {
  //   if (clas !== "All") {
  //     const clasFiltered = spells.filter(spell => (spell.classes.find(classs => (classs.name === clas))))
  //     // allSpells.filter(spell => (spell.classes.find(classs => (classs.name === clas))))
  //     setFilteredSpells(clasFiltered ? clasFiltered.filter(filter) : [])
  //   } else {
  //     setFilteredSpells(spells.filter(filter))
  //     //setFilteredSpells(allSpells.filter(filter))
  //   }
  // }, [clas])

  const handleClass = (e) => {
    dispatch(updateModal({ clas: e }))
    // setClass(e)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        dispatch(toggleModal());
      }}>
      <View className="p-4 w-11/12 border-2 border-primary m-auto rounded-3xl bg-[#f7f4ed]">
        <View className="rounded-md text-secondary">
          <View classNAme="h-1/6 border-2 border-primary">
          </View>
          <View className="h-5/6 my-2">
            <Picker onValueChange={handleClass} selectedValue={clas}>
              <Picker.Item label="All" value="All" />
              {classNames.map((name, i) => (<Picker.Item label={name} value={name} key={i} />))}
            </Picker>
            <ScrollView className="">
              {filteredSpells.length ? filteredSpells.map((spell, i) => (
                <View key={i} className="mb-2 flex flex-row justify-between border-2 p-2 rounded-lg">
                  <TouchableOpacity onPress={() => {setShowModal(!showModal)}}>
                    <ClickableSpell spell={spell} navigation={navigation}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {onPress(spell)}}>
                    <Text>✔</Text>
                  </TouchableOpacity>
                </View>
              )) : null}
            </ScrollView>
          </View>
        </View>
          <TouchableOpacity onPress={() => { dispatch(toggleModal()) }} className="w-full border-2 rounded-full w-min mx-auto bg-primary">
            <Text className="text-center">X</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  )

}