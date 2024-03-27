import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as p } from "../../utilities/parsers.mjs";
import { default as db } from "../../utilities/db.mjs";
import { default as wizardSpellcasting } from "../../utilities/wizardLevels";
import races from "../../utilities/races.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
TODO:
- Decide how to format spells (I like { 0: [spells], 2: [spells] ...})

- Spellbook editing page will deal with spells from the modal and from this state, so it might be easier for the selector statements to call these 'npcSpells' and those 'modalSpells'

- Write a thunk to take in an arg for number of spells, pull all spells, filter by level, randomize and assign that many random spells to the spell object

- Write an action to take in a new spell, an old spell, and swap the spell in the npc spell opject

- Write an action to keep track of max spells and current spells in the spell object (we can either turn it red on the spellbook page or prevent further spells from being added, the former will be way easier)

*/

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

export const loadRandomSpells = createAsyncThunk(
  'npc/loadRandomSpells',
  async(payload) => {
    const { slots, clas } = payload
    const highest = p.findHighestLevel(slots)
    const simpleSpells = await db.getSimpleSpells()
    const relevantSpells = simpleSpells.filter(spell => spell.classes.some(classs => classs.name === clas))
    .filter(spell => spell.level <= highest)
    console.log(highest, 'highest', clas, ' clas', simpleSpells[0], ' first simple spell', relevantSpells[0], ' first relevant spell')

    const randomSpells = {}
    for(let i = 0; i < highest; i ++){
    }
    return randomSpells
  }
)

export const npcSlice = createSlice({
  name: 'npc',
  error: '',
  spellcastingInfo: wizardSpellcasting[0],
  initialState: {
    //Expanded class info
    classes: [],
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
    builder.addCase(loadRandomSpells.fulfilled), (state, action) => {
      state.spellsKnown = action.payload
    }
  }
})

export const { loadClasses, updateModifiers, updateSlots, updateSpellsKnown, updateSpells, updateNpc, updateClass, resetSpellcasting } = npcSlice.actions

export default npcSlice.reducer