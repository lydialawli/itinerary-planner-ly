import React, { ReactElement } from 'react'
import Lottie from 'react-lottie-player'
import { Store } from '../interactions/reducers/containerReducer'
import { useMediaQuery, Drawer, Typography, Grid, Box, Divider, IconButton, Paper } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Close as CloseIcon } from '@mui/icons-material'
import ContainerCard from '../components/ContainerCard'
import LottieAstronaut from '../assets/lottieAstronaut.json'

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
      <Box minWidth={isDesktop ? '40vw' : '80vw'}>
        <Grid
          container
          paddingTop={theme.spacing(12)}
          alignItems="center"
          justifyContent="flex-start"
          style={{
            background: `url("${shop.url}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        >
          <Grid
            className={classes.whiteGradient}
            container
            paddingLeft={theme.spacing(2)}
            bgcolor="white"
            paddingY={theme.spacing(2)}
          >
            <IconButton onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <Typography paddingLeft={theme.spacing(2)} variant="h3" fontWeight={700}>
              {shop.name}
            </Typography>
          </Grid>
        </Grid>

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
                  <ContainerCard {...container} key={container.id} />
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
