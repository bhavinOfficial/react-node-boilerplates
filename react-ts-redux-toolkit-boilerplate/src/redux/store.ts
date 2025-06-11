import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counter/index.ts'
import userDetailSlice from './slices/userData/index.ts'


export const store = configureStore({
  reducer: {
    counter: counterSlice,
    app: userDetailSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch