import { Grid, Typography } from '@mui/material'
import MainPaper from './MainPaper'

const HomeView = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={11} md={8} lg={6}>
        <Typography variant="h2">Hey</Typography>
        <MainPaper />
        <Grid container alignItems="center" alignContent="flex-end"></Grid>
      </Grid>
    </Grid>
  )
}

export default HomeView
