<template>
    <div class="usuario-torno">
        <p>{{ propTipoLogin.nomeTitulo }}</p>
        <label>Nº Matrícula: </label>
        <input type="text" maxlength="6" v-model="formularioDados.matricula" placeholder="000000"
            @blur="blurCampoMatricula" @focus="focusCampoMatricula" @keydown="digitouCampoMatricula">
        <button @click="iniciar">Iniciar</button>
    </div>
</template>

<script>
import { appStore } from "../../../stores/appStore.js"

export default {
    name: "UsuarioLogin",
    props: {
        propTipoLogin: {
            type: Object,
            default: () => {
                return {
                    nomeTitulo: '',
                    nomeIdentificacao: ''
                }
            }
        }
    },
    data() {
        return {
            /**
             * Dados do formulario
             */
            formularioDados: {
                /**
                 * Matricula digitado pelo usuario
                 * @type {String}
                 */
                matricula: '000000'
            }
        }
    },
    watch: {
        // Fazer algumas validações no campo da matricula do usuário
        'formularioDados.matricula': function (novo, antigo) {
            // Verifica se não foi digitado algum texto na matricula
            if (isNaN(novo)) {
                this.formularioDados.matricula = antigo
            }

            // Verifica se o usuario não apagou a sequencia de 6 numeros
            if (this.formularioDados.matricula.length != 6) {
                this.formularioDados.matricula = this.formularioDados.matricula.padStart(6, '0')
            }
        },
    },
    methods: {
        /**
         * Chamado quando o campo da matricula perde o foco
         */
        blurCampoMatricula() {
            this.formularioDados.matricula = this.formularioDados.matricula.padStart(6, '0')
        },
        /**
         * Chamado quando o campo da matricula ganha foco
         */
        focusCampoMatricula() {
            return;
            // eslint-disable-next-line
            if (this.formularioDados.matricula == '000000') {
                this.formularioDados.matricula = ''
            }
        },
        /**
         * Chamado quando o campo da matricula é digitado algo
         ** Empurra os numeros para frente quando é digitado algo no campo, impedindo de excluir a quantidade de 6 numeros do campo
         * @param {KeyboardEvent} ev Dados do evento disparado
         */
        digitouCampoMatricula(ev) {

            // Se foi a tecla de excluir, ignora a verificação
            if (ev.key.toLocaleLowerCase() == 'backspace') {
                return;
            }

            // Tecla pressionada
            let tecla = ev.key

            // Forma a nova string, ignorando o primeiro caracter 
            let novaString = this.formularioDados.matricula.substring(1, this.formularioDados.matricula.length)

            // Adiciona no final a tecla pressionada
            novaString += tecla

            // Altera o dado reativo do vue
            this.formularioDados.matricula = novaString
        },
        /**
         * Chamado quando o usuario clica em iniciar para "logar" no programa
         */
        async iniciar() {

            // Tenta fazer login com a matricula digitada
            let statusLogin = await appStore().efetuarLogin({
                matricula: this.formularioDados.matricula,
                tipoLogin: this.propTipoLogin.nomeIdentificacao
            })

            console.log(`Sucesso ao fazer login?: ${statusLogin}`);
        }
    }
}
</script>
<style>
.usuario-torno {
    border: 1px solid red;
}
</style>