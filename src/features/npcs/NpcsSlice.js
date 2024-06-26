import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as db } from "../../utilities/db.mjs";

export const loadNpcs = createAsyncThunk(
  'npcs/loadNpcs',
  async () => {
    const storedNpcs = await db.getNpcs()
    return { storedNpcs }
  }
)

export const saveNpc = createAsyncThunk(
  'npcs/saveNpc',
  async (payload) => {
    const npc = payload
    const newNpcs = await db.storeNpc(npc)
    return { newNpcs }
  }
)

export const deleteNpc = createAsyncThunk(
  'npcs/deleteNpc',
  async (payload) => {
    const npc = payload
    const newNpcs = await db.removeNpc(npc)
    return { newNpcs }
  }
)

export const npcsSlice = createSlice({
  name: 'npcs',
  initialState: {
    npcs: []
  },
  reducers: {
    addNpc: (state, action) => {
      const newNpcs = state.npcs.slice(0)
      newNpcs.push(action.payload)
      db.storeNpcs(newNpcs)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadNpcs.fulfilled,
      (state, action) => {
        const { storedNpcs } = action.payload
        state.npcs = storedNpcs
      }
    )
    builder.addCase(saveNpc.fulfilled,
      (state, action) => {
        const { newNpcs } = action.payload
        state.npcs = newNpcs
      }
    )
    builder.addCase(deleteNpc.fulfilled,
      (state, action) => {
        const { newNpcs } = action.payload
        state.npcs = newNpcs
      }
    )
  }
})

export const { addNpc } = npcsSlice.actions

export default npcsSlice.reducer