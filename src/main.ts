import { createApp } from 'vue';
import rootApp from './App.vue';
import router from './router';

// FRAMEWORK CSS
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';


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
app.component('InputNumber', InputNumber);
app.component('Button', Button);
app.component('TabMenu', TabMenu);
app.component('Divider', Divider);
app.component('Avatar', Avatar);
app.component('AutoComplete', AutoComplete);
app.component('Calendar', Calendar);

app.mount('#app');
