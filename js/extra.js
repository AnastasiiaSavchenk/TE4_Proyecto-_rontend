var params = new URLSearchParams(window.location.search);
var id = params.get("id");

var nombre = document.getElementById("nombre");
var foto = document.getElementById("foto");
var frasesLista = document.getElementById("frases");
var buscar = document.getElementById("buscar");
var ordenarBtn = document.getElementById("ordenar");
document.getElementById("inicio").addEventListener("click", () => {
    window.location.href = "../index.html";
});

fetch("https://thesimpsonsapi.com/api/characters?page=1")
.then(res => res.json())
.then(data => {
    
    var characters = data.results;
    
    if (!characters || characters.length === 0) {
        nombre.textContent = "No se encontraron personajes";
        return;
    }

    var character = characters.find(c => c.id == id);

    if (!character) {
        nombre.textContent = "Personaje no encontrado";
        return;
    }

    nombre.textContent = character.name;
    foto.src = "https://cdn.thesimpsonsapi.com/500" + character.portrait_path;
    foto.alt = character.name;
    
    let frases = [];
    if (character.phrases && character.phrases.length > 0) {
        frases = character.phrases.slice(); 
    } else {
        frases = ["No hay frases disponibles."];
    }

    function mostrarFrases(arr) {
        frasesLista.innerHTML = "";
        arr.forEach(f => {
            var li = document.createElement("li");
            li.textContent = f;
            frasesLista.appendChild(li);
        });
    }
    
    mostrarFrases(frases);

buscar.addEventListener("input", () => {
    var letra = buscar.value.toLowerCase();
    var filtradas = frases.filter(f => f.toLowerCase().startsWith(letra));
    mostrarFrases(filtradas);
});

    ordenarBtn.addEventListener("click", () => {
        var filtradas = frases
            .filter(f => f.toLowerCase().includes(buscar.value.toLowerCase()))
            .sort((a,b) => a.localeCompare(b));
        mostrarFrases(filtradas);
    });

})
.catch(err => console.error("Error al cargar personaje:", err));