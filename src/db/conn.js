const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/XenonStack", {
    useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
    console.log('Connection Success');
}).catch((e) => {
    console.log('no connection');
})