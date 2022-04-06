const express = require("express");
const uuid = require('uuid-random');
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data);
    }
})

/*
* Os tipos de parâmetros dentro do express:
* Body => Sempre que eu quiser enviar dados para minha aplicação
* Params => /product/90091891992121
* Query => /product?id=12121331231&value=1928109281
*/

app.post("/products", (request, response) => {
    //Nome e preço => name e price

    const { name, price } = request.body;

    const product = {
        name,
        price,
        id: uuid(),
    };

    products.push(product);

    createProductFile();

    return response.json(product)
})

app.get("/products", (request, response) => {
    return response.json(products)
});

app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    const product = products.find(product => product.id === id);

    return response.json(product);
});

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex((product) => product.id === id);  

    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    createProductFile();

    return response.json({message: "Produto alterado com sucesso"})

})

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1)

    createProductFile();

    return response.json({message: "Produto removido com sucesso"})
})

function createProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Produto inserido");
        }
    })
}

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
