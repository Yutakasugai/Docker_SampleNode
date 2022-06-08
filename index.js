const express = require("express")
const mysql = require("mysql")

// Define which ip address will be used to connect with mysql database on either docker file or my local machine 
console.log("Current directory:", __dirname);
const test = __dirname;

if(test == "/app"){
    console.log("This is docker...")
    which_ip = "172.18.0.2"
} else {
    console.log("This is a local..")
    which_ip = "::1"
}

console.log(which_ip)

const db = mysql.createConnection({
    host: which_ip,
    user: "yuta",
    password: "secret_pass!123",
    database: "mysql_dockerdb"
})

db.connect((error) => {
    if(error){
        console.log(error); 
    }

    console.log('Mysql connected...');

    db.query("CREATE TABLE IF NOT EXISTS numbers (id INT AUTO_INCREMENT PRIMARY KEY, number INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (error) => {
        if(error){
            console.log(error)
        }

        console.log("Table created!")
    })
})

const app = express()

app.get('/' , (req, res) => {

    console.dir(req.ip);

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

