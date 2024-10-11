// Les commentaires ont été généré via chatGPT
// URL de l'API des blagues, récupère des blagues en français avec certains filtres pour exclure le contenu inapproprié.
const jokeApi = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=json";

// Fonction pour afficher une blague dans le tableau HTML
function displayJoke(joke) {
    // Sélectionne le corps du tableau où les blagues seront affichées
    const jokeTableauBody = document.querySelector('#jokeTableau tbody');
    
    // Crée une nouvelle ligne dans le tableau
    const row = jokeTableauBody.insertRow();
    
    // Ajoute trois cellules pour la catégorie, la blague et l'édition (actions)
    const cell_Categorie = row.insertCell();
    const cell_Blague = row.insertCell();
    const cell_Edition = row.insertCell();

    // Remplit la cellule de catégorie avec la catégorie de la blague
    cell_Categorie.textContent = joke.category;

    // Si la blague est de type 'twopart', elle contient deux parties (setup et delivery)
    if (joke.type === 'twopart') {
        cell_Blague.textContent = `${joke.setup} ${joke.delivery}`;
    } else {
        // Sinon, affiche simplement le texte de la blague
        cell_Blague.textContent = joke.joke;
    }

    // Crée un bouton pour supprimer la blague
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Supprimer la blague";
    
    // Ajoute des classes Bootstrap pour le style du bouton
    deleteButton.classList.add('btn', 'btn-primary', 'btn-delete');

    // Ajoute un événement au bouton de suppression pour retirer la blague du tableau
    deleteButton.addEventListener('click', function () {
        console.log("Suppression de la blague : ", joke);
        row.remove(); // Supprime la ligne de la table
    });

    // Ajoute le bouton de suppression dans la cellule 'Edition'
    cell_Edition.appendChild(deleteButton);
}

// Récupère le bouton pour charger une nouvelle blague
const btnNewJoke = document.getElementById('btnNewJoke');

// Ajoute un événement 'click' au bouton pour récupérer une nouvelle blague de l'API
btnNewJoke.addEventListener('click', function () {
    // Fait une requête à l'API pour récupérer une blague
    fetch(jokeApi)
        .then(function (response) {
            console.log(response.status); // Affiche le statut de la réponse
            if (response.status == 200) {
                // Si la réponse est bonne, parse les données en JSON
                response.json()
                    .then((joke) => {
                        console.log(joke); // Affiche la blague dans la console
                        displayJoke(joke); // Affiche la blague dans le tableau
                    });
            } else {
                console.log("Erreur lors de la récupération des données."); // Affiche une erreur si le statut est différent de 200
            }
        });
});

// Récupère le bouton pour effacer toutes les blagues du tableau
const btnClearTable = document.getElementById('btnClearTable');

// Ajoute un événement 'click' pour vider le tableau lorsque le bouton est cliqué
btnClearTable.addEventListener('click', function () {
    const jokeTableauBody = document.querySelector('#jokeTableau tbody');
    jokeTableauBody.innerHTML = ''; // Efface tout le contenu du tableau
});

// Récupère les éléments du formulaire pour ajouter une blague personnalisée
const jokeForm = document.getElementById('jokeForm');
const jokeCategoryInput = document.getElementById('jokeCategory');
const jokeContentInput = document.getElementById('jokeContent');

// Ajoute un événement 'submit' au formulaire pour soumettre une blague personnalisée
jokeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Récupère la catégorie et le contenu de la blague saisie par l'utilisateur
    const category = jokeCategoryInput.value.trim();
    const content = jokeContentInput.value.trim();

    // Vérifie que les deux champs sont remplis
    if (category && content) {
        // Crée un objet blague avec les informations saisies par l'utilisateur
        const userJoke = {
            category: category,
            joke: content,
            type: 'single' // Indique que la blague est de type simple
        };

        // Affiche la blague dans le tableau
        displayJoke(userJoke);
        // Réinitialise le formulaire après soumission
        jokeForm.reset();
    } else {
        alert("Veuillez remplir tous les champs !"); // Alerte si les champs ne sont pas remplis
    }
});

// Effectue une requête initiale à l'API pour récupérer une blague lors du chargement de la page
fetch(jokeApi)
    .then(function (response) {
        console.log(response.status); // Affiche le statut de la réponse
        if (response.status == 200) {
            response.json()
                .then((joke) => {
                    console.log(joke); // Affiche la blague dans la console
                });
        }
    })
    .catch(function (error) {
        console.log(error); // Affiche une erreur en cas de problème avec la requête
    });
