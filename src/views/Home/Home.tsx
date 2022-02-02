import { Grid, Typography } from '@mui/material'
import MainPaper from './MainPaper'

const HomeView = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={11} md={8} lg={6}>
        <Typography variant="h2">Hi, Susan</Typography>
        <MainPaper />
        <Grid container alignItems="center" alignContent="flex-end">
          <Typography variant="h5">This is your portfolio from Jan 2017 to Jan 2021</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomeView
