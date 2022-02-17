interface TransferToStoreAction {
  type: 'transferToStore'
  payload: { containers: string[]; toShopId: string; fromShopId?: string }
}

interface BackToBikeStockAction {
  type: 'backToBikeStock'
  payload: { containers: string[]; fromShopId: string }
}

export type Action = TransferToStoreAction | BackToBikeStockAction
