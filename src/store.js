import { configureStore, combineReducers } from "@reduxjs/toolkit";;
import spellbookReducer from "./features/spellbook/spellbookSlice";
import npcReducer from "./features/npcs/NpcSlice";
import npcsReducer from "./features/npcs/NpcsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const reducers = combineReducers({
  spellbook: spellbookReducer,
  npc: npcReducer,
  npcs: npcsReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
})

export const persistor = persistStore(store)