import React, { ReactElement } from 'react'

import { Store } from '../../interactions/reducers/containerReducer'
import { Typography, Grid, Box, Divider, IconButton } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Close as CloseIcon } from '@mui/icons-material'

type ShopOverlayProps = {
  shop: Store
  onClose: () => void
}

const HeaderOverlay = ({ shop, onClose }: ShopOverlayProps): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()

  return (
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
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  whiteGradient: {
    background: `linear-gradient(0deg, ${theme.palette.background.paper} 0%, rgba(255,255,255,0) 100%)`,
  },
}))

export default HeaderOverlay
