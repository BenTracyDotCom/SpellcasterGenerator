import { createSlice } from "@reduxjs/toolkit";
import { default as db } from "../../utilities/db.mjs";

export const npcsSlice = createSlice({
  name: 'npcs',
  initialState: {
    npcs: []
  },
  reducers: {
    loadNpcs: (state, action) => {
      state.npcs = action.payload
    },
    addNpc: (state, action) => {
      const newNpcs = state.npcs.slice(0).push(action.payload)
      db.storeNpcs(newNpcs)
    }
  }
})

export const { loadNpcs, addNpc } = npcsSlice.actions

export default npcsSlice.reducer