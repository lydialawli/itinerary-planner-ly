import { AppStore } from './appContext'
import { AppRouter, Routes } from './routes'
import { ErrorBoundary } from './components'
import { AppThemeProvider } from './theme'
import { Provider } from 'react-redux'
import { store } from './interactions/store'
/**
 * Root Application Component
 * @class App
 */
const App = () => {
  return (
    <ErrorBoundary name="App">
      <AppStore>
        <Provider store={store}>
          <AppThemeProvider>
            <AppRouter>
              <Routes />
            </AppRouter>
          </AppThemeProvider>
        </Provider>
      </AppStore>
    </ErrorBoundary>
  )
}

export default App
