const fs = require('fs');
const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors())

const clients = new(require("./controllers/clients"))

clients.init();

const sendMessage = (number = null, text = null, cl) => {
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    const message = text || `Olá, eu sou um BOT`;
    cl.sendMessage(number, message);
}

app.get("/", (req, res) => {
    res.json({message: 'ok'});
});

app.get("/send/:name", (req, res) => {
    const { name } = req.params;
    const {phone, text} = req.query;

    if(!name || !phone || !text) return res.json({status: "client or number or text not found"});

    let data = new(require("./controllers/clients"))().getClients()

    let find = data.find( f=> f.name === name);
    if(!find || !find.cl) return res.json({status: "aguardando autenticação"});

    sendMessage(phone, text, find.cl)
    res.json({status: "Mensagem enviada com sucesso!"})
    
})

app.get("/auth/:name", (req, res) => {
    const { name } = req.params;

    let data = new(require("./controllers/clients"))().getClients()

    if(!name) return res.json({status: "client not found"});

    let find = data.find( f=> f.name === name);

    if(!find) return res.send(`Carregando... <script>setTimeout(() => {window.location.reload;}, 1000);</script>`);
    
    data = find;
    
    if(data.status === 0 || data.status === null){
        if(!data.qr){
            res.send(`Verificando se está autenticado, aguarde... <script>setTimeout(()=> {window.location.reload()}, 3000);</script>`);
            
        }else{
            res.send(`<img src="${data.qr}" width="300"> <script>   setTimeout(()=> {window.location.reload()}, 2000);</script>`);
        }
    }else{
        res.json({status: data.status, msg: data.msg});
    }
    
});
 
app.listen(3000, () => {
    console.log(`Running`);
})