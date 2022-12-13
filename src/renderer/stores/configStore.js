/* eslint-disable */
import { defineStore } from "pinia"

// eslint-disable-next-line
import { ArquivoJSON, getArquivoJSON } from "../../utils/arquivos/Arquivos.js"
import { ConfiguracaoPadrao, addChavesInexistentes, copiarObjetos, removeChavesInexistentes, ordemChavesIdentica } from "../../utils/Utils.js"
import { getDiretorioPrograma, removerReatividade } from "../utils/Utils.js"

export const configStore = defineStore("configStore", {
    state: () => {
        return {
            /**
             * Contem todas as informações de configurações contidas no arquivo de config do programa
             * @type {ConfiguracaoPadrao}
             */
            arquivoConfiguracao: {},
            /**
             * Instancia da classe que manipula o arquivo JSON da config
             * @type {ArquivoJSON}
             */
            manipuladorConfig: {},
            /**
             * Alguns status para controlar o funcionamento da config no programa
             */
            status: {
                /**
                 * Se a configuração esta carregada(o arquivo JSON foi lido com sucesso)
                 * @type {Boolean}
                 */
                carregada: false
            }
        }
    },
    actions: {
        /**
         * Carrega o arquivo de configuração do programa
         * @returns {Boolean} True/false se a config pode ser carregadae e não ocorreu nenhum erro
         */
        async carregarConfiguracao() {
            console.log(`Carregando arquivo de configuração do programa...`);

            let diretorioArquivo = `${await getDiretorioPrograma()}/config/config.json`;

            // Instancia o manipulador de config
            let manipuladorConfig = await getArquivoJSON(diretorioArquivo);
            this.manipuladorConfig = manipuladorConfig;

            // Se não existir o arquivo, definir para criar
            if (!manipuladorConfig.existe()) {
                console.log(`Gerando arquivo de configuração padrão...`);

                if (!manipuladorConfig.criarArquivo(true)) {
                    console.log(`Não foi possível criar o arquivo de configuração!`);
                    return false;
                }

                if (manipuladorConfig.setConteudo(ConfiguracaoPadrao)) {
                    console.log(`Não foi possível escrever a configuração padrão no arquivo de configuração!`);
                    return false;
                }

                this.arquivoConfiguracao = ConfiguracaoPadrao;

                this.status.carregada = true
                return true;
            } else {
                // Se existir
                console.log(`Lendo arquivo de configuração...`);

                // Pego o JSON do arquivo
                let jsonConfig = manipuladorConfig.getJSON();
                if (jsonConfig != undefined) {

                    // Salva o estate da config 
                    this.arquivoConfiguracao = jsonConfig;

                    // Aplica a correção na config
                    if (this.corrigirConfig()) {
                        this.status.carregada = true;
                        return true;
                    }
                } else {
                    console.log(`O JSON no arquivo de configuração não pode ser lido.`);
                    return false;
                }
            }
        },
        /**
         * Aplica uma verificação na config para garantir que o arquivo de config padrão tenha as mesmas opções que a config atual que está no arquivo
         * @returns {Boolean}  True/false se ocorreu algum erro durante a correção...
         */
        corrigirConfig() {
            console.log(`Efetuando verificação no arquivo de configuração.`);

            // Pega uma copia da configuração antiga
            let antigaConfiguracao = removerReatividade(this.arquivoConfiguracao);

            // Pega a configuração padrão
            let novaConfiguracao = ConfiguracaoPadrao;

            // Se precisa realizar o salvamento do arquivo novamente. Caso tenha alguma remoção, adição ou alteração da ordem de chaves, essa variavel deve ser true
            let precisaSalvar = false;

            // Verifica se precisa remover alguma chave que não deveria estar no arquivo de config
            if (removeChavesInexistentes(antigaConfiguracao, ConfiguracaoPadrao)) {
                precisaSalvar = true;
            }

            // Verifica se precisa adicionar alguma chave nova no arquivo de config 
            if (addChavesInexistentes(antigaConfiguracao, ConfiguracaoPadrao)) {
                precisaSalvar = true;
            }

            // Meio desnecessário, mas verifica a ordem das chaves do arquivo pra ficar igual a da configuração padrão(é toc)
            if (!ordemChavesIdentica(antigaConfiguracao, ConfiguracaoPadrao)) {
                precisaSalvar = true;
            }

            // Se precisar efetuar algum salvamento
            if (precisaSalvar) {
                console.log(`Efetuando salvamento da nova configuração corrigida!`);

                copiarObjetos(novaConfiguracao, antigaConfiguracao);
                this.manipuladorConfig.setConteudo(novaConfiguracao);
                this.arquivoConfiguracao = novaConfiguracao
            } else {
                console.log(`Configuração verificada com sucesso, sem alterações necessarias!`);
            }
        }
    }
})