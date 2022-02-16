import { Action } from "../actions/actions";
import BikeStock from "../bikeStock.json";
import Shops from "../storeDb.json";

export type Container = {
  id: string;
  format: string;
  name: string;
};

export interface StoreState {
  bikeStock: Container[];
  stores: Store[];
}

export type Store = {
  id: string;
  name: string;
  containers: Container[];
  isVisited?: boolean;
};

const initialState = {
  bikeStock: BikeStock.containers,
  stores: Shops.stores.map((shop) => {
    return { ...shop, containers: [] };
  }),
};

export const containerReducer = (
  state: StoreState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "MOVE_TO_STORE": {
      const newBikeStock = state.bikeStock.filter(
        (b) => b !== action.payload.container
      );
      const newStores = state.stores.map((shop) => {
        if (shop.id === action.payload.shopId) {
          shop.containers?.push(action.payload.container);
          shop.isVisited = true;
        }

        return shop;
      });

      return { ...state, bikeStock: newBikeStock, stores: newStores };
    }
    default:
      return state;
  }
};
