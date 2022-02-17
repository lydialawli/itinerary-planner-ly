import { Container } from '../reducers/containerReducer'

interface TransferToStoreAction {
  type: 'transferToStore'
  payload: { container: Container; shopId: string }
}

interface BackToBikeStockAction {
  type: 'backToBikeStock'
  payload: { container: Container; shopId: string }
}

export type Action = TransferToStoreAction | BackToBikeStockAction
