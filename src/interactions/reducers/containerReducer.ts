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

export enum Visited {
  isVisited = 'Visited',
  notVisited = 'Not visited yet',
}

export type Store = {
  id: string
  name: string
  containers: Container[]
  isVisited: Visited
}

const initialState = {
  bikeStock: BikeStock.containers,
  stores: Shops.stores.map((shop) => {
    return { ...shop, containers: [], isVisited: Visited.notVisited }
  }),
  selectedStore: '',
}

export const containerReducer = (state: StoreState = initialState, action: Action) => {
  switch (action.type) {
    case 'transferToStore': {
      const newBikeStock = state.bikeStock.filter((b) => b.id !== action.payload.container.id)
      const newStores = state.stores.map((shop) => {
        if (shop.id === action.payload.toShopId) {
          shop.containers?.push(action.payload.container)
          shop.isVisited = Visited.isVisited
        }
        if (!!action.payload.fromShopId && action.payload.fromShopId === shop.id) {
          const newContainers = shop.containers.filter((c) => c.id !== action.payload.container.id)
          return { ...shop, containers: newContainers }
        }

        return shop
      })
      return { bikeStock: newBikeStock, stores: newStores, selectedStore: '' }
    }
    case 'backToBikeStock': {
      const newStores = state.stores.map((shop) => {
        if (shop.id === action.payload.fromShopId) {
          const newContainers = shop.containers.filter((c) => c.id !== action.payload.container.id)
          return { ...shop, containers: newContainers }
        }
        return shop
      })
      const newBikeStock = state.bikeStock
      newBikeStock.push(action.payload.container)

      return { bikeStock: newBikeStock, stores: newStores, selectedStore: '' }
    }
    default:
      return state
  }
}
