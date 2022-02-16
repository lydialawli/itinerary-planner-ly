import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Typography, Grid, Button, Box } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { StoreState, Container, Store } from '../../interactions/reducers/containerReducer'

const MainPaper = (): ReactElement => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const bikeStock = useSelector<StoreState, Container[]>((state) => state.bikeStock)
  const stores = useSelector<StoreState, Store[]>((state) => state.stores)
  console.log(bikeStock, stores)

  const moveContainer = (container: Container, shopId?: string) => {
    dispatch({ type: 'MOVE_TO_STORE', payload: { container, shopId } })
  }

  return (
    <Grid container>
      <Box>
        <Typography variant="h6">BIKE STOCK ({bikeStock.length || 0})</Typography>
        <Paper className={classes.paper}>
          <Grid container direction={'column'}>
            {bikeStock &&
              bikeStock.length > 0 &&
              bikeStock.map((n, i) => (
                <Grid container key={n.id}>
                  <Typography variant="h6">
                    container {i + 1}: {n.name}
                  </Typography>
                  <Button variant="contained" onClick={() => moveContainer(n, 'store_001')}>
                    press me
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Box>
      <Box>
        <Typography variant="h6">SHOPS</Typography>
        <Paper className={classes.paper}>
          <Grid container direction={'column'}>
            {stores &&
              stores.length > 0 &&
              stores.map((shop, i) => (
                <Grid
                  container
                  key={shop.id}
                  alignItems="center"
                  style={{ backgroundColor: shop.isVisited ? 'pink' : undefined }}
                >
                  <Typography variant="h6">
                    store {i + 1}: {shop.name}
                  </Typography>
                  <Typography variant="body1">containers: {shop.containers?.length || 0}</Typography>
                </Grid>
              ))}
          </Grid>
        </Paper>
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

export default MainPaper
