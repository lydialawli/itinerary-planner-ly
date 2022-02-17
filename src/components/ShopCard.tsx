import React, { ReactElement, useState } from 'react'
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom'
import {
  Paper,
  Link,
  Typography,
  Grid,
  ImageListItem,
  Box,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
} from '@mui/material'
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
        <Card
          elevation={0}
          sx={{
            display: 'flex',
            ':hover': {
              boxShadow: theme.shadows[20],
            },
          }}
        >
          <Box justifyContent="center" height="300px">
            <ImageListItem key={shop.url}>
              <img
                src={`${shop.url || storePng}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${shop.url || storePng}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={shop.name}
                loading="lazy"
              />
            </ImageListItem>
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'center', alignItems: 'center' }}>
              <Typography component="div" variant="h4">
                {shop.name}
              </Typography>
              <Grid container alignItems="center" justifyContent="space-evenly">
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {shop.isVisited}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {shop.id}
                </Typography>
              </Grid>
            </CardContent>
            <Box justifyContent="center">
              {shop.containers.length > 0 &&
                shop.containers.map((c) => (
                  <Chip size="small" key={c.name} label={c.name} avatar={<Avatar src={getRecipient(c.format)} />} />
                ))}
            </Box>
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
