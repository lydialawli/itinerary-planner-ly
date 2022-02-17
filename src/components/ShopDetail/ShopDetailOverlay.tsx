import React, { ReactElement, useState } from 'react'
import Lottie from 'react-lottie-player'
import { Store } from '../../interactions/reducers/containerReducer'
import { useMediaQuery, Drawer, Typography, Box, Divider, Grid, Button, IconButton } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import ContainerCard from '../ContainerCard'
import LottieAstronaut from '../../assets/lottieAstronaut.json'
import HeaderOverlay from './HeaderOverlay'
import { CheckBoxOutlineBlank as Checkbox } from '@mui/icons-material'
import { CheckBoxRounded as CheckboxChecked } from '@mui/icons-material'
import { DeliveryDining } from '@mui/icons-material'
import Confirmation from '../../components/Confirmation'

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

  const handleSelect = (containerId: string) => {
    if (selectedContainers.includes(containerId)) {
      setSelectedContainers((sel) => sel.filter((s) => s !== containerId))
    } else {
      setSelectedContainers((sel) => [...sel, containerId])
    }
  }
  const handleSelectAll = () => {
    if (selectedContainers.length === shop.containers.length) {
      setSelectedContainers([])
    } else {
      const containerIds = shop.containers.map((c) => c.id)
      setSelectedContainers(containerIds)
    }
  }

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
          {shop.containers.length > 0 && (
            <Grid container justifyContent="space-between">
              <Typography variant="h6" paddingBottom={theme.spacing(2)}>
                Containers ({shop.containers.length}):
              </Typography>

              <Grid item marginBottom={theme.spacing(2)}>
                <Confirmation title="Where to?" intercept={['onClick']} containers={selectedContainers || []}>
                  <Button
                    disabled={selectedContainers.length === 0}
                    size="small"
                    disableElevation
                    className={classes.button}
                    variant="contained"
                    onClick={() => {
                      setSelectedContainers([])
                    }}
                  >
                    <DeliveryDining /> &nbsp; transfer selected
                  </Button>
                </Confirmation>

                <IconButton size="small" onClick={handleSelectAll}>
                  <Typography variant="body1" color={theme.palette.grey[400]} marginRight={theme.spacing(1)}>
                    Select all
                  </Typography>
                  {selectedContainers.length === shop.containers.length ? (
                    <CheckboxChecked color="secondary" />
                  ) : (
                    <Checkbox color="secondary" />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          )}
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
                <Box padding={theme.spacing(1)} key={container.id}>
                  <ContainerCard
                    container={container}
                    key={container.id}
                    selectedContainers={selectedContainers}
                    handleSelect={handleSelect}
                  />
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
  button: {
    textTransform: 'none',
    marginRight: theme.spacing(1),
  },
}))

export default ShopOverlay
