import { observable, action, configure, decorate } from 'mobx';

import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const weatherAPI = {
    getWeather(city, countryCode) {
        return client.query({
            query: gql`
              {
                getWeather(city: "${city}", countryCode: "${countryCode}") {
                    name
                    sys {
                      country
                    }
                    main {
                      temp_c
                    }
                }
              }
            `
        });
    },
    getHourlyForecast(city, countryCode) {
        return client.query({
            query: gql`
              {
                getForecast(city: "${city}", countryCode: "${countryCode}") {
                    list {
                        dt
                        main {
                            temp_c
                            pressure
                            humidity
                        }
                        weather {
                            description
                        }
                    }
                }
              }
            `
        });
    },
};


configure( {enforceAction: "observed"} );

class WeatherStore {
    favoritesCities = [];
    hourlyWeather = [];
    errorMessage = '';
    isFetching = false;

    async getCityWeather(city, countryCode) {
        this.setIsFetching(true);
        try {
            const result = await weatherAPI.getWeather(city, countryCode);
            const cityData = result.data.getWeather.name;
            const countryCodeData = result.data.getWeather.sys.country;
            const tempData = result.data.getWeather.main.temp_c;
            this.setCityWeather(cityData, countryCodeData, tempData);
        } catch(err) {
            this.popError(err.message);
        }
        this.setIsFetching(false);
    }

    setCityWeather(city, countryCode, temp) {
        if (this.favoritesCities.findIndex(item => item.city === city && item.countryCode === countryCode) === -1) {
            this.favoritesCities.push({
                city,
                countryCode,
                weather: {
                    temp,
                },
            });
        } else {
            this.popError("This city is already in your favorite list!");
        }
    }

    async getHourlyWeather(city, countryCode) {
        this.setIsFetching(true);
        try {
            const result = await weatherAPI.getHourlyForecast(city, countryCode);
            const weatherData = result.data.getForecast.list;
            this.setHourlyWeather(weatherData);
        } catch(err) {
            this.popError(err.message);
        }
        this.setIsFetching(false);
    }

    setHourlyWeather(weatherData) {
        this.hourlyWeather = weatherData.map(item => {
            return {
                dateTime: (new Date(item.dt * 1000)).toLocaleString(),
                temp: item.main.temp_c,
                pressure: item.main.pressure,
                humidity: item.main.humidity,
                weatherDescr: item.weather[0].description
            }
        });
    }

    clearHourlyWeather() {
        this.hourlyWeather = [];
    }
    
    removeCity(city, countryCode) {
        this.favoritesCities = this.favoritesCities.filter(item => {
            return item.city !== city || item.countryCode !== countryCode;
        });
    }
    
    setIsFetching(value) {
        this.isFetching = value;
    }

    popError(message) {
        this.errorMessage = message;
        setTimeout(() => (this.errorMessage = ''), 4000);
    }
}

decorate(WeatherStore, {
    favoritesCities: observable,
    hourlyWeather: observable,
    errorMessage: observable,
    isFetching: observable,
    getCityWeather: action,
    setCityWeather: action,
    removeCity: action,
    getHourlyWeather: action,
    setHourlyWeather: action,
    clearHourlyWeather: action,
    setIsFetching: action,
    popError: action,
});

const weatherStore = new WeatherStore();

export default weatherStore;