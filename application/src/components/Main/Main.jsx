import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CityFinder from './CityFinder/CityFinder';
import Favorites from './Favorites/Favorites';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  }));

export default function Main(props) {

    const classes = useStyles();

    return (
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper className={classes.paper}>
                <CityFinder/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper className={classes.paper}>
                <Favorites/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>A place for the hourly weather forecast</Paper>
          </Grid>
        </Grid>
    );
}