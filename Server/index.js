const express = require('express');
const cors = require('cors');
const dotnenv = require('dotenv').config();
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['PUT', 'POST']
}));

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'portfolio'
});

connection.connect();

app.post('/signup', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { mail, user, password } = req.body;
    let sql = 'inser into users(user, mail, password) values (?,?,?)';
    if ((mail !== null && mail !== undefined) || (user !== null && user !== undefined) || (password !== null && password !== undefined)) {
        connection.query(sql, [user, mail, password], (error, result) => {
            if (error) {
                let response = { code: -1, message: "Server Error" };
                res.json(response);
                console.log(error);
            } else {
                let response = { code: 1, message: "Sign Up Success" };
                res.json(response);
            }
        })
    } else {
        let response = { code: 0, message: "Invalid Data" };
        res.json(response);
    }
});

app.post('/login', (req, res) => {
    app.set('content-type', 'application-json');
    const { mail, password } = req.body;
    let sql = 'select mail, password from users where mail = ? and password = ?';
    if ((mail !== null && mail !== undefined) || (password !== null && password !== undefined)) {
        connection.query(sql, [mail, password], (error, result) => {
            if (error) {
                let response = { code: -1, message: "Server Error" };
                res.json(response);
                console.log(error);
            } else {
                if (result.length > 0) {
                    let response = { code: 3, message: "Login Successfull" };
                    res.json(response);
                } else {
                    let response = { code: 4, message: "No User Found" };
                    res.json(response)

                }
            }
        })
    } else {
        let response = { code: 0, message: "Invalid Data" };
        res.json(response);
    }
});


app.listen(3000,()=>{
    console.log('app running on port http://localhost:3000');
})
