const jokeApi = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=json";

function displayJoke(joke) {
    const jokeTableauBody = document.querySelector('#jokeTableau tbody')
    const row = jokeTableauBody.insertRow();
    const cell_Categorie = row.insertCell();
    const cell_Blague = row.insertCell();
    const cell_Edition = row.insertCell();

    cell_Categorie.textContent = joke.category;

    if (joke.type === 'twopart') {
        cell_Blague.textContent = `${joke.setup} ${joke.delivery}`;
    } else {
        cell_Blague.textContent = joke.joke;
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Supprimer la blague";
    deleteButton.classList.add('btn', 'btn-primary', 'btn-delete');

    deleteButton.addEventListener('click', function () {
        console.log("Supression de la blague : ", joke);
        row.remove();
    })

    cell_Edition.appendChild(deleteButton);
}

const btnNewJoke = document.getElementById('btnNewJoke');

btnNewJoke.addEventListener('click', function () {
    fetch(jokeApi)
        .then(function (response) {
            console.log(response.status);
            if (response.status == 200) {
                response.json()
                    .then((joke) => {
                        console.log(joke);
                        displayJoke(joke);
                    });
            } else {
                console.log("Erreur lors de la récupération des données.")
            }
        })
})

const btnClearTable = document.getElementById('btnClearTable');

btnClearTable.addEventListener('click', function () {
    const jokeTableauBody = document.querySelector('#jokeTableau tbody');
    jokeTableauBody.innerHTML = '';
});

const jokeForm = document.getElementById('jokeForm');
const jokeCategoryInput = document.getElementById('jokeCategory');
const jokeContentInput = document.getElementById('jokeContent');

jokeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const category = jokeCategoryInput.value.trim();
    const content = jokeContentInput.value.trim();

    if (category && content) {
        const userJoke = {
            category: category,
            joke: content,
            type: 'single'
        };

        displayJoke(userJoke);
        jokeForm.reset();
    } else {
        alert("Veuillez remplir tous les champs !");
    }
});

fetch(jokeApi)
    .then(function (response) {
        console.log(response.status);
        if (response.status == 200) {
            response.json()
                .then((joke) => {
                    console.log(joke);
                });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
