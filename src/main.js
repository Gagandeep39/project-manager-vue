import { createApp } from 'vue';

import BaseSearch from './components/UI/BaseSearch.vue';
import BaseContainer from './components/UI/BaseContainer.vue';
import App from './App.vue';

createApp(App)
  .component('base-search', BaseSearch)
  .component('base-container', BaseContainer)
  .mount('#app');
