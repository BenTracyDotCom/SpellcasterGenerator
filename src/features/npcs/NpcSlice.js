import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as p } from "../../utilities/parsers.mjs";
import { default as db } from "../../utilities/db.mjs";
import { default as wizardSpellcasting } from "../../utilities/wizardLevels";
import races from "../../utilities/races.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateSpellcasting = createAsyncThunk(
  'npc/updateSpellcasting',
  async (payload) => {
    const { clas, level } = payload
    const newSpellcasting = await db.getLevelInfo(clas, level)
    const spellsKnown = p.parseSpellsKnown(newSpellcasting, level)
    const slots = p.parseSlots(newSpellcasting.spellcasting)
    return { newSpellcasting, spellsKnown, slots }
  }
)

export const npcSlice = createSlice({
  name: 'npc',
  error: '',
  spellcastingInfo: wizardSpellcasting[0],
  initialState: {
    //Expanded class info
    classes: [],
    clas: {},
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
      const newClas = state.classes.find(clas => (clas.name === action.payload))

    },
    updateModifiers: (state, action) => {
      const name = action.payload && action.payload.clas ? action.payload.clas : state.clas
      const castingAbility = state.classes.find(clas => clas.name === name).spellcasting.index
      const level = action.payload && action.payload.level ? action.payload.level : state.level
      const subrace = action.payload && action.payload.subrace ? action.payload.subrace : state.subrace
      state.modifiers = p.parseModifiers(castingAbility, subrace, level)
      state.spellcastingAbility = castingAbility
      state.level = level
      state.subrace = subrace
    },
    // This is just slot info
    updateSlots: (state, action) => {
      state.slots = p.parseSlots(action.payload.spellcastingInfo)
    },
    //This gives total number of spells/cantrips known (prepared), also slots per level (redundant)
    updateSpellsKnown: (state, action) => {
      const level = action.payload.level ? action.payload.level : state.level
      state.spellsKnown = p.parseSpellsKnown(action.payload.spellcastingInfo, level)
    },
    updateSpells: (state, action) => {
      state.spells = action.payload
    },
    //This is used to move data from character creation form into state
    updateNpc: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key]
      })
    },
    resetSpellcasting: (state) => {
      state.spellcastingInfo = wizardSpellcasting[0]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateSpellcasting.fulfilled, (state, action) => {
      state.error = ''
      const { newSpellcasting, spellsKnown, slots } = action.payload
      state.spellcastingInfo = newSpellcasting
      state.spellsKnown = spellsKnown
      state.slots = slots
    })
    builder.addCase(updateSpellcasting.rejected, (state, action) => {
      state.error = action.error
    })
  }
})

export const { loadClasses, updateModifiers, updateSlots, updateSpellsKnown, updateSpells, updateNpc, updateClass, resetSpellcasting } = npcSlice.actions

export default npcSlice.reducer