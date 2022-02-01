import { Card, CardContent, CardHeader, Grid } from '@mui/material'

/**
 * Renders "Home" view
 * Main graph sbould be shown here
 * url: /*
 */

const HomeView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Hi, Susan" />
          <CardContent>Here goes the dashboard</CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default HomeView
