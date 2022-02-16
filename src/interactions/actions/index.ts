import { Container } from '../reducers/containerReducer'

interface SelectStoreAction {
  type: 'selectStore'
  payload: string
}

interface TransferToStoreAction {
  type: 'transferToStore'
  payload: { container: Container; shopId: string }
}

interface BackToBikeStockAction {
  type: 'backToBikeStock'
  payload: { container: Container; shopId: string }
}

export type Action = SelectStoreAction | TransferToStoreAction | BackToBikeStockAction
