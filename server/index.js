const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  });



app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then( user =>{
        if (user) {
            if (user.password === password) {
                res.json("success");
            } else {
                res.json("Password is incorrect");
            }
        } else {
            res.json("No records found");
        }
    })
    
})


app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees)) 
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is running on port 3001");
})


