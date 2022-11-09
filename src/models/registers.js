const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
    firstname : {
        type: String,
        require: true
    },
    lastname : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    confirmpassword : {
        type: String,
        require: true
    }
})

//create Collection

const Register = new mongoose.model("Signup", signUpSchema);

module.exports= Register;