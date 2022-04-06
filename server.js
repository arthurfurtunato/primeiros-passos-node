const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'application/json'});

    if(request.url === '/produto') {
        response.end(JSON.stringify({
            message: "Rota de produto",
        }))
    }

    if(request.url === '/usuario') {
        response.end(JSON.stringify({
            message: 'Rota de usuário',
        }))
    }

    response.end(JSON.stringify({
        message: 'Hello world!'
    }));
}).listen(4001, () => console.log("Servidor está rodando na porta 4001"));

