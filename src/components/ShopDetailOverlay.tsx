import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { StoreState, Container, Store } from '../interactions/reducers/containerReducer'
import { Paper, Link, Drawer, Typography, Grid, Box, Card, CardContent, CardMedia, Avatar, Chip } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import storePng from '../assets/store-icon.png'
import recipient1 from '../assets/Container-format-1.png'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

type ShopOverlayProps = {
  shop: Store
  onClose: () => void
}
const ShopOverlay = ({ shop, onClose }: ShopOverlayProps): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer anchor="right" onClose={onClose} open={true}>
      <Typography variant="h6">SHOPS</Typography>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
  },
  grey: {
    color: theme.palette.grey[400],
  },
}))

export default ShopOverlay
