import { AppStore } from './appContext'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Welcome, About, NotFound, Home } from './views'
import { PrivateLayout } from './routes/Layout'

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
            <BrowserRouter>
              <PrivateLayout>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/welcome" component={Welcome} />
                  <Route path="/about" component={About} />,
                  <Route component={NotFound} />
                </Switch>
              </PrivateLayout>
            </BrowserRouter>
          </AppThemeProvider>
        </Provider>
      </AppStore>
    </ErrorBoundary>
  )
}

export default App
