import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { StoreState, Store } from '../interactions/reducers/containerReducer'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import storePng from '../assets/store-icon.png'

const SelectShop = ({ setSelectedStore }: { setSelectedStore: (shopId: string) => void }): ReactElement => {
  // const dispatch = useDispatch()
  const stores = useSelector<StoreState, Store[]>((state) => state.stores)

  // const setSelectedStore = (shopId: string) => {
  //   dispatch({ type: 'selectStore', payload: shopId })
  // }

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={stores}
      onChange={(_e, shop) => {
        setSelectedStore(shop?.id || '')
      }}
      // onChange={(_e, shop) => setSelectedStore(!!shop?.id ? shop.id : '')}
      // TODO: fix bug visited
      groupBy={(shop) => (shop.isVisited ? 'Visited' : 'Not visited yet')}
      autoHighlight
      getOptionLabel={(shop) => shop.name}
      renderOption={(props, shop) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="20" src={storePng} alt="" />
          {shop.name}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Choose a shop" />}
    />
  )
}

export default SelectShop
