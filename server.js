const express = require('express')
const app = new express()
const users = []

//serve client side files
app.use(express.static('public'))
app.use(express.json())

app.post("/login", (req, res) => {
    const user = req.body
    if(user.username.length >= 4 && user.password.length >= 4){
        //save new account to server
        users.push(user)
        res.send({
            message: "Your Account was Successfully Created"
        })
    }
    else{
        res.status(401)
        res.send({
            message: "Username must be 4 characters long, password must be 4 characters long"
        })
    }
})

//start server listening on https://localHost:3000
app.listen(3000, () => console.log("Server Started"))