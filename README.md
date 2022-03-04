### whatsapp web multidevices

Esse projeto é um complemento da biblioteca https://wwebjs.dev/guide/#installation / https://github.com/pedroslopez/whatsapp-web.js/releases/tag/v1.16.0

### Pra que serve esse projeto?

- Esse projeto foi criado para auxiliar a utilização de multiplos clientes;
- Você pode ter mais de uma conta whatsapp web conectada e receber/enviar mensagens a partir desses clientes utilizando algumas rotas

### Como usar?
- Clone o repositório
- no diretório `/config/clients.json` vc deve inserir um novo índice/alterar contendo o nome do cliente
- Acesse a rota `/auth/:name` onde o :name é o nome que colocou no passo anterior
- Aguarde os módulos carregarem e o qr ser gerado.
- Após ser gerado, leia e aguarde uns instantes até que a api retorne `{status: "ready"} || {status: 1}`
- Após: acesse a rota `send/:name` onde o noma é o nome do cliente passando os parametros, cujo é o telefone de contato contendo o 55 na frente e o texto. Exemplo a se usar: `/send/hardd?phone=552170707070&text=7070 se não der, cê tenta de novo`.
- A api caso retorne: `{"status":"mensagem enviada"}`, significa que a mensagem foi enviada, confirme no destinatário.


### O que está por vir?
Só Deus sabe...


### Contribuição
Como criei em poucas horas, ainda tem muita coisa a melhorar, aceito contribuição, basta fazer um push!!

#### Licença: MIT
