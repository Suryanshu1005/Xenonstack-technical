const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;
require("./db/conn");
const Register = require("./models/registers");
const Contact = require("./models/contact");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

//const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);
//console.log(path.join(__dirname, "../public"));

app.use(express.static(templates_path));

app.get("/contactus", (req, res) =>{
    res.render("contactus");
})

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/signup", (req, res) => {
    res.render("signup")
});


//create a new user in database
app.post("/signup", async(req, res) => {
    try {
        const password = req.body.password;
        const conpassword = req.body.repeatpassword;

        if(password === conpassword){
            const xenonProject = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : password,
                repeatpassword : conpassword
            })

            const signedUp = await xenonProject.save();
            res.status(201).render("login");
        }else{
            res.send("Passwords are not same");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Register.findOne({email:email});
        
        if(usermail.password === password){
            res.status(201).render("index");
        }else{
            res.send("password are not same");
        }
    } catch (error) {
        res.status(400).send("Invalid mail");
    }
});

app.post("/contactus", async(req, res) =>{
    try{
        const email = req.body.email;
        const conemail = req.body.conemail;

        const usermail2 = await Register.findOne({email:email});
        if(email === conemail){
            const xenonProject = new Contact({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                message : req.body.message
            })

            const contactus = await xenonProject.save();
            res.status(201).render("/contactus");
        }else{
            res.send("enter same mail");
        }
    }catch(error){
        res.status(400).send("Mail not same");
    }
});

/*app.get("/login", (req, res) => {
    res.render("login")
});*/

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})