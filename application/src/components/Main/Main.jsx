import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, LinearProgress } from '@material-ui/core';
import CityFinder from './CityFinder/CityFinder';
import Favorites from './Favorites/Favorites';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import { StoreContext } from '../..';
import { observer } from 'mobx-react';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  }));

const Main = observer((props) => {

    const classes = useStyles();
    const store = React.useContext(StoreContext);
    const [forecastCity, setForecastCity] = React.useState('');

    return (
        <Grid container spacing={3}>
          {store.isFetching &&
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          }
          {store.errorMessage &&
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" color="secondary">{store.errorMessage}</Typography>
              </Paper>
            </Grid>
          }
          <Grid item xs={12} md={5}>
            <Paper className={classes.paper}>
              <CityFinder/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper className={classes.paper}>
              <Favorites setForecastCity={setForecastCity} forecastCity={forecastCity}/>
            </Paper>
          </Grid>
          {store.hourlyWeather.length > 0 &&
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <HourlyForecast forecastCity={forecastCity}/>
              </Paper>
            </Grid>
          }
        </Grid>
    );
});

export default Main;