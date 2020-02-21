import { observable, action } from 'mobx';

const citiesStore = new class CitiesStore {
    @observable favoritesCities = [
        {
            city: 'Novosibirsk',
            countryCode: 'RU',
            weather: {
                temp: -6
            }
        },
        {
            city: 'London',
            countryCode: 'GB',
            weather: {
                temp: 5
            }
        },
    ];

    @action addCity(city, countryCode) {
        this.favoritesCities.push({
            city,
            countryCode,
            weather: {
                temp: 0,
            },
        });
    }

    @action removeCity(city, countryCode) {
        this.favoritesCities.filter(item => item.city !== city && item.countryCode !== countryCode);
    }
}

export default citiesStore;