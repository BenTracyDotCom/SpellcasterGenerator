import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as p } from "../../utilities/parsers.mjs";
import { default as db } from "../../utilities/db.mjs";
import races from "../../utilities/races.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchSpells = createAsyncThunk(
  'npc/fetchSpells',
  async (clas) => {
    const spells = db.getSpells(clas)
    //TODO: put this into a builder under extraReducers and use it to update my lil spells array in state
  }
)

export const npcSlice = createSlice({
  name: 'npc',
  initialState: {
    //Expanded class info
    classes: [],
    class: {},
    //Numbers with indexes corresponding to spell level
    slots: [],
    name: '',
    race: 'Dwarf',
    subrace: {
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
    updateClass: (state, action) => {
      state.class = action.payload
    },
    updateModifiers: (state, action) => {
      const castingAbility = state.classes.find(clas => clas.name === action.payload.clas ? action.payload.clas : state.clas)
      const level = action.payload.level ? action.payload.level : state.level
      const subrace = action.payload.subrace ? action.payload.subrace : state.subrace
      state.modifiers = p.parseModifiers(castingAbility, subrace, level)
    },
    // This is just slot info
    updateSlots: (state, action) => {
      state.slots = p.parseSlots(action.payload.spellcastingInfo)
    },
    //This gives total number of spells/cantrips known (prepared), also slots per level (redundant)
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

export const { loadClasses, updateModifiers, updateSlots, updateSpellsKnown, updateSpells, updateNpc, updateClass } = npcSlice.actions

export default npcSlice.reducer