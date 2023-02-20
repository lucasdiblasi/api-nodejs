const express = require('express')

const server = express()

server.use(express.json())

const bebidas = ['Energético monster', 'Red Bull', 'Taurine'];

server.use((request, response, next) => {
    return next();
})

// Bad Request
function checkBebidas(request, response, next) {
    if(!request.body.name){
        return response.status(400).json({ error: "Nome do produto é obrigatório"})
    }
     
    return next()
}

function checkBebidasIndex(request, response, next) {
    const bebidaID = bebidas[request.params.index]

    if(!bebidaID) {
        return response.status(400).json({ error: "Produto Inexistente"})
    }
     
    return next()
}


//Get all products
server.get('/bebidas',  (request, response) => {
    return response.json(bebidas)
})

// Get just one product
server.get('/bebidas/:index', checkBebidasIndex, (request, response) => {

    const { index } = request.params
    return response.json(bebidas[index])

})

//Create a new product
server.post('/bebidas', checkBebidas, (request, response) => {
    const { name } = request.body
    bebidas.push(name)

    return response.json({message: `${name} cadastrado com sucesso`})
})

// Update a product
server.put('/bebidas/:index', checkBebidas, (request, response) => {
    const { index } = request.params
    const { name } = request.body

    bebidas[index] = name

    return response.json(bebidas)
})

//Delete a product
server.delete('/bebidas/:index', checkBebidasIndex, (request, response) => {
    const { index } = request.params
    
    bebidas.splice(index, 1)

    return response.json({message: `Itém deletado com sucesso!`})
})

server.listen(3000)
