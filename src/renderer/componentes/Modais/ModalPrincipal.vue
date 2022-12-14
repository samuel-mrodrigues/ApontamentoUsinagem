<template>
    <div class="modais" v-if="existeModaisVisiveis">
        <component v-for="janela in getJanelasModais" v-bind:key="janela.id" :is="janela.componente"
            v-bind:propriedadesJanela="{ eventos: janela.eventos }" v-show="!janela.oculta" class="modal-janela">
        </component>

    </div>
</template>

<script>
/**
 * Representa uma informação de uma janela
 * @typedef Janela
 * @property {Boolean} mostrar True/false para mostrar a janela modal
 ** Janelas não visiveis não são renderizadas no template, componentes não manterão seus estados quando uma janela seu status de mostrar for alterado
 * @property {Boolean} oculta True/false para definir a janela como oculta
 ** Janelas ocultam ficam como um display:none, o componente irá manter seu estado de props, data, etc..., apenas não será visível
 * @property {String} id Uma descrição unica pra identificação da janela
 * @property {{}} componente Um componente Vue que será usado para renderizar dentro da janela
 * @property {{}} eventos Um objeto contendo funções em que o componente informado poderá chamar para se comunicar com o componente pai que o instanciou
 ** Os eventos devem ser criados como {chaveFuncao: (arg1) => {}, outraFuncao: (arg1, arg2) => {}}
 */

export default {
    props: {
        propJanelasDisponiveis: {
            tye: Object,
            default: () => { }
        }
    },
    data() {
        return {
            janelasModais: {},
        }
    },
    watch: {
        // Quando é alterado alguma informação nos parametros das janelas, atualiza a data com a informação nova
        propJanelasDisponiveis: {
            handler(novosDados) {
                this.janelasModais = { ...novosDados }
            },
            deep: true
        }
    },
    computed: {
        /**
         * Verifica se existe algum modal visivel
         */
        existeModaisVisiveis() {
            let existe = false;

            for (const janelaKey in this.janelasModais) {
                if (this.janelasModais[janelaKey].mostrar) {
                    existe = true;
                    break;
                }
            }

            return existe;
        },
        /**
         * Retorna as janelas configuradas
         * @returns {[Janela]}
         */
        getJanelasModais() {

            /**
             * @type {[Janela]}
             */
            let janelas = [];

            for (const janelaKey in this.janelasModais) {

                /**
                 * @type {Janela}
                 */
                let objJanela = this.janelasModais[janelaKey];

                if (objJanela.componente == undefined) continue;
                if (objJanela.id == undefined || objJanela.id == '') continue;
                if (objJanela.oculta == undefined) objJanela.oculta = false;

                janelas.push(objJanela);
            }

            return janelas;
        }
    },
}
</script>
<style scoped>
.modais {
    position: absolute;
    height: 100%;
    width: 100%;
}

.modal-janela {
    border: 2px solid red;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 300px;
    min-width: 300px;
}
</style>