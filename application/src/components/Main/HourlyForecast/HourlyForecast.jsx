import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { observer } from 'mobx-react';
import { StoreContext } from '../../..';


const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  table: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
});


const HourlyForecast = observer(props => {

  const classes = useStyles();

  const store = React.useContext(StoreContext)

  return (
    <TableContainer className={classes.root} component='div'>
      <IconButton className={classes.closeButton} color="secondary" onClick={() => store.clearHourlyWeather()}>
        <CloseIcon />
      </IconButton>
      <Typography variant='h5'>The weather forecast in {props.forecastCity}.</Typography>
      <Table className={classes.table} aria-label="hourly forecast">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Temperature&nbsp;(&#730;C)</TableCell>
            <TableCell align="right">Conditions</TableCell>
            <TableCell align="right">Pressure (hpa)</TableCell>
            <TableCell align="right">Humidity (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.hourlyWeather.map(hour => (
            <TableRow key={hour.dateTime}>
              <TableCell component="th" scope="row">
                {hour.dateTime}
              </TableCell>
              <TableCell align="right">{hour.temp}</TableCell>
              <TableCell align="right">{hour.weatherDescr}</TableCell>
              <TableCell align="right">{hour.pressure}</TableCell>
              <TableCell align="right">{hour.humidity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
});

export default HourlyForecast