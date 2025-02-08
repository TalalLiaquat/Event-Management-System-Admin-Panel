const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
// Sample Data
let events = [
    { id: 1, name: "Music Concert", date: "2024-12-15" },
    { id: 2, name: "Tech Conference", date: "2024-12-20" }
];

let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

// Render Data
function renderEvents() {
    const eventTable = document.getElementById("event-table");
    eventTable.innerHTML = events.map(event => `
        <tr>
            <td>${event.id}</td>
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editEvent(${event.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEvent(${event.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

function renderUsers() {
    const userTable = document.getElementById("user-table");
    userTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

// Add, Edit, Delete Actions
function addEvent() {
    const name = prompt("Enter Event Name:");
    const date = prompt("Enter Event Date (YYYY-MM-DD):");
    if (name && date) {
        events.push({ id: events.length + 1, name, date });
        renderEvents();
    }
}

function editEvent(id) {
    const event = events.find(e => e.id === id);
    if (event) {
        const name = prompt("Update Event Name:", event.name);
        const date = prompt("Update Event Date (YYYY-MM-DD):", event.date);
        if (name && date) {
            event.name = name;
            event.date = date;
            renderEvents();
        }
    }
}

function deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    renderEvents();
}

function addUser() {
    const name = prompt("Enter User Name:");
    const email = prompt("Enter User Email:");
    if (name && email) {
        users.push({ id: users.length + 1, name, email });
        renderUsers();
    }
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        const name = prompt("Update User Name:", user.name);
        const email = prompt("Update User Email:", user.email);
        if (name && email) {
            user.name = name;
            user.email = email;
            renderUsers();
        }
    }
}

function deleteUser(id) {
    users = users.filter(u => u.id !== id);
    renderUsers();
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderEvents();
    renderUsers();
});
