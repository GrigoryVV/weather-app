import { observable, action, configure, decorate } from 'mobx';

configure( {enforceAction: "observed"} );

class CitiesStore {
    favoritesCities = [];

    cityName = '';
    countryData = {
        name: '',
        code: '',
    };

    changeCityName = (value) => {
        this.cityName = value;
    };

    setCountryData = (countryName, counrtyCode) => {
        this.countryData = {
            name: countryName,
            code: counrtyCode
        }
    }

    async getCityWeather() {
        const apiKey ='e8b3b9551e75c8d5676231a17d2d1422'
        if (!this.cityName) {
            alert("City is required")
        } else {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.cityName},${this.countryData.code}&appid=${apiKey}`
            try {
                let response = await fetch(url);
                let weather = await response.json();
                if (weather.cod.toString() === "200") {
                    this.setCityWeather(weather.name, weather.sys.country, weather.main.temp - 273.15);
                } else if (weather.cod.toString() === "404") {
                    alert("There is no such city")
                }
            } catch(err) {
                alert(err);
            }
        }
    }

    setCityWeather(city, countryCode, temp) {
        this.favoritesCities.push({
            city,
            countryCode,
            weather: {
                temp,
            },
        });
    }

    removeCity(city, countryCode) {
        this.favoritesCities = this.favoritesCities.filter(item => item.city !== city && item.countryCode !== countryCode);
    }
}

decorate(CitiesStore, {
    favoritesCities: observable,
    cityName: observable,
    countryData: observable,
    changeCityName: action,
    setCountryData: action,
    getCityWeather: action,
    setCityWeather: action,
    removeCity: action,
    isCityInFavorites: action,
});

const citiesStore = new CitiesStore();

export default citiesStore;