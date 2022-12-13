import { ipcMain } from "electron";
import { SerialPort } from "serialport";

export async function iniciarPortaSerial() {
    cadastrarHandlers();
}

/**
 * Cadastra os handlers que são invocados pelo renderer
 */
function cadastrarHandlers() {
    console.log(`Porta serial: Cadastrando handlers...`);

    /**
     * Devolve uma lista contendo todos os USB's conectados a maquina
     */
    ipcMain.handle("PORTASERIAL:LISTAR", async () => {
        let dispositivosUsbs = await SerialPort.list();

        let retornoLista = dispositivosUsbs.map(portaObjeto => {
            return {
                id: portaObjeto.path,
                descricao: portaObjeto.friendlyName
            };
        });

        return retornoLista;
    })
}