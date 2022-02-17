import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Grid, Box, Card, CardContent, Button, Avatar } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Container } from '../interactions/reducers/containerReducer'
import recipient1 from '../assets/Container-format-1.png'
import recipient5 from '../assets/Container-format-5.png'
import recipient6 from '../assets/Container-format-6.png'
import Confirmation from './Confirmation'
interface ParamTypes {
  shopId: string
}

const ContainerCard = (container: Container): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const recipientSrc = container.format === '1' ? recipient1 : container.format === '5' ? recipient5 : recipient6
  const { shopId } = useParams<ParamTypes>()

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        paddingLeft: theme.spacing(1),
        borderRadius: theme.spacing(1),
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" padding={theme.spacing(2)}>
        <Avatar src={recipientSrc} sizes="30px" />
        <Typography component="div" variant="h5" fontWeight={600} flexShrink={2}>
          {container.name}
        </Typography>
        <Grid item xs={12} md={12} lg={3}>
          <Confirmation title="Where to?" intercept={['onClick']} container={container} shopId={shopId}>
            <Button size="small" disableElevation className={classes.button} variant="contained" onClick={() => {}}>
              Transfer
            </Button>
          </Confirmation>
        </Grid>
      </Grid>
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
  button: { textTransform: 'none' },
}))

export default ContainerCard
