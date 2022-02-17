import React, { ReactElement, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Grid, Card, Button, Avatar } from '@mui/material'
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

type ContainerCardProps = {
  container: Container
  handleSelect: (containerId: string) => void
  selectedContainers?: string[]
}

const ContainerCard = ({ container, handleSelect, selectedContainers }: ContainerCardProps): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const recipientSrc = container.format === '1' ? recipient1 : container.format === '5' ? recipient5 : recipient6
  const { shopId } = useParams<ParamTypes>()
  const isSelected = selectedContainers?.includes(container.id)

  return (
    <Card
      onClick={() => {
        handleSelect(container.id)
      }}
      elevation={0}
      sx={{
        display: 'flex',
        paddingLeft: theme.spacing(1),
        borderRadius: theme.spacing(1),
        borderColor: theme.palette.secondary.main,
        borderStyle: isSelected ? 'solid' : 'none',
        ':hover': {
          boxShadow: theme.shadows[20],
        },
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" padding={theme.spacing(2)}>
        <Grid container md={12} lg={8} alignItems="center">
          <Avatar src={recipientSrc} sizes="30px" />
          <Typography marginLeft={theme.spacing(1)} component="div" variant="h5" fontWeight={600} flexShrink={2}>
            {container.name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <Confirmation title="Where to?" intercept={['onClick']} container={container} shopId={shopId}>
            <Button
              disabled={selectedContainers && selectedContainers.length > 0}
              size="small"
              disableElevation
              className={classes.button}
              variant="contained"
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                if (event.stopPropagation) {
                  event.stopPropagation()
                }
              }}
            >
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
