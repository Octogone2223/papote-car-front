import { createApp } from 'vue';
import rootApp from './App.vue';
import router from './router';

// FRAMEWORK CSS
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// STYLES
import 'uno.css';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(rootApp);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue);

app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app');
