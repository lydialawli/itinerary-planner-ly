import { createStore } from 'redux'
import { containerReducer } from './reducers/containerReducer'

export const store = createStore(containerReducer)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
