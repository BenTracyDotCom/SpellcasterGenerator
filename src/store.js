import { configureStore, combineReducers } from "@reduxjs/toolkit";;
import spellbookReducer from "./features/spellbook/spellbookSlice";
import npcReducer from "./features/npcs/NpcSlice";
import npcsReducer from "./features/npcs/NpcsSlice";

const reducer = {
  spellbook: spellbookReducer,
  npc: npcReducer,
  npcs: npcsReducer
}

export const store = configureStore({
reducer
})