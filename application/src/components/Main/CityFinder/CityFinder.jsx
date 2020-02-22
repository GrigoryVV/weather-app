import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CountrySelect from './CountrySelect/CountrySelect';
import citiesStore from './../../../stores/citiesStore';
import { observer } from 'mobx-react';

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

    const handleSubmit = () => {
        citiesStore.getCityWeather();
        citiesStore.changeCityName('');
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Add city to your favorites
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
                <CountrySelect/>
                <TextField 
                    id="city" 
                    label="Enter a city name" 
                    variant="outlined" 
                    value={citiesStore.cityName}
                    onChange={(e) => citiesStore.changeCityName(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add to favorites
                </Button>
            </form>
        </div>
    );
});


export default CityFinder;