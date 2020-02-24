import React, { useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from './CountrySelect/CountrySelect';
import { observer } from 'mobx-react';
import { StoreContext } from '../../..';


const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2),
            width: 300,
        },
    },
  }));

const CityFinder = observer((props) => {

    const classes = useStyles();
    const store = React.useContext(StoreContext)
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const countryCode = country ? country.split(', ')[1] : '';

        store.getCityWeather(cityName, countryCode);
        setCityName('');
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Add city to your favorites
            </Typography>
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                <CountrySelect country={country} setCountry={setCountry}/>
                <TextField 
                    id="city" 
                    label="Enter a city name" 
                    variant="outlined" 
                    required={true}
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Add to favorites
                </Button>
            </form>
        </div>
    );
});


export default CityFinder;