import { Card, CardHeader, Grid, Typography } from '@mui/material'
import MainPaper from './MainPaper'
/**
 * Renders "About" view
 * url: /about/*
 */
const HomeView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Typography variant="h3">Hi, Susan</Typography>
        <MainPaper />
      </Grid>
    </Grid>
  )
}

export default HomeView
