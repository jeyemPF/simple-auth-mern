const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: {
        type: String, 
        default: "http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg"
    }
});

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;
