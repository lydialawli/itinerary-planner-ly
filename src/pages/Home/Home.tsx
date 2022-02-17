import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Grid, Box, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StoreState, Container, Store } from '../../interactions/reducers/containerReducer'
import ShopCard from '../../components/ShopCard'
import ContainerCard from '../../components/ContainerCard'
import storePng from '../../assets/store-icon.png'

const Home = (): ReactElement => {
  const theme = useTheme()

  const bikeStock = useSelector<StoreState, Container[]>((state) => state.bikeStock)
  const stores = useSelector<StoreState, Store[]>((state) => state.stores).sort((a, b) => (a.id > b.id ? 1 : -1))

  return (
    <Grid container spacing={theme.spacing(1)} overflow="none">
      <Box margin={theme.spacing(2)} width="80vw">
        <Typography paddingBottom={theme.spacing(2)} variant="h6">
          BIKE STOCK ({bikeStock.length || 0})
        </Typography>

        <Grid container spacing={2} paddingBottom={theme.spacing(6)}>
          {bikeStock &&
            bikeStock.length > 0 &&
            bikeStock.map((container) => (
              <Grid item xs={6} md={3}>
                <ContainerCard {...container} key={container.id} />
              </Grid>
            ))}
        </Grid>
        <Grid container alignItems="center" justifyContent="flex-start" paddingBottom={theme.spacing(2)}>
          <Avatar src={storePng} />
          <Typography variant="h6">SHOPS</Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-start">
          {stores &&
            stores.length > 0 &&
            stores.map((shop) => (
              <Grid item xs={4} md={3}>
                <ShopCard {...shop} key={shop.id} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Grid>
  )
}

export default Home
