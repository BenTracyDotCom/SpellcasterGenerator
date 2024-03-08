import { createSlice } from "@reduxjs/toolkit";
import { default as p } from "../../utilities/parsers.mjs";
import { default as db } from "../../utilities/db.mjs";
import races from "../../utilities/races.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const npcSlice = createSlice({
  name: 'npc',
  initialState: {
    //Expanded class info
    classes: [],
    //Numbers with indexes corresponding to spell level
    slots: [],
    name: '',
    race: 'Dwarf',
    subrace:       {
      name: "Hill",
      bonuses: {
        con: 1,
        wis: 1
      }
    },
    clas: 'Cleric',
    level: '1',
    spellcastingAbility: 'wis',
    modifiers: {},
    spellsKnown: {},
    spells: [],
    prepared: 4,
    proficiency: 2
  },
  reducers: {
    loadClasses: (state, action) => {
      state.classes = action.payload
    },
    updateModifiers: (state, action) => {
      const castingAbility = state.classes.find(clas => clas.name === action.payload.clas ? action.payload.clas : state.clas)
      const level = action.payload.level ? action.payload.level : state.level
      if(action.payload.race || action.payload.subrace){
        let newSubrace
        if(action.payload.race){
          const race = races.filter(race => (race.name === action.payload.race))[0]
          newSubrace = race.subraces[0]
        } else if(action.payload.subrace){
          newSubrace = action.payload.subrace
        } else {
          newSubrace = state.subrace
        }
        state.subrace = newSubrace
        state.modifiers = p.parseModifiers(castingAbility, newSubrace, level)
      }
    },
    // This is just slot info
    updateSlots: (state, action) => { 
      state.slots = p.parseSlots(action.payload.spellcastingInfo)
    },
    //This gives total number of spells/cantrips known, also slots per level (redundant)
    updateSpellsKnown: (state, action) => {
      state.spellsKnown = p.parseSpellsKnown(action.payload.spellcastingInfo, level)
    },
    updateSpells: (state, action) => {
      state.spells = action.payload
    },
    updateNpc: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key]
      })
    },
  }
})

export const { loadClasses, updateModifiers, updateSlots, updateSpells, updateNpc } = npcSlice.actions

export default npcSlice.reducer