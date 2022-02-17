import React, { ReactElement } from 'react'
import { Typography, Grid, Card, Button, Avatar } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Container } from '../interactions/reducers/containerReducer'
import recipient1 from '../assets/Container-format-1.png'
import recipient5 from '../assets/Container-format-5.png'
import recipient6 from '../assets/Container-format-6.png'
import Confirmation from './Confirmation'

type ContainerCardProps = {
  container: Container
  handleSelect: (containerId: string) => void
  selectedContainers: string[]
}

const ContainerCard = ({ container, handleSelect, selectedContainers }: ContainerCardProps): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  const recipientSrc = container.format === '1' ? recipient1 : container.format === '5' ? recipient5 : recipient6
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
        opacity: isSelected ? '0.6' : '1',
        borderStyle: isSelected ? 'solid' : 'none',
        ':hover': {
          boxShadow: theme.shadows[20],
        },
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" padding={theme.spacing(2)}>
        <Grid container item xs={8} md={12} lg={8} alignItems="center">
          <Avatar src={recipientSrc} sizes="30px" />
          <Grid item xs={8}>
            <Typography
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              marginLeft={theme.spacing(1)}
              component="div"
              variant="h5"
              fontWeight={600}
              flexShrink={2}
            >
              {container.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} sm={12} md={12} lg={3}>
          <Confirmation title="Where to?" intercept={['onClick']} containers={selectedContainers || []}>
            <Button
              disabled={selectedContainers && selectedContainers.length > 0}
              size="small"
              disableElevation
              className={classes.button}
              variant="contained"
              onClick={() => {}}
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
  button: { textTransform: 'none' },
}))

export default ContainerCard
