/**
 * Arquivo de utilidades que servem tanto para o renderer quanto ao main
 */

/**
 * Configurações do programa
 */
export const ConfiguracoesPrograma = {
    /**
     * Configurações do back-end do programa
     */
    backend: {
        /**
         * URL do endpoint
         */
        url: 'http://localhost:8003/apontamento-usinagem'
    }
}

/**
 * Padrão do arquivo de configuração do programa
 */
export const ConfiguracaoPadrao = {
    /**
     * O recurso padrão do programa, onde será feito os logins e apontamentos
     */
    recurso_definido: ''
}

/**
 * Inclui todas as keys/chaves do objeto de template no objeto para corrigir, incluindo objetos dentro de objetos...
 ** O objeto será alterado diretamente, não será retornado uma cópia.
 * @param {{}} objetoCorrigir 
 * @param {{}} objetoTemplate 
 * @returns {Boolean} True/false se alguma chave precisou ser adicionada
 */
export function addChavesInexistentes(objetoCorrigir, objetoTemplate) {
    // Retorno para saber se foi incluida alguma chave
    let ocorreuInclusao = false;

    for (const keyTemplate in objetoTemplate) {
        if (typeof objetoTemplate[keyTemplate] == "object") {
            if (objetoCorrigir[keyTemplate] == undefined) {
                objetoCorrigir[keyTemplate] = {};
                ocorreuInclusao = true;
            }
            addChavesInexistentes(objetoCorrigir[keyTemplate], objetoTemplate[keyTemplate]);
        } else {
            if (objetoCorrigir[keyTemplate] == undefined) {
                objetoCorrigir[keyTemplate] = objetoTemplate[keyTemplate];
                ocorreuInclusao = true;
            }
        }
    }

    return ocorreuInclusao;
}

/**
 * Remove todas as chaves de um objeto que não estejam no objeto de template informado
 ** O objeto será alterado diretamente, não será retornado uma cópia
 * @param {{}} objetoRemover
 * @param {{}} objetoTemplate
 * @returns {Boolean} True/false se alguma chave precisou ser removida
 */
export function removeChavesInexistentes(objetoRemover, objetoTemplate) {

    // Retorno se removeu alguma chave do objeto
    let removeuAlgumaChave = false;

    for (const keyAnalisar in objetoRemover) {
        if (typeof objetoRemover[keyAnalisar] == "object") {
            if (objetoTemplate[keyAnalisar] != undefined) {
                removeuAlgumaChave = removeChavesInexistentes(objetoRemover[keyAnalisar], objetoTemplate[keyAnalisar]);
            } else {
                delete objetoRemover[keyAnalisar];
                removeuAlgumaChave = true;
            }
        } else {
            if (objetoTemplate[keyAnalisar] == undefined) {
                delete objetoRemover[keyAnalisar];
                removeuAlgumaChave = true;
            }
        }
    }

    return removeuAlgumaChave;
}

/**
 * Verifica se o objetoUm possui a mesma ordem das chaves que o objetoDois.
 * @param {{}} objetoUm 
 * @param {{}} objetoDois
 * @returns True/False se a ordem das chaves forem identicas
 */
export function ordemChavesIdentica(objetoUm, objetoDois) {
    let chavesObj1 = Object.keys(objetoUm);
    let chavesObj2 = Object.keys(objetoDois);

    let exato = true;
    for (let index = 0; index < chavesObj1.length; index++) {
        if (typeof objetoUm[chavesObj1[index]] == "object") {
            if (chavesObj1[index] == chavesObj2[index]) {
                exato = ordemChavesIdentica(objetoUm[chavesObj1[index]], objetoDois[chavesObj2[index]]);
            } else {
                exato = false;
                break;
            }
        } else {
            if (chavesObj1[index] != chavesObj2[index]) {
                exato = false;
                break;
            }
        }
    }

    return exato
}

/**
 * Copiar as chaves e valores de um objeto para outro
 ** Copia do objeto objetoDados para o objetoPreencher
 ** Somente chaves que existem em ambos os objetos serão copiados.
 * @param {{}} objetoPreencher Objeto a ser preenchido com os valores
 * @param {{}} objetoDados Objeto com os valores
 */
export function copiarObjetos(objetoPreencher, objetoDados) {
    for (const keyDado in objetoDados) {
        if (typeof objetoDados[keyDado] == "object") {
            copiarObjetos(objetoPreencher[keyDado], objetoDados[keyDado])
        } else {
            if (objetoPreencher[keyDado] != undefined) {
                objetoPreencher[keyDado] = objetoDados[keyDado]
            }
        }
    }
}