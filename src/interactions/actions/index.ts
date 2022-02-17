import { Container } from '../reducers/containerReducer'

interface TransferToStoreAction {
  type: 'transferToStore'
  payload: { container: Container; toShopId: string; fromShopId?: string }
}

interface BackToBikeStockAction {
  type: 'backToBikeStock'
  payload: { container: Container; fromShopId: string }
}

export type Action = TransferToStoreAction | BackToBikeStockAction
