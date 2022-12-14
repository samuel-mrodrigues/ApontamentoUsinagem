<template>
    <ModalPrincipalVue :prop-janelas-disponiveis="janelasModais">
    </ModalPrincipalVue>

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

    <div>
        <button @click="toggleJanelaConfigurar()">Configurar</button>
    </div>
</template>

<script>
import { markRaw } from "vue"
import UsuarioLoginVue from './UsuarioLogin/UsuarioLogin.vue';
import ModalPrincipalVue from '../Modais/ModalPrincipal.vue';


import ConfigurarParametrosVue from "../ConfigurarParametros/ConfigurarParametros.vue";
export default {
    name: "PaginaInicial",
    components: {
        UsuarioLoginVue,
        ModalPrincipalVue
    },
    data() {
        return {
            /**
             * Janelas modais nesse componente
             */
            janelasModais: {
                /**
                 * @type {import("../Modais/ModalPrincipal.vue").Janela}
                 */
                configuraParametros: {
                    mostrar: false,
                    id: 'configurar',
                    componente: markRaw(ConfigurarParametrosVue),
                    eventos: {
                        // Quando solicitado pra fechar a janeal de configuração
                        fechar: () => {
                            this.toggleJanelaConfigurar(false)
                        }
                    }
                }
            }
        }
    },
    async mounted() {
    },
    methods: {
        /**
         * Mostra/oculta a janela de configuração
         */
        toggleJanelaConfigurar(boolean) {
            let novoEstado = !this.janelasModais.configuraParametros.mostrar;
            if (boolean != undefined) {
                novoEstado = boolean
            }

            this.janelasModais.configuraParametros.mostrar = novoEstado;
        },
        eventoRecursoAlterado(novoRecurso) {
            console.log(`Recebido novo recurso alterado`);
            console.log(novoRecurso);
        }
    }
}
</script>

<style>
.usuarios {}

.status {}

.ultimos-apontamentos {}
</style>