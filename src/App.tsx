import { AppStore } from './appContext'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { Welcome, About, NotFound, Home } from './pages'
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
                  <Route exact path="/">
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route path="/dashboard/:shopId?" exact component={Home} />
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
