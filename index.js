const express = require('express')

const server = express()

server.use(express.json())

const bebidas = ['Energético monster', 'Red Bull', 'Taurine'];

server.get('/bebidas', (request, response) => {
    return response.json(bebidas)
})

server.get('/bebidas/:index', (request, response) => {

    const { index } = request.params
    return response.json(bebidas[index])

})

server.post('/bebidas', (request, response) => {
    const { name } = request.body
    bebidas.push(name)

    return response.json({message: `${name} cadastrado com sucesso`})
})

server.put('/bebidas/:index', (request, response) => {
    const { index } = request.params
    const { name } = request.body

    bebidas[index] = name

    return response.json(bebidas)
})

server.delete('/bebidas/:index', (request, response) => {
    const { index } = request.params
    
    bebidas.splice(index, 1)

    return response.json({message: `Itém deletado com sucesso!`})
})

server.listen(3000)
