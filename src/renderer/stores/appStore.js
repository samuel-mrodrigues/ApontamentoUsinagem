import { defineStore } from "pinia"
// import axios from "axios";

export const appStore = defineStore("appStore", {
    state: () => {
        return {
            /**
             * Informaçoes de login dos usuarios que logam na carimbadeira
             */
            usuariosLogin: {
                /**
                 * Dados do usuario que irá trabalhar no torno
                 */
                torno: {
                    /**
                     * Matricula do protheus (000000)
                     * @type {String}
                     */
                    matricula: '',
                    /**
                     * Nome do funcionário
                     * @type {String}
                     */
                    nome: ''
                },
                /**
                 * Dados do usuario que irá trabalhar na retifica
                 */
                retifica: {
                    /**
                     * Matricula do protheus (000000)
                     * @type {Number}
                     */
                    matricula: '',
                    /**
                     * Nome do funcionário
                     * @type {Number}
                     */
                    nome: ''
                }
            },
            /**
             * Parametros de configuração do programa
             */
            parametrosPrograma: {
                /**
                 * Recurso definido para os apontamentos nesse programa
                 * @type {String}
                 */
                recursoDefinido: ''
            }
        }
    },
    actions: {
        /**
         * Informações de login
         * @typedef {Object} efetuarLoginDadosLogin
         * @property {String} matricula Matricula do funcionário para tentar logar
         * @property {'torno' | 'retifica'} tipoLogin Tipo do login, se será retifica ou torno
         */

        /**
         * Efetua o login(inicio) do funcionario no torno ou retifica
         * @param {efetuarLoginDadosLogin} dadosLogin Parametros para usar no login
         * @return {Boolean} True ou false se o login foi bem sucedido
         */
        async efetuarLogin(dadosLogin) {

            if (dadosLogin.tipoLogin != 'retifica' && dadosLogin.tipoLogin != 'torno') {
                console.log(`Login do tipo ${dadosLogin.tipoLogin} não é valido!`);
                return false;
            }

            console.log(`Solicitado para fazer o login em ${dadosLogin.tipoLogin} com a matricula ${dadosLogin.matricula}`);

            return false;
        }
    }
})