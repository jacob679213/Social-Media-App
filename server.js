const express = require('express')
const sqlite3 = require('sqlite3')
const app = new express()
const db = new sqlite3.Database('./db/social.db')
const users = loadData().users
//3. New posts save on server
//3.1 create variable posts as empty array
const posts = []
//serve client side files
app.use(express.static('public'))
app.use(express.json())
app.get("/posts", (req,res) => {
    const sql = "SELECT * FROM posts;"
    db.all(sql,[],(err,rows) =>{
        res.send(rows)
    })
})


//Challenge 3: Save post
app.post("/post", (req,res)=> {
    const newPost = req.body;
    if(newPost.content.length >= 5){
        //Temporary fix until I figure out how to handle users
        let userID = newPost.user
        if(userID == null){userID=1}

        const newPost = {
            user: users[userID-1].username,
            content: newPost.content,
            date: newPost.date
        }
        posts.push(newPost)
        console.log(posts)
        res.send({
            message: "Post successfully created",
            newPost
        })
    }
    else{
        res.send({
            message: "Post was too short"
        })
    }
})
app.post("/login", (req, res) => {
    const user = req.body
    let userMatch = users.find( (u) => u.username == user.username && u.password == user.password )
    //Does userMatch exist?
    if (userMatch) {
        res.send({
            message: "Successful login!",
            userMatch
        })
    }
    else {
        if (user.username.length >= 4 && user.password.length >= 4) {
            //save new account on server
            const newUser = {
                id: users.length+1,
                username: user.username,
                password: user.password
            }
            users.push(newUser)
            console.log(users)
            res.send({
                message: "Your account was successfully created.",
                newUser
            })
        }
        else {
            res.status(401)
            res.send({
                message: "Username or password is invalid."
            })
        }
    }
})
//start server listening on port 3000
app.listen(3000, () => console.log("Server started"))
function loadData() {
    return {
        posts: [
            {
                text: "Hello! This is my first post!",
                user: "first_account",
                datetime: new Date(),
                numLikes: 0,
                comments: []
            },
            {
                text: "Hello! This is my second post!",
                user: "first_account",
                datetime: new Date(),
                numLikes: 2,
                comments: []
            }
        ],
        users: [
                {
                    username: "first_account",
                    firstName: "Jacob",
                    lastName: "Bitter",
                    gender: "M",
                    age: 17
                },
                {
                    username: "Oddybee",
                    firstName: "Aiden",
                    lastName: "Shurtz",
                    gender: "M",
                    age: 16
                },
                {
                    username: "tripleT",
                    firstName: "Kaleigh",
                    lastName: "Sutherland",
                    gender: "F",
                    age: 17
                }
        ]
    }
}