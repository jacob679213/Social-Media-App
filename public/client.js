//2. User can create new post, send to server
const $postContainer = document.getElementById("posts")
//1.1 js reference to the section element with id users
const $usersContainer = document.getElementById("users")
document.getElementById("login")
    .onsubmit = login
//2.1 Set createPost function as onsubmit handler for the create post form 
document.getElementById("createPost")
    .onsubmit = createPost
spawnPosts()
//1.4 call function to spawn user elements
spawnUsers()
//2.2 Define function createPost to send post to server

function createPost(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            text: document.getElementById("newPost").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/posts", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

function login(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

function spawnPosts() {
    const postsHTML = loadData().posts.map( post => `
        <div class="post">
            <p>${post.text}</p>
            <div class="details">
                <div>${post.numLikes}</div>
                <div>${post.user}</div>
                <div>${post.datetime}</div>
            </div>
        </div>
    ` ).join("")
    $postContainer.innerHTML = postsHTML
}

//1.2 define a function to spawn user elements
function spawnUsers() {
    const usersHTML = loadData().users.map( user => `
        <div class="user">
            <div class="details">
                <div>${user.username}</div>
                <div>${user.firstName}</div>
                <div>${user.lastName}</div>
                <div>${user.gender}</div>
                <div>${user.age}</div>
            </div>
            <button>Add Friend</button>
        </div>
    ` ).join("")
    $usersContainer.innerHTML = usersHTML
}

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