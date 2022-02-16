import React, { ReactElement } from 'react'
import { Paper, Typography, Grid } from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'

const MainPaper = (): ReactElement => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Typography variant="h6">hi</Typography>
      </Grid>
    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    margin: theme.spacing(2),
  },
  centered: {
    textAlign: 'center',
  },
  grey: {
    color: theme.palette.grey[400],
  },
}))

export default MainPaper
