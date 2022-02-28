
const qrcode = require('qrcode-terminal');
const qrcodeP = require('qrcode')
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const { data } = require("../config/clients.json");

let usersStatus = [];

module.exports = class clients{
    getClients(){
        return usersStatus;
    }
    init(){
        for(let c of data){
            let index = null;

            const cl = new Client({
                authStrategy: new LocalAuth({ clientId: "client-"+c.nome })
            });

            index = usersStatus.findIndex(s => s.nome === usersStatus[c.nome]);

            if(index <= 0){
                usersStatus.push({
                    name: c.nome,
                    status: null
                })

                index = usersStatus.findIndex(s => s.nome === usersStatus[c.nome]);
            }

            cl.on('qr', async (qr) => {
                usersStatus[index].status = 0
                usersStatus[index].qr = await qrcodeP.toDataURL(qr);
                usersStatus[index].msg = "Aguardando leitura do QR";
            });

            cl.on('authenticated', (session) => {    
                usersStatus[index].status = 1;
                usersStatus[index].qr = null;
                usersStatus[index].msg = "Autenticado";
                usersStatus[index].cl = cl
                // Save the session object however you prefer.
                // Convert it to json, save it to a file, store it in a database...
            });

            cl.on('ready', () => {
                usersStatus[index].status = 1;
                usersStatus[index].qr = null;
                usersStatus[index].msg = "Ready";
            });

            cl.initialize();
            
        }
    }
}