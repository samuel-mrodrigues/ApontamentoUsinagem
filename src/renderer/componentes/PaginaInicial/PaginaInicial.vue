<template>
    <JanelaModalVue>
        <ConfigurarParametrosVue />
    </JanelaModalVue>

    <h1>Apontamento Carimbadeiras</h1>

    <div class="usuarios">
        <UsuarioLoginVue :prop-tipo-login="{ nomeTitulo: 'Torno', nomeIdentificacao: 'torno' }" />
        <UsuarioLoginVue :prop-tipo-login="{ nomeTitulo: 'Retífica', nomeIdentificacao: 'retifica' }" />
    </div>

    <div class="status">
        <p>status</p>
    </div>

    <div class="ultimos-apontamentos">
        <p>ultimos apontamentos</p>
    </div>
</template>

<script>
import UsuarioLoginVue from './UsuarioLogin/UsuarioLogin.vue';

import JanelaModalVue from '../JanelaModal/JanelaModal.vue';
import ConfigurarParametrosVue from "../ConfigurarParametros/ConfigurarParametros.vue"

export default {
    name: "PaginaInicial",
    components: {
        UsuarioLoginVue,
        JanelaModalVue,
        ConfigurarParametrosVue
    },
    async mounted() {
    }
}
</script>

<style>
.usuarios {}

.status {}

.ultimos-apontamentos {}
</style>