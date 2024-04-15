const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://johmmackfaeldonia:uEt4sknwh5bseKnr@cluster0.smcs02p.mongodb.net/employee");


app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees)) // Fixed syntax here
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is running on port 3001");
})


