import clsx from 'clsx'
import { useCallback } from 'react'
import { Theme, AppBar, Toolbar, Typography, Grid, Tooltip, Switch } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { DeliveryDiningTwoTone as DeliveryIcon } from '@mui/icons-material'
import { useAppStore } from '../../appContext/AppStore'
import { Brightness1, Nightlight } from '@mui/icons-material'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // boxShadow: 'none', // Uncomment to hide shadow
    backgroundColor: 'black',
    color: '#fff',
    minWidth: '20rem',
    // backgroundColor: theme.palette.primary.main, // Uncomment if you also need colored background in dark mode
  },
  toolbar: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  logo: {
    height: theme.spacing(4),
  },
  title: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexGrow: 1,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  buttons: {},
}))

/**
 * Renders TopBar composition
 */
interface Props {
  className?: string
  title?: string
  isAuthenticated?: boolean
  onMenu?: () => void
  onNotifications?: () => void
}
const TopBar: React.FC<Props> = ({
  className,
  title = '',
  isAuthenticated,
  onMenu,
  onNotifications,
  ...restOfProps
}) => {
  const classes = useStyles()
  const [state, dispatch] = useAppStore()

  const handleSwitchDarkMode = useCallback(() => {
    dispatch({
      type: 'DARK_MODE',
      darkMode: !state.darkMode,
      payload: !state.darkMode,
    })
  }, [state, dispatch])

  return (
    <AppBar {...restOfProps} className={clsx(classes.root, className)} component="div">
      <Toolbar className={classes.toolbar} disableGutters>
        <Grid container alignItems="center">
          <DeliveryIcon color="primary" />
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Grid>

        <div className={classes.buttons}>
          <Tooltip title={state.darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}>
            <Grid container width={150} alignItems="center">
              <Brightness1 color={'primary'} />
              <Switch checked={state.darkMode} color="secondary" onChange={handleSwitchDarkMode} />
              <Nightlight />
            </Grid>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
