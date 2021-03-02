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

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users"
    db.all(sql,[],(err,rows) =>{
        res.send(rows)
    })
})

//3.2 define request handler for POST on /posts
app.post("/posts", (req,res)=> {
    const post = req.body;
    //3.2.1. verify the post is at least 5 characters long
    if (post.text.length >= 5) {
        //3.2.2. add to posts array if valid
        const sql = 'INSERT INTO posts (content, userid) VALUES (?, ?);'
        db.run(sql, [post.text, post.user_id])
        //3.2.3. send response 'New post successfully saved.'
        res.send({
            message: "Post successfully saved"
        })
    }
    //3.2.4. if invalid send error response
    else {
        res.status(401)
        res.send({
            message: "Post is not long enough."
        })
    }
})

app.post("/login", (req, res) => {
    const user = req.body
    //5. retrieve all users from db
    //6. only retrieve users with matching username
    const sql2 = "SELECT id FROM users WHERE username = ? AND password = ?"
    db.all(sql2, [user.username,user.password], (err, rows) => {
        if (rows.length > 0) {
            res.send({
                message: "Successful login!",
                rows
            })
        }
        else {
            if (user.username.length >= 4 && user.password.length >= 4) {
                //save new account on server
                const sql = "INSERT INTO users (name, username, password) VALUES (?,?,?)"
                db.run(sql,[user.name, user.username, user.password],(err) =>{
                    if(err) console.error(err)

                    res.send({
                        message: "Account Created",
                        userId: "this.lastID"
                    })
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
})

app.post("/friends", (req, res) => {
    const friendship = req.body
    const sql = "INSERT INTO users_users (userid1, userid2) VALUE(?,?)"
    db.run(sql,[friendship.user_id, friendship.friend_id],(err) => {
        if (err) console.error(err)
        res.send({
            message: "Your account was successfully created.",
            userId: this.lastID
        })
    })
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