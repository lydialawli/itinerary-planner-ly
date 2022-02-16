import React, { ReactElement } from 'react'
import { Store } from '../interactions/reducers/containerReducer'
import { useMediaQuery, Paper, Link, Drawer, Typography, Grid, Box, Divider, IconButton } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Close as CloseIcon } from '@mui/icons-material'
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
      <Box padding={theme.spacing(2)} minWidth={isDesktop ? '40vw' : 300}>
        <Box padding={theme.spacing(1)}>
          <Grid container alignItems="center" justifyContent="flex-start">
            <IconButton>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography variant="h4">{shop.name}</Typography>
          </Grid>
        </Box>
        <Divider />

        <Typography variant="h6">Containers ({shop.containers.length}):</Typography>
        <Box padding={theme.spacing(2)} bgcolor={theme.palette.background.default}>
          {shop.containers.map((container) => (
            <Box padding={theme.spacing(1)}>
              <ContainerCard {...container} key={container.id} />
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },
}))

export default ShopOverlay
