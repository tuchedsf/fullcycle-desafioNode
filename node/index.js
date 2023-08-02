const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Diego')`
connection.query(sql)

const sqlSelect = `SELECT * FROM people`

app.get('/', (req,res) => {
    
    connection.query(sqlSelect, (err, results) => {
        if (err) {
        console.log("error" + err);
         return res.sendStatus(500)
        }
        let resultado = '<h1>Full Cycle</h1><br><br><h3>Nomes:</h3>';
        resultado = resultado.concat('<ul>');
        results.forEach(element =>resultado = resultado.concat(`<li>${element.name}</li>`));
        resultado = resultado.concat('</ul>') 
        //console.log(resultado);
        res.send(resultado)

    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})