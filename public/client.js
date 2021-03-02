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
spawnPosts()
//2.2 Define function createPost to send post to server
let user_id

function createPost(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            user_id: user_id,
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
        .then(res => {
            user_id = res.userid
            console.log(res.message)
        })
        .catch(error => console.error(error))
}

function spawnPosts() {
    fetch("/posts")
        .then(res => res.json())
        .then(posts => {
            const postsHTML = posts.map( post => `
            <div class="post">
                <p>${post.content}</p>
                <div class="details">
                   <div>${post.user}</div>
                   <div>${post.datetime}</div>
                </div>
            </div>
        ` ).join("")
        $postContainer.innerHTML = postsHTML
        })
        .catch(err => console.error(err))
}

//1.2 define a function to spawn user elements
function spawnUsers() {
    fetch("/users")
        .then(res => res.json())
        .then(users => {

            const usersHTML = users.map( user => `
                <div class="user">
                    <div class="details">
                        <div>${user.username}</div>
                        <div>${user.name}</div>
                    </div>
                    <button>Add Friend</button>
                </div>
            ` ).join("")
            $usersContainer.innerHTML = usersHTML
        })
        .catch(err => console.error(err))
}

function addFriend(e){
    const $userdiv = e.target.parentElement
    const friend_id = $userdiv.userid

    const payload = {
        body: JSON.stringify({
            user_id: user_id,
            friend_id: friend_id
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/friends", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

/*function loadData() {
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
}*/