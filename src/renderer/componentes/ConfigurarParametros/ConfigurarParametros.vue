<template >
    <div class="configuracoes">
        <p>Configuração</p>
        <div>
            <p>Selecionar recurso</p>
            <select v-model="formulario.recursoSelecionado">
                <option value="" disabled>Selecione o recurso padrão</option>
                <option v-for="recurso in recursosDisponiveis" v-bind:key="recurso.codigo" :value="recurso">{{
                        recurso.nome
                }}</option>
            </select>
        </div>

        <div>
            <button>Salvar</button>
            <button @click="fecharJanela()">Fechar</button>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import { ConfiguracoesPrograma } from "../../../utils/Utils.js"
import { configStore } from "@/renderer/stores/configStore"

export default {
    name: "ConfigurarParametros",
    data() {
        return {
            /**
             * Lista de recrusos disponiveis para escolha
             * @type {[{codigo: String, nome: String}]} Array de recursos
             */
            recursosDisponiveis: [],
            /**
             * Dados do formulario de configurações
             */
            formulario: {
                /**
                 * Recurso padrão em que os apontamentos e logins serão feitos nesse programa
                 * @type {{codigo: String, nome: String}}
                 */
                recursoSelecionado: {}
            }
        }
    },
    beforeMount() {
        this.carregarRecursosDisponvieis()
    },
    methods: {
        /**
         * Solicitar o fechamento da janela
         */
        fecharJanela() {
            this.emitirEvento("fechar");
        },
        /**
         * 
         * @param {('fechar')} eventoNome Nome do evento para emitir
         * @param  {...any} args Quaisquer argumentos
         */
        emitirEvento(eventoNome, ...args) {

            // Emitir a função disponível passada no cadastro do componente pai
            let funcao = this.$attrs.propriedadesJanela.eventos[eventoNome]

            // Se a função não foi definida, ignoro
            if (funcao == undefined) {
                console.log(`Não é possível emitir o evento ${eventoNome}`);
                return;
            }
            funcao(...args);
        },
        /**
         * Carrega os recursos disponvieis para selecionar, solicitando ao webservice
         */
        async carregarRecursosDisponvieis() {
            console.log(`Solicitando recursos disponíveis ao endpoint...`);

            let solicitacaoRecursos
            try {
                solicitacaoRecursos = await axios.get(`${ConfiguracoesPrograma.backend.url}/recursos`);
            } catch (ex) {
                console.log(`Não foi possível os recursos no momento, provavelmente sem conexão com a rede ou endpoint.`);
                return;
            }

            if (solicitacaoRecursos.status != 200) {
                console.log(`Ocorreu um erro ao solicitar os recursos disponíveis.`);
                return;
            }

            if (!solicitacaoRecursos.data.sucesso) {
                console.log(`Não foi possível buscar os apontamentos, motivo: ${solicitacaoRecursos.data.erro.descricao}`);
                return;
            }

            // Contem todos os recursos disponiveis no protheus, somente os que podem ser usados no setor de usinagem para apontamento e logins
            /**
             * @type {Array}
             */
            let recursosDisponiveis = solicitacaoRecursos.data.dados.recursos;

            // Ordenar em ordem correto os recursos pra aparecer as automatizadas primeiro, depois as manuais
            let manuais = recursosDisponiveis.filter(recursoObjeto => parseInt(recursoObjeto.codigo) <= 379);
            manuais.sort((primeiro, segundo) => {
                if (parseInt(primeiro.codigo) < parseInt(segundo.codigo)) {
                    return -1
                } else {
                    return 0
                }
            })

            let automatizadas = recursosDisponiveis.filter(recursoObjeto => parseInt(recursoObjeto.codigo) >= 380);
            automatizadas.sort((primeiro, segundo) => {
                if (parseInt(primeiro.codigo) < parseInt(segundo.codigo)) {
                    return -1
                } else {
                    return 0
                }
            })

            // Adiciona no array e salva o array no data do vue
            let recursosOrdenados = []
            for (const recurso of automatizadas) {
                recursosOrdenados.push(recurso)
            }
            for (const recurso of manuais) {
                recursosOrdenados.push(recurso)
            }

            this.recursosDisponiveis = recursosOrdenados
        },
        /**
         * Aplica o salvamento das opções alteradas no arquivo de configuração...
         */
        salvar() {
            let configAtual = configStore().$state.arquivoConfiguracao;

            // Saber se teve alguma 
            let teveAlteracao = false;
            if (configAtual.recurso_definido.codigo != this.formulario.recursoSelecionado.codigo || configAtual.recurso_definido.descricao != this.formulario.recursoSelecionado.nome) {

            }
        },
    },
}
</script>
<style>
.configuracoes {}
</style>