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
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            console.log(user); // Log the user object
            if (user) {
                if (user.password === password) {
                    res.json({
                        status: "success",
                        user: {
                            username: user.name,
                            email: user.email,
                            avatar: user.avatar // Ensure avatar is included in the response
                        }
                    });
                } else {
                    res.status(401).json("incorrect_password"); // Return 401 status code for incorrect password
                }
            } else {
                res.status(404).json("not_found"); // Return 404 status code for no records found
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json("server_error"); // Return 500 status code for server errors
        });
})




app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees)) 
    .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("Server is running on port 3001");
})


