/**
 * Material UI theme
 * See for details: https://material-ui.com/customization/default-theme/?expand-path=$.palette
 * Martial Color tool: https://material.io/resources/color
 */
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, ThemeOptions } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppStore } from './appContext/AppStore'
import ThemeShadows from './ThemeShadows'

// Note: Added by CodeMod when migrate form MUI 4.x to 5x
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

/**
 * Material UI theme "front" colors, "back" colors are different for Light and Dark modes
 * Material Color Tool: https://material.io/resources/color/#!/?view.left=0&view.right=0&secondary.color=EF9A9A&primary.color=64B5F6
 */
const FRONT_COLORS = {
  primary: {
    main: '#F8D348',
    light: '#FDF2BA',
    dark: '#DEB313',
    contrastText: '#0e0924',
  },
  secondary: {
    main: '#F50057',
    contrastText: '#000000',
  },
}

const TYPOGRAPHY = {
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '1.8rem',
    },
    h4: {
      fontSize: '1.6rem',
    },
    h5: {
      fontSize: '1.3rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
    fontWeightRegular: 400,
    fontWeightLight: 300,
    fontWeightBold: 900,
    fontWeightMedium: 700,
    fontFamily: 'Lato',
  },
}

const GREY_COLORS = {
  50: '#F7F9FF',
  100: '#EEF2F8',
  200: '#E6EAF0',
  300: '#D3D9E1',
  400: '#BDC4CD',
  500: '#A1A8B0',
  600: '#828994',
  700: '#626871',
  800: '#474C54',
  900: '#1D2025',
  A100: '#D5D5D5',
  A200: '#AAAAAA',
  A400: '#303030',
  A700: '#616161',
}

const SUCCESS_COLORS = {
  success: { main: '#57D582', light: '#6AE99C', dark: '#30A46C' },
}
/**
 * Material UI theme config for "Light Mode"
 */
const LIGHT_THEME: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#F6F9FF', // Gray 100 - Background of "Paper" based component
      paper: '#FFFFFF',
    },
    ...FRONT_COLORS,
    ...GREY_COLORS,
    ...SUCCESS_COLORS,
  },
  ...TYPOGRAPHY,
  shape: {
    borderRadius: 10,
  },
  spacing: 0,
  shadows: ThemeShadows,
}

/**
 * Material UI theme config for "Dark Mode"
 */
const DARK_THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      paper: '#2E3035', // Gray 800 - Background of "Paper" based component
      default: '#1C1C1D',
    },
    ...FRONT_COLORS,
    ...GREY_COLORS,
    ...SUCCESS_COLORS,
  },
  ...TYPOGRAPHY,
  shape: {
    borderRadius: 10,
  },
  shadows: ThemeShadows,

  spacing: 0,
}

/**
 * Material UI Provider with Light and Dark themes depending on global "state.darkMode"
 */
const AppThemeProvider: React.FunctionComponent = ({ children }) => {
  const [state] = useAppStore()
  // const theme = useMemo(() => (state.darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME)));
  const theme = state.darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline /* Material UI Styles */ />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export { AppThemeProvider, LIGHT_THEME, DARK_THEME }
