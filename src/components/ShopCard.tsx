import React, { ReactElement } from 'react'
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom'
import { Link, Typography, Grid, Box, Card, CardContent, Avatar, Chip, Tooltip } from '@mui/material'
import { CheckCircle as CheckIcon } from '@mui/icons-material'

import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Store, Visited } from '../interactions/reducers/containerReducer'
import storePng from '../assets/store-icon.png'
import ShopOverlay from './ShopDetail/ShopDetailOverlay'
import recipient1 from '../assets/Container-format-1.png'
import recipient5 from '../assets/Container-format-5.png'
import recipient6 from '../assets/Container-format-6.png'

interface ParamTypes {
  shopId: string
}

const ShopCard = (shop: Store): ReactElement => {
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const { shopId } = useParams<ParamTypes>()

  const getRecipient = (format: string) => {
    return format === '1' ? recipient1 : format === '5' ? recipient5 : recipient6
  }

  return (
    <>
      <Link to={`/dashboard/${shop.id}`} component={RouterLink} underline="none">
        <Card
          elevation={0}
          sx={{
            display: 'flex',
          }}
        >
          <Box justifyContent="center" height="300px" width="100%">
            <Grid
              container
              bgcolor="white"
              height="50%"
              style={{
                background: `url("${shop.url || storePng}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              }}
            >
              <Tooltip title={shop.isVisited} arrow>
                <Grid item padding={theme.spacing(1)}>
                  <CheckIcon color={shop.isVisited === Visited.isVisited ? 'success' : 'disabled'} />
                </Grid>
              </Tooltip>
            </Grid>

            <CardContent sx={{ flex: '1 0 auto', textAlign: 'center', alignItems: 'center' }}>
              <Typography component="div" variant="h4" fontWeight={600}>
                {shop.name}
              </Typography>
              <Grid container alignItems="center" justifyContent="space-evenly">
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {shop.id}
                </Typography>
              </Grid>
            </CardContent>
            <Grid container justifyContent="center">
              {shop.containers.length > 0 &&
                shop.containers.map((c) => (
                  <Grid item marginX={theme.spacing(0.2)}>
                    <Chip
                      className={classes.chip}
                      size="small"
                      key={c.name}
                      label={c.name}
                      avatar={<Avatar src={getRecipient(c.format)} />}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Card>
      </Link>
      {!!shopId && shopId === shop.id && <ShopOverlay shop={shop} onClose={() => history.push('/dashboard')} />}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    color: theme.palette.grey[500],
    backgroundColor: theme.palette.mode === 'light' ? '#F1F2F6' : undefined,
  },
}))

export default ShopCard
