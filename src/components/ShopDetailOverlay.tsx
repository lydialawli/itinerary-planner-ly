import React, { ReactElement } from 'react'
import { Store } from '../interactions/reducers/containerReducer'
import { useMediaQuery, Drawer, Typography, Grid, Box, Divider, IconButton } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Close as CloseIcon } from '@mui/icons-material'
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
      <Box minWidth={isDesktop ? '40vw' : '80vw'}>
        <Grid
          container
          paddingTop={theme.spacing(12)}
          paddingBottom={theme.spacing(2)}
          paddingLeft={theme.spacing(2)}
          alignItems="center"
          justifyContent="flex-start"
          style={{
            background: `url("${shop.url}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography paddingLeft={theme.spacing(2)} variant="h3">
            {shop.name}
          </Typography>
        </Grid>

        <Box paddingBottom={theme.spacing(3)}>
          <Divider />
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
              <Box textAlign="center" paddingTop={theme.spacing(4)}>
                <Typography color={theme.palette.grey[400]} variant="body2">
                  No containers in this store
                </Typography>
              </Box>
            ) : (
              shop.containers.map((container) => (
                <Box padding={theme.spacing(1)}>
                  <ContainerCard {...container} key={container.id} />
                </Box>
              ))
            )}
          </Box>{' '}
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
