import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { Theme, useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import { Grid, useMediaQuery } from '@mui/material'
import { useAppStore } from '../../appContext'
import TopBar from '../../components/TopBar'
import { ErrorBoundary } from '../../components'

const TITLE_PRIVATE = `Itinerary Planner`

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh', // Full screen height
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  header: {},
  shiftContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1, // Takes all possible space
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  footer: {},
}))

/**
 * Centralized place in the App to update document.title
 */

function updateDocumentTitle(title = '') {
  if (title) {
    document.title = `${title} - ${TITLE_PRIVATE}`
  } else {
    document.title = TITLE_PRIVATE
  }
  return document.title
}

/**
 * Renders "Private Layout" composition
 */
const PrivateLayout: React.FC = ({ children }) => {
  const [state] = useAppStore()
  const [openSideBar, setOpenSideBar] = useState(false)
  const theme = useTheme()
  const classes = useStyles()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true })
  const history = useHistory()

  const handleLogoClick = useCallback(() => {
    // Navigate to '/' when clicking on Logo/Menu icon when the SideBar is already visible
    history.push('/')
  }, [history])

  const handleSideBarOpen = useCallback(() => {
    if (!openSideBar) setOpenSideBar(true)
  }, [openSideBar])

  const classRoot = clsx({
    [classes.root]: true,
    [classes.shiftContent]: isDesktop,
  })
  const title = updateDocumentTitle()
  const shouldOpenSideBar = isDesktop ? true : openSideBar

  return (
    <Grid container direction="column" className={classRoot}>
      <Grid item className={classes.header} component="header">
        <TopBar
          isAuthenticated={state.isAuthenticated}
          title={title}
          onMenu={shouldOpenSideBar ? handleLogoClick : handleSideBarOpen}
        />
      </Grid>

      <Grid className={classes.content} component="main">
        <ErrorBoundary name="Content">{children}</ErrorBoundary>
      </Grid>
    </Grid>
  )
}

export default PrivateLayout
