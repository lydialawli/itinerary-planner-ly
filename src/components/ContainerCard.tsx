import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, Typography, Grid, Box, Card, CardContent, CardMedia, Button, Avatar } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Container } from '../interactions/reducers/containerReducer'
import recipient1 from '../assets/Container-format-1.png'
import recipient5 from '../assets/Container-format-5.png'
import recipient6 from '../assets/Container-format-6.png'

const ContainerCard = (container: Container): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const recipientSrc = container.format === '1' ? recipient1 : container.format === '5' ? recipient5 : recipient6
  const moveContainer = (container: Container, shopId?: string) => {
    dispatch({ type: 'MOVE_TO_STORE', payload: { container, shopId } })
  }

  return (
    <Card elevation={0} sx={{ display: 'flex', padding: theme.spacing(1) }}>
      <Box sx={{ display: 'flex' }} justifyContent="center" alignItems="center">
        <Avatar src={recipientSrc} sizes="30px" />
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
