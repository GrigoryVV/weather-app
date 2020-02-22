import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Button } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { observer } from 'mobx-react';
import citiesStore from './../../../stores/citiesStore'

const useStyles = makeStyles({
    table: {
      width: '100%',
    },
  });
  

const Favorites = observer(props => {

    const classes = useStyles();

    if (citiesStore.favoritesCities.length === 0) {
        return (
            <Typography variant='h5'>Please add cities to your favorites</Typography>
        )
    }

    return (
        <TableContainer component='div'>
            <Typography variant='h5'>Your favorite cities</Typography>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell align="right">Temperature&nbsp;(&#730;C)</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {citiesStore.favoritesCities.map(city => (
                    <TableRow key={city.city + city.countryCode}>
                    <TableCell component="th" scope="row">
                        {city.city}
                    </TableCell>
                    <TableCell>{city.countryCode}</TableCell>
                    <TableCell align="right">{city.weather.temp}</TableCell>
                    <TableCell align="center">
                        <Button color="secondary" onClick={() => citiesStore.removeCity(city.city, city.countryCode)}>
                            <DeleteRoundedIcon/>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
});

export default Favorites