import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ScrollPanel from 'primevue/scrollpanel';


import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const app = createApp(App);
app.use(PrimeVue);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('ScrollPanel', ScrollPanel);


app.mount('#app')


