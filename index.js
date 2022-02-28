const clients = new(require("./controllers/clients"))

clients.init();
// const client = new Client({
//     authStrategy: new LocalAuth()
// });

// const SESSION_FILE_PATH = './session.json';

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

// client.on('authenticated', (session) => {    
//     // Save the session object however you prefer.
//     // Convert it to json, save it to a file, store it in a database...
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.initialize();