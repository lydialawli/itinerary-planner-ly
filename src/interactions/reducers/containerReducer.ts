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
  url: string
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
      const newBikeStock = state.bikeStock.filter((b) => action.payload.containers.includes(b.id) === false)
      const newStores = state.stores.map((shop) => {
        //  if it comes from a shop, the containers must be removed
        if (!!action.payload.fromShopId && action.payload.fromShopId === shop.id) {
          const newContainers = shop.containers.filter((c) => action.payload.containers.includes(c.id) === false)
          return { ...shop, containers: newContainers }
        }

        // bellow we send the containers to the new shop
        if (shop.id === action.payload.toShopId) {
          const selectedContainers = initialState.bikeStock.filter((b) => action.payload.containers.includes(b.id))
          const newContainers = shop.containers.concat(selectedContainers)
          shop.isVisited = Visited.isVisited
          return { ...shop, containers: newContainers }
        }

        return shop
      })
      return { bikeStock: newBikeStock, stores: newStores, selectedStore: '' }
    }
    case 'backToBikeStock': {
      // remove containers from the shop
      const newStores = state.stores.map((shop) => {
        if (shop.id === action.payload.fromShopId) {
          const newContainers = shop.containers.filter((c) => action.payload.containers.includes(c.id) === false)
          return { ...shop, containers: newContainers }
        }
        return shop
      })

      //bring containers back to bike store
      const selectedContainers = initialState.bikeStock.filter((b) => action.payload.containers.includes(b.id))
      const newBikeStock = state.bikeStock.concat(selectedContainers)

      return { bikeStock: newBikeStock, stores: newStores, selectedStore: '' }
    }
    default:
      return state
  }
}
