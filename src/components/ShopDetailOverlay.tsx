import React, { ReactElement } from 'react'
import { Store } from '../interactions/reducers/containerReducer'
import {
  useMediaQuery,
  Paper,
  Link,
  Drawer,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
  Divider,
} from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import storePng from '../assets/store-icon.png'
import recipient1 from '../assets/Container-format-1.png'
import ContainerCard from '../components/ContainerCard'

const transitionDuration = 1000

type ShopOverlayProps = {
  shop: Store
  onClose: () => void
}

const ShopOverlay = ({ shop, onClose }: ShopOverlayProps): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true })

  return (
    <Drawer
      variant={'temporary'}
      transitionDuration={{
        enter: transitionDuration,
        exit: transitionDuration,
      }}
      elevation={2}
      className={classes.drawer}
      anchor="right"
      onClose={onClose}
      open={true}
    >
      <div className={classes.root} style={{ minWidth: isDesktop ? '40vw' : 300 }}>
        <Typography variant="h6">{shop.name}</Typography>
        <Divider />

        <Typography variant="h6">containers ({shop.containers.length}):</Typography>
        {shop.containers.map((container) => (
          <ContainerCard {...container} key={container.id} />
        ))}
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
}))

export default ShopOverlay
