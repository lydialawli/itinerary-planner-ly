import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Typography, Grid, Box, Card, CardContent, CardMedia, Button } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Container } from '../interactions/reducers/containerReducer'
import recipient1 from '../assets/Container-format-1.png'

const ContainerCard = (container: Container): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const moveContainer = (container: Container, shopId?: string) => {
    dispatch({ type: 'MOVE_TO_STORE', payload: { container, shopId } })
  }

  return (
    <Card elevation={0} sx={{ display: 'flex', padding: theme.spacing(1) }}>
      <Box sx={{ display: 'flex' }}>
        <CardMedia component="img" sx={{ width: 20 }} image={recipient1} alt="shop" />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {container.name}
          </Typography>
          <Button variant="contained" onClick={() => moveContainer(container, 'store_001')}>
            press me
          </Button>
        </CardContent>
      </Box>
    </Card>
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

export default ContainerCard
