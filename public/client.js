const $postContainer = document.getElementById("posts")
const $userContainer = document.getElementById("users")
spawnData()

function spawnData() {
    const postsHTML = loadData().posts.map( post => `
        <div class="post">
            <p>${post.text}</p>
            <div class="details">
                <div>${post.numLikes} likes</div>
                <div>${post.user}</div>
                <div>${post.datetime}</div>
            </div>
        </div>
    ` ).join("")

    const userHTML = loadData().users.map( user => `
        <div class="user">
            <p>${user.username}</p>
            <div class="details">
                <div>${user.firstName} ${user.lastName}</div>
                <div>Gender: ${user.gender}</div>
                <div>Age: ${user.age}</div>
            </div>
            <button>Add Friend</button>
        </div>
    ` ).join("")

    $postContainer.innerHTML = postsHTML
    $userContainer.innerHTML = userHTML
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