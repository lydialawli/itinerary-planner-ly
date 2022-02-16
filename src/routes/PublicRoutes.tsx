import { Route, Switch } from 'react-router-dom'
import AuthRoutes from '../pages/Auth'
import { About, NotFound } from '../pages'
import { PublicLayout } from './Layout'
import LoginEmailView from '../pages/Auth/Login/Email'

/**
 * List of routes available only for anonymous users
 * Also renders the "Public Layout" composition
 */
const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Switch>
        <Route path="/" exact component={LoginEmailView} />
        <Route path="/auth" component={AuthRoutes} />
        <Route path="/about" component={About} />,
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  )
}

export default PublicRoutes
