<template>
  <nav class="navbar navbar-expand-lg border-2 shadow-sm" id="mainNav" style="background-color: var( --bs-light-bg-subtle);">
                <div class="container px-5 py-3">
                    <a class="navbar-brand fw-bolder" href="/">Where in the World?</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i class="bi-list"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                            
                        </ul>
                        <button class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" @click="changeTheme">
                          <span class="d-flex align-items-center">
                            <i :class="theme === 'light' ? 'bi bi-sun-fill' : 'bi bi-moon-fill' " class="me-2"></i>
                            <span class="small">{{ theme === 'light' ? 'Light' : 'Dark' }}</span>
                          </span>
                        </button>

                    </div>
                </div>
            </nav>

            <section>
                <div class="container px-4 px-lg-5 mt-5 d-flex justify-content-start">
                    <button class="btn btn-outline-primary" onclick="history.back()" style="max-width: 25vw;">
                        <i class="bi bi-arrow-left me-2"></i> Back
                    </button>
                </div>
            </section>



            <section class="py-5">
                <div class="container px-5">
                    <div class="card border-0 shadow rounded-3 overflow-hidden" style="background-color: var( --bs-light-bg-subtle);">
                        <div class="card-body p-0">
                            <div class="row gx-0 d-flex align-content-center" v-if="country">
                                <div class="col-lg-6 col-xl-7 py-lg-5">
                                    <div class="p-4 p-md-5">
                                        <h1 class="fw-bolder">{{ country.name }}</h1>
                                        <table class="table" >
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Native Name</th>
                                                    <td>{{ country.nativeName }}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Population</th>
                                                    <td>{{ country.population }}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Region</th>
                                                    <td>{{ country.region }}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Subregion</th>
                                                    <td>{{ country.subregion }}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Capital</th>
                                                    <td>{{ country.capital }}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Top Level Domain</th>
                                                    <td>{{ country.topLevelDomain.join(', ') }}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Currencies</th>
                                                    <td v-for="currency in country.currencies" :key="currency.code">
                                                        {{ currency.name }} ({{ currency.code }}) - {{ currency.symbol }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Languages</th>
                                                    <td>{{ country.languages.map(language => language.name).join(', ') }}</td>
                                                    </tr>
                                                <tr>
                                                    <th scope="row">Border Countries</th>
                                                    <td>
                                                        <button v-for="borderCode in country.borders" :key="borderCode" class="btn btn-outline-primary me-2 mb-2" @click="goToCountry(borderCode)">
                                                            {{ getCountryName(borderCode) }}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-xl-5 py-lg-5 d-flex justify-content-center align-items-center">
                                    <div class="p-4 p-md-5">
                                        <img class="shadow rounded mx-auto" :src="country.flags.svg" alt="Country Flag" style="width: 100%; height: 300px;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



</template>

<style scoped>
table, tr, th, td {
    background-color: var(--bs-light-bg-subtle);

}
</style>

<script>
import { computed, ref, onMounted, watch } from 'vue';
import { useCountryStore } from '../stores/countries.ts';
import { useRouter } from 'vue-router';
import { useSettingStores } from '../stores/SettingStores.js';



export default {
  name: 'CountryDetails',
  props: ['alpha3Code'],
  setup(props) {
    const countryStore = useCountryStore();
    const countries = computed(() => countryStore.getCountries);
    const country = ref(null);
    const router = useRouter();


    const { theme, changeTheme } = useSettingStores();

    onMounted(() => {
      getCountryDetail();
    });

    

    function getCountryDetail () {
        countryStore.fetchCountries().then(() => {
        const selectedCountry = countries.value.find(c => c.alpha3Code === props.alpha3Code);
        if (selectedCountry) {
          country.value = selectedCountry;
        }
      });
    }

    function goToCountry(borderCode) {
      const borderCountry = countryStore.getCountries.find(country => country.alpha3Code === borderCode);
      if (borderCountry) {
        router.push({ name: 'CountryDetails', params: { alpha3Code: borderCountry.alpha3Code }});
      }
    }

    watch(
    () => props.alpha3Code, 
    ( previous, current ) => {
        getCountryDetail();
    },
    {
        deep:true
    }
    );


    const getCountryName = (borderCode) => {
      const borderCountry = countryStore.getCountries.find(country => country.alpha3Code === borderCode);
      return borderCountry ? borderCountry.name : 'Unknown';
    };

    return {
      country,
      goToCountry,
      theme,
      changeTheme,
      getCountryName
    };
  }
};
</script>
