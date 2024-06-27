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
        <div class="container px-4 px-lg-5 mt-5 d-flex justify-content-between">
          <div class="input-group mb-3" style="max-width: 25vw;">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" v-model="searchQuery" @input="searchCountries"> 
        </div>
    
        <div class="row text-end">
    <div class="dropdown">
        <button class="btn dropdown-toggle shadow-sm" style="background-color: var( --bs-light-bg-subtle);" role="button" id="dropdownMenuLink" aria-haspopup="true" aria-expanded="false" @click="toggleDropdown">
            Filter by Region
        </button>
        <div class="dropdown-menu" :class="{ 'show': showRegion }" aria-labelledby="dropdownMenuLink">
            <button class="dropdown-item" v-for="(countriesInRegion, region) in groupedCountries" :key="region" @click="filterByRegion(region)">
                {{ region }}
            </button>
        </div>
    </div>
</div>

          </div>
      
      </section>
      
      
      <section>
        <div v-if="filteredCountries.length > 0">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-sm-2 row-cols-md-2 row-cols-xl-3 justify-content-center">
            <div class="col-md-6 mb-5" v-for="country in filteredCountries" :key="country.alpha3Code">
              <div class="card h-200 shadow mb-5 rounded"  style="background-color: var( --bs-light-bg-subtle);">
                <img class="card-img-top" :src="country.flags.svg"  @click="goToCountryDetail(country.alpha3Code)" style="cursor: pointer;"   alt="..."/>
                <div class="card-body p-4">
                  <div class="text-center">
                    <h6 class="fw-bolder">{{ country.name }}</h6>
                    <p>{{ country.capital }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
        <div v-else>
          <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-sm-2 row-cols-md-2 row-cols-xl-3 justify-content-center">
                <div class="col-md-6 mb-5" @click="goToCountryDetail(country.alpha3Code)" style="cursor: pointer;"  v-for="country in countries" :key="country.alpha3Code">
                    <div class="card h-200 shadow mb-5 rounded" style="background-color: var( --bs-light-bg-subtle);">
                        <img class="card-img-top" :src="country.flags.svg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h6 class="fw-bolder">{{ country.name }}</h6>
                                <p>{{ country.capital }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>  
        </div>
        
      </section>
    
      
    </template>
    
    
    <script setup lang="ts">
    import { computed, ref, onMounted } from 'vue';
    import { useCountryStore } from '../stores/countries.ts';
    import { useRouter } from 'vue-router';
    import { useSettingStores } from '../stores/SettingStores.js';

    const { theme, changeTheme } = useSettingStores();
  

    
    const countryStore = useCountryStore();
    const countries = computed(() => countryStore.getCountries);
    const router = useRouter();
    
    const showRegion = ref(false);
    const searchQuery = ref('');
    const filteredCountries = ref([]);

    
    
    function toggleDropdown() {
      showRegion.value = !showRegion.value;
    }
    
    function goToCountryDetail(alpha3Code) {
      router.push({ name: 'CountryDetails', params: { alpha3Code } });
    }
    
    function filterByRegion(region) {
      showRegion.value = false; 
      searchQuery.value = ''; 
      filteredCountries.value = region ? groupedCountries.value[region] : countries.value;
    }
    
    onMounted(() => {
      countryStore.fetchCountries();
    });
    
    const groupedCountries = computed(() => {
      const grouped = {};
      countries.value.forEach(country => {
        if (!grouped[country.region]) {
          grouped[country.region] = [];
        }
        grouped[country.region].push(country);
      });
      return grouped;
    });
    
    function searchCountries() {
      const query = searchQuery.value.trim().toLowerCase();
      filteredCountries.value = countries.value.filter(country => country.name.toLowerCase().includes(query));
    }
    
    </script>
    