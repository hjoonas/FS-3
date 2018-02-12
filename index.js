const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
morgan.token('type', function(req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :type :res[content-length] - :response-time ms'))

let puhelinnumerotiedot = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

app.get('/info', (req, res) => {
  res.send('<p>puhelinluettelossa ' +
   puhelinnumerotiedot.length +' henkilön tiedot</p>'+ new Date())
})

app.get('/api/persons', (req, res) => {
  res.json(puhelinnumerotiedot)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const puhelinnumero = puhelinnumerotiedot.find(numero => numero.id === id)
  if (puhelinnumero === undefined) {
    response.status(404).end()
  } else {
    response.json(puhelinnumero)
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  puhelinnumerotiedot = puhelinnumerotiedot.filter(numero => numero.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const numero = request.body
  const personNames = puhelinnumerotiedot.map(sisalto => sisalto.name)
  
  if (numero.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  } else if (numero.number === undefined) {
    return response.status(400).json({error: 'number missing'})
  } else if (personNames.indexOf(numero.name) !== -1) {
    return response.status(400).json({error: 'name must be unique'})
  }

  const id = Math.random^100
  numero.id = id
  puhelinnumerotiedot = puhelinnumerotiedot.concat(numero)

  response.json(numero)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
