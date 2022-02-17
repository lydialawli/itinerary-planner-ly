import React, { ReactElement } from 'react'
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom'
import { Paper, Link, Typography, Grid, Box, Card, CardContent, CardMedia, Avatar, Chip } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Store } from '../interactions/reducers/containerReducer'
import storePng from '../assets/store-icon.png'
import ShopOverlay from './ShopDetailOverlay'
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
        <Card elevation={0} sx={{ display: 'flex', padding: theme.spacing(1) }}>
          <Box justifyContent="center">
            <CardMedia component="img" sx={{ width: 60 }} image={storePng} alt="shop" />
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {shop.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {shop.isVisited}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {shop.id}
              </Typography>
              <Box>
                {shop.containers.length > 0 &&
                  shop.containers.map((c) => (
                    <Chip size="small" key={c.name} label={c.name} avatar={<Avatar src={getRecipient(c.format)} />} />
                  ))}
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Link>
      {!!shopId && shopId === shop.id && <ShopOverlay shop={shop} onClose={() => history.push('/dashboard')} />}
    </>
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

export default ShopCard
