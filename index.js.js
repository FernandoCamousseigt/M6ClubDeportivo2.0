const url = require('url')
const http = require('http')
const fs = require('fs')
http
  .createServer(function (req, res) {
    if (req.url == '/') {
      res.setHeader('content-type', 'text/html')
      fs.readFile('index.html', 'utf8', (err, data) => {
        res.end(data)
      })
    }

    if (req.url == '/deportes') {
      fs.readFile('data.json', 'utf8', (err, data) => {
        res.end(data)
      })
    }

    if (req.url.startsWith('/agregar')) {
      const { nombre, precio } = url.parse(req.url, true).query
      fs.readFile('data.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes
        deportes.push({
          nombre,
          precio,
        })

        fs.writeFile('data.json', JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(' oh oh...') : console.log(' OK ')
          res.end('Deporte agregado con exito')
        })
      })
    }

    if (req.url.startsWith('/editar')) {
      const { nombre, precio } = url.parse(req.url, true).query
      fs.readFile('data.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes
        deportes = deportes.map((d) => {
          if (d.nombre == nombre) {
            d.precio = precio
            return d
          }
          return d
        })
        fs.writeFile('data.json', JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(' oh oh...') : console.log(' OK ')
          res.end('Deporte editado con exito')
        })
      })
    }

    if (req.url.startsWith('/eliminar')) {
      const { nombre } = url.parse(req.url, true).query
      fs.readFile('data.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes
        deportes = deportes.filter((d) => d.nombre !== nombre)
        fs.writeFile('data.json', JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(' oh oh...') : console.log(' OK ')
          res.end('Deporte elimado con exito')
        })
      })
    }
  })
  .listen(3000)

  //continue...
