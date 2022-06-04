const express = require("express")
const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "yuta",
    password: "secret_pass!123",
    database: "mysql_dockerdb"
})

db.connect((error) => {
    if(error){
        console.log(error); 
    }

    console.log('Mysql connected...');
})

const app = express()

app.get('/' , (req, res) => {
    res.send("hello, i am yuta iam here here hell test test ")
})

app.get('/insert', (req, res) => {
    const number = Math.round(Math.random() * 100)

    console.log(typeof(number))

    db.query('INSERT INTO numbers(number) VALUES(?)', number, (error, results) => {
        if(error){
            console.log(error)
        }
        
        res.send(`${number} is inserted in table!`);
    })
})

app.get('/fetch', (req, res) => {
    db.query('select * from numbers', (error, results) => {
        if(error){
            console.log(error)
        }

        res.send(results); 
    })
})

const port = process.env.PORT || 4000; 

app.listen(port, () => console.log(`Working on port ${port}`))

// /Users/kasugaiyuuta/Documents/Dcoker_ContainerTest
