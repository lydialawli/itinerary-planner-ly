import { Action } from '../actions'
import BikeStock from '../bikeStock.json'
import Shops from '../storeDb.json'

export type Container = {
  id: string
  format: string
  name: string
}

export interface StoreState {
  bikeStock: Container[]
  stores: Store[]
  selectedStore: string
}

export type Store = {
  id: string
  name: string
  containers: Container[]
  isVisited?: boolean
}

const initialState = {
  bikeStock: BikeStock.containers,
  stores: Shops.stores.map((shop) => {
    return { ...shop, containers: [] }
  }),
  selectedStore: '',
}

export const containerReducer = (state: StoreState = initialState, action: Action) => {
  switch (action.type) {
    case 'selectStore': {
      return { ...state, selectedStore: action.payload }
    }
    case 'transferToStore': {
      console.log({ a: action.payload })
      const newBikeStock = state.bikeStock.filter((b) => b.id !== action.payload.container.id)
      const newStores = state.stores.map((shop) => {
        if (shop.id === action.payload.shopId) {
          shop.containers?.push(action.payload.container)
          shop.isVisited = true
        }

        return shop
      })
      return { bikeStock: newBikeStock, stores: newStores, selectedStore: '' }
    }
    case 'backToBikeStock': {
      // TODO: add logic
      return { ...state, selectedStore: '' }
    }
    default:
      return state
  }
}
