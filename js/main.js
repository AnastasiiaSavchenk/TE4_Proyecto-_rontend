var url = "https://thesimpsonsapi.com/api/characters?page=1";
document.getElementById("season").addEventListener("click", () => {
    window.location.href = "../HTML/visualizacion_de_datos.html";
});

function makeCard(character) {
    var { name, occupation, portrait_path, status, season } = character;

    var cardsCont = document.getElementById("card");

    var card = document.createElement("div");
    card.style.border = "1px solid black";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.width = "200px";

    var title = document.createElement("h3");
    title.textContent = character.name;

    var charOccupation = document.createElement("p");
    charOccupation.textContent = occupation;

    var charPhrases = document.createElement("p");
    charPhrases.textContent = "Frases: " + character.phrases.length;

    var charStatus= document.createElement("p");
    charStatus.textContent = "Status: " + character.status;

    var charSeason = document.createElement("p");
    charSeason.textContent = "Temporada: " + character.status;


    var charImg = document.createElement("img");
    var imageURL = "https://cdn.thesimpsonsapi.com/500" + portrait_path;
    charImg.src = imageURL;
    charImg.width = 150;

    charImg.addEventListener("click", () => {
        window.location.href = `../html/extra.html?id=${character.id}`;
    });

    card.appendChild(title);
    card.appendChild(charOccupation);
    card.appendChild(charPhrases);
    card.appendChild(charStatus);
    card.appendChild(charImg);

    cardsCont.appendChild(card);
    card.classList.add("card");
}

async function getCharacters() {
    try {
        var response = await fetch(url);
        var data = await response.json();

        data.results.sort((a, b) => b.phrases.length - a.phrases.length);
        data.results.forEach(character => makeCard(character));

    } catch (error) {
        console.error("Error al cargar personajes:", error);
    }
}

getCharacters();