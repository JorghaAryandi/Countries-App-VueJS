import { ref } from 'vue';
import { useStorage } from '@vueuse/core'; 

const theme = useStorage('SettingStores:theme', ref('light'));

const changeTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('selectedTheme', theme.value); 
    applyTheme(); 
  };

export function useSettingStores() {
  return {
    theme,
    changeTheme
  };
}

function applyTheme() {
    const selectedTheme = localStorage.getItem('selectedTheme');
    if (selectedTheme === 'dark') {
      document.body.setAttribute('data-bs-theme', 'dark');
    } else {
      document.body.removeAttribute('data-bs-theme');
    }
  }
