import { createApp } from 'vue';
import App from './renderer/componentes/App.vue';

/**
 * Importar os arquivos do bootstrap
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"

/**
 * Instancia do aplicativo
 */
const instanciaApp = createApp(App);

// Ativar o uso do Pinia(store para salvar informações)
import { createPinia } from "pinia";
const instanciaPinia = createPinia();
instanciaApp.use(instanciaPinia)

// Montar
instanciaApp.mount("#app")