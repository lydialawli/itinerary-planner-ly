import * as React from 'react'
import { useSelector } from 'react-redux'
import { StoreState, Store } from '../interactions/reducers/containerReducer'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import storePng from '../assets/store-icon.png'

export default function CountrySelect() {
  const stores = useSelector<StoreState, Store[]>((state) => state.stores)

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={stores}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="20" src={storePng} alt="" />
          {option.name}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Choose a shop" />}
    />
  )
}
