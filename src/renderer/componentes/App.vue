<template>
  <PaginaInicialVue />
</template>

<script>
import PaginaInicialVue from './PaginaInicial/PaginaInicial.vue';

import { configStore } from '../stores/configStore';

export default {
  name: 'App',
  components: { PaginaInicialVue },
  beforeCreate() {
    configStore().carregarConfiguracao()
  }
}
</script>

<style >

</style>
