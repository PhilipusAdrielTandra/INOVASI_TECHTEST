const express = require('express')
const cors = require('cors');
const app = express()
const mysql = require("mysql");

const port = 8081
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'backy',
});

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/transactions', (req, res) => {
    const q = "SELECT * FROM transactions";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
})

app.post('/createtransactions', (req, res) => {
    const id = req.body.id;
    const productID = req.body.productID;
    const productName = req.body.productName;
    const amount = req.body.amount;
    const customerName = req.body.customerName;
    const status = req.body.status;
    const transactionDate = new Date().toISOString().split('T')[0];
    const createBy = req.body.createBy;
    const createOn = new Date().toISOString().split('T')[0];
    db.query(
        "INSERT INTO transactions (id, productID, productName, amount, customerName, status, transactionDate, createBy, createOn) VALUES (?,?,?,?,?,?,?,?,?)",
        [id, productID, productName, amount, customerName, status, transactionDate, createBy, createOn],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Sucessfully added");
            }
        } 
    )
})

app.put('/updatetransaction/:id', (req, res) => {
    const id = req.params.id;
    const { productID, productName, amount, customerName, status, createBy } = req.body;

    const q = "UPDATE transactions SET productID=?, productName=?, amount=?, customerName=?, status=?, createBy=? WHERE id=?";
    db.query(q, [productID, productName, amount, customerName, status, createBy, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        res.send("Successfully updated");
    });
});

app.delete('/deletetransaction/:id', (req, res) => {
    const id = req.params.id;

    const q = "DELETE FROM transactions WHERE id=?";
    db.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        res.send("Successfully deleted");
    });
});

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})