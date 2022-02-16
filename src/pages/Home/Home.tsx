import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Paper, Typography, Grid, Button, Box, Divider } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { StoreState, Container, Store } from '../../interactions/reducers/containerReducer'
import ShopCard from '../../components/ShopCard'
import ContainerCard from '../../components/ContainerCard'

const Home = (): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()

  const bikeStock = useSelector<StoreState, Container[]>((state) => state.bikeStock)
  const stores = useSelector<StoreState, Store[]>((state) => state.stores)
  const selectedStore = useSelector<StoreState, string>((state) => state.selectedStore)

  console.log({ bikeStock, stores, selectedStore })
  return (
    <Grid container spacing={theme.spacing(1)} overflow="none">
      <Box margin={theme.spacing(2)} width="80vw">
        <Typography variant="h6">BIKE STOCK ({bikeStock.length || 0})</Typography>

        <Grid container spacing={2}>
          {bikeStock &&
            bikeStock.length > 0 &&
            bikeStock.map((container) => (
              <Grid item xs={8} md={3}>
                <ContainerCard {...container} key={container.id} />
              </Grid>
            ))}
        </Grid>
        <Box paddingY={theme.spacing(4)}></Box>

        <Typography variant="h6">SHOPS</Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {stores &&
            stores.length > 0 &&
            stores.map((shop) => (
              <Grid item xs={8} md={4}>
                <ShopCard {...shop} key={shop.id} />{' '}
              </Grid>
            ))}
        </Grid>
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    margin: theme.spacing(2),
  },

  centered: {
    textAlign: 'center',
  },
  grey: {
    color: theme.palette.grey[400],
  },
}))

export default Home
