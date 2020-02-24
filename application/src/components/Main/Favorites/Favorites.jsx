import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { observer } from 'mobx-react';
import { StoreContext } from '../../..';


const useStyles = makeStyles({
    table: {
        width: '100%',
    },
    tableRow: {
        cursor: 'pointer',
    }
});


const Favorites = observer(props => {

    const classes = useStyles();
    const store = React.useContext(StoreContext);

    const handleRowClick = (city, countryCode) => {
        const cityString = `${city}, ${countryCode}`;
        props.setForecastCity(cityString);

        store.getHourlyWeather(city, countryCode);
    }

    const handleCityRemove = (e, city, countryCode) => {
        e.stopPropagation();
        store.removeCity(city, countryCode);

        const cityString = `${city}, ${countryCode}`;
        if (props.forecastCity === cityString) {
            store.clearHourlyWeather();
        }
    }

    if (store.favoritesCities.length === 0) {
        return (
            <Typography variant='h5'>Please add cities to your favorite list</Typography>
        )
    }

    return (
        <TableContainer component='div'>
            <Typography variant='h5'>Your favorite cities</Typography>
            <Table className={classes.table} aria-label="favorite cities">
                <TableHead>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell align="right">Temperature&nbsp;(&#730;C)</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.favoritesCities.map(city => (
                        <TableRow key={city.city + city.countryCode} 
                            onClick={() => handleRowClick(city.city, city.countryCode)}
                            className={classes.tableRow}
                            hover={true}
                        >
                            <TableCell component="th" scope="row">
                                {city.city}
                            </TableCell>
                            <TableCell>{city.countryCode}</TableCell>
                            <TableCell align="right">{city.weather.temp}</TableCell>
                            <TableCell align="center">
                                <IconButton color="secondary"
                                    area-label="delete"
                                    onClick={(e) => handleCityRemove(e, city.city, city.countryCode)}>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
});

export default Favorites