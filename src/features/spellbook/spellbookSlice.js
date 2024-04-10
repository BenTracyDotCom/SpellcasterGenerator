import { createSlice } from "@reduxjs/toolkit";
import wizardSpell from "../../utilities/wizardSpells";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { default as db } from "../../utilities/db.mjs";
import { default as p } from "../../utilities/parsers.mjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchSpells = createAsyncThunk(
  'npc/fetchSpells',
  async () => {
    const spells = await db.getSimpleSpells()
    return spells
  }
)

export const spellbookSlice = createSlice({
  name: 'spellbook',
  initialState: {
    //This will hold a 3D array of simple versions of all spells
    spells: [ wizardSpell ],
    filteredSpells: [ wizardSpell ],
    modal: {
      show: false,
      spells: [ wizardSpell ],
      filteredSpells: [ wizardSpell ],
      swap: true,
      filter: ['', undefined],
      clas: 'All',
    }
  },
  reducers: {
    //loads all simple spells into this state
    loadSpellbook: (state, action) => {
      state.spells = action.payload
    },
    toggleModal: state => {
      state.modal.show = !state.modal.show
    },
    updateModal: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        state.modal[key] = action.payload[key]
      })
    },
    //e.g. "Where 'class' === 'wizard'" filter looks like ['class', 'wizard']
    //Better handled by specific attributes as below
    filterSpells: (state, action) => {
      const filtered = state.spells.slice(0).filter(spell => spell[action.payload[0]] === action.payload[1])
      state.filteredSpells = filtered
    },
    filterModalSpells: (state, action) => {
      const filtered = state.modal.spells.slice(0).filter(spell => ( Array.isArray(spell[action.payload[0]]) ? spell[action.payload[0].includes(action.payload[1])] :
      spell[action.payload[0]] === action.payload[1]))
      state.modal.filteredSpells = filtered
    },
    filterModalByClass: (state, action) => {
      const filteredByClass = action.payload === "All" ? state.modal.spells : 
      state.modal.spells.filter(spell => (spell.classes.find(name => name === action.payload)))
      state.modal.spells = filteredByClass
    },
    filterModalByLevel: (state, action) => {
      const filteredByLevel = state.spells.filter(spell => (spell.level === parseInt(action.payload)))
      state.modal.spells = filteredByLevel
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpells.fulfilled, (state, action) => {
      state.spells = action.payload
    })
  }
})

export const { loadSpellbook, toggleModal, updateModal, filterSpells, filterModalSpells, filterModalByClass, filterModalByLevel } = spellbookSlice.actions

export default spellbookSlice.reducer