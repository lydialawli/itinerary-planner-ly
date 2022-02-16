import { Container } from '../reducers/containerReducer'

export type Action = {
  type: 'MOVE_TO_STORE'
  payload: { container: Container; shopId?: string }
}

// export const moveContainer = (container: Container): Action => ({
//   type: "MOVE_CONTAINER",
//   payload: container,
// });
