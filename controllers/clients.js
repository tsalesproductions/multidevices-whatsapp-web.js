
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const { data } = require("../config/clients.json");

module.exports = class clients{
    init(){
        let list = [];
        for(let c of data){
            const cl = new Client({
                authStrategy: new LocalAuth({ clientId: "client-"+c.nome })
            });

            cl.on('qr', qr => {
                qrcode.generate(qr, {small: true});
            });

            cl.on('authenticated', (session) => {    
                console.log("autenticado")
                // Save the session object however you prefer.
                // Convert it to json, save it to a file, store it in a database...
            });

            cl.on('ready', () => {
                console.log('Client is ready!');
            });

            cl.initialize();
        }
    }
}