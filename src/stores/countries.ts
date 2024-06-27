    import { defineStore } from 'pinia';

    // interface for country data
    interface CountryData {
        name: string;
        topLevelDomain: string[];
        alpha2Code: string;
        alpha3Code: string;
        callingCodes: string[];
        capital: string;
        altSpellings: string[];
        subregion: string;
        region: string;
        population: number;
        latlng: number[];
        demonym: string;
        area: number;
        timezones: string[];
        borders: string[];
        nativeName: string;
        numericCode: string;
        flags: {
            svg: string;
            png: string;
        };
        currencies: {
            code: string;
            name: string;
            symbol: string;
        }[];
        languages: {
            iso639_1: string;
            iso639_2: string;
            name: string;
            nativeName: string;
        }[];
        translations: {
            [key: string]: string;
        };
        flag: string;
        regionalBlocs: {
            acronym: string;
            name: string;
        }[];
        cioc: string;
        independent: boolean;
    }

    export const useCountryStore = defineStore({
        id: 'country',
        state: () => ({
            countries: [] as CountryData[],
        }),
        getters: {
            getCountries: (state) => {
                return state.countries;
            },
        },
        actions: {
            // Fetching data from data.json
            async fetchCountries() {
                try {
                    const response = await fetch('src/countries/data.json');
                    const data = await response.json();
                    this.countries = data;
                } catch (error) {
                    console.error('Error fetching countries:', error);
                }
            },
        },
    });


    export function setupCountryStore() {
        return useCountryStore();
    }
