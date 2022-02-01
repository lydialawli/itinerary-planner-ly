import { Card, CardHeader, Grid } from '@mui/material'
import MainPaper from './MainPaper'
/**
 * Renders "About" view
 * url: /about/*
 */
const HomeView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Hi, Susan" />
          <MainPaper />
        </Card>
      </Grid>
    </Grid>
  )
}

export default HomeView
