import { createSlice } from "@reduxjs/toolkit";
import wizardSpell from "../../utilities/wizardSpells";

export const spellbookSlice = createSlice({
  name: 'spellbook',
  initialState: {
    spells: [ wizardSpell ],
    spellsByLevel: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: []
    },
    filteredSpells: [ wizardSpell ],
    modal: {
      show: false,
      spells: [ wizardSpell ],
      filteredSpells: [ wizardSpell ],
      swap: true,
      //Modal filter will include all items where item[filter[0]] === filter[1]
      filter: ['', undefined],
      clas: 'All',
    }
  },
  reducers: {
    //loads alll expanded spells into this state
    loadSpellbook: (state, action) => {
      state.spells = action.payload
      console.log(state.spells[0], "first spell or set of spells")
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
    randomizeSpells: () => {
      
    }
  },
})

export const { loadSpellbook, toggleModal, updateModal, filterSpells, filterModalSpells, filterModalByClass, filterModalByLevel } = spellbookSlice.actions

export default spellbookSlice.reducer