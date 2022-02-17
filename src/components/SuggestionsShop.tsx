import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { StoreState, Store } from '../interactions/reducers/containerReducer'
import { useMediaQuery, TextField, Autocomplete, Box, Avatar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import storePng from '../assets/store-icon.png'

const SelectShop = ({ setSelectedStore }: { setSelectedStore: (shopId: string) => void }): ReactElement => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const stores = useSelector<StoreState, Store[]>((state) => state.stores).sort((a, b) =>
    a.isVisited > b.isVisited ? 1 : -1,
  )

  return (
    <Autocomplete
      id="shops-list"
      sx={{ width: isMobile ? '60vw' : 300 }}
      options={stores}
      onChange={(_e, shop) => {
        setSelectedStore(shop?.id || '')
      }}
      groupBy={(shop) => shop.isVisited}
      autoHighlight
      getOptionLabel={(shop) => shop.name}
      renderOption={(props, shop) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <Avatar src={shop.url || storePng} />
          <Typography paddingLeft={theme.spacing(1)} variant="h6">
            {shop.name}
          </Typography>
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Choose a shop" />}
    />
  )
}

export default SelectShop
