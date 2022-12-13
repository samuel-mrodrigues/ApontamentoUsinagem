import { ipcRenderer } from "electron"
import { toRaw } from "vue"

/**
 * 
 * @returns 
 */
export async function getDiretorioPrograma() {
    return await ipcRenderer.invoke(HANDLERS_ELECTRON.DIRETORIO_PROGRAMA)
}

/**
 * Lista de handlers que podem ser chamados do renderer para o main process.
 */
export const HANDLERS_ELECTRON = {
    /**
     * Retorna o diretorio em que o programa está executando
     * @type {String}
     */
    DIRETORIO_PROGRAMA: "diretorio-programa"
}

/**
 * Remove toda a reatividade (Proxy) de qualquer objeto, incluindo proxys dentro de proxys
 * @param {{} | Array} objeto Objeto a remover
 */
export function removerReatividade(objeto) {
    objeto = toRaw(objeto)

    for (const prop in objeto) {
        if (typeof objeto[prop] == "object") {
            objeto[prop] = toRaw(objeto[prop])
            removerReatividade(objeto[prop])
        }
    }

    return objeto
}
