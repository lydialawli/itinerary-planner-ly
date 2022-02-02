import { Card, CardHeader, Grid, Typography } from '@mui/material'
import MainPaper from './MainPaper'
/**
 * Renders "About" view
 * url: /about/*
 */
const HomeView = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={11} md={8} lg={6}>
        <Typography variant="h3">Hi, Susan</Typography>
        <MainPaper />
      </Grid>
    </Grid>
  )
}

export default HomeView
