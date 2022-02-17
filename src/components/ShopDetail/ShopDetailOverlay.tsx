import React, { ReactElement, useState } from 'react'
import Lottie from 'react-lottie-player'
import { Store } from '../../interactions/reducers/containerReducer'
import { useMediaQuery, Drawer, Typography, Grid, Box, Divider, IconButton } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Close as CloseIcon } from '@mui/icons-material'
import ContainerCard from '../ContainerCard'
import LottieAstronaut from '../../assets/lottieAstronaut.json'
import HeaderOverlay from './HeaderOverlay'

const transitionDuration = 1000

type ShopOverlayProps = {
  shop: Store
  onClose: () => void
}

const ShopOverlay = ({ shop, onClose }: ShopOverlayProps): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true })
  const [selectedContainers, setSelectedContainers] = useState<string[]>([])

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
      <Box minWidth={isDesktop ? '40vw' : '80vw'}>
        <HeaderOverlay onClose={onClose} shop={shop} />
        <Box paddingBottom={theme.spacing(3)}>
          <Divider color={theme.palette.background.paper} />
        </Box>
        <Box paddingX={theme.spacing(3)}>
          <Typography variant="h6" paddingBottom={theme.spacing(2)}>
            Containers ({shop.containers.length}):
          </Typography>
          <Box
            minHeight="50vh"
            padding={theme.spacing(2)}
            bgcolor={theme.palette.background.default}
            borderRadius={theme.spacing(1)}
          >
            {shop.containers.length === 0 ? (
              <Box textAlign="center" justifyContent="space-between">
                <Typography paddingY={theme.spacing(4)} color={theme.palette.grey[400]} variant="body1">
                  No containers found in this store
                </Typography>
                <Lottie loop animationData={LottieAstronaut} play />
              </Box>
            ) : (
              shop.containers.map((container) => (
                <Box padding={theme.spacing(1)}>
                  <ContainerCard container={container} key={container.id} handleSelect={console.log} />
                </Box>
              ))
            )}
          </Box>
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
  whiteGradient: {
    background: `linear-gradient(0deg, ${theme.palette.background.paper} 0%, rgba(255,255,255,0) 100%)`,
  },
}))

export default ShopOverlay
