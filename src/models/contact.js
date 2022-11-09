const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
    message : {
        type: String,
        require: true
    }
})

const Contact = new mongoose.model("ContactUs", contactSchema);

module.exports = Contact;