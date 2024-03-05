import { createSlice } from "@reduxjs/toolkit";
import wizardSpell from "../../utilities/wizardSpell";

export const spellbookSlice = createSlice({
  name: 'spellbook',
  initialState: {
    spells: [ wizardSpell ],
    filteredSpells: [ wizardSpell ],
    modal: {
      show: false,
      spells: [ wizardSpell ],
      swap: true,
      //Modal filter will include all items where item[filter[0]] === filter[1]
      filter: ['', undefined],
      clas: 'All' 
    }
  },
  reducers: {
    toggleModal: state => {
      state.modal.show = !state.modal.show
    },
    updateModal: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        state.modal[key] = action.payload[key]
      })
    },
    filterSpells: (state, action) => {
      const filtered = state.spells.slice(0).filter(spell => spell[action.payload[0]] === action.payload[1])
      state.filteredSpells = filtered
    },
    filterModalSpells: (state, action) => {
      const filtered = state.modal.spells.slice(0).filter(spell => spell[action.payload[0]] === action.payload[1])
      state.modal.filteredSpells = filtered
    }
  },
})

export const { toggleModal, updateModal, filterSpells, filterModalSpells } = spellbookSlice.actions

export default spellbookSlice.reducer